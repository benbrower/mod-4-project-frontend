import React from "react";
import * as THREE from "./three";
// import Game from './Game';

class Player {
  constructor() {
    this.position = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      z: 0,
    };
    this.speed = 1;
    this.diameter = 1;
    this.color = "0x00ff00";
    // this.geometry = new THREE.BoxGeometry(
    //   this.diameter,
    //   this.diameter,
    //   this.diameter, 100, 100
    // );
    this.geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 100)
    // this.geometry = new THREE.DodecahedronGeometry(5)
    this.material = new THREE.MeshBasicMaterial({ color: this.color });
    this.cube = new THREE.Mesh(this.geometry, this.material);
  }
  getPlayer() {
    return this.cube;
  }

  update(t){
        
    this.cube.material.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
    this.cube.rotation.x += 0.01*Math.random()*10;
    this.cube.rotation.y += 0.01*Math.random()*10;
    this.cube.position.x = this.speed * Math.cos(t) + 0;
    this.cube.position.y = this.speed * Math.sin(t) + 0;
    this.cube.position.z -= 0.01;
  }
  draw() {}
}

export default Player;
