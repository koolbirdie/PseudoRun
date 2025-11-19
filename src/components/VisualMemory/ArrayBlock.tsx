import React from 'react';
import MemoryBlock from './MemoryBlock';
import styles from './ArrayBlock.module.css';

interface ArrayBlockProps {
  arrayName: string;
  baseAddress: number;
  elements: Array<{
    address: number;
    value: any;
    index: number;
  }>;
  elementType: string;
  highlightedIndices?: number[];
  onElementClick?: (index: number, address: number) => void;
}

const ArrayBlock: React.FC<ArrayBlockProps> = ({
  arrayName,
  baseAddress,
  elements,
  elementType,
  highlightedIndices = [],
  onElementClick
}) => {
  const formatArrayInfo = () => {
    const dimensions = elements.length > 0 ? `[${elements.length}]` : '[]';
    return `${arrayName}${dimensions} (${elementType})`;
  };

  return (
    <div className={styles.arrayBlock}>
      <div className={styles.arrayHeader}>
        <h4 className={styles.arrayTitle}>{formatArrayInfo()}</h4>
        <span className={styles.arrayAddress}>
          Base: 0x{baseAddress.toString(16).toUpperCase().padStart(4, '0')}
        </span>
      </div>

      <div className={styles.arrayElements}>
        {elements.map((element) => (
          <div key={element.address} className={styles.elementWrapper}>
            <div className={styles.indexLabel}>
              {element.index}
            </div>
            <MemoryBlock
              address={element.address}
              value={element.value}
              dataType={elementType}
              isHighlighted={highlightedIndices.includes(element.index)}
              isArrayElement={true}
              arrayIndex={element.index}
              onClick={() => onElementClick?.(element.index, element.address)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayBlock;