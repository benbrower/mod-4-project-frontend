import * as THREE from "./three";
import React, { Component } from "react";
import Player from "./Player";

class Game extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();

    // var camera = new THREE.PerspectiveCamera(FOV, aspect ratio, near clipping plane, far clipping pane);
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window width, window height, res boolean);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    const player = new Player();
    var points = [
      //x    z     y
      [0, 0, 0],
      [0, 1000, 0],
      [1000, 1000, 0],
      [1000, 0, 0],
      [0, 0, 0],
    ];

    //Convert the array of points into vertices
    for (var i = 0; i < points.length; i++) {
      var x = points[i][0];
      var z = points[i][1];
      var y = points[i][2];

      points[i] = new THREE.Vector3(x, y, z);
    }
    console.log(points);
    //Create a path from the points
    var path = new THREE.CatmullRomCurve3(points);
    var geometry2 = new THREE.TubeGeometry(path, 100, 10, 10, true);

    //Basic red material
    var material2 = new THREE.MeshBasicMaterial({
      color: 0x555,
      side: THREE.BackSide,
      wireframe: true,
    });
    //Create a mesh
    var tube = new THREE.Mesh(geometry2, material2);
    //Add tube into the scene
    var level = new THREE.Object3D();
    level.add(tube);
    

    level.add(cube);
    // scene.add(player.cube)
    scene.add(level);
    // console.log(cube);
    //camera.position.z = 50;
    //camera.position.y = 100;
    //camera.position.x= 50;
    //camera.lookAt(player.cube.position);
    
    camera.position.z = cube.position.z + 10;
    var t = 0;

    var animate = function () {
      requestAnimationFrame(animate);
      var delta = 0.00001;
      t += delta;
      // player.update(t);
      var camPos = path.getPointAt(t % 1);
      var camTarg = path.getPointAt((t + delta * 5) % 1);
      var playerPos = path.getPointAt((t + delta + 10) % 1);
      var playerTarg = path.getPointAt((t + delta / 5) % 1);
      //camera.lookAt(cube.position);

      camera.position.set(camPos.x, camPos.y, camPos.z);
      camera.lookAt(camTarg.x, camTarg.y, camTarg.z);
      // cube.position.set(playerPos.x + 5, playerPos.y, playerPos.z + 10);
      cube.position.z = playerPos.z + 10;
      //     cube.position.x = Math.cos(t) + 0;
      // cube.position.y = Math.sin(t) + 0;

      cube.lookAt(playerTarg.x, playerTarg.y, playerTarg.z);
      // quaternion.setFromAxisAngle(cube.getWorldDirection(), Math.PI / 2);
      // cube.rotation.setEulerFromQuaternion(quaternion);
      // cube.rotation.y = t*10;
      console.log('tube ', tube)
      console.log('cube', cube)

      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return <div></div>;
  }
}
export default Game;

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   if (camera.position.z < 10) {
//camera.position.z -= 0.01;
//     camera.position.x =  Math.cos(t) + 0;
//     camera.position.y =  Math.sin(t) + 0;
//   }

//   cube.position.x = Math.cos(t) + 0;
//   cube.position.y = Math.sin(t) + 0;
//   cube.position.z -= 0.01;
// cube.material.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
//   tube.material.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
