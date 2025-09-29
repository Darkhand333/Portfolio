// Performance optimization utilities
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Reduced motion check for accessibility
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Device performance detection
export const getDevicePerformance = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
  
  if (!gl) return 'low';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  
  // Simple performance heuristic
  if (navigator.hardwareConcurrency > 4 && !String(renderer).toLowerCase().includes('intel')) {
    return 'high';
  } else if (navigator.hardwareConcurrency > 2) {
    return 'medium';
  }
  return 'low';
};

export const isLowEndDevice = (): boolean => {
  return getDevicePerformance() === 'low' || 
         (navigator as any).connection?.effectiveType === '2g' ||
         (navigator as any).deviceMemory < 4;
};