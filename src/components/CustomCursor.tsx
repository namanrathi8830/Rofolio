import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'clickable' | 'hoverable' | null>(null);
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);
  const [magneticElementRect, setMagneticElementRect] = useState<DOMRect | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const clickEffectsRef = useRef<Array<{x: number, y: number, timestamp: number}>>([]);
  const trailPointsRef = useRef<Array<{x: number, y: number, age: number}>>([]);

  useEffect(() => {
    // Show cursor once component is mounted
    const timeout = setTimeout(() => setIsHidden(false), 500);
    
    const updateTargetPosition = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      
      // Add point to trail
      trailPointsRef.current.push({ 
        x: e.clientX, 
        y: e.clientY,
        age: 0 
      });
      
      // Limit trail points
      if (trailPointsRef.current.length > 8) {
        trailPointsRef.current.shift();
      }
    };

    const handleMouseDown = () => {
      setClicked(true);
      // Add click effect at current position
      clickEffectsRef.current.push({
        x: targetPosition.x,
        y: targetPosition.y,
        timestamp: Date.now()
      });
      setTimeout(() => setClicked(false), 150);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
      setIsHovering(false);
      setHoverType(null);
      setMagneticElement(null);
      setMagneticElementRect(null);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const checkHoveredElement = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for magnetic effect on clickable elements
      const clickableElement = target.closest('.clickable') as HTMLElement;
      
      if (clickableElement) {
        setIsHovering(true);
        setHoverType('clickable');
        setMagneticElement(clickableElement);
        setMagneticElementRect(clickableElement.getBoundingClientRect());
        clickableElement.classList.add('magnetic-active');
      } else if (target.closest('.hoverable')) {
        setIsHovering(true);
        setHoverType('hoverable');
        setMagneticElement(null);
        setMagneticElementRect(null);
        
        // Remove magnetic effect from all elements
        document.querySelectorAll('.magnetic-active').forEach(el => {
          el.classList.remove('magnetic-active');
        });
      } else {
        setIsHovering(false);
        setHoverType(null);
        setMagneticElement(null);
        setMagneticElementRect(null);
        
        // Remove magnetic effect from all elements
        document.querySelectorAll('.magnetic-active').forEach(el => {
          el.classList.remove('magnetic-active');
        });
      }
    };

    // Smooth cursor movement animation
    const animateCursor = () => {
      // Age all trail points
      trailPointsRef.current.forEach(point => {
        point.age += 1;
      });
      
      // Remove old trail points
      trailPointsRef.current = trailPointsRef.current.filter(point => point.age < 10);
      
      // Remove old click effects
      const now = Date.now();
      clickEffectsRef.current = clickEffectsRef.current.filter(effect => 
        now - effect.timestamp < 800 // 800ms matches our animation duration
      );
      
      // Calculate cursor position with magnetic effect
      let newX = targetPosition.x;
      let newY = targetPosition.y;
      
      if (magneticElement && magneticElementRect) {
        // Calculate center of the element
        const elementCenterX = magneticElementRect.left + magneticElementRect.width / 2;
        const elementCenterY = magneticElementRect.top + magneticElementRect.height / 2;
        
        // Calculate distance from cursor to center
        const distanceX = targetPosition.x - elementCenterX;
        const distanceY = targetPosition.y - elementCenterY;
        
        // Calculate distance
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Magnetic strength decreases with distance
        const maxDistance = 150;
        const magneticPull = Math.max(0, 1 - distance / maxDistance);
        
        // Apply magnetic effect to element transform
        if (magneticPull > 0) {
          const moveX = distanceX * magneticPull * 0.3;
          const moveY = distanceY * magneticPull * 0.3;
          magneticElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          magneticElement.style.transform = '';
        }
        
        // Apply slight pull towards element center for cursor
        newX = targetPosition.x - distanceX * magneticPull * 0.2;
        newY = targetPosition.y - distanceY * magneticPull * 0.2;
      }
      
      // Smooth cursor following
      setPosition(prev => ({
        x: prev.x + (newX - prev.x) * 0.15,
        y: prev.y + (newY - prev.y) * 0.15
      }));
      
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateCursor);

    document.addEventListener('mousemove', updateTargetPosition);
    document.addEventListener('mousemove', checkHoveredElement);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearTimeout(timeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', updateTargetPosition);
      document.removeEventListener('mousemove', checkHoveredElement);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      // Clean up any remaining magnetic effects
      document.querySelectorAll('.magnetic-active').forEach(el => {
        el.classList.remove('magnetic-active');
        (el as HTMLElement).style.transform = '';
      });
    };
  }, [targetPosition, magneticElement, magneticElementRect]);

  if (isHidden) return null;

  return (
    <>
      {/* Main cursor */}
      <div 
        className={`custom-cursor ${isHovering ? `custom-cursor-${hoverType}` : ''} ${clicked ? 'custom-cursor-clicked' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-trail" />
      </div>
      
      {/* Cursor dot (follows exact position) */}
      <div 
        className="custom-cursor-dot"
        style={{ 
          left: `${targetPosition.x}px`, 
          top: `${targetPosition.y}px`
        }}
      />
      
      {/* Click effects */}
      {clickEffectsRef.current.map((effect, index) => (
        <div 
          key={`click-${effect.timestamp}-${index}`}
          className="cursor-ping"
          style={{
            left: `${effect.x}px`,
            top: `${effect.y}px`,
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9998
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor; 