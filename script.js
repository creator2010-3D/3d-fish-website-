// === PREMIUM UI LOGIC ===

// Menu Logic
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

menuBtn.addEventListener('click', () => menuOverlay.classList.add('active'));
closeBtn.addEventListener('click', () => menuOverlay.classList.remove('active'));
menuLinks.forEach(link => link.addEventListener('click', () => menuOverlay.classList.remove('active')));

// Modal Reader Logic
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
        document.body.style.overflow = 'hidden'; // Prevents background scroll
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

// Utility Tool Logic
const generateBtn = document.getElementById('generate-btn');
const passwordDisplay = document.getElementById('password-display');
generateBtn.addEventListener('click', () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let key = "";
    for (let i = 0; i < 24; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
    passwordDisplay.value = key;
});

// === ELEGANT 3D ENGINE ===
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 12;

// Renderer setup for sharp visuals
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
renderer.setSize(window.innerWidth, window.innerHeight);

// Premium Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x38bdf8, 2); // Blue accent light
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1); // White highlight
pointLight.position.set(-5, -5, 5);
scene.add(pointLight);

// Creating an Elegant 3D Object (Torus Knot)
const geometry = new THREE.TorusKnotGeometry(3, 0.8, 128, 32);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x1e293b,       // Dark slate base
    roughness: 0.2,        // Glossy
    metalness: 0.8,        // Metallic shine
    emissive: 0x0f172a,    // Slight glow
    emissiveIntensity: 0.5 
});
const premiumShape = new THREE.Mesh(geometry, material);
scene.add(premiumShape);

// Soft Background Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 400;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ 
    size: 0.05, color: 0x38bdf8, transparent: true, opacity: 0.4 
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Interactivity Variables
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});
document.addEventListener('touchmove', (e) => {
    mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
});

let scrollY = window.scrollY;
window.addEventListener('scroll', () => scrollY = window.scrollY);

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Elegant smooth rotation
    premiumShape.rotation.y = elapsedTime * 0.15;
    premiumShape.rotation.x = elapsedTime * 0.1;

    // Gentle mouse follow
    premiumShape.position.x += (mouseX * 1.5 - premiumShape.position.x) * 0.05;
    premiumShape.position.y += (mouseY * 1.5 - premiumShape.position.y) * 0.05;

    // Particles slow drift
    particles.rotation.y = elapsedTime * 0.02;

    // Subtle camera movement on scroll
    camera.position.y = -scrollY * 0.002;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
