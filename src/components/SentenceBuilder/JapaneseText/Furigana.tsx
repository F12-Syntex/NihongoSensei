import React, { useState } from 'react';
import './Furigana.css';

type FuriganaProps = {
  text: string;
};

const Furigana: React.FC<FuriganaProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="nihongo-sensei-furigana-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div className="nihongo-sensei-furigana-kana-text">
          Additional content to display when hovered
        </div>
      )}
      <div className={`nihongo-sensei-furigana-text`}>
        {props.text}
      </div>
    </div>
  );
};

export default Furigana;
