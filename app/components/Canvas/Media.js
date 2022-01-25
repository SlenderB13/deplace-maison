import { Plane, Program, Mesh, Texture } from 'ogl'

import vertex from '../../shaders/vertex.glsl'
import fragment from '../../shaders/fragment.glsl'

export default class {
  constructor ({ element, index, scene, gl }) {
    this.gl = gl
    this.scene = scene
    this.element = element
    this.index = index

    this.createPlanes()
    this.createTexture()
    this.createProgram()
    this.createMesh()
  }

  createPlanes () {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 1
    })
  }

  createTexture () {
    this.texture = new Texture(this.gl)

    this.img = new window.Image()
    this.img.crossOrigin = 'anonymous'
    this.img.src = this.element.getAttribute('src')
    this.img.onload = () => (this.texture.image = this.img)
  }

  createProgram () {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: this.texture }
      }
    })
  }

  createMesh () {
    this.mesh = new Mesh(this.gl, { geometry: this.planeGeometry, program: this.program })
    this.mesh.setParent(this.scene)

    /* this.mesh.position.x += this.index * this.mesh.scale.x */
  }
}
