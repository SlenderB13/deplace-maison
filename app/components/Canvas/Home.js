import { Transform } from 'ogl'

import Media from './Media'

import { map } from 'lodash'

export default class {
  constructor ({ gl, scene }) {
    this.gl = gl
    this.scene = scene
    this.group = new Transform()
    this.group.setParent(this.scene)

    this.medias = document.querySelectorAll('.home__gallery__media__image')

    this.createGallery()
  }

  createGallery () {
    map(this.medias, (element, index) => {
      return new Media({
        element,
        index,
        scene: this.group,
        gl: this.gl
      })
    })
  }
}
