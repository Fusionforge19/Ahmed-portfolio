'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export interface GradientWavesProps {
  horizonColor?: string;
  waveColor?: string;
  crestColor?: string;
  speed?: number;
  amplitude?: number;
  className?: string;
}

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uHorizonColor;
uniform vec3 uWaveColor;
uniform vec3 uCrestColor;
uniform float uAmplitude;

out vec4 fragColor;

// Simplex-style smooth noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Gentle wave displacements
  float n1 = snoise(vec2(uv.x * 1.5 + uTime * 0.15, uv.y * 1.5 - uTime * 0.1)) * uAmplitude;
  float n2 = snoise(vec2(uv.x * 2.5 - uTime * 0.2, uv.y * 2.0 + uTime * 0.15)) * (uAmplitude * 0.5);
  float wave = uv.y + (n1 + n2) * 0.15;

  vec3 col = mix(uHorizonColor, uWaveColor, smoothstep(0.1, 0.65, wave));
  col = mix(col, uCrestColor, smoothstep(0.65, 0.95, wave));

  fragColor = vec4(col, 0.65);
}
`;

function hexToRgb01(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return [r, g, b];
}

export default function GradientWaves({
  horizonColor = '#E6F2F8',
  waveColor = '#B6DCEB',
  crestColor = '#8EC5DE',
  speed = 0.6,
  amplitude = 1.0,
  className = 'w-full h-full absolute inset-0'
}: GradientWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsSupported(false);
      return;
    }

    const ctn = containerRef.current;
    if (!ctn) return;

    let renderer: Renderer | null = null;
    let gl: any = null;
    let canvas: HTMLCanvasElement | null = null;

    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true
      });
      gl = renderer.gl as any;
      canvas = gl?.canvas as HTMLCanvasElement;
      if (!gl || !canvas) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    canvas.style.backgroundColor = 'transparent';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    let program: Program | undefined;

    function resize() {
      if (!ctn || !renderer) return;
      const width = ctn.offsetWidth || window.innerWidth;
      const height = ctn.offsetHeight || window.innerHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth || 800, ctn.offsetHeight || 600] },
        uHorizonColor: { value: hexToRgb01(horizonColor) },
        uWaveColor: { value: hexToRgb01(waveColor) },
        uCrestColor: { value: hexToRgb01(crestColor) },
        uAmplitude: { value: amplitude }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(canvas);

    let animateId = 0;
    let isVisible = true;

    // IntersectionObserver to pause rendering when offscreen (Rule: max 2 WebGL canvases live)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(ctn);

    let lastTime = 0;
    let elapsed = 0;

    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      if (!isVisible) return; // Paused when offscreen

      if (lastTime === 0) lastTime = t;
      const delta = (t - lastTime) * 0.001;
      lastTime = t;
      elapsed += delta * speed;

      if (program && renderer) {
        program.uniforms.uTime.value = elapsed;
        program.uniforms.uHorizonColor.value = hexToRgb01(horizonColor);
        program.uniforms.uWaveColor.value = hexToRgb01(waveColor);
        program.uniforms.uCrestColor.value = hexToRgb01(crestColor);
        renderer.render({ scene: mesh });
      }
    };

    animateId = requestAnimationFrame(update);
    resize();

    return () => {
      cancelAnimationFrame(animateId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (ctn && canvas && canvas.parentNode === ctn) {
        ctn.removeChild(canvas);
      }
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [horizonColor, waveColor, crestColor, speed, amplitude]);

  if (!isSupported) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-[#E6F2F8]/50 via-[#B6DCEB]/30 to-[#8EC5DE]/20 dark:from-[#0B1A24] dark:via-[#163248]/40 dark:to-[#183244]`}
      />
    );
  }

  return <div ref={containerRef} className={className} />;
}
