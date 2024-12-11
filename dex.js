// Move cursor initialization to the top level
let cursor;
let cursorDot;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;
let isFirstMove = true;

// Initialize cursor immediately when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize cursor if not on mobile
    if (window.innerWidth > 768) {
        initializeCursor();
    }

    // Rest of your loading screen code...
    const loadingScreen = document.querySelector('.loading-screen');
    const tapToContinue = document.querySelector('.tap-to-continue');
    const body = document.body;
    
    body.classList.add('loading');
    
    setTimeout(() => {
        tapToContinue.classList.add('visible');
        
        loadingScreen.addEventListener('click', () => {
            loadingScreen.classList.add('fade-out');
            body.classList.remove('loading');
            initializeSite();
        });
    }, 2500);
});

function initializeCursor() {
    // Create cursor elements
    cursor = document.createElement('div');
    cursorDot = document.createElement('div');
    cursor.className = 'cursor';
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Hide cursor initially
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        if (isFirstMove) {
            // Set initial position on first move
            cursorX = e.clientX;
            cursorY = e.clientY;
            dotX = e.clientX;
            dotY = e.clientY;
            isFirstMove = false;
            
            // Show cursor with slight delay
            setTimeout(() => {
                cursor.style.opacity = '1';
                cursorDot.style.opacity = '1';
            }, 100);
        }
        
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Handle cursor animation
    function updateCursor() {
        if (!cursor || !cursorDot) return;

        // Smooth following effect with easing
        const ease = 0.15;
        dotX += (cursorX - dotX) * ease;
        dotY += (cursorY - dotY) * ease;

        // Round values for better performance
        const roundedDotX = Math.round(dotX * 100) / 100;
        const roundedDotY = Math.round(dotY * 100) / 100;
        const roundedCursorX = Math.round(cursorX * 100) / 100;
        const roundedCursorY = Math.round(cursorY * 100) / 100;

        // Apply transforms with hardware acceleration
        cursor.style.transform = `translate3d(${roundedCursorX}px, ${roundedCursorY}px, 0)`;
        cursorDot.style.transform = `translate3d(${roundedDotX}px, ${roundedDotY}px, 0)`;

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Add hover effects for interactive elements with improved detection
    const interactiveElements = document.querySelectorAll(
        'a, button, .collection-item, .tap-to-continue, .magnetic-area, input, textarea, .nav-links li'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-dot-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-dot-hover');
        });
    });

    // Handle cursor visibility
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // Handle window blur/focus
    window.addEventListener('blur', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    window.addEventListener('focus', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Add this function to create background particles
function createBackgroundParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'background-particles';
    document.body.appendChild(canvas);

    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // Reset particle when it goes off screen
            if (this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particles = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        setCanvasSize();
    });

    // Start animation
    animate();
}

