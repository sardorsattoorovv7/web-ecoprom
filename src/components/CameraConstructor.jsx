// Professional3D.jsx - Three.js bilan professional 3D render
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Professional3D = ({ 
  L = 5, W = 4, H = 3, wallThickness = 100, hasFloor = true,
  doorType = "Muzlatkich eshigi", doorSide = "Old", doorPosition = "O'rta",
  hasAggregat = true, aggregatSide = "Old", aggregatBrand = "Bitzer",
  progressPercent = 100, quality = "high"
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const t = wallThickness / 1000;
    const centerX = L / 2;
    const centerZ = W / 2;
    const centerY = H / 2;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a2a);
    scene.fog = new THREE.FogExp2(0x0a0a2a, 0.008);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(L + 2, H + 2, W + 3);
    camera.lookAt(centerX, centerY, centerZ);
    cameraRef.current = camera;

    // Renderer with shadows
    const renderer = new THREE.WebGLRenderer({ antialias: quality !== "low" });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(quality === "high" ? window.devicePixelRatio : 1);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    controls.enablePan = true;
    controls.panSpeed = 0.8;
    controls.target.set(centerX, centerY, centerZ);
    controlsRef.current = controls;

    // LIGHTS - Professional setup
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);
    
    // Main directional light (sun)
    const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    mainLight.position.set(5, 12, 4);
    mainLight.castShadow = true;
    mainLight.receiveShadow = true;
    mainLight.shadow.mapSize.width = quality === "high" ? 1024 : 512;
    mainLight.shadow.mapSize.height = quality === "high" ? 1024 : 512;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 25;
    mainLight.shadow.camera.left = -5;
    mainLight.shadow.camera.right = 5;
    mainLight.shadow.camera.top = 5;
    mainLight.shadow.camera.bottom = -5;
    scene.add(mainLight);
    
    // Fill light from below
    const fillLight = new THREE.PointLight(0x4466cc, 0.3);
    fillLight.position.set(centerX, -1, centerZ);
    scene.add(fillLight);
    
    // Back rim light
    const rimLight = new THREE.PointLight(0xffaa66, 0.4);
    rimLight.position.set(-2, H + 1, -3);
    scene.add(rimLight);
    
    // Warm fill from front
    const warmFill = new THREE.PointLight(0xffaa66, 0.25);
    warmFill.position.set(2, 1, 3);
    scene.add(warmFill);

    // Helper grid (ground reference)
    const gridHelper = new THREE.GridHelper(Math.max(L, W) * 2, 20, 0x88aaff, 0x335588);
    gridHelper.position.y = -0.1;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    scene.add(gridHelper);

    // MATERIALS
    const materials = {
      panel: new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.4, metalness: 0.1, emissive: 0x000000 }),
      panelDark: new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.3, metalness: 0.05 }),
      door: new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.6, metalness: 0.05, emissive: 0x1a0a00 }),
      doorFrame: new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.4, metalness: 0.2 }),
      aggregat: new THREE.MeshStandardMaterial({ color: 0xcc3333, roughness: 0.3, metalness: 0.4, emissive: 0x220000 }),
      floor: new THREE.MeshStandardMaterial({ color: 0x88aaff, roughness: 0.7, metalness: 0.05, transparent: true, opacity: 0.85 }),
      ceiling: new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.5, metalness: 0.02, transparent: true, opacity: 0.7 }),
      edge: new THREE.MeshStandardMaterial({ color: 0xaaaaff, roughness: 0.2, metalness: 0.6 })
    };

    // Helper function to add box with shadow
    const addBox = (x, y, z, dx, dy, dz, material, name) => {
      const geometry = new THREE.BoxGeometry(dx, dy, dz);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x + dx/2, y + dy/2, z + dz/2);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { name };
      scene.add(mesh);
      return mesh;
    };

    // Helper for edges (wireframe)
    const addEdges = (x, y, z, dx, dy, dz, color = 0x88aaff) => {
      const geometry = new THREE.BoxGeometry(dx, dy, dz);
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color }));
      line.position.set(x + dx/2, y + dy/2, z + dz/2);
      scene.add(line);
    };

    // FLOOR
    if (hasFloor) {
      addBox(0, -t, 0, L, t, W, materials.floor, "Pol");
    }

    // WALLS
    addBox(0, 0, 0, L, t, H, materials.panel, "Old devor");
    addBox(0, W - t, 0, L, t, H, materials.panel, "Orqa devor");
    addBox(0, t, 0, t, W - 2*t, H, materials.panel, "Chap devor");
    addBox(L - t, t, 0, t, W - 2*t, H, materials.panel, "O'ng devor");

    // CEILING
    addBox(0, 0, H, L, W, t, materials.ceiling, "Shift");

    // Add edge highlights to walls
    addEdges(0, 0, 0, L, t, H, 0x88aaff);
    addEdges(0, W - t, 0, L, t, H, 0x88aaff);
    addEdges(0, t, 0, t, W - 2*t, H, 0x88aaff);
    addEdges(L - t, t, 0, t, W - 2*t, H, 0x88aaff);

    // DOOR
    if (doorType !== "Yo'q") {
      const doorSizes = {
        "Bir tabaqali (90x190)": { w: 0.9, h: 1.9 },
        "Muzlatkich eshigi": { w: 0.96, h: 2.0 }
      };
      const door = doorSizes[doorType] || { w: 0.9, h: 1.9 };
      
      let doorX = 0, doorZ = 0;
      const getDoorPos = () => {
        if (doorPosition === "Chap") return 0.48;
        if (doorPosition === "O'ng") return Math.max(0, L - 0.48 - door.w);
        return Math.max(0, (L - door.w) / 2);
      };
      const getDoorY = () => {
        if (doorPosition === "Tepa") return 0.48;
        if (doorPosition === "Past") return Math.max(0, W - 0.48 - door.h);
        return Math.max(0, (W - door.h) / 2);
      };

      switch (doorSide) {
        case "Old":
          doorX = getDoorPos();
          doorZ = -0.03;
          addBox(doorX, doorZ, 0, door.w, 0.06, door.h, materials.door, "Eshik");
          // Door frame
          addBox(doorX - 0.03, doorZ - 0.01, -0.03, 0.03, 0.08, door.h + 0.06, materials.doorFrame, "Eshik ramkasi");
          addBox(doorX + door.w, doorZ - 0.01, -0.03, 0.03, 0.08, door.h + 0.06, materials.doorFrame, "Eshik ramkasi");
          break;
        case "Orqa":
          doorX = getDoorPos();
          doorZ = W - 0.03;
          addBox(doorX, doorZ, 0, door.w, 0.06, door.h, materials.door, "Eshik");
          break;
        case "Chap":
          doorX = -0.03;
          doorZ = getDoorY();
          addBox(doorX, doorZ, 0, 0.06, door.h, door.h, materials.door, "Eshik");
          break;
        case "O'ng":
          doorX = L - 0.03;
          doorZ = getDoorY();
          addBox(doorX, doorZ, 0, 0.06, door.h, door.h, materials.door, "Eshik");
          break;
      }
    }

    // AGGREGAT
    if (hasAggregat) {
      const aggSize = { dx: 0.7, dy: 0.6, dz: 0.6 };
      let aggX = 0, aggZ = 0;
      
      switch (aggregatSide) {
        case "Old":
          aggX = Math.max(0, L - 0.9);
          aggZ = W/2 - 0.3;
          break;
        case "Orqa":
          aggX = 0.2;
          aggZ = W/2 - 0.3;
          break;
        case "Chap":
          aggX = 0.1;
          aggZ = Math.max(0, W - 0.8);
          break;
        default:
          aggX = Math.max(0, L - 0.8);
          aggZ = 0.1;
      }
      
      addBox(aggX, aggZ, Math.max(0, H - 0.8), aggSize.dx, aggSize.dy, aggSize.dz, materials.aggregat, aggregatBrand);
      
      // Add small details to aggregat
      const detailMat = new THREE.MeshStandardMaterial({ color: 0xcc6633, metalness: 0.7, roughness: 0.3 });
      addBox(aggX + 0.1, aggZ + 0.1, H - 0.75, 0.15, 0.15, 0.15, detailMat, "Detail");
      addBox(aggX + 0.45, aggZ + 0.35, H - 0.75, 0.1, 0.1, 0.1, detailMat, "Detail");
    }

    // ADD DECORATIVE ELEMENTS
    // Corner protectors
    const cornerMat = new THREE.MeshStandardMaterial({ color: 0xaaaaff, metalness: 0.5, roughness: 0.3 });
    const cornerSize = 0.08;
    // Bottom corners
    addBox(0, -cornerSize, 0, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");
    addBox(L - cornerSize, -cornerSize, 0, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");
    addBox(0, -cornerSize, W - cornerSize, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");
    addBox(L - cornerSize, -cornerSize, W - cornerSize, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");
    
    // Top corners
    addBox(0, H - cornerSize, 0, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");
    addBox(L - cornerSize, H - cornerSize, 0, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");
    addBox(0, H - cornerSize, W - cornerSize, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");
    addBox(L - cornerSize, H - cornerSize, W - cornerSize, cornerSize, cornerSize, cornerSize, cornerMat, "Burchak");

    // ANIMATION LOOP
    const animate = () => {
      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // HANDLE RESIZE
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (controlsRef.current) controlsRef.current.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountRef.current && rendererRef.current.domElement) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [L, W, H, wallThickness, hasFloor, doorType, doorSide, doorPosition, hasAggregat, aggregatSide, aggregatBrand, quality]);

  return <div ref={mountRef} className="w-full h-full min-h-[600px]" />;
};

export default Professional3D;