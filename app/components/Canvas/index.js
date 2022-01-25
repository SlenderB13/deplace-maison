import { Camera, Renderer, Transform } from 'ogl'

import Home from './Home'

export default class {
  constructor ({ url }) {
    this.url = url

    this.renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2)
    })

    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)

    document.body.appendChild(this.gl.canvas)

    this.createCamera()
    this.createScene()
    this.createHome()

    this.onResize()
  }

  createCamera () {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 5
  }

  createScene () {
    this.scene = new Transform()
  }

  createHome () {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene
    })
  }

  /**
   * Change.
   */
  onChange (url) {

  }

  /**
   * Resize.
   */
  onResize () {
    this.screen = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    this.renderer.setSize(this.screen.width, this.screen.height)

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.viewport = {
      height,
      width
    }

    const values = {
      screen: this.screen,
      viewport: this.viewport
    }
  }

  onTouchDown (event) {

  }

  onTouchMove (event) {

  }

  onTouchUp (event) {

  }

  /**
   * Update.
   */
  update () {
    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    })
  }
}