// Wrap all your existing initialization code in this function
function initializeSite() {
    // Add this line at the beginning of initializeSite
    createBackgroundParticles();

    // Initialize ScrollReveal (remove the duplicate initialization)
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '30px',
        duration: 800,
        delay: 100,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        reset: false,
        mobile: true
    });

    // Apply enhanced ScrollReveal animations
    sr.reveal('.hero-content', {
        origin: 'left',
        distance: '50px',
        duration: 1000,
        delay: 150
    });

    sr.reveal('.about-content', {
        duration: 800,
        distance: '20px'
    });

    sr.reveal('.stat-item', { 
        interval: 150,
        scale: 0.95,
        duration: 600
    });

    sr.reveal('.collection-item', {
        interval: 200,
        scale: 0.98,
        duration: 800
    });

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const hero3D = document.querySelector('.hero-3d');
    renderer.setSize(hero3D.offsetWidth, hero3D.offsetHeight);
    hero3D.appendChild(renderer.domElement);

    // Create particles background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 6000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    // Update particle creation with smoother movement
    for(let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 12;
        posArray[i + 1] = Math.random() * 15;
        posArray[i + 2] = (Math.random() - 0.5) * 12;
        
        // Increased velocity for faster movement
        velocityArray[i] = (Math.random() - 0.5) * 0.02;
        velocityArray[i + 1] = -Math.random() * 0.03;
        velocityArray[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0xd4af37,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        map: new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKkSURBVFiFvddNiE5RHMfx7x3PkWchTUZZeC1kISmhvJSXhYXFpKSwU2oWykIiK8rCQiElsoAkNmysZjPFxkIzkcxCppFCeRt5G8/X4pyZ7p1n7p1753me/Netu+ec//mf37nnf875n1tpNBpJVEQVizGEQfRhFlroRjfq+IkfGMc7vMUbfE0aK0kqSR0oYhXWYyW6cQ8P8QITWIgBrMFSDON+OwGVIgIWYDu2YhwncRNNdGIj9mMNnuNsOwFxU9CHQziOO9iHH1iGEziLMZzC7xwfLTiKI7iLnbiJ1ViBp3icx0fWSgziNI7gMA6iiY3owTXcRX+En4XYhh04h4+4hC9YjvN4kMdHVhGD2I8+3MVt3McIdmMzXuNJhJ/FuIDDmFv8voKfWFJGQB1b0cAY3mMvpvAMN/CqjY9+nMRm3MYnXMQPrCojYBRPsA6PsAg7MR+vMNzGfgBHsQdX8RnX8Q4jZQRMYALb8QUbpvEzF5swhk9T2NSlc3oRX/PYzxLQwBWpqIxkjM/BHvThMs7gT1YHRQRMSvl7Pk7gYkb7n9J0HcJVfM9jnEdAQ1px+3BcWlkfcmzH8VwqNFdxLq+DvAIaeIZN0n48KeV5O4xKxWc1rvxvB0VRl87sKWnqVuIMfrf52YHN0h7Zg7tlHEcJ+CZVtJvS0dmV0X4Ih6Rg38DzMk6jBDSlwrJHOnNH8SfCdqG0avbiRhmnUQLGpQqY5zBKwA5pZI+kQzpNQF06brO1XjpfcQJuYZd0TvMcRgn4htPSXk9DnIBnOCRNQxriBLzEcWmqkhAn4APOSys3EXECvuKcdBkpjTgBk7ggvQ2VRpyAhlSQ3kSMlUGcgKa0Cl5GjJVB3J/RpFSQ3keMlUHcCDSl2/FYxFgZ/AUiH6ppYv0cqAAAAABJRU5ErkJggg==')
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create main floating object
    const clothGeometry = new THREE.PlaneGeometry(3, 4, 50, 50);
    const clothMaterial = new THREE.MeshPhongMaterial({
        color: 0xd4af37,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
    });

    const cloth = new THREE.Mesh(clothGeometry, clothMaterial);
    scene.add(cloth);

    // Add lights
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(0, 1, 1);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xd4af37, 1);
    light2.position.set(-2, 1, 3);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 5;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        // Faster mouse tracking
        targetX = mouseX * 0.2;
        targetY = mouseY * 0.2;
        
        // Optimized particle updates
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
            positions[i] += velocityArray[i];
            positions[i + 1] += velocityArray[i + 1];
            positions[i + 2] += velocityArray[i + 2];
            
            if(positions[i + 1] < -5) {
                positions[i + 1] = 5;
                positions[i] = (Math.random() - 0.5) * 12;
                positions[i + 2] = (Math.random() - 0.5) * 12;
                velocityArray[i + 1] = -Math.random() * 0.03;
            }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        
        // Faster rotation
        particlesMesh.rotation.y += 0.001;
        
        // Optimized cloth animation
        const elapsedTime = clock.getElapsedTime();
        cloth.rotation.z = 0.08 * Math.sin(elapsedTime * 0.8);
        
        // Faster wave effect
        const clothPositions = clothGeometry.attributes.position.array;
        for(let i = 0; i < clothPositions.length; i += 3) {
            const x = clothPositions[i];
            const y = clothPositions[i + 1];
            clothPositions[i + 2] = Math.sin(x * 2 + elapsedTime * 0.8) * 0.15 + 
                                  Math.sin(y * 2 + elapsedTime * 0.8) * 0.15;
        }
        clothGeometry.attributes.position.needsUpdate = true;
        
        // Faster camera movement
        camera.position.x += (targetX - camera.position.x) * 0.1;
        camera.position.y += (targetY - camera.position.y) * 0.1;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = hero3D.offsetWidth;
        const height = hero3D.offsetHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Add interactive background particles
    const createParticleBackground = () => {
        const canvas = document.createElement('canvas');
        canvas.classList.add('background-particles');
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 100;
        
        for(let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1
            });
        }
        
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if(particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if(particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
                ctx.fill();
            });
        }
        
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };

    createParticleBackground();

    // Enhanced collection item interactions with faster animations
    document.querySelectorAll('.collection-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const button = item.querySelector('.view-details');
            const heading = item.querySelector('h3');
            const overlay = item.querySelector('.item-overlay');
            
            gsap.to(button, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(heading, {
                y: -5,
                duration: 0.2,
                ease: 'power2.out'
            });
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            const button = item.querySelector('.view-details');
            const heading = item.querySelector('h3');
            const overlay = item.querySelector('.item-overlay');
            
            gsap.to(button, {
                y: 20,
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            });
            
            gsap.to(heading, {
                y: 0,
                duration: 0.2,
                ease: 'power2.in'
            });
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            });
        });
    });

    // Faster smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {
                duration: 0.6,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power2.inOut'
            });
        });
    });

    // Add this to your initializeSite function
    function initializeMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic-area');
        
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const bounds = btn.getBoundingClientRect();
                const centerX = bounds.left + bounds.width / 2;
                const centerY = bounds.top + bounds.height / 2;
                
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                
                const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                const maxDistance = Math.max(bounds.width, bounds.height);
                const strength = 0.4; // Adjust this value to change the magnetic strength
                
                const x = (deltaX / maxDistance) * 30 * strength;
                const y = (deltaY / maxDistance) * 30 * strength;
                
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    initializeMagneticButtons();

    // Add this to your initializeSite function
    function initializeMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainMenu = document.querySelector('.main-menu');
        const menuClose = document.querySelector('.menu-close');
        const menuLinks = document.querySelectorAll('.menu-link');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        menuClose.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Add this line to your initializeSite function call
    initializeMenu();
}

