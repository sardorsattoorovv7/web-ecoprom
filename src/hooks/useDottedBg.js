import { useEffect, useCallback, useRef } from "react";

/**
 * Nuqtali fonni sichqoncha harakati bilan jonlantirish uchun hook
 * @param {React.RefObject} ref - Fon elementi ref'i
 * @param {Object} options - Sozlamalar
 * @param {number} options.intensity - Harakat intensivligi (default: 12)
 * @param {number} options.speed - Harakat tezligi (default: 1)
 * @param {boolean} options.parallax - Parallax effekt (default: true)
 * @param {string} options.blendMode - Aralashtirish rejimi (default: 'normal')
 * @returns {Object} - Hook holati va metodlari
 */
export default function useDottedBg(ref, options = {}) {
  const {
    intensity = 12,
    speed = 1,
    parallax = true,
    blendMode = 'normal'
  } = options;

  const frameRef = useRef();
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const isHoveringRef = useRef(false);
  const currentPosRef = useRef({ x: 0.5, y: 0.5 });

  // Silliq harakat uchun interpolyatsiya
  const lerp = useCallback((start, end, factor) => {
    return start + (end - start) * factor;
  }, []);

  // Animatsiya frame'i
  const updatePosition = useCallback(() => {
    const el = ref.current;
    if (!el || !isHoveringRef.current) return;

    // Smooth interpolation
    currentPosRef.current = {
      x: lerp(currentPosRef.current.x, mousePosRef.current.x, 0.1 * speed),
      y: lerp(currentPosRef.current.y, mousePosRef.current.y, 0.1 * speed)
    };

    const { x, y } = currentPosRef.current;

    // Gradient va nuqtali fon uchun pozitsiyalar
    const bgPositions = parallax ? [
      `${x * intensity}px ${y * intensity}px`,                    // Nuqtalar 1
      `center ${-40 + y * 18}px`,                                  // Gradient 1
      `center ${-60 + x * 18}px`,                                  // Gradient 2
      'center'                                                      // Asosiy
    ] : [
      `${x * intensity}px ${y * intensity}px`,
      'center',
      'center',
      'center'
    ];

    el.style.backgroundPosition = bgPositions.join(', ');
    
    // Blend mode
    if (blendMode !== 'normal') {
      el.style.backgroundBlendMode = blendMode;
    }

    frameRef.current = requestAnimationFrame(updatePosition);
  }, [ref, intensity, speed, parallax, blendMode, lerp]);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    // Normalize coordinates (0-1)
    mousePosRef.current = {
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    };
  }, [ref]);

  // Mouse enter handler
  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    ref.current?.classList.add("is-hover");
    
    // Start animation
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(updatePosition);
  }, [ref, updatePosition]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    ref.current?.classList.remove("is-hover");
    
    // Stop animation
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }

    // Reset position
    if (ref.current) {
      ref.current.style.backgroundPosition = '';
      currentPosRef.current = { x: 0.5, y: 0.5 };
    }
  }, [ref]);

  // Touch support
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 0) return;
    
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const touch = e.touches[0];
    
    mousePosRef.current = {
      x: Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height))
    };
    
    // Prevent scrolling while touching
    e.preventDefault();
  }, [ref]);

  const handleTouchStart = useCallback((e) => {
    isHoveringRef.current = true;
    ref.current?.classList.add("is-hover");
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(updatePosition);
    
    handleTouchMove(e);
  }, [ref, updatePosition, handleTouchMove]);

  const handleTouchEnd = useCallback(() => {
    isHoveringRef.current = false;
    ref.current?.classList.remove("is-hover");
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }

    if (ref.current) {
      ref.current.style.backgroundPosition = '';
      currentPosRef.current = { x: 0.5, y: 0.5 };
    }
  }, [ref]);

  // Setup and cleanup
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial background styles
    const currentBg = window.getComputedStyle(el).backgroundImage;
    if (currentBg === 'none') {
      console.warn('useDottedBg: Elementda backgroundImage aniqlanmadi');
    }

    // Enable hardware acceleration
    el.style.willChange = 'background-position';
    el.style.transition = 'background-blend-mode 0.3s';

    // Event listeners
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    
    // Touch events
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      // Clean up animation
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      // Remove event listeners
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);

      // Reset styles
      el.style.willChange = '';
      el.style.backgroundPosition = '';
      el.style.backgroundBlendMode = '';
    };
  }, [ref, handleMouseMove, handleMouseEnter, handleMouseLeave, handleTouchMove, handleTouchStart, handleTouchEnd]);

  // Qo'shimcha metodlar
  const reset = useCallback(() => {
    if (ref.current) {
      ref.current.style.backgroundPosition = '';
      currentPosRef.current = { x: 0.5, y: 0.5 };
      mousePosRef.current = { x: 0.5, y: 0.5 };
      isHoveringRef.current = false;
    }
  }, [ref]);

  const setIntensity = useCallback((newIntensity) => {
    options.intensity = newIntensity;
  }, [options]);

  return {
    reset,
    setIntensity,
    isActive: isHoveringRef.current,
    currentPosition: currentPosRef.current
  };
}

// CSS stillari (ixtiyoriy)
export const dottedBgStyles = {
  base: `
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    background-size: 30px 30px, 100% 100%, 100% 100%, cover;
    background-image: 
      radial-gradient(circle, rgba(148, 163, 184, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      linear-gradient(145deg, #ffffff, #f8fafc);
    transition: background-blend-mode 0.3s;
  `,
  dark: `
    background-image: 
      radial-gradient(circle, rgba(71, 85, 105, 0.4) 1px, transparent 1px),
      radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      linear-gradient(145deg, #0f172a, #1e293b);
  `,
  blendModes: {
    overlay: 'overlay',
    multiply: 'multiply',
    screen: 'screen',
    softLight: 'soft-light'
  }
};