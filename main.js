import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {Water} from "three/addons/objects/Water.js";

/* CREATE SCENE */
const scene = new THREE.Scene();

/* CREATE CAMERA */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.position.z = 50;
camera.position.set(0, 100, 100);
const listener = new THREE.AudioListener();
camera.add( listener );

/* CREATE RENDER */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

// Add to app
const app = document.getElementById('app');
app.appendChild(renderer.domElement);

/* ORBIT CONTROLS */
const orbitControl = new OrbitControls(camera, renderer.domElement);

/* RAYCASTER */
const raycaster = new THREE.Raycaster();

// Events
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
const light = new THREE.AmbientLight(0xE5E5E4, 0.9); // soft white light
light.position.y = 100;
scene.add(light);

/* DEFINE PLANE WATER */
const waterGeometry = new THREE.PlaneGeometry(
  1000,
  1000,
  10,
  10
);

// Water
let water = new Water(waterGeometry,
  {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load('waternormals.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
    side: THREE.DoubleSide
  }
);
water.rotation.x = -Math.PI / 2;
scene.add(water);


// const waterMaterial = new THREE.MeshPhongMaterial({
//   color: 0x00ffff,
//   flatShading: true,
//   side: THREE.DoubleSide,
//   vertexColors: true
// });
// const planeMesh = new Mesh(waterGeometry, waterMaterial);
// planeMesh.rotateX(Math.PI/2);
// scene.add(planeMesh);
// console.log(planeMesh);

/* DEFINE OVNI CAPSULE */
const capsuleGeometry = new THREE.CapsuleGeometry(5, 0, 32, 48);
const capsuleMaterial = new THREE.MeshBasicMaterial(
  {
  map: new THREE.TextureLoader().load('ovni_textures/metal.jpg'),
}
);
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.y = 10;
scene.add(capsuleMesh);

/* DEFINE OVNI BODY */
const bodyGeometry = new THREE.CircleGeometry(12, 48);
const bodyMaterial = new THREE.MeshBasicMaterial(
  {
    map: new THREE.TextureLoader().load('ovni_textures/body_surface.jpg'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.50
  }
);
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
bodyMesh.position.y = 10;
bodyMesh.rotateX(Math.PI / 2);
scene.add(bodyMesh);

/* DEFINE OVNI LIGHT */
const lightGeometry = new THREE.ConeGeometry(2, 10, 60, 1, true, 0);
const lightMaterial = new THREE.MeshBasicMaterial(
  {
    color: 0x1ac0d6,
    transparent: true,
    opacity: 0.30
  }
);
const lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
lightMesh.position.y = 5;
scene.add(lightMesh);

let opacity_upper_limit = false;

function animateOvni() {
  let time = 0;
  time = performance.now() * 0.001;
  capsuleMesh.rotation.y = time * 0.5;
  bodyMesh.rotation.z = time;
  
  if(lightMesh.material.opacity >= 0.30 && !opacity_upper_limit){
    lightMesh.material.opacity += 0.005;
  }

  if(lightMesh.material.opacity >= 0.90 && !opacity_upper_limit){
    opacity_upper_limit = true;
    lightMesh.material.opacity -= 0.01;
  }

  if(lightMesh.material.opacity <= 0.90 && opacity_upper_limit)
    lightMesh.material.opacity -=0.01;

  if(lightMesh.material.opacity <= 0.30 && opacity_upper_limit){
    opacity_upper_limit = false;
    lightMesh.material.opacity += 0.01;
  }  
}

/* Add directional Light */
const directionalLight = new THREE.SpotLight(0xffffff, 100, 100, 180);
directionalLight.position.set(0, 48, 0);
directionalLight.rotateY(180);
scene.add(directionalLight);

/* DEFINE STARS */
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({color: 0xFFFFFF});
const starsVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starsVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculatePosition() {
  return Math.random() * (500 - (-500)) + (-500);
}

/* OBJECTS */
let cubes = []

for (let index = 0; index < 20; index++) {
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
  const cubeMaterial = new THREE.MeshStandardMaterial({roughness: 0});
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.set(calculatePosition(), 15, calculatePosition());
  cubes.push(cubeMesh);
  scene.add(cubeMesh);
}

function animateCubes() {
  let time = 0;
  cubes.map((cube, index) => {
    time = performance.now() * 0.001 + index;
    cube.position.y = cube.position.y + (Math.sin(time) * 0.05);
    cube.rotation.x = time * 0.5;
    cube.rotation.z = time * 0.51;
  });
}

/* PLANET TEXTURES */
let textures = []
textures.push(new THREE.TextureLoader().load('textures/2k_ceres_fictional.jpg'));
textures.push(new THREE.TextureLoader().load('textures/2k_eris_fictional.jpg'));
textures.push(new THREE.TextureLoader().load('textures/2k_haumea_fictional.jpg'));
textures.push(new THREE.TextureLoader().load('textures/2k_makemake_fictional.jpg'));
textures.push(new THREE.TextureLoader().load('textures/2k_mercury.jpg'));
textures.push(new THREE.TextureLoader().load('textures/2k_moon.jpg'));

/* PLANETS */
let planets = []

for (const texture of textures) {
  const radius = randomIntRange(6, 24);
  const planetGeometry = new THREE.SphereGeometry(radius, 32, 16);
  const planetMaterial = new THREE.MeshBasicMaterial({map: texture});
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  const yPos = randomIntRange(80, 160);
  planetMesh.position.set(calculatePosition(), yPos, calculatePosition());
  planets.push(planetMesh);
  scene.add(planetMesh);
}

function animatePlanets() {
  let time = 0;
  planets.map((planet, index) => {
    time = performance.now() * 0.001 + index;
    planet.rotation.y = time * 0.5;
    planet.rotation.z = time * 0.13;
  });
}

/* ANIMATE FUNCTION */
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera); // render view
  raycaster.setFromCamera(mouse, camera);

  animateCubes();
  animatePlanets();
  animateOvni();
  water.material.uniforms['time'].value += 1.0 / 60.0;

  stars.rotation.x += 0.001; // rotate stars
}

