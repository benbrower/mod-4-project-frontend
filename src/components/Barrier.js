import React from 'react';
import * as THREE from './three';


class Barrier {
    constructor(geometry, material){
        this.diameter = 1;
        this.geometry = geometry;
        this.material = material;
        this.cube = new THREE.Mesh(this.geometry, this.material);    
    }
}
export default Barrier;