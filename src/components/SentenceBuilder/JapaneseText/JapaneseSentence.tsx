import React, { useEffect, useState } from 'react';
import './JapaneseSentence.css';
import KanjiData from '@/kanji_data/KanjiData';
import Furigana from './Furigana';
import { SortUpAlt } from 'react-bootstrap-icons';
import { SentenceState } from '../SentenceState';

type JapaneseSentenceProps = {
  text: string;
  parent_id: string;
};

const JapaneseSentence: React.FC<JapaneseSentenceProps> = (props) => {

  const words = findWords(props.text);

  const mouseHoverEvent = (event: any) => {
    
  };

  return (
    <div className="nihongo-sensei-japanese-sentence-container" onMouseEnter={mouseHoverEvent}>
      {
        words.map((word) => {
          return <Furigana text={word} parent_id={props.parent_id} />
        })
      }
    </div>
  );
};

function findWords(text: string) {
  let words = [];

  text = text.replace("[", "").replace("]", "").replace("。", "").replace("、", "").replace("「", "").replace("」", "").replace("（", "").replace("）", "")
  
  let l : number = 0
  let r : number = text.length - 1;


  while(l < r){
    if(text[l] == "が"){
      l++;
      words.push("が");
      continue;
    }

    if(text[l] in [" ", "。", "", "、", "「", "」", "（", "）"]){
      l++;
      words.push(text[l]);
      continue;
    }

    const word = text.substring(l, r);
    const results = KanjiData.getInstance().findKanjiByReading(word);
    if(results.length > 0) {
      words.push(word);
      l = r;
      r = text.length;
    }
    r--;
  } 

  words.push(text.substring(l, text.length - 1));

  return words;
}

export default JapaneseSentence;
