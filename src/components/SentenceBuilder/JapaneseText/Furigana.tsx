import React, { useState } from 'react';
import './Furigana.css';
import KanjiData from '@/kanji_data/KanjiData';

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

  const handleMouseDown = () => {
    
  }

  const kana : any = KanjiData.getInstance().findKanjiByReading(props.text)[0];

 let readings : any = [];

  if (kana) {
    readings = Array.from(kana.readings);
  }

  console.log(kana);

  return (
    <div className="nihongo-sensei-furigana-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
     {isHovered && (
      <div className="nihongo-sensei-furigana-kana-text">
        {readings.map((readings: any, index: any) => (
          <div key={index}>{readings}</div>
        ))}
      </div>
    )}
      <div className={`nihongo-sensei-furigana-text`}>
        {props.text}
      </div>
    </div>
  );
};

export default Furigana;
