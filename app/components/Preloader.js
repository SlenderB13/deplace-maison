import GSAP from 'gsap'
import Prefix from 'prefix'

import { each } from 'lodash'

import Component from 'classes/Component'

export default class extends Component {
  constructor () {
    super({
      classes: {

      },
      element: '.preloader',
      elements: {
        images: document.querySelectorAll('img'),
        number: document.querySelector('.preloader__number__text')
      }
    })

    this.createLoader()

    this.length = 0

    this.counter = 0
    this.index = 0

    this.transformPrefix = Prefix('transform')
  }

  onAssetLoaded (image) {
    this.length += 1
    const percent = Math.round(this.length / this.elements.images.length * 100)

    this.elements.number.innerHTML = `${percent}%`

    if (percent === 100) {
      this.onComplete()
    }
  }

  createLoader () {
    each(this.elements.images, element => {
      element.src = element.getAttribute('data-src')
      element.onload = () => this.onAssetLoaded(element)
    })
  }

  onComplete () {
    this.timeline = GSAP.timeline()

    this.timeline.to(this.element, {
      y: '-100%',
      duration: 0.4
    })

    this.timeline.call(_ => {
      this.emit('complete')
    })
  }
}
