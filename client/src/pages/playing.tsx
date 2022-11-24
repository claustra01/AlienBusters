import React from 'react';

export default function App() {
    const mousePosition = useMousePosition();
  
    return (
      <p>
        Your cursor position:
        <br />
        {JSON.stringify(mousePosition)}
      </p>
    );
  }
  
  const useMousePosition = () => {
    const [
      mousePosition,
      setMousePosition
    ] = React.useState({ x: null, y: null });
  
    React.useEffect(() => {
      const updateMousePosition = (ev: { clientX: any; clientY: any; }) => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      };
      
      window.addEventListener('mousemove', updateMousePosition);
  
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
      };
    }, []);
  
    return mousePosition;
  };