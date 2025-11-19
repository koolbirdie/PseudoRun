import React from 'react';
import styles from './PointerArrow.module.css';

interface PointerArrowProps {
  variableName: string;
  sourceAddress: number;
  targetAddress: number;
  pointerType: string;
  color?: string;
  curve?: 'straight' | 'curved';
  isHighlighted?: boolean;
  onAnimationEnd?: () => void;
}

const PointerArrow: React.FC<PointerArrowProps> = ({
  variableName,
  sourceAddress,
  targetAddress,
  pointerType,
  color: customColor,
  curve = 'straight',
  isHighlighted = false,
  onAnimationEnd
}) => {
  const getPointerColor = (type: string): string => {
    if (customColor) return customColor;

    switch (type) {
      case 'POINTER_TO_INTEGER':
        return '#4CAF50'; // Green
      case 'POINTER_TO_REAL':
        return '#2196F3'; // Blue
      case 'POINTER_TO_CHAR':
        return '#FF9800'; // Orange
      case 'VOID_POINTER':
        return '#607D8B'; // Blue Grey
      default:
        return '#9E9E9E'; // Grey
    }
  };

  const color = getPointerColor(pointerType);

  // Calculate SVG path for arrow
  const calculatePath = () => {
    // For simplicity, we'll use a basic positioning system
    // In a real implementation, you'd calculate positions based on actual DOM elements
    const sourceY = 100;
    const targetY = 200;
    const sourceX = 50 + (sourceAddress % 10) * 90;
    const targetX = 50 + (targetAddress % 10) * 90;

    if (curve === 'straight') {
      return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    } else {
      // Create a curved path
      const midX = (sourceX + targetX) / 2;
      const midY = (sourceY + targetY) / 2 - 30;
      return `M ${sourceX} ${sourceY} Q ${midX} ${midY} ${targetX} ${targetY}`;
    }
  };

  const path = calculatePath();

  return (
    <div className={styles.pointerArrow}>
      <svg
        className={styles.arrowSvg}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300px',
          pointerEvents: 'none',
          zIndex: 100
        }}
      >
        <defs>
          <marker
            id={`arrowhead-${variableName}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            fill={color}
          >
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>

        <path
          d={path}
          stroke={color}
          strokeWidth={isHighlighted ? "3" : "2"}
          fill="none"
          markerEnd={`url(#arrowhead-${variableName})`}
          className={`${styles.arrowPath} ${isHighlighted ? styles.highlighted : ''}`}
          onAnimationEnd={onAnimationEnd}
        />
      </svg>

      <div
        className={styles.pointerLabel}
        style={{
          position: 'absolute',
          left: '45px',
          top: '80px',
          backgroundColor: color,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'Courier New, monospace',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        {variableName}
      </div>
    </div>
  );
};

export default PointerArrow;