// === UI LOGIC (Menu & Tools) ===
// 1. Mobile Hamburger Menu
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. Password Generator Tool
const generateBtn = document.getElementById('generate-btn');
const passwordDisplay = document.getElementById('password-display');

generateBtn.addEventListener('click', () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordDisplay.value = password;
});

// === LEGENDARY 3D FISH ENGINE ===
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000a1a, 0.04);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
renderer.setSize(window.innerWidth, window.innerHeight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0x00d4ff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const fish = new THREE.Group();
const fishMaterial = new THREE.MeshStandardMaterial({ color: 0xff6600, roughness: 0.1, metalness: 0.8 });

const bodyGeo = new THREE.ConeGeometry(0.8, 3, 32);
bodyGeo.rotateX(Math.PI / 2);
const body = new THREE.Mesh(bodyGeo, fishMaterial);
fish.add(body);

const tailGeo = new THREE.ConeGeometry(0.5, 1.5, 16);
tailGeo.rotateX(-Math.PI / 2);
tailGeo.translate(0, 0, -1);
const tail = new THREE.Mesh(tailGeo, fishMaterial);
tail.position.z = -1.2;
fish.add(tail);

scene.add(fish);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 40; }
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0x00d4ff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});
document.addEventListener('touchmove', (event) => {
    mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
});

let scrollY = window.scrollY;
window.addEventListener('scroll', () => { scrollY = window.scrollY; });

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 6; targetY = mouseY * 3;
    fish.position.x += (targetX - fish.position.x) * 0.05;
    fish.position.y += (targetY - fish.position.y) * 0.05;

    tail.rotation.y = Math.sin(elapsedTime * 8) * 0.4; 
    fish.rotation.y = Math.sin(elapsedTime * 3) * 0.1; 
    fish.rotation.x = -mouseY * 0.3; 
    fish.rotation.z = -mouseX * 0.2; 

    particlesMesh.position.y = (elapsedTime * 0.8) % 20;
    camera.position.y = -scrollY * 0.005;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
