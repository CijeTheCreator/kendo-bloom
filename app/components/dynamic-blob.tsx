"use client";
import { useEffect, useRef } from "react";

export default function DynamicBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Blob parameters - increase points for smoother blob
    const points = 12; // Increased from 8 to 12 for smoother shape
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    const center = { x: canvas.width / 2, y: canvas.height / 3 };

    // Create random points for the blob
    const angles: number[] = [];
    const radiusVariations: number[] = [];
    const angleVelocities: number[] = [];
    const radiusVelocities: number[] = [];

    for (let i = 0; i < points; i++) {
      angles.push((Math.PI * 2 * i) / points);
      // Reduce the variation range for smoother blobs
      radiusVariations.push(0.95 + Math.random() * 0.1); // Reduced variation
      angleVelocities.push(0.0003 + Math.random() * 0.0005); // Slower movement
      radiusVelocities.push(0.0005 + Math.random() * 0.001); // Slower radius changes
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update angles and radius variations
      for (let i = 0; i < points; i++) {
        angles[i] += angleVelocities[i];
        radiusVariations[i] += radiusVelocities[i];

        // Reduce the range of variation for smoother blobs
        if (radiusVariations[i] > 1.05 || radiusVariations[i] < 0.95) {
          radiusVelocities[i] *= -1;
        }
      }

      // Draw the blob with bezier curves for smoother shape
      ctx.beginPath();

      // Create gradient
      const gradient = ctx.createRadialGradient(
        center.x,
        center.y,
        0,
        center.x,
        center.y,
        radius * 2,
      );
      gradient.addColorStop(0, "rgba(255, 182, 193, 0.8)");
      gradient.addColorStop(1, "rgba(255, 182, 193, 0.2)");

      // Calculate points for the blob
      const blobPoints = [];

      for (let i = 0; i < points; i++) {
        const currentAngle = angles[i];
        const currentRadius = radius * radiusVariations[i];

        const x = center.x + Math.cos(currentAngle) * currentRadius;
        const y = center.y + Math.sin(currentAngle) * currentRadius;

        blobPoints.push({ x, y });
      }

      // Start the path
      ctx.moveTo(blobPoints[0].x, blobPoints[0].y);

      // Draw bezier curves between points for smoother blob
      for (let i = 0; i < points; i++) {
        const current = blobPoints[i];
        const next = blobPoints[(i + 1) % points];

        // Calculate control points for bezier curve
        // Use the points before and after for smoother transitions
        const prev = blobPoints[(i - 1 + points) % points];
        const afterNext = blobPoints[(i + 2) % points];

        // Calculate control points with tension factor
        const tension = 0.3; // Lower tension for rounder curves

        const cp1x = current.x + (next.x - prev.x) * tension;
        const cp1y = current.y + (next.y - prev.y) * tension;

        const cp2x = next.x - (afterNext.x - current.x) * tension;
        const cp2y = next.y - (afterNext.y - current.y) * tension;

        // Draw the bezier curve
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
      }

      ctx.fillStyle = gradient;
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}
