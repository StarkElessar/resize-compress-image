const resizeAndCompressImages = () => {
  const fileInput = document.getElementById('uploadfileInput')
  const imagePreview = document.getElementById('imagePreview')
  const widthInput = document.getElementById('widthInput') 
  const heightInput = document.getElementById('heightInput')
  const ratio = document.getElementById('ratio')
  const quality = document.getElementById('quality')
  const downloadImageButton = document.getElementById('downloadImageButton')

  let ogImageRatio

  const fileLoad = ({target}) => {
    const file = target.files[0]
    
    if (!file) return
    
    imagePreview.src = URL.createObjectURL(file)
    imagePreview.addEventListener('load', imagePreviewLoad)

    function imagePreviewLoad() {
      const { naturalWidth, naturalHeight } = imagePreview
      
      widthInput.value = naturalWidth
      heightInput.value = naturalHeight
      ogImageRatio = naturalWidth / naturalHeight

      document.querySelector('.upload-box')
        .classList.add('_active')
    }
  }

  const changeWidthImage = () => {
    const height = ratio.checked
      ? widthInput.value / ogImageRatio
      : heightInput.value
    
    heightInput.value = Math.floor(height)
  }
  const changeHeightImage = () => {
    const width = ratio.checked
      ? heightInput.value * ogImageRatio
      : widthInput.value
    
    widthInput.value = Math.floor(width)
  }

  const resizeAndDownloadImage = () => {
    const canvas = document.createElement('canvas')
    const link = document.createElement('a')
    const context = canvas.getContext('2d')
    const imageQuality = quality.checked ? 0.7 : 1.0

    canvas.width = widthInput.value
    canvas.height = heightInput.value

    context.drawImage(imagePreview, 0, 0, canvas.width, canvas.height)

    link.href = (canvas.toDataURL('image/jpeg', imageQuality))
    link.download = new Date().getTime()

    if(!link) return

    link.click()

    document.querySelector('.upload-box')
      .classList.add('_active')
  }

  widthInput.addEventListener('keyup', changeWidthImage)
  heightInput.addEventListener('keyup', changeHeightImage)
  fileInput.addEventListener('change', fileLoad)
  downloadImageButton.addEventListener('click', resizeAndDownloadImage)
}

resizeAndCompressImages()