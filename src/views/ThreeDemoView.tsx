// src/views/ThreeDemoView.tsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { FaPalette, FaMagic, FaCube } from "react-icons/fa";

export default function ThreeDemoView() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!stageRef.current) return;

    const stage = stageRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    renderer.setClearColor(0x0a0a1a, 1); // Dark space-like background
    stage.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      stage.clientWidth / stage.clientHeight,
      0.1,
      100
    );
    camera.position.set(2.5, 2.0, 3.0);
    camera.lookAt(0, 0, 0);

    // Enhanced Lighting
    scene.add(new THREE.AmbientLight(0x404040, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Point light for extra glow
    const pointLight = new THREE.PointLight(0x4488ff, 0.8, 100);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);

    // Cube with enhanced material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      metalness: 0.1,
      roughness: 0.2,
      emissive: 0x002200,
      emissiveIntensity: 0.1
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.4;
    cubeRef.current = cube;
    scene.add(cube);

    // Add some floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x4488ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    let running = true;
    const animate = () => {
      if (!running) return;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;

      // Animate particles
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const onResize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(stage);

    // Cleanup
    return () => {
      running = false;
      renderer.dispose();
      ro.disconnect();
      stage.removeChild(renderer.domElement);
    };
  }, []);

  const setColor = (hex: number) => {
    if (cubeRef.current?.material) {
      const material = cubeRef.current.material as THREE.MeshStandardMaterial;
      material.color.setHex(hex);
      material.emissive.setHex(hex);
      material.emissiveIntensity = 0.2;
    }
  };

  const setRandomColor = () => {
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    if (cubeRef.current?.material) {
      const material = cubeRef.current.material as THREE.MeshStandardMaterial;
      material.color.copy(color);
      material.emissive.copy(color);
      material.emissiveIntensity = 0.2;
    }
  };

  const colors = [
    { name: "Rojo", hex: 0xff4d4f, icon: "🔴" },
    { name: "Verde", hex: 0x22c55e, icon: "🟢" },
    { name: "Azul", hex: 0x3b82f6, icon: "🔵" },
    { name: "Morado", hex: 0x8b5cf6, icon: "🟣" },
    { name: "Rosa", hex: 0xec4899, icon: "🩷" },
    { name: "Naranja", hex: 0xf97316, icon: "🟠" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <FaCube className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Three.js Demo Interactivo
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Explora el poder de WebGL con este cubo 3D interactivo. Cambia colores, observa las animaciones y experimenta con gráficos en tiempo real.
        </p>
      </motion.div>

      {/* Color Controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaPalette className="w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Controles de Color
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {colors.map((color, index) => (
            <motion.button
              key={color.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setColor(color.hex)}
              className="group relative bg-white dark:bg-slate-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-600"
            >
              <div className="text-center space-y-2">
                <div className="text-2xl">{color.icon}</div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {color.name}
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: `#${color.hex.toString(16)}` }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={setRandomColor}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaMagic className="w-5 h-5" />
          Color Aleatorio
        </motion.button>
      </motion.div>

      {/* Canvas Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-200/20 dark:border-slate-700/20"
      >
        <div
          ref={stageRef}
          className="w-full aspect-video relative"
          style={{ minHeight: "400px" }}
        />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              WebGL Renderer Activo
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
            🚀 Características
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• Renderizado WebGL de alto rendimiento</li>
            <li>• Materiales PBR (Physically Based Rendering)</li>
            <li>• Iluminación dinámica y sombras</li>
            <li>• Animaciones fluidas en 60fps</li>
          </ul>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
            🎮 Controles
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• Click en colores para cambiar</li>
            <li>• Color aleatorio para sorpresas</li>
            <li>• Rotación automática continua</li>
            <li>• Partículas de fondo animadas</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
