import * as THREE from 'three';
import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water';

/* CREATE SCENE */
const scene = new THREE.Scene();

/* CREATE CAMERA */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);
// camera.position.z = 50;
camera.position.set(40,40,100);

/* CREATE RENDER */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

/* ORBIR CONTROLS */
new OrbitControls( camera, renderer.domElement );

/* RAYCASTER */
const raycaster = new THREE.Raycaster();
//Events
const mouse = {
  x: undefined,
  y: undefined
}

/* ADD LIGHT */
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
// directionalLight.position.set(0,100,0);
// scene.add( directionalLight );
// const directionalLightBack = new THREE.DirectionalLight( 0xffffff, 1 );
// directionalLightBack.position.set(0,1000,0);
// scene.add( directionalLightBack );
const light = new THREE.AmbientLight( 0xE5E5E4, 0.9 ); // soft white light
light.position.y = 100
scene.add( light );

/* DEFINE PLANE WATER*/
const waterGeometry = new THREE.PlaneGeometry(
  1000,
  1000, 
  10, 
  10
);

// Water

let water = new Water(
  waterGeometry,
  {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load( 'waternormals.jpg', function ( texture ) {

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    } ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
    side: THREE.DoubleSide
  }
);

water.rotation.x = - Math.PI / 2;

scene.add( water )


// const waterMaterial = new THREE.MeshPhongMaterial({
//   color: 0x00ffff,
//   flatShading: true,
//   side: THREE.DoubleSide,
//   vertexColors: true
// });
// const planeMesh = new Mesh(waterGeometry, waterMaterial);
// planeMesh.rotateX(Math.PI/2)
// scene.add(planeMesh);
// console.log(planeMesh)

/* DEFINE OVNI CAPSULE */
const capsuleGeometry = new THREE.CapsuleGeometry( 2, 0, 32, 48 );
const capsuleMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const capsuleMesh = new THREE.Mesh( capsuleGeometry, capsuleMaterial );
capsuleMesh.position.y = 10;
scene.add( capsuleMesh );

/* DEFINE OVNI BODY */
const bodyGeometry = new THREE.CircleGeometry( 6, 48 );
const bodyMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const bodyMesh = new THREE.Mesh( bodyGeometry, bodyMaterial );
bodyMesh.position.y = 10;
bodyMesh.rotateX(Math.PI/2);
scene.add( bodyMesh );

const directionalLight = new THREE.SpotLight( 0xffffff, 100, 100, 180 );
directionalLight.position.set(0,48,0);
directionalLight.rotateY(180)
scene.add( directionalLight );


/* DEFINE STARS */
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xFFFFFF
});
const starsVertices = [];
for(let i=0;i<10000; i++){
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starsVertices.push(x,y,z)
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices,3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars)

/* OBJECTS */
let cubes = []

function calculatePosition(){
  return Math.random() * (500 - (-500)) + (-500)
}

for (let index = 0; index < 20; index++) {
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
  const cubeMaterial = new THREE.MeshStandardMaterial({roughness: 0})
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cubeMesh.position.set(calculatePosition(), 15, calculatePosition())
  cubes.push(cubeMesh)
  scene.add(cubeMesh)
}

function animateCubes(){
  let time = 0;
  cubes.map((cube, index) => {
    time = performance.now() * 0.001 + index
    cube.position.y = cube.position.y + (Math.sin( time ) * 0.05);
    cube.rotation.x = time * 0.5;
    cube.rotation.z = time * 0.51;
  })
}



/* ANIMATE FUNCTION */
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera); //render view
  raycaster.setFromCamera(mouse, camera);


  animateCubes()
  water.material.uniforms['time'].value += 1.0 / 60.0;

  stars.rotation.x += 0.001//rotate stars
}

animate();

/* EVENTS */
addEventListener('mousemove', (event) => {
  //Normalize x and y coordinates
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})