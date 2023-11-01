import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SolarSystemModel3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scene 생성
    const scene = new THREE.Scene();

    // Camera 생성
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 300;
    camera.position.y = 200;
    camera.lookAt(0,0,0)
    // Renderer 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    containerRef.current.appendChild(renderer.domElement);

    // 태양 생성
    const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sunMesh);

    // 행성들 생성
    const planetData = [
      { name: '수성', distance: 80, radius: 7, color: 0x808080 },
      { name: '금성', distance: 120, radius: 9, color: 0xffa500 },
      { name: '지구', distance: 160, radius: 10, color: 0x0000ff },
      { name: '화성', distance: 200, radius: 8, color: 0xff0000 },
      { name: '목성', distance: 260, radius: 20, color: 0x8b4513 },
      { name: '토성', distance: 320, radius: 18, color: 0xffff00 },
      { name: '천왕성', distance: 380, radius: 15, color: 0xadd8e6 },
      { name: '해왕성', distance: 440, radius: 14, color: 0x00008b },
    ];

    const planetMeshes = [];
    planetData.forEach((planet) => {
      const { distance, radius, color } = planet;

      const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const planetMaterial = new THREE.MeshBasicMaterial({ color });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

      planetMesh.position.x = distance;
      scene.add(planetMesh);
      planetMeshes.push(planetMesh);
    });

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate);

      // 행성들의 공전 운동
      planetMeshes.forEach((planetMesh, index) => {
        const { distance } = planetData[index];
        planetMesh.rotation.y += 0.1 * (index + 1);
        
        // 공전 경로를 따라 행성 위치 업데이트
        const angle = Date.now() * 0.001 * (index + 1);
        planetMesh.position.x = Math.cos(angle) * distance;
        planetMesh.position.z = Math.sin(angle) * distance;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 화면 크기 변경 시 리사이징 처리
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default SolarSystemModel3D;