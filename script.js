// === ROOT UI LOGIC ===

// Navbar Mobile Toggle
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

menuBtn.addEventListener('click', () => menuOverlay.classList.add('active'));
closeBtn.addEventListener('click', () => menuOverlay.classList.remove('active'));
menuLinks.forEach(link => link.addEventListener('click', () => menuOverlay.classList.remove('active')));

// Modal / Read More Logic
const readMoreBtns = document.querySelectorAll('.read-more-btn');
const articleModal = document.getElementById('article-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalBody = document.getElementById('modal-body');

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.article-card');
        modalTitle.innerText = card.querySelector('.card-title').innerText;
        modalImg.src = card.querySelector('.blog-img').src;
        modalBody.innerHTML = card.querySelector('.full-content').innerHTML;
        articleModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
});

closeModal.addEventListener('click', () => {
    articleModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});
articleModal.addEventListener('click', (e) => {
    if(e.target === articleModal) {
        articleModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// RSA Keygen Fake Tool
const generateBtn = document.getElementById('generate-btn');
const passwordDisplay = document.getElementById('password-display');
generateBtn.addEventListener('click', () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]{}|;:',.<>?";
    let key = "";
    for (let i = 0; i < 32; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
    passwordDisplay.value = key;
});

// === GOD LEVEL 3D CYBER-GLOBE ENGINE ===
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020610, 0.04);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
renderer.setSize(window.innerWidth, window.innerHeight);

// Create Hacker Data Sphere
const sphereGroup = new THREE.Group();
scene.add(sphereGroup);

// Sphere Points
const sphereGeometry = new THREE.SphereGeometry(6, 64, 64);
const sphereMaterial = new THREE.PointsMaterial({
    color: 0x00ffcc, size: 0.05, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
});
const spherePoints = new THREE.Points(sphereGeometry, sphereMaterial);
sphereGroup.add(spherePoints);

// Sphere Wireframe Core
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xff0055, wireframe: true, transparent: true, opacity: 0.1
});
const sphereWire = new THREE.Mesh(sphereGeometry, wireMat);
sphereGroup.add(sphereWire);

// Moving Digital Floor Grid
const gridHelper = new THREE.GridHelper(100, 100, 0x00ffcc, 0x004433);
gridHelper.position.y = -6;
scene.add(gridHelper);

// Floating Data Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 40;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const pMat = new THREE.PointsMaterial({ size: 0.04, color: 0xff0055, transparent: true, opacity: 0.6 });
const particles = new THREE.Points(particlesGeometry, pMat);
scene.add(particles);

// Interactivity
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

let scrollY = window.scrollY;
window.addEventListener('scroll', () => scrollY = window.scrollY);

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate the Cyber-Globe
    sphereGroup.rotation.y = elapsedTime * 0.2;
    sphereGroup.rotation.x = elapsedTime * 0.1;

    // Mouse Interaction
    sphereGroup.position.x += (mouseX * 2 - sphereGroup.position.x) * 0.05;
    sphereGroup.position.y += (mouseY * 2 - sphereGroup.position.y) * 0.05;
    
    // Animate grid floor to look like moving forward
    gridHelper.position.z = (elapsedTime * 2) % 1;

    // Camera movement on scroll
    camera.position.y = 2 - scrollY * 0.005;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
