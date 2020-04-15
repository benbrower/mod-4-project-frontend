import * as THREE from "./three";
import React, { Component } from "react";
import Player from "./Player";

class Test extends Component {
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
      [500,500,100],
      [0, 1000, -100],
      [-500,500,0]
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
    //Create a mesh
    var tube = new THREE.Mesh(geometry2, material2);
    //Add tube into the scene
    var  slice = new THREE.Object3D();
    cube.position.set(0,4,0)
    slice.add(cube);
    

    scene.add(tube);
    // scene.add(player.cube)
    scene.add(slice);
    // console.log(cube);
    //camera.position.z = 50;
    //camera.position.y = 100;
    //camera.position.x= 50;
    //camera.lookAt(player.cube.position);
    
    camera.position.z = cube.position.z + 10;
    var t = 0;

    var animate = function () {
      requestAnimationFrame(animate);
      var delta = 0.0001;
      t += delta;
      // player.update(t);
      var camPos = path.getPointAt(t % 1);
      var camTarg = path.getPointAt((t + delta) % 1);
      var playerPos = path.getPointAt((t + .005) % 1);
      var playerTarg = path.getPointAt((t + .007) % 1);
      //camera.lookAt(cube.position);

      camera.position.set(camPos.x, camPos.y, camPos.z);
      camera.lookAt(camTarg.x, camTarg.y, camTarg.z);
      
      slice.position.set(playerPos.x,playerPos.y,playerPos.z);
      
      slice.lookAt(playerTarg.x,playerTarg.y,playerTarg.z);
      slice.rotation.z += (t*1000)
      
      
      
      
      
      ;
      // console.log('tube ', tube)
      // console.log('cube', cube)
      // console.log('slice', slice)

      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return <div></div>;
  }
}
export default Test;





















// import React, { Component } from "react";
// import * as THREE from "./three";


// class Test extends Component {
//   componentDidMount() {
//     //PATH POINTS
//     var points = [
//       //x    z     y
//       [0, 0, 0],
//       [0, 100, 0],
//     ];

//     //PATH VECTORS
//     for (var i = 0; i < points.length; i++) {
//       var x = points[i][0];
//       var z = points[i][1];
//       var y = points[i][2];

//       points[i] = new THREE.Vector3(x, y, z);
//     }

//     //PATH OBJ
//     var path = new THREE.CatmullRomCurve3(points);

//     var tubeGeometry = new THREE.TubeGeometry(path, 100, 10, 10, true);

//     //Basic red material
//     var redMaterial = new THREE.MeshBasicMaterial({
//       color: 0x555,
//       side: THREE.BackSide,
//       wireframe: false,
//     });
//     //Create a mesh
//     var tube = new THREE.Mesh(tubeGeometry, redMaterial);

//     //INIT STATE
//         //Scene
//         var scene = new THREE.Scene();
//         scene.add(tube);
//         console.log(scene);
//         //Camera
//         var camera = new THREE.PerspectiveCamera(
//           75,
//           window.innerWidth / window.innerHeight,
//           0.1,
//           1000
//         );
//         //Render
//         var renderer = new THREE.WebGLRenderer();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.render(scene, camera);
//         document.body.appendChild(renderer.domElement);

//     //Animate
//    var  t=0;
//     var animate = function () {
//       var camPos = path.getPointAt(t % 1);
//       camera.position.set(camPos.x, camPos.y, camPos.z);


//     }
//     animate();
//   }
//   render() {
//     return <div></div>;
//   }
// }
// export default Test;
