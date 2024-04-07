import React, { useState } from 'react';
import './App.css';
import DrawingCanvas from './Canvas';

function App() {
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState(5);
  const [erasing, setErasing] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <input type="color" value={color} onChange={(e) => {setColor(e.target.value); setErasing(false); }} />
        <input type="range" min="1" max="20" value={width} onChange={(e) => setWidth(e.target.value)} />
        <button onClick={() => setErasing(true)}>Eraser</button>
        <button onClick={() => window.location.reload()}>Clear Canvas</button>
        <DrawingCanvas color={color} width={width} erasing={erasing} />
      </header>
      
    </div>
  );
}

export default App;