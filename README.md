# simple-text-overlay
A single page app to implement text overlay functionality by using Cloudinary Media Library widget and JS code

To see the code live in action, visit [Cloudinary demo page](https://demo.cloudinary.com/cloudydesk/text-overlay/index.html).

## Motivation

When working with Cloudinary, a lot of users would like a UI to help in specific tasks. One common use case is creation of text overlay for images. These images are then either embedded or downloaded and used in marketing campaigns. Generating such overlays using the existing Cloudinary's Media Library UI involves a bit of learning curve. Even for an experienced users, it presents challenge when the overlay requires multiple fonts or multiple lines of text.

This single page UI tries to address this problem using a very simple setup. 

## How does it work?

The tool includes the [Media Library widget](https://cloudinary.com/documentation/media_library_widget) for users to browse and select images. It then loads a set of available fonts using the [Client-Side resouces API](https://cloudinary.com/documentation/advanced_url_delivery_options#client_side_resources). This assumes all of the font files are tagged with the keyword `font`.

Once the page loads, users can select an image (or a transformation of the image) through the Media Library widget. After selecting the image, users can enter the text. Currently, the tool supports customizing at 3 levels. This is simply termed as 3 lines. However, each option can accept multi-line text. For each set, users can set a font-face, font-size and font-color. Finally, the text can be positioned using the `X` and `Y` coordinates or by clicking the `Pick` button and clicking on the position within the image. The coordinate system has its origin in the top-left (north-west corner) of the image.

After entering the text and positing it, users _Preview_ the text. This will generate a client-side view and will not make a call to Cloudinary. Clicking the _Clear_ button will reset by removing the text overlays. These two steps can be performed any number of times and it won't incur additional usage on Cloudinary. 

Once the text color and position appears correct, users can click the _Generate_ button to create an image with the text overlay. The tool will display the Cloudinary URL on top which be copied and used in marketing campaigns or on websites. 

## Known Issues

In the preview mode, multi-line text is displayed as a single line. `HTMLCanvas` does not support multi-line characters in a easy manner and hence the limitation. PRs are welcome if you'd like to add this functionality.

## Installation

This is a single page app and requires the files to be hosted on a web server. To configure the tool to use your Cloudinary account, do the following. Edit the file `index.html`. Look at the customization section starting at line 125. Update the following values:

* `cloudName`: This should be your Cloudinary account name.
* `baseUrl`: By default, this will of the format `https://res.cloudinary.com/<<your-cloud-name>>/image/upload`. If you are delivering through your CNAME, update it to appropriate CNAME. So this could be `https://<<your-domain-name>>/image/upload`.
* `publicId`: This is the name of the default image used by the tool. 
* `apiKey`: API Key is necessary for the media library widget to validate the cloud name. This does not expose your secret credentials. 

Once you update and load the page, Media Library widget may ask you to login to your Cloudinary account. Once you go through, re-open the ML widget and it will display resources from your account.

