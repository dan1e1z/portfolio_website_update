import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface ParticleCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

class Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  distance: number;
  force: number;
  angle: number;
  size: number;

  constructor(
    x: number,
    y: number,
    private effect: Effect,
  ) {
    this.originX = x;
    this.originY = y;
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.ctx = effect.ctx;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.2;
    this.friction = 0.95;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
    this.size = Math.floor(Math.random() * 5);
    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#eee9cc";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    const { mouse } = this.effect;
    this.dx = mouse.x - this.x;
    this.dy = mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = (-mouse.radius / this.distance) * 8;

    if (this.distance < mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    this.draw();
  }
}

class Effect {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  particlesArray: Particle[];
  gap: number;
  mouse: { radius: number; x: number; y: number };
  automatedAnimation: boolean;
  animate: (() => void) | null;

  constructor(
    width: number,
    height: number,
    context: CanvasRenderingContext2D,
    private containerRef: React.RefObject<HTMLDivElement>,
  ) {
    this.width = width;
    this.height = height;
    this.ctx = context;
    this.particlesArray = [];
    this.gap = 20;
    this.mouse = {
      radius: 3000,
      x: 0,
      y: 0,
    };
    this.automatedAnimation = false;
    this.animate = null;

    // Add event listeners for mouse and touch
    this.containerRef.current?.addEventListener(
      "mousemove",
      this.handleMouseMove,
    );
    this.containerRef.current?.addEventListener(
      "touchmove",
      this.handleTouchMove,
    );
    this.containerRef.current?.addEventListener(
      "touchstart",
      this.handleTouchStart,
    );
    this.containerRef.current?.addEventListener(
      "touchend",
      this.handleTouchEnd,
    );

    this.init();
  }

  handleMouseMove = (event: MouseEvent) => {
    if (!this.containerRef.current) return;

    const rect = this.containerRef.current.getBoundingClientRect();
    const scrollLeft = this.containerRef.current.scrollLeft || 0;
    const scrollTop = this.containerRef.current.scrollTop || 0;
    const DPR = window.devicePixelRatio || 1;

    this.mouse.x = (event.clientX - rect.left + scrollLeft) * DPR;
    this.mouse.y = (event.clientY - rect.top + scrollTop) * DPR;
  };

  handleTouchMove = (event: TouchEvent) => {
    if (!this.containerRef.current) return;

    const rect = this.containerRef.current.getBoundingClientRect();
    const scrollLeft = this.containerRef.current.scrollLeft || 0;
    const scrollTop = this.containerRef.current.scrollTop || 0;
    const DPR = window.devicePixelRatio || 1;

    const touch = event.touches[0];
    this.mouse.x = (touch.clientX - rect.left + scrollLeft) * DPR;
    this.mouse.y = (touch.clientY - rect.top + scrollTop) * DPR;
  };

  handleTouchStart = (event: TouchEvent) => {
    this.handleTouchMove(event);
  };

  handleTouchEnd = () => {
    this.mouse.x = 0;
    this.mouse.y = 0;
  };

  init() {
    for (let x = 0; x < this.width; x += this.gap) {
      for (let y = 0; y < this.height; y += this.gap) {
        this.particlesArray.push(new Particle(x, y, this));
      }
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.particlesArray.length; i++) {
      this.particlesArray[i].update();
    }
  }

  toggleAutomatedAnimation(enabled: boolean) {
    this.automatedAnimation = enabled;
    if (enabled && !this.animate) {
      this.animate = createAutomatedAnimation(this);
    }
  }

  removeEventListeners() {
    this.containerRef.current?.removeEventListener(
      "mousemove",
      this.handleMouseMove,
    );
    this.containerRef.current?.removeEventListener(
      "touchmove",
      this.handleTouchMove,
    );
    this.containerRef.current?.removeEventListener(
      "touchstart",
      this.handleTouchStart,
    );
    this.containerRef.current?.removeEventListener(
      "touchend",
      this.handleTouchEnd,
    );
  }
}

const createAutomatedAnimation = (effect: Effect) => {
  let currentX = 0;
  let currentY = 0;
  let targetX = effect.width;
  let targetY = effect.height;
  let progress = 0;
  let direction = 1;

  return () => {
    progress += 0.005 * direction;

    if (progress >= 1 || progress <= 0) {
      direction *= -1;
      if (progress >= 1) {
        currentX = targetX;
        currentY = targetY;
        targetX = Math.random() * effect.width;
        targetY = Math.random() * effect.height;
      }
    }

    const x = currentX + (targetX - currentX) * progress;
    const y = currentY + (targetY - currentY) * progress;

    effect.mouse.x = x;
    effect.mouse.y = y;
  };
};

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controls = useAnimation();
  const effectRef = useRef<Effect | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    const updateCanvasSize = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height * 0.85}px`;

      return { width: canvas.width, height: canvas.height };
    };

    const { width, height } = updateCanvasSize();
    const effect = new Effect(width, height, ctx, containerRef);
    effectRef.current = effect;

    const animate = () => {
      if (effect.automatedAnimation && effect.animate) {
        effect.animate();
      }
      effect.update();
      requestAnimationFrame(animate);
    };

    animate();
    controls.start({ opacity: 1 });

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = updateCanvasSize();
      effect.width = width;
      effect.height = height;
      effect.particlesArray = [];
      effect.init();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      effect.removeEventListeners();
    };
  }, [containerRef, controls]);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} className="w-full h-full"></canvas>

      <motion.div
        className="absolute top-10 left-10"
        whileInView={{ rotate: 0 }}
        initial={{ rotate: 5 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="font-['ivar'] font-light text-5xl md:text-[70px] leading-[70px] text-[#eee9cc]"
          whileInView={{
            y: 0,
            rotate: 0,
          }}
          initial={{ y: "100%", rotate: 5 }}
          transition={{ duration: 0.5 }}
        >
          NAVIGATION <br />
          GALLERY
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default ParticleCanvas;
