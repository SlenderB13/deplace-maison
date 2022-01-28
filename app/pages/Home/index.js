import Page from 'components/Page'
import gsap from 'gsap/all'

import Splitting from 'splitting'
export default class extends Page {
  constructor () {
    super({
      classes: {
        active: 'home--active'
      },
      element: '.home',
      elements: {
        wrapper: '.home__content',
        title: '.home__title',
        subtitle: '.home__subtitle',
        images: '.home__gallery__media'
      }
    })

    Splitting()
  }

  /**
   * Animations.
   */
  async show (url) {
    this.element.classList.add(this.classes.active)

    const tl = gsap.timeline()

    tl.from('.char', {
      duration: 0.5,
      delay: 0.5,
      opacity: 0,
      y: 100,
      stagger: 0.014
    }, 'start')

    tl.from(this.elements.images, {
      ease: 'Power3.easeInOut',
      duration: 0.5,
      opacity: 0,
      y: 200,
      stagger: 0.1
    })

    return super.show(url)
  }

  async hide (url) {
    this.element.classList.remove(this.classes.active)

    return super.hide(url)
  }
}
