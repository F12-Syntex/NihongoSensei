import React, { useEffect, useState } from 'react';
import './Furigana.css';
import KanjiData from '@/kanji_data/KanjiData';
import Browser from '@/components/browser/Browser';
import ReactDOM from 'react-dom';

type FuriganaProps = {
  text: string;
  parent_id: string;
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
    const ParentElement = document.getElementById(props.parent_id);
  
    if (ParentElement) {
      ReactDOM.render(<Browser url={`https://jisho.org/search/${props.text}`} />, ParentElement);
      ParentElement.style.width = "50%";
      ParentElement.style.height = "100%";
    } else {
      console.error(`Parent element with id '${props.parent_id}' does not exist in the DOM.`);
    }
  }
  
   const handleUserInput = (event: any) => {
     if(event.key == 'Escape'){
        const ParentElement = document.getElementById(props.parent_id);
        if (ParentElement) {
          ReactDOM.unmountComponentAtNode(ParentElement);
          ParentElement.style.width = "0%";
          ParentElement.style.height = "0%";
        } else {
          console.error(`Parent element with id '${props.parent_id}' does not exist in the DOM.`);
        }
     }
   };
 
   // Use useEffect hook to add event listener when component mounts
   useEffect(() => {
      document.addEventListener('keydown', handleUserInput);
     return () => {
       document.removeEventListener('keydown', handleUserInput);
     };
   }, []); 
 
  

  const kana : any = KanjiData.getInstance().findKanjiByReading(props.text)[0];

 let readings : any = [];
 let meanings : any = [];

  if (kana) {
    readings = Array.from(kana.readings);
    readings[2] = readings[2].replace("n", "Noun").replace("adv", "Adverb");
    // meanings = Array.from(kana.meanings);
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
        <div className="nihongo-sensei-furigana-kana-text">
          {meanings.map((meanings: any, index: any) => (
            <div key={index}>{meanings}</div>
           ))}
          {readings[1]}
        </div>
      </div>
    )}
      <div className={`nihongo-sensei-furigana-text`}>
        {props.text}
      </div>
    </div>
  );
};

export default Furigana;
