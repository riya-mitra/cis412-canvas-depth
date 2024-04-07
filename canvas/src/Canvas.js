import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = ({ color, width, erasing }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize the canvas only once when the component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800 * 2;
    canvas.height = 500 * 2;
    canvas.style.width = `800px`;
    canvas.style.height = `500px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    contextRef.current = context;
  }, []); // Empty dependency array to run only once

  // Apply color, width, and erasing changes without reinitializing canvas dimensions
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = erasing ? '#ffffff' : color;
      contextRef.current.lineWidth = width;
      contextRef.current.globalCompositeOperation = erasing ? 'destination-out' : 'source-over';
    }
  }, [color, width, erasing]); // Dependencies that when changed, adjust canvas context without clearing it

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
};

export default DrawingCanvas;