animate();

/* EVENTS */
document.addEventListener('mousemove', (event) => {
  // Normalize x and y coordinates
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});

function removeEntity(object){
  var selectedObject = scene.getObjectById(object.id);
  scene.remove( selectedObject );
}

function detectCollisionCubes(object1, object2){
  object1.geometry.computeBoundingBox();
  object2.geometry.computeBoundingBox();
  object1.updateMatrixWorld();
  object2.updateMatrixWorld();
  
  var box1 = object1.geometry.boundingBox.clone();
  box1.applyMatrix4(object1.matrixWorld);

  var box2 = object2.geometry.boundingBox.clone();
  box2.applyMatrix4(object2.matrixWorld);

  return box1.intersectsBox(box2);
}

const destroyed_cubes = [];

for(let i = 0; i < cubes.length; i++){
  destroyed_cubes.push(false);
}

function findCollision(){
  for(let i = 0; i < cubes.length; i++){
    if((detectCollisionCubes(capsuleMesh, cubes[i]) || detectCollisionCubes(bodyMesh, cubes[i])) && (!destroyed_cubes[i])){
      const sound_box = new THREE.PositionalAudio( listener );

      const audioLoader_box = new THREE.AudioLoader();

      audioLoader_box.load( 'sounds/box_collision.mp3', function( buffer ) {
        sound_box.setBuffer( buffer );
        sound_box.setRefDistance(10);
        sound_box.setVolume( 1 );
        sound_box.setLoop(false);
        sound_box.play();
      });
      cubes[i].add(sound_box)
      cubes[i].remove(sound_box);
      cubes[i].clear();
      removeEntity(cubes[i]);
      destroyed_cubes[i] = true;
    }
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const speed = 2.0;
  const step = speed * 10
  if (key === 'w') {
    capsuleMesh.position.z -= step;
    bodyMesh.position.z -= step;
    lightMesh.position.z -= step;
    findCollision();
  }
  if (key === 's') {
    capsuleMesh.position.z += step;
    bodyMesh.position.z += step;
    lightMesh.position.z += step;
    findCollision();
  }
  if (key === 'a') {
    capsuleMesh.position.x -= step;
    bodyMesh.position.x -= step;
    lightMesh.position.x -= step;
    findCollision();
  }
  if (key === 'd') {
    capsuleMesh.position.x += step;
    bodyMesh.position.x += step;
    lightMesh.position.x += step;
    findCollision();
  }
});

/* AUDIO */

/*Ambient sound*/
const sound = new THREE.Audio( listener );

const audioLoader = new THREE.AudioLoader();

audioLoader.load( 'sounds/ambient.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

/*UFO Flying Sound*/
const sound_UFO = new THREE.PositionalAudio( listener );

const audioLoader_UFO = new THREE.AudioLoader();
audioLoader_UFO.load( 'sounds/ufo.mp3', function( buffer ) {
	sound_UFO.setBuffer( buffer );
	sound_UFO.setRefDistance( 7 );
  sound_UFO.setVolume(0.5);
  sound_UFO.setLoop(true);
	sound_UFO.play();
});

capsuleMesh.add(sound_UFO);