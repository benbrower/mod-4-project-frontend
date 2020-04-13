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
    console.log(player);
    // var points = [];
    // points.push(new THREE.Vector3(-10, 0, 0));
    // points.push(new THREE.Vector3(0, 0, 0));
    // points.push(new THREE.Vector3(10, 0, 0));

    // var geometry2 = new THREE.BufferGeometry().setFromPoints(points);
    // var line = new THREE.Line(geometry2, material);

    var points = [
      [100, -1000, 0],
      [-100, -50, 0],
      [-0, 10, 0],
    ];

    //Convert the array of points into vertices
    for (var i = 0; i < points.length; i++) {
      var x = points[i][0];
      var y = points[i][2];
      var z = points[i][1];
      points[i] = new THREE.Vector3(x, y, z);
    }
    console.log(points);
    //Create a path from the points
    var path = new THREE.CatmullRomCurve3(points);
    var geometry = new THREE.TubeGeometry(path, 1000, 2, 80, true);
    
    //Basic red material
    var material2 = new THREE.MeshBasicMaterial( { color: 0x555, side : THREE.BackSide, wireframe:true} );
    //Create a mesh
    var tube = new THREE.Mesh(geometry, material2);
    //Add tube into the scene
    scene.add(tube);

    scene.add(cube);
    scene.add(player.cube)
    //scene.add(path);
    console.log(cube);
    camera.position.z = player.position.z + 10;
    var t = 0;
    var animate = function () {
      requestAnimationFrame(animate);
      var delta = .05;
      t += delta;
      player.update(t);
      var p1 = path.getPointAt(t%1);
      var p2 = path.getPointAt((t + delta)%1)
      var p3 = path.getPointAt((t + delta/5)%1)

      camera.position.set(p1.x,p1.y,p1.z);
      camera.lookAt(p2);
    cube.position.set(p2.x,p2.y,p2.z);
    cube.lookAt(p3);

   
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
      cube.material.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
    //   tube.material.color = new THREE.Color(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return <div></div>;
  }
}
export default Game;
