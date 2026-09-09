import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 90;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const handleMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', handleMouse);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2.8 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
        depth: Math.random(),
        // Warm Orange (hue ~24) and Amber (hue ~38)
        hue: Math.random() > 0.5 ? 24 : 38,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    let lastTime = 0;
    const animate = (timestamp) => {
      animRef.current = requestAnimationFrame(animate);
      if (timestamp - lastTime < 33) return;
      lastTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particles.forEach((p, i) => {
        const px = (mx - canvas.width / 2) * p.depth * 0.012;
        const py = (my - canvas.height / 2) * p.depth * 0.012;
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const dx2 = p.x + px, dy2 = p.y + py;
        const po = p.opacity + Math.sin(p.pulse) * 0.12;
        const ds = p.size * (0.8 + p.depth * 0.5);

        const g = ctx.createRadialGradient(dx2, dy2, 0, dx2, dy2, ds * 3.5);
        g.addColorStop(0, `hsla(${p.hue}, 95%, 55%, ${po * 0.7})`);
        g.addColorStop(1, `hsla(${p.hue}, 95%, 55%, 0)`);
        ctx.beginPath(); ctx.arc(dx2, dy2, ds * 3.5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(dx2, dy2, ds, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 50%, ${po * 1.2})`; ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = dx2 - (p2.x + (mx - canvas.width / 2) * p2.depth * 0.012);
          const ddy = dy2 - (p2.y + (my - canvas.height / 2) * p2.depth * 0.012);
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(dx2, dy2);
            ctx.lineTo(p2.x + (mx - canvas.width / 2) * p2.depth * 0.012, p2.y + (my - canvas.height / 2) * p2.depth * 0.012);
            ctx.strokeStyle = `hsla(${p.hue}, 90%, 55%, ${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      });
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
};

export default ParticleBackground;
