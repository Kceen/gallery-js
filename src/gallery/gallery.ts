export default class Gallery {
  currentImageIndex: number = 0
  prevImageIndex: number = -1

  //
  imagesUrls: string[]
  animationType: 'fade' | 'flip' | 'scale'
  autoplay: boolean
  autoplayIntervalDuration: number
  loop: boolean

  //
  gallery = document.getElementsByClassName('gallery')[0] as HTMLElement
  galleryContent = document.getElementsByClassName(
    'gallery-content'
  )[0] as HTMLElement
  thumbnails = document.getElementsByClassName('thumbnails')[0] as HTMLElement
  closeButton = document.getElementsByClassName(
    'close-button'
  )[0] as HTMLElement
  nextButton = document.getElementsByClassName('next-button')[0] as HTMLElement
  prevButton = document.getElementsByClassName('prev-button')[0] as HTMLElement

  constructor(
    imagesUrls: string[],
    animationType?: 'fade' | 'flip' | 'scale',
    autoplay?: boolean,
    autoplayIntervalDuration?: number,
    loop?: boolean
  ) {
    this.imagesUrls = imagesUrls
    this.animationType = animationType ?? 'fade'
    this.autoplay = autoplay ?? false
    this.autoplayIntervalDuration = autoplayIntervalDuration ?? 2000
    this.loop = loop ?? false

    this.initialize()
  }

  get isFirstIndex() {
    return this.currentImageIndex === 0
  }
  get getFirstIndex() {
    return 0
  }
  get getLastIndex() {
    return this.imagesUrls.length - 1
  }
  get isLastIndex() {
    return this.currentImageIndex === this.imagesUrls.length - 1
  }
  get getMaxSize() {
    return this.imagesUrls.length
  }
  get thumbnailWidth() {
    return this.thumbnails.children[0].clientWidth
  }
  get allThumbnailsWidth() {
    return this.thumbnailWidth * this.getMaxSize
  }
  get galleryContentWidth() {
    return this.galleryContent.clientWidth
  }

  initialize() {
    this.initDomStructure()
    this.updateNumbering()
    this.initPrevNextButtonsListeners()
    this.initThumbnailsListeners()
    this.initFullscreenListeners()
    this.initKeyboardListeners()
    this.handleAutoplay()
    this.updateCurrentThumbnail()
  }

  initDomStructure() {
    this.galleryContent.classList.add(`gallery-content--${this.animationType}`)

    for (let i = 0; i < this.imagesUrls.length; i++) {
      const image = document.createElement('img')
      image.src = this.imagesUrls[i]
      const thumbnail = image.cloneNode() as HTMLElement
      thumbnail.style.width = `${this.galleryContent.clientWidth / 5}px`
      //thumbnail.style.height = 'auto'

      image.classList.add('image')
      if (i === 0) {
        image.classList.add('image--first', 'visible')
      }
      if (i === this.imagesUrls.length - 1) {
        image.classList.add('image--last')
      }

      this.galleryContent.appendChild(image)
      this.thumbnails.appendChild(thumbnail)
    }
  }

  updateCurrentImage() {
    this.updateNumbering()

    if (this.animationType === 'flip') {
      this.galleryContent.children[this.prevImageIndex].classList.remove(
        'visible'
      )
      const timeoutId = setTimeout(() => {
        this.galleryContent.children[this.currentImageIndex].classList.add(
          'visible'
        )
        clearTimeout(timeoutId)
      }, 250)
      return
    }
    this.galleryContent.children[this.prevImageIndex].classList.remove(
      'visible'
    )
    this.galleryContent.children[this.currentImageIndex].classList.add(
      'visible'
    )
  }

  updateCurrentThumbnail() {
    ;(
      this.thumbnails.children[this.currentImageIndex] as HTMLElement
    ).style.border = '2px solid white'
    ;(
      this.thumbnails.children[this.currentImageIndex] as HTMLElement
    ).style.transform = 'scale(1.1)'
    ;(
      this.thumbnails.children[this.currentImageIndex] as HTMLElement
    ).style.transformOrigin = 'bottom'

    // AT INITILAZATION PREV INDEX IS -1
    if (this.prevImageIndex !== -1) {
      ;(
        this.thumbnails.children[this.prevImageIndex] as HTMLElement
      ).style.border = ''
      ;(
        this.thumbnails.children[this.prevImageIndex] as HTMLElement
      ).style.transform = ''
    }

    const isStart =
      (this.currentImageIndex + 1) * this.thumbnailWidth <
      this.galleryContentWidth / 2

    // IN THIS CASE POSITION THE THUMBNAIL ON THE START
    if (isStart) {
      this.thumbnails.style.transform = `translateX(0)`

      return
    }

    const isEnd =
      (this.currentImageIndex + 1) * this.thumbnailWidth >
      this.allThumbnailsWidth - this.galleryContentWidth / 2

    // IN THIS CASE POSITION THE THUMBNAIL IN THE END
    if (isEnd) {
      this.thumbnails.style.transform = `translateX(-${
        this.thumbnails.children[this.currentImageIndex].clientWidth *
          this.getMaxSize +
        this.getMaxSize * 4 -
        this.thumbnails.clientWidth
      }px)`

      return
    }

    // IF NOT START OR END POSITION THE THUMBNAIL IN THE CENTER
    const translateAmount =
      -(
        (this.thumbnails.children[this.currentImageIndex].clientWidth + 4) *
          this.currentImageIndex -
        this.thumbnails.clientWidth / 2
      ) -
      this.thumbnails.children[this.currentImageIndex].clientWidth / 2

    this.thumbnails.style.transform = `translateX(${translateAmount}px)`
  }

  updateNumbering() {
    document.getElementsByClassName('numbering')[0].textContent = `${
      this.currentImageIndex + 1
    }/${this.getMaxSize}`
  }

  handleNextPage() {
    if (this.isLastIndex) {
      if (this.loop) {
        this.currentImageIndex = this.getFirstIndex
        this.prevImageIndex = this.getLastIndex
      } else {
        return
      }
    } else {
      const currentImageIndexTemp = this.currentImageIndex
      this.prevImageIndex = currentImageIndexTemp
      this.currentImageIndex++
    }

    this.updateCurrentImage()
    this.updateCurrentThumbnail()
  }

  handlePrevPage() {
    if (this.isFirstIndex) {
      if (this.loop) {
        this.currentImageIndex = this.getLastIndex
        this.prevImageIndex = this.getFirstIndex
      } else {
        return
      }
    } else {
      const currentImageIndexTemp = this.currentImageIndex
      this.prevImageIndex = currentImageIndexTemp
      this.currentImageIndex--
    }

    this.updateCurrentThumbnail()
    this.updateCurrentImage()
  }

  initPrevNextButtonsListeners() {
    this.nextButton.addEventListener('click', () => {
      this.handleNextPage()
    })

    this.prevButton.addEventListener('click', () => {
      this.handlePrevPage()
    })
  }

  initThumbnailsListeners() {
    this.thumbnails.addEventListener('click', (e) => {
      for (let i = 0; i < this.thumbnails.children.length; i++) {
        if (this.thumbnails.children[i] === e.target) {
          // IF INDEX IS ALREADY SELECTED, DO NOTHING
          if (i === this.currentImageIndex) {
            return
          }

          const currentImageIndexTemp = this.currentImageIndex
          this.prevImageIndex = currentImageIndexTemp
          this.currentImageIndex = i

          this.updateCurrentThumbnail()
          this.updateCurrentImage()
        }
      }
    })
  }

  initFullscreenListeners() {
    this.closeButton.addEventListener('click', () => {
      document.exitFullscreen()
    })

    this.galleryContent.addEventListener('click', () => {
      this.gallery.requestFullscreen().then(() => {
        this.updateCurrentThumbnail()
      })
    })

    document.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        this.updateCurrentThumbnail()
      }
    }
  }

  initKeyboardListeners() {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') {
        this.handleNextPage()
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') {
        this.handlePrevPage()
      }
    })
  }

  handleAutoplay() {
    if (this.autoplay) {
      const intervalId = setInterval(() => {
        this.nextButton.click()
        if (this.loop) {
          return
        }
        if (this.currentImageIndex === this.imagesUrls.length - 1) {
          clearInterval(intervalId)
        }
      }, this.autoplayIntervalDuration)
    }
  }
}
