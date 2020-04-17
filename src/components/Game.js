import * as THREE from "./three";
import React, { Component } from "react";
import Player from "./Player";
import Barrier from "./Barrier";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: 0,
      gameOver: false,
    };
  }

  endGame(score) {
    this.props.submitScore(score);
  }

  componentDidMount() {
    console.log("props", this.props);
    console.log("state", this.state);
    var scene = new THREE.Scene();

    // var camera = new THREE.PerspectiveCamera(FOV, aspect ratio, near clipping plane, far clipping pane);
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );

    var renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window width, window height, res boolean);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var points = [
      //x    z     y
      [400, 0, -100],
      [400, 100, 100],
      [0, 500, 200],
      [300, 500, 100],
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
    //CubicBezierCurve3
    //TubeGeometry
    var geometry2 = new THREE.TubeGeometry(path, 100, 10, 15, true);

    //Basic red material
    var material2 = new THREE.MeshBasicMaterial({
      color: 0xfff,
      side: THREE.BackSide,
      wireframe: true,
      transparent: false
    });

    var texture = new THREE.TextureLoader().load( 'texture.jpg' );
    console.log(texture);
    var textureMaterial = new THREE.MeshBasicMaterial( { map: texture } );


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
    player.cube.position.set(0, 5, 0);
    playerSlice.add(player.cube);
    playerSlice.rotation.z = Math.PI;

    // barriers
    let barriers = [];
    var barrierGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    for (let i = 30; i < 1000; i++) {
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
      let point = path.getPointAt((i / 1000.0) % 1);
      let point2 = path.getPointAt((i / 1000.0 + 0.00000001) % 1);
      b1.cube.position.set(0, 5.5, 0);
      barrierTangentSlice.position.set(point.x, point.y, point.z);
      barrierTangentSlice.lookAt(point2.x, point2.y, point2.z);
      barrierSlice.rotation.z = Math.random() * 2 * Math.PI;
      barrierSlice.add(b1.cube);
      barrierTangentSlice.add(barrierSlice);

      barriers.push(barrierTangentSlice);

      scene.add(barrierTangentSlice);
    }
    tube.name = "tube";

    function checkCollision() {
      //  console.log(ppos);
      for (let i = 0; i < 970; i++) {
        //console.log(barriers[i].position.distanceTo( ppos));

        if (barriers[i].position.distanceTo(cameraSlice.position) < 0.5) {
          //console.log((barriers[i].children[0].rotation.z % (2 * Math.PI)) -(playerSlice.rotation.z % (2 * Math.PI)) );
          //console.log(barriers[i].getWorldPosition(barriers[i].children[0].children[0].position).distanceTo(cameraSlice.getWorldPosition(playerSlice.children[0].position )));
          //console.log( barriers[i].children[0].rotation.z );
          if (
            (barriers[i].children[0].rotation.z % (2 * Math.PI)) -
              ((playerSlice.rotation.z % (2 * Math.PI)) % (2 * Math.PI)) >
              -0.28 &&
            (barriers[i].children[0].rotation.z % (2 * Math.PI)) -
              ((playerSlice.rotation.z % (2 * Math.PI)) % (2 * Math.PI)) <
              0.28
          ) {
            //console.log("yeet hit" );
            return true;
          }
        }
      }
    }

    //movement
    let key = "";
    document.addEventListener("keydown", (event) => {
      key = event.key;
    });

    document.addEventListener("keyup", (event) => {
      key = "";
    });
    var t = .01;

    var animate = () => {
      var delta = 0.0001;
      t += delta;

      //console.log(playerSlice.getWorldPosition(player.cube.position))
      var camPos = path.getPointAt(t % 1);
      var camTarg = path.getPointAt((t + 0.00000001) % 1);
      var playerPos = path.getPointAt((t + 0.01) % 1);
      var playerTarg = path.getPointAt((t + 0.01000000001) % 1);

      camera.position.set(camPos.x, camPos.y, camPos.z);
      camera.lookAt(camTarg.x, camTarg.y, camTarg.z);

      cameraSlice.position.set(playerPos.x, playerPos.y, playerPos.z);

      cameraSlice.lookAt(playerTarg.x, playerTarg.y, playerTarg.z);

      if (key === "a") {
        playerSlice.rotation.z += 0.015;
      }
      if (key === "d") {
        playerSlice.rotation.z += 2 * Math.PI - 0.015;
      }

      renderer.render(scene, camera);
      if (!checkCollision()) {
        //this.props.submitScore(t);
        requestAnimationFrame(animate);
      } else {
        this.props.submitScore(t);
        // endGame(t);
        console.log("submitted");
      }
    };
    animate();
    // this.props.submitScore(t);
    console.log("post");
  }
  render() {
    return <div></div>;
  }
}
export default Game;
