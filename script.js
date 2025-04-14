document.addEventListener('DOMContentLoaded', function() {
  // Initialize ScrollReveal if available
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // Apply reveal animations
    sr.reveal('.feature-card', { interval: 200 });
    sr.reveal('.section-title', { origin: 'top' });
    sr.reveal('.team-description', { delay: 300 });
    sr.reveal('.team-grid', { interval: 300 });
    sr.reveal('.product-showcase', { delay: 200 });
  }
  
  // Note: Three.js scene initialization is now handled in kalakriti-hero-section.js

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 8000;
  const posArray = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 8;
    posArray[i + 1] = (Math.random() - 0.5) * 8;
    posArray[i + 2] = (Math.random() - 0.5) * 8;
    
    // Color gradient from primary to accent
    colors[i] = 1.0;     // R
    colors[i + 1] = 0.34; // G
    colors[i + 2] = 0.13; // B
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.008,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  camera.position.z = 2;

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;
    const time = Date.now() * 0.001;
    particlesMesh.position.y = Math.sin(time * 0.5) * 0.2;
    renderer.render(scene, camera);
  }
  animate();

  // Parallax effect
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    particlesMesh.rotation.y = x * 0.5;
    particlesMesh.rotation.x = y * 0.5;
  });

  // Countdown timer code removed as it's not needed
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Navbar animation
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      nav.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-up');
      nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-down');
      nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });
});