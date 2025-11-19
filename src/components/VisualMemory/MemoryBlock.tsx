import React from 'react';
import styles from './MemoryBlock.module.css';

interface MemoryBlockProps {
  address: number;
  value: any;
  dataType: string;
  isHighlighted?: boolean;
  isArrayElement?: boolean;
  arrayIndex?: number;
  onClick?: () => void;
}

const MemoryBlock: React.FC<MemoryBlockProps> = ({
  address,
  value,
  dataType,
  isHighlighted = false,
  isArrayElement = false,
  arrayIndex,
  onClick
}) => {
  const formatAddress = (addr: number): string => {
    return `0x${addr.toString(16).toUpperCase().padStart(4, '0')}`;
  };

  const formatValue = (val: any): string => {
    if (val === undefined || val === null) {
      return 'undef';
    }
    if (typeof val === 'string') {
      return val.length > 8 ? `"${val.substring(0, 8)}..."` : `"${val}"`;
    }
    if (typeof val === 'boolean') {
      return val ? 'TRUE' : 'FALSE';
    }
    return String(val);
  };

  const getDataTypeColor = (type: string): string => {
    switch (type) {
      case 'INTEGER':
      case 'POINTER_TO_INTEGER':
        return '#4CAF50'; // Green
      case 'REAL':
      case 'POINTER_TO_REAL':
        return '#2196F3'; // Blue
      case 'CHAR':
      case 'POINTER_TO_CHAR':
        return '#FF9800'; // Orange
      case 'STRING':
        return '#9C27B0'; // Purple
      case 'BOOLEAN':
        return '#F44336'; // Red
      case 'VOID_POINTER':
        return '#607D8B'; // Blue Grey
      case 'ARRAY':
        return '#795548'; // Brown
      default:
        return '#9E9E9E'; // Grey
    }
  };

  const cellColor = getDataTypeColor(dataType);

  return (
    <div
      className={`${styles.memoryBlock} ${isHighlighted ? styles.highlighted : ''} ${isArrayElement ? styles.arrayElement : ''}`}
      style={{ borderColor: cellColor }}
      onClick={onClick}
      title={`Address: ${formatAddress(address)}\nType: ${dataType}\nValue: ${formatValue(value)}`}
    >
      {arrayIndex !== undefined && (
        <div className={styles.arrayIndex}>
          [{arrayIndex}]
        </div>
      )}
      <div className={styles.address}>
        {formatAddress(address)}
      </div>
      <div className={styles.value} style={{ color: cellColor }}>
        {formatValue(value)}
      </div>
    </div>
  );
};

export default MemoryBlock;