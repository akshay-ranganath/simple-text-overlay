// adding for overlay route

function setCanvasImage (e) {
  const c = document.getElementById('canvas')
  const ctx = c.getContext('2d')
  const img = document.getElementById('img')
  c.height = img.naturalHeight + 10
  c.width = img.naturalWidth + 10
  ctx.clearRect(0, 0, c.width, c.height)
  ctx.drawImage(img, 5, 5)
}

function setSliderValue (i = 0) {
  // loop through the sliders and set the value if there is a mismatch in displayed value to slider value
  const sliders = document.getElementsByClassName('fontSize')
  const spans = document.getElementsByClassName('showFontSize')
  for (i = 0; i < sliders.length; i++) {
    if (sliders[i].value !== spans[i].textContent) {
      spans[i].textContent = sliders[i].value
      spans[i].style = 'color:red;'
    }
  }
}

function setMousePosition (e) {
  const positionsX = document.getElementsByClassName('positionX')
  const positionsY = document.getElementsByClassName('positionY')

  if ('mouseTrackerEnabled' in window.config) {
    const lineEnabled = window.config.mouseTrackerEnabled
    positionsX[lineEnabled].value = e.offsetX
    positionsY[lineEnabled].value = e.offsetY
  }
}

function insertHandler (e) {
  const img = document.getElementById('img')
  let url = e.assets[0].secure_url
  if (e.assets[0].derived) {
    url = e.assets[0].derived[0].secure_url
  }
  img.src = url
  window.baseUrl = url.split(/\/v[0-9]+\//)[0]
  window.publicId = url.split(/\/v[0-9]+\//)[1]
}

function previewTransformation () {
  const messages = getElements('message')
  const fonts = getFonts()
  const fontSizes = getElements('fontSize')
  const fontColors = getElements('fontColor')
  const posXs = getElements('positionX')
  const posYs = getElements('positionY')

  for (let i = 0; i < messages.length; i++) {
    // escape newline accurately for preview
    messages[i].replace('\n', '&#13;&#10;')
    // we have 3 messages - so check each and render each one
    renderTextOnCanvas(
      messages[i],
      fontSizes[i],
      fontColors[i],
      posXs[i],
      posYs[i]
    )
  }
}

function generateTransformation () {
  const messages = getElements('message')
  const fonts = getFonts()
  const fontSizes = getElements('fontSize')
  const fontColors = getElements('fontColor')
  const posXs = getElements('positionX')
  const posYs = getElements('positionY')

  const transformations = Array(messages.length)
  // generate 1st transformation string
  for (let i = 0; i < messages.length; i++) {
    if (messages[i] && messages[i] != '') {
      transformations[i] = `l_text:${fonts[i]}_${fontSizes[i]}:${encodeURIComponent(encodeURIComponent(messages[i]))},x_${posXs[i]},y_${posYs[i]},g_north_west,co_rgb:${fontColors[i]}`
    }
  }

  const url = `${window.baseUrl}/${transformations.join('/')}/e_sharpen,f_auto,q_auto/${window.publicId}`
  url.replace('//', '/')
  const img = document.getElementById('img')
  img.src = url
  const link = document.getElementById('link')
  link.innerHTML = img.src
}

function clearTransformation () {
  const img = document.getElementById('img')
  img.src = `${window.baseUrl}/${window.publicId}`
}

// helper functions to get each of the values

function getFonts () {
  const fontSelectors = document.getElementsByClassName('fontFace')
  const fonts = Array(fontSelectors.length)

  for (let i = 0; i < fonts.length; i++) {
    const element = fontSelectors[i]
    fonts[i] = element[element.selectedIndex].value
  }
  return fonts
}

function getElements (elementName) {
  const elements = document.getElementsByClassName(elementName)
  const values = Array(elements.length)
  for (let i = 0; i < values.length; i++) {
    values[i] = elements[i].value || ''
  }
  return values
}

function renderTextOnCanvas (text, fontSize, fontColor = '999999', posx, posy) {
  const c = document.getElementById('canvas')
  const ctx = c.getContext('2d')
  ctx.font = fontSize + 'px Arial'
  ctx.fillStyle = '#' + fontColor
  ctx.fillText(text, posx, posy)
}

function fetchAndAddFonts () {
  const fonts = []

  // first fetch the fonts
  fetch(window.fontListURL)
    .then(resp => resp.json())
    .then(resp => {
      for (let i = 0; i < resp.resources.length; i++) {
        fonts.push(resp.resources[i].public_id)
      }

      // now display them on the 3 selection boxes
      const selectBoxes = document.getElementsByClassName('fontFace')
      for (let i = 0; i < selectBoxes.length; i++) {
        for (let j = 0; j < fonts.length; j++) {
          const option = new Option(fonts[j], fonts[j].replace('/', ':'))
          selectBoxes[i].add(option)
        }
      }
    }).catch(err => console.log(err))
}
