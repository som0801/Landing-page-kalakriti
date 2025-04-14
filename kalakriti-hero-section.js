// Enhanced Three.js scene
function initHeroScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Append the canvas to the hero container
  const heroContainer = document.getElementById('hero-container');
  heroContainer.prepend(renderer.domElement); // Prepend to make it appear behind the content

  // Removed floating handicraft object
  
  // Add ambient and directional lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create particles surrounding the handicraft
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 3000;
  const posArray = new Float32Array(particlesCount * 3);
  
  for(let i = 0; i < particlesCount * 3; i += 3) {
    // Create a sphere of particles around the center
    const radius = 2 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i+2] = radius * Math.cos(phi);
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.008,
    color: 0xFF8A65,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  camera.position.z = 4;
  
  // Animation
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.002;
    particlesMesh.rotation.x += 0.001;
    renderer.render(scene, camera);
  }
  
  // Advanced mouse interaction
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    gsap.to(camera.position, {
      x: x * 0.2,
      y: -y * 0.2,
      duration: 1,
      ease: "power2.out"
    });
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
}

// Initialize the 3D scene after the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Load GSAP library for smooth animations
  const gsapScript = document.createElement('script');
  gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
  gsapScript.onload = initHeroScene;
  document.head.appendChild(gsapScript);
});
