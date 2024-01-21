import { useEffect, useState } from "react";
import Furigana from "./JapaneseText/Furigana";
import "./SentenceBuilder.css";
import kuromoji from 'kuromoji';
import axios from 'axios';
import JishoAPI from 'unofficial-jisho-api';
import JapaneseSentence from "./JapaneseText/JapaneseSentence";
import { SentenceState } from './SentenceState';


function SentenceBuilder() {

  const [Focus, setIsFocus] = useState(false); 
  
  // Tokenize the Japanese sentence using kuromoji
  const sentence = "話すことは人間の能力の一つである";
  
  const keyEvent = (event: any) => { 
    if(event.key == "Control"){
      SentenceState.getInstance().setState(true);
    }
  };

  const keyDownEvent = (event: any) => {
    if(event.key == "Control"){
      SentenceState.getInstance().setState(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyEvent);
    document.addEventListener('keyup', keyDownEvent);
    return () => {
      document.removeEventListener('keydown', keyEvent);
      document.removeEventListener('keyup', keyDownEvent);
    };
  }, []); 

  return (
    <div className="nihongo-sensei-sentence-builder-container">
      <div className="nihongo-sensei-sentence-builder-content">
        <JapaneseSentence text={sentence} parent_id="sentence-builder"/>
      </div>
      <div className="nihongo-sensei-sentence-builder-metainformation" id="sentence-builder"></div>
    </div>
  );
}

export default SentenceBuilder;
