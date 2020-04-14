import React, { Component } from "react";
import * as THREE from "./three";


class Test extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var animate = function () {

    }
    animate();
  }
  render() {
    return <div>Test</div>;
  }
}
export default Test;
