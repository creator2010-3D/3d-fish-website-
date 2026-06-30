// === GOD LEVEL UI LOGIC ===

// 1. Navbar 3-Line Menu Fix
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

menuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
});
closeBtn.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
});
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
    });
});

// 2. Dynamic Article Modal (Pop-up system)
const readMoreBtns = document.querySelectorAll('.read-more-btn');
const articleModal = document.getElementById('article-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalBody = document.getElementById('modal-body');

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.article-card');
        const title = card.querySelector('.card-title').innerText;
        const imgSrc = card.querySelector('.blog-img').src;
        const fullContentHTML = card.querySelector('.full-content').innerHTML;

        modalTitle.innerText = title;
        modalImg.src = imgSrc;
        modalBody.innerHTML = fullContentHTML;
        
        articleModal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    articleModal.classList.remove('active');
});
// Close modal if clicked outside the box
articleModal.addEventListener('click', (e) => {
    if(e.target === articleModal) {
        articleModal.classList.remove('active');
    }
});

// 3. Password Generator Tool
const generateBtn = document.getElementById('generate-btn');
const passwordDisplay = document.getElementById('password-display');

generateBtn.addEventListener('click', () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~}{|:?";
    let password = "";
    for (let i = 0; i < 24; i++) { // Monster level 24-char password
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordDisplay.value = password;
});

// === EXTREME 3D ENGINE ===
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000205, 0.03); // Deeper fog

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xff3300, 3); // Red/Orange glow
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);
const spotLight = new THREE.PointLight(0x00d4ff, 5, 50); // Cyan spotlight
spotLight.position.set(-5, 0, 5);
scene.add(spotLight);

// The Core Object (A hyper-modern geometric shape instead of a basic fish to look 'God Level')
const coreGroup = new THREE.Group();

// Central Core
const geometry = new THREE.IcosahedronGeometry(1.5, 1);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.8
});
const core = new THREE.Mesh(geometry, material);
coreGroup.add(core);

// Outer Rings
const ringGeo = new THREE.TorusGeometry(2.5, 0.05, 16, 100);
const ringMat = new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff3300, emissiveIntensity: 0.5 });
const ring1 = new THREE.Mesh(ringGeo, ringMat);
ring1.rotation.x = Math.PI / 2;
coreGroup.add(ring1);
const ring2 = new THREE.Mesh(ringGeo, ringMat);
ring2.rotation.y = Math.PI / 2;
coreGroup.add(ring2);

scene.add(coreGroup);

// Massive Particle Field (to make it look filled)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000; // Increased density
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) { 
    posArray[i] = (Math.random() - 0.5) * 50; 
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ 
    size: 0.08, color: 0x00d4ff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending 
});
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

    // Mouse Tracking smoothly
    targetX = mouseX * 5; targetY = mouseY * 3;
    coreGroup.position.x += (targetX - coreGroup.position.x) * 0.05;
    coreGroup.position.y += (targetY - coreGroup.position.y) * 0.05;

    // Complex Rotations
    core.rotation.x = elapsedTime * 0.5;
    core.rotation.y = elapsedTime * 0.3;
    ring1.rotation.z = elapsedTime * 0.8;
    ring2.rotation.x = elapsedTime * 0.8;
    coreGroup.rotation.z = -mouseX * 0.5;

    // Particles moving towards camera
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.position.z = (elapsedTime * 2) % 20;

    // Camera Dive
    camera.position.y = -scrollY * 0.003;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
