import * as THREE from "./three";
import React, { Component } from "react";
import Player from "./Player";
import Barrier from "./Barrier";

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

    var points = [
      //x    z     y
      [0, 0, 0],
      [500, 500, 100],
      [0, 1000, -100],
      [-500, 500, 0],
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

    //TubeGeometry
    var geometry2 = new THREE.TubeGeometry(path, 100, 10, 10, true);

    //Basic red material
    var material2 = new THREE.MeshBasicMaterial({
      color: 0x555,
      side: THREE.BackSide,
      wireframe: true,
    });

    //tube
    var tube = new THREE.Mesh(geometry2, material2);
    scene.add(tube);

    //slice
    var playerSlice = new THREE.Object3D();

    //CAMERA SLICE
    var cameraSlice = new THREE.Object3D();
    cameraSlice.add(playerSlice);
    scene.add(cameraSlice);

    //player
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const player = new Player(geometry, material);
    player.cube.position.set(0, -5, 0);
    playerSlice.add(player.cube);

    // barriers
    const barriers = [];
    var barrierGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    for (let i = 0; i < 100; i++) {
      var barrierMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(
          `rgb(${Math.floor(Math.random() * 256)}, 
          ${Math.floor(Math.random() * 256)},
           ${Math.floor(Math.random() * 256)})`
        ),
      });

      let barrierSlice = new THREE.Object3D();
      let barrierTangentSlice = new THREE.Object3D();
      let b1 = new Barrier(barrierGeo, barrierMat);
      let point = path.getPointAt((i / 100.0) % 1);
      let point2 = path.getPointAt((i / 100.0 + 0.00000001) % 1);
      //console.log((i / 100.0) % 1);
      b1.cube.position.set(0, 5.5, 0);
      barrierTangentSlice.position.set(point.x, point.y, point.z);
      barrierTangentSlice.lookAt(point2.x, point2.y, point2.z);
      barrierTangentSlice.add(barrierSlice);
      //barrierSlice.rotation.z = Math.random() * 2 * Math.PI;
      barrierSlice.add(b1.cube);
      barriers.push(barrierTangentSlice);

      scene.add(barrierTangentSlice);
    }
    // console.log('first cube')
    console.log(getWorld(barriers[5]));
    // console.log(barriers);
    tube.name = "tube";
    // console.log(tube);

    const checkCollision = () =>{
      var originPoint = player.cube.position.clone();
      // console.log(barriers)
    	for (var vertexIndex = 0; vertexIndex < player.cube.geometry.vertices.length; vertexIndex++)
    	{

    		var ray = new THREE.Raycaster( playerSlice.getWorldPosition(player.cube.position), playerSlice.getWorldPosition(player.cube.geometry.vertices[vertexIndex]));
        var collisionResults = ray.intersectObjects( barriers.map(b => getWorld(b)) );
          
         
    		if ( collisionResults.length > 0)
    		{
          console.log("hit");
          // hit = true;
         }
      }
    }
    function getWorld(b) { 
      console.log(b);
      //return b.getWorldposition(b.barrierSlice.b1.cube.position);
    }

    //movement
    let key = "";
    document.addEventListener("keydown", (event) => {
      key = event.key;
    });

    document.addEventListener("keyup", (event) => {
      key = "";
    });

    var t = 0;

    var animate = function () {
      requestAnimationFrame(animate);
      // checkCollision();
      var delta = 0.0001;
      t += delta;

      //console.log(playerSlice.getWorldPosition(player.cube.position))
      var camPos = path.getPointAt(t % 1);
      var camTarg = path.getPointAt((t + delta) % 1);
      var playerPos = path.getPointAt((t + 0.005) % 1);
      var playerTarg = path.getPointAt((t + 0.0051) % 1);

      camera.position.set(camPos.x, camPos.y, camPos.z);
      camera.lookAt(camTarg.x, camTarg.y, camTarg.z);

      cameraSlice.position.set(playerPos.x, playerPos.y, playerPos.z);

      cameraSlice.lookAt(playerTarg.x, playerTarg.y, playerTarg.z);

      if (key === "a") {
        console.log(key);
        playerSlice.rotation.z += 0.1;
      }
      if (key === "d") {
        // console.log(key);
        playerSlice.rotation.z -= 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return <div></div>;
  }
}
export default Game;
