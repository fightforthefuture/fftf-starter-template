let listening = false
let targets = []

const defaultOptions = {
  speed: 0.3,
  grayscale: false,
  mobilePx: 400,
  startDistance: null,
  stopAtEl: null
}

class ParallaxObj {
  constructor(target) {
    this.mobileDisable = false
    this.conditions = []
    this.active = true
    this.target = target
    this.accumulated = 0

    if (typeof target === 'string') {
      this.target = document.querySelector(`${target}`)
    }

    if (this.target.dataset.stopAtEl) {
      this.stopAtEl = this.target.dataset.stopAtEl
      if (typeof this.target.dataset.stopAtEl === 'string') {
        this.stopAtEl = document.querySelector(`${this.target.dataset.stopAtEl}`)
      }
    }

    this.speed = this.target.dataset.speed || defaultOptions.speed
    this.mobilePx = this.target.dataset.mobilePx || defaultOptions.mobilePx
    this.grayscale = this.target.dataset.grayscale || defaultOptions.grayscale
    this.startDistance = this.target.dataset.startDistance || defaultOptions.startDistance

    resize()
  }

  // API
  stop() {
    this.active = false
  }

  start(reset=false) {
    if (this.active) return
    if (reset) {
      this.accumulated = 0
      this.startScroll = this.startAt
    }
    this.active = true
  }

  getSpeed() {
    return this.speed
  }

  changeSpeed(newSpeed) {
    if (this.inWindow() && newSpeed !== this.speed) {
      this.accumulated = this.getTranslation()
      this.startScroll = this.scrollY()
    }
    this.speed = newSpeed
  }

  when(condition, action) {
    this.conditions.push({condition, action})
    return this
  }

  // HELPERS
  scrollY() {
    return window.scrollY || window.pageYOffset
  }

  getTranslation() {
    const dist = Math.min(this.scrollY(), this.stopAt) - this.startScroll
    const translation = (dist * this.speed) + this.accumulated
    return translation >= 0 ? translation : 0
  }

  getGrayscale() {
    if (this.scrollY() > this.stopAt) { return 100 }

    const val = (this.scrollY() - this.startScroll) / (this.stopAt - this.startScroll) * 100
    return Math.min(Math.max(val, 0), 100)
  }

  getOpacity() {
    return 100 - (this.getGrayscale() / 2)
  }

  getRect() {
    this.targetR = this.target.getBoundingClientRect()
    return this.targetR
  }

  inWindow() {
    this.getRect()
    const top = this.targetR.top
    const bottom = this.targetR.bottom

    return top < this.winHeight && bottom > 0
  }

  animate() {
    if (this.mobileDisable) return
    this.move()

    if (this.grayscale) {
      this.applyGrayscale()
    }
  }

  move() {
    this.target
      .style
      .transform = `translateY(${this.getTranslation()}px)`
  }

  applyGrayscale() {
    this.target
      .style
      .filter = `grayscale(${this.getGrayscale()}%) opacity(${this.getOpacity()}%)`
  }

  setConditions() {
    this.winHeight = window.innerHeight
    this.getRect()

    this.conditions = []
    this.startAt = this.startDistance ? this.scrollY() + this.targetR.top - parseInt(this.startDistance) : 0

    if (this.target.dataset.stopAtEl) {
      // distance to travel before stop
      let distance = this.stopAtEl.getBoundingClientRect().top - this.targetR.bottom + (this.targetR.height / 2) + (this.stopAtEl.getBoundingClientRect().height / 2)

      // add to start point, and convert based on speed
      this.stopAt = this.startAt + (distance / this.speed)

    } else {
      this.stopAt = this.targetR.height + window.offsetHeight
    }

    this.startScroll = this.startAt
    this.when(
      () => this.scrollY() > this.startAt && this.scrollY() < this.stopAt,
      () => {
        this.start(true)
      }
    )

    this.when(
      () => this.scrollY() < this.startAt || this.scrollY() > this.stopAt,
      () => this.stop()
    )

    this.animate()
  }
}

const addListener = () => {
  window.addEventListener('scroll', event => {
    controller(targets)
  })

  window.addEventListener('resize', event => {
    resize()
  })
}

const controller = targets => {
  requestAnimationFrame(() => {
    targets.forEach(obj => {
      if (obj.mobileDisable) return
      obj.conditions
        .forEach(({condition, action}) => {
          if (condition()) action()
        })

      if (obj.active) {
        obj.animate()
      }
    })
  })
}

const resize = () => {
  const newSize = window.innerWidth

  targets.forEach(obj => {
    obj.active = false
    obj.setConditions()
    if (obj.mobilePx >= newSize) {
      obj.mobileDisable = true
    }
  })
}

export default (target, userOptions = {}) => {
  const parallax = new ParallaxObj(target, userOptions)
  targets.push(parallax)
  resize()

  if (!listening) {
    addListener()
    listening = true
  }

  return parallax
}
