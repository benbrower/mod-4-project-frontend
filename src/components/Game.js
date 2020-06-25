import * as THREE from "./three";
import React, { Component } from "react";
import Player from "./Player";
import Barrier from "./Barrier";

var play = true;
var button = "Pause";

class Game extends Component {
  constructor(props) {
    console.log("creating game");
    super(props);
    this.state = {
      play: true,
      score: 0,
      gameOver: false,
    };
    let scene,
      camera,
      renderer,
      points,
      path,
      geometry2,
      material2,
      texture,
      textureMaterial,
      tube,
      playerSlice,
      cameraSlice,
      geometry,
      material,
      player,
      barriers,
      barrierGeo;
  }

  newGame() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.renderer = new THREE.WebGLRenderer();
    this.points = [
      //x    z     y
      [400, 0, -100],
      [400, 100, 100],
      [0, 500, 200],
      [300, 500, 100],
    ];
    this.path = new THREE.CatmullRomCurve3(this.points);
    this.geometry2 = new THREE.TubeGeometry(this.path, 100, 10, 15, true);
    this.material2 = new THREE.MeshBasicMaterial({
      color: 0xfff,
      side: THREE.BackSide,
      wireframe: true,
      transparent: false,
    });
    this.texture = new THREE.TextureLoader().load("texture.jpg");
    this.textureMaterial = new THREE.MeshBasicMaterial({ map: this.texture });
    this.tube = new THREE.Mesh(this.geometry2, this.material2);
    this.scene.add(this.tube);
    this.scene.add(this.tube);
    this.playerSlice = new THREE.Object3D();
    this.cameraSlice = new THREE.Object3D();
    this.cameraSlice.add(this.playerSlice);
    this.scene.add(this.cameraSlice);
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.player = new Player(this.geometry, this.material);
    this.barriers = [];
    this.barrierGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    this.setupGame();
  }

  setupGame() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    for (var i = 0; i < this.points.length; i++) {
      var x = this.points[i][0];
      var z = this.points[i][1];
      var y = this.points[i][2];

      this.points[i] = new THREE.Vector3(x, y, z);
    }
    this.getPlayer();
    this.getBarriers();
  }

  getPlayer() {
    this.player.cube.position.set(0, 5, 0);
    this.playerSlice.add(this.player.cube);
    this.playerSlice.rotation.z = Math.PI;
  }

  getBarriers() {
    for (let i = 30; i < 1000; i++) {
      var barrierMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(
          `rgb(${Math.floor(Math.random() * 150 + 100)},
          ${Math.floor(Math.random() * 150)},
           ${Math.floor(Math.random() * 150)})`
        ),
      });

      let barrierSlice = new THREE.Object3D();
      let barrierTangentSlice = new THREE.Object3D();
      let b1 = new Barrier(this.barrierGeo, barrierMat);
      let point = this.path.getPointAt((i / 1000.0) % 1);
      let point2 = this.path.getPointAt((i / 1000.0 + 0.00000001) % 1);
      b1.cube.position.set(0, 5.5, 0);
      barrierTangentSlice.position.set(point.x, point.y, point.z);
      barrierTangentSlice.lookAt(point2.x, point2.y, point2.z);
      barrierSlice.rotation.z = Math.random() * 2 * Math.PI;
      barrierSlice.add(b1.cube);
      barrierTangentSlice.add(barrierSlice);

      this.barriers.push(barrierTangentSlice);

      this.scene.add(barrierTangentSlice);
    }
  }

  endGame(score) {
    this.props.submitScore(score);
  }

  togglePause() {
    this.setState({ play: !this.state.play });
    console.log(this.state.play);
  }

  componentDidMount() {
    console.log("props", this.props);
    console.log("state", this.state);
    this.newGame();

    // var scene = new THREE.Scene();

    // var camera = new THREE.PerspectiveCamera(FOV, aspect ratio, near clipping plane, far clipping pane);
    // var camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   200
    // );

    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window width, window height, res boolean);
    // renderer.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild(renderer.domElement);

    // var points = [
    //   //x    z     y
    //   [400, 0, -100],
    //   [400, 100, 100],
    //   [0, 500, 200],
    //   [300, 500, 100],
    // ];

    //Convert the array of points into vertices
    // for (var i = 0; i < points.length; i++) {
    //   var x = points[i][0];
    //   var z = points[i][1];
    //   var y = points[i][2];

    //   points[i] = new THREE.Vector3(x, y, z);
    // }
    // console.log(points);
    //Create a path from the points
    // var path = new THREE.CatmullRomCurve3(points);
    //CubicBezierCurve3
    //TubeGeometry
    // var geometry2 = new THREE.TubeGeometry(path, 100, 10, 15, true);

    //Basic red material
    // var material2 = new THREE.MeshBasicMaterial({
    //   color: 0xfff,
    //   side: THREE.BackSide,
    //   wireframe: true,
    //   transparent: false,
    // });

    // var texture = new THREE.TextureLoader().load("texture.jpg");
    // console.log(texture);
    // var textureMaterial = new THREE.MeshBasicMaterial({ map: texture });

    //tube
    // var tube = new THREE.Mesh(geometry2, material2);
    // scene.add(tube);

    //slice
    // var playerSlice = new THREE.Object3D();

    //CAMERA SLICE
    // var cameraSlice = new THREE.Object3D();
    // cameraSlice.add(playerSlice);
    // scene.add(cameraSlice);

    //player
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var player = new Player(geometry, material);
    // player.cube.position.set(0, 5, 0);
    // playerSlice.add(player.cube);
    // playerSlice.rotation.z = Math.PI;

    // barriers
    // let barriers = [];
    // var barrierGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    // for (let i = 30; i < 1000; i++) {
    //   var barrierMat = new THREE.MeshBasicMaterial({
    //     color: new THREE.Color(
    //       `rgb(${Math.floor(Math.random() * 150 + 100)},
    //       ${Math.floor(Math.random() * 150)},
    //        ${Math.floor(Math.random() * 150)})`
    //     ),
    //   });

    //   let barrierSlice = new THREE.Object3D();
    //   let barrierTangentSlice = new THREE.Object3D();
    //   let b1 = new Barrier(barrierGeo, barrierMat);
    //   let point = path.getPointAt((i / 1000.0) % 1);
    //   let point2 = path.getPointAt((i / 1000.0 + 0.00000001) % 1);
    //   b1.cube.position.set(0, 5.5, 0);
    //   barrierTangentSlice.position.set(point.x, point.y, point.z);
    //   barrierTangentSlice.lookAt(point2.x, point2.y, point2.z);
    //   barrierSlice.rotation.z = Math.random() * 2 * Math.PI;
    //   barrierSlice.add(b1.cube);
    //   barrierTangentSlice.add(barrierSlice);

    //   barriers.push(barrierTangentSlice);

    //   scene.add(barrierTangentSlice);
    //   // resetGame();
    // }
    this.tube.name = "tube";

    // function resetGame() {
    //   document.body.removeChild(renderer.domElement);
    //   scene = new THREE.Scene();

    //   // var camera = new THREE.PerspectiveCamera(FOV, aspect ratio, near clipping plane, far clipping pane);
    //   camera = new THREE.PerspectiveCamera(
    //     75,
    //     window.innerWidth / window.innerHeight,
    //     0.1,
    //     200
    //   );

    //   renderer = new THREE.WebGLRenderer();
    //   // renderer.setSize( window width, window height, res boolean);
    //   renderer.setSize(window.innerWidth, window.innerHeight);

    //   document.body.appendChild(renderer.domElement);

    //   points = [
    //     //x    z     y
    //     [400, 0, -100],
    //     [400, 100, 100],
    //     [0, 500, 200],
    //     [300, 500, 100],
    //   ];

    //   //Convert the array of points into vertices
    //   for (var i = 0; i < points.length; i++) {
    //     var x = points[i][0];
    //     var z = points[i][1];
    //     var y = points[i][2];

    //     points[i] = new THREE.Vector3(x, y, z);
    //   }
    //   console.log(points);
    //   //Create a path from the points
    //   path = new THREE.CatmullRomCurve3(points);
    //   //CubicBezierCurve3
    //   //TubeGeometry
    //   geometry2 = new THREE.TubeGeometry(path, 100, 10, 15, true);

    //   //Basic red material
    //   material2 = new THREE.MeshBasicMaterial({
    //     color: 0xfff,
    //     side: THREE.BackSide,
    //     wireframe: true,
    //     transparent: false,
    //   });

    //   texture = new THREE.TextureLoader().load("texture.jpg");
    //   console.log(texture);
    //   textureMaterial = new THREE.MeshBasicMaterial({ map: texture });

    //   //tube
    //   tube = new THREE.Mesh(geometry2, material2);
    //   scene.add(tube);

    //   //slice
    //   playerSlice = new THREE.Object3D();

    //   //CAMERA SLICE
    //   cameraSlice = new THREE.Object3D();
    //   cameraSlice.add(playerSlice);
    //   scene.add(cameraSlice);

    //   //player
    //   geometry = new THREE.BoxGeometry(1, 1, 1);
    //   material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //   player = new Player(geometry, material);
    //   player.cube.position.set(0, 5, 0);
    //   playerSlice.add(player.cube);
    //   playerSlice.rotation.z = Math.PI;

    //   // barriers
    //   barriers = [];
    //   barrierGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    //   for (let i = 30; i < 1000; i++) {
    //     var barrierMat = new THREE.MeshBasicMaterial({
    //       color: new THREE.Color(
    //         `rgb(${Math.floor(Math.random() * 150 + 100)},
    //         ${Math.floor(Math.random() * 150)},
    //          ${Math.floor(Math.random() * 150)})`
    //       ),
    //     });

    //     let barrierSlice = new THREE.Object3D();
    //     let barrierTangentSlice = new THREE.Object3D();
    //     let b1 = new Barrier(barrierGeo, barrierMat);
    //     let point = path.getPointAt((i / 1000.0) % 1);
    //     let point2 = path.getPointAt((i / 1000.0 + 0.00000001) % 1);
    //     b1.cube.position.set(0, 5.5, 0);
    //     barrierTangentSlice.position.set(point.x, point.y, point.z);
    //     barrierTangentSlice.lookAt(point2.x, point2.y, point2.z);
    //     barrierSlice.rotation.z = Math.random() * 2 * Math.PI;
    //     barrierSlice.add(b1.cube);
    //     barrierTangentSlice.add(barrierSlice);

    //     barriers.push(barrierTangentSlice);

    //     scene.add(barrierTangentSlice);
    //   }
    //   t = 0.01;
    //   i = 0;
    //   animate();
    // }

    function checkCollision() {
      //  console.log(ppos);
      for (let i = 0; i < 970; i++) {
        //console.log(barriers[i].position.distanceTo( ppos));

        if (
          this.barriers[i].position.distanceTo(this.cameraSlice.position) < 0.5
        ) {
          //console.log((barriers[i].children[0].rotation.z % (2 * Math.PI)) -(playerSlice.rotation.z % (2 * Math.PI)) );
          //console.log(barriers[i].getWorldPosition(barriers[i].children[0].children[0].position).distanceTo(cameraSlice.getWorldPosition(playerSlice.children[0].position )));
          //console.log( barriers[i].children[0].rotation.z );
          if (
            (this.barriers[i].children[0].rotation.z % (2 * Math.PI)) -
              ((this.playerSlice.rotation.z % (2 * Math.PI)) % (2 * Math.PI)) >
              -0.28 &&
            (this.barriers[i].children[0].rotation.z % (2 * Math.PI)) -
              ((this.playerSlice.rotation.z % (2 * Math.PI)) % (2 * Math.PI)) <
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

    var t = 0.01;
    var i = 0;
    var animate = () => {
      // if (key === "p") {
      //   this.setState({ play: !this.state.play });
      //   console.log(this.state.play);
      // }
      if (play) {
        var delta = 0.00015 + i / 1000.0;
        t += delta;
        this.setState({
          score: Math.floor(t * 1000),
        });

        //console.log(playerSlice.getWorldPosition(player.cube.position))
        var camPos = this.path.getPointAt(t % 1);
        var camTarg = this.path.getPointAt((t + 0.00000001) % 1);
        var playerPos = this.path.getPointAt((t + 0.01) % 1);
        var playerTarg = this.path.getPointAt((t + 0.01000000001) % 1);

        this.camera.position.set(camPos.x, camPos.y, camPos.z);
        this.camera.lookAt(camTarg.x, camTarg.y, camTarg.z);

        this.cameraSlice.position.set(
          this.playerPos.x,
          this.playerPos.y,
          this.playerPos.z
        );

        this.cameraSlice.lookAt(
          this.playerTarg.x,
          this.playerTarg.y,
          this.playerTarg.z
        );

        if (key === "a") {
          this.playerSlice.rotation.z += 0.015;
        }
        if (key === "d") {
          this.playerSlice.rotation.z += 2 * Math.PI - 0.015;
        }
      }

      this.renderer.render(this.scene, this.camera);
      if (!checkCollision()) {
        //this.props.submitScore(t);
        requestAnimationFrame(animate);
      } else {
        this.props.submitScore(this.state.score);
        this.setState({
          gameOver: true,
        });
        console.log(this.state.gameOver);
        console.log(this.state.score);
        t = 0;
        i = 0;
        this.newGame();
      }
    };
    if (this.state.play) {
      animate();
    }
    // this.props.submitScore(t);
    console.log("post");
    function togglePause() {
      this.setState({ play: !this.state.play });
      console.log(this.state.play);
    }
  }
  togglePause() {
    // this.setState({ play: !this.state.play });
    play = !play;
    play ? (button = "Pause") : (button = "Continue");
    // console.log(this.state.play);
    console.log(play);
  }

  render() {
    return (
      <div>
        Score: {this.state.score}
        <button onClick={this.togglePause}>{button}</button>
      </div>
    );
  }
}
export default Game;
