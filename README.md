# simple-text-overlay
A single page app to implement text overlay functionality by using Cloudinary Media Library widget and JS code

To see the code live in action, visit [Cloudinary demo page](https://demo.cloudinary.com/cloudydesk/text-overlay/index.html).

## Motivation

When working with Cloudinary, a lot of users would like a UI to help in specific tasks. One common use case is creation of text overlay for images. These images are then either embedded or downloaded and used in marketing campaigns. Generating such overlays using the existing Cloudinary's Media Library UI involves a bit of learning curve. Even for an experienced users, it presents challenge when the overlay requires multiple fonts or multiple lines of text.

This single page UI tries to address this problem using a very simple setup. 

## How does it work?

The tool includes the [Media Library widget](https://cloudinary.com/documentation/media_library_widget) for users to browse and select images. It then loads a set of available fonts using the [Client-Side resouces API](https://cloudinary.com/documentation/advanced_url_delivery_options#client_side_resources).

Once the page loads, users can select an image (or a transformation of the image) through the Media Library widget. After selecting the image, users can enter the text. Currently, the tool supports customizing at 3 levels. This is simply termed as 3 lines. However, each option can accept multi-line text. For each set, users can set a font-face, font-size and font-color. Finally, the text can be positioned using the `X` and `Y` coordinates or by clicking the `Pick` button and clicking on the position within the image. The coordinate system has its origin in the top-left (north-west corner) of the image.

After entering the text and positing it, users _Preview_ the text. This will generate a client-side view and will not make a call to Cloudinary. This process can be performed any number of times. Once the text color and position appears correct, users can click the _Generate_ button to create an image with the text overlay. The tool will display the Cloudinary URL on top which be copied and used in marketing campaigns or on websites. 