// Elegant 3D Model for Hero Section
function initHero3D() {
    const container = document.getElementById('hero-3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create elegant double helix geometry
    const helixPoints = [];
    const helixCount = 2; // Number of intertwined helixes
    const turns = 3; // Number of turns
    const pointsPerTurn = 50;
    const radius = 1;
    const height = 3;

    for (let helix = 0; helix < helixCount; helix++) {
        for (let i = 0; i <= turns * pointsPerTurn; i++) {
            const t = i / pointsPerTurn;
            const angle = 2 * Math.PI * t + (helix * Math.PI); // Offset second helix by PI
            
            helixPoints.push(new THREE.Vector3(
                radius * Math.cos(angle),
                height * (t / turns - 0.5), // Center vertically
                radius * Math.sin(angle)
            ));
        }
    }

    // Create curves from points
    const curves = [];
    for (let helix = 0; helix < helixCount; helix++) {
        const start = helix * (turns * pointsPerTurn + 1);
        const helixCurve = new THREE.CatmullRomCurve3(
            helixPoints.slice(start, start + turns * pointsPerTurn + 1)
        );
        curves.push(helixCurve);
    }

    // Create tube geometries
    const tubes = curves.map(curve => 
        new THREE.TubeGeometry(curve, 100, 0.05, 8, false)
    );

    // Create materials
    const materials = [
        new THREE.MeshPhysicalMaterial({
            color: 0xd4af37,
            metalness: 0.7,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        }),
        new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.6,
            roughness: 0.3,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        })
    ];

    // Create meshes
    const helixGroup = new THREE.Group();
    tubes.forEach((tube, index) => {
        const mesh = new THREE.Mesh(tube, materials[index]);
        helixGroup.add(mesh);
    });
    scene.add(helixGroup);

    // Add elegant particles
    const particlesCount = 200;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 4;
        particlePositions[i + 1] = (Math.random() - 0.5) * 6;
        particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xd4af37,
        size: 0.02,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xd4af37, 1);
    spotLight.position.set(2, 2, 2);
    spotLight.angle = 0.4;
    spotLight.penumbra = 0.3;
    scene.add(spotLight);

    camera.position.z = 4;

    // Create smooth rotation parameters
    const rotationSpeed = {
        current: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        ease: 0.05,
        autoRotate: 0.001
    };

    // Enhanced mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isHovered = false;

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        
        rotationSpeed.target.x = mouseY * 0.3;
        rotationSpeed.target.y = mouseX * 0.3;
    });

    container.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    container.addEventListener('mouseleave', () => {
        isHovered = false;
        // Smoothly return to auto-rotation
        rotationSpeed.target.x = 0;
        rotationSpeed.target.y = 0;
    });

    // Animation loop with smooth rotation
    function animate() {
        requestAnimationFrame(animate);

        const time = performance.now() * 0.001;

        // Smooth rotation interpolation
        rotationSpeed.current.x += (rotationSpeed.target.x - rotationSpeed.current.x) * rotationSpeed.ease;
        rotationSpeed.current.y += (rotationSpeed.target.y - rotationSpeed.current.y) * rotationSpeed.ease;

        // Apply rotations
        helixGroup.rotation.x = rotationSpeed.current.x;
        helixGroup.rotation.y = rotationSpeed.current.y;

        // Add continuous gentle rotation when not hovered
        if (!isHovered) {
            helixGroup.rotation.y += rotationSpeed.autoRotate;
        }

        // Animate particles with smooth wave motion
        particles.rotation.y += 0.001;
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < particlesCount * 3; i += 3) {
            positions[i + 1] += Math.sin(time + i) * 0.0008;
            positions[i] += Math.cos(time + i) * 0.0008;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Update spotlight with smooth motion
        spotLight.position.x = Math.sin(time * 0.3) * 2;
        spotLight.position.z = Math.cos(time * 0.3) * 2;
        spotLight.intensity = 1 + Math.sin(time) * 0.2;

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

// Initialize 3D model when page loads
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.addEventListener('click', () => {
        initHero3D();
    });
});
