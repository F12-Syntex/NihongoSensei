import React, { useEffect, useState } from "react";
import "./JapaneseSentence.css";
import KanjiData from "@/kanji_data/KanjiData";
import Furigana from "./Furigana";
import { SortUpAlt } from "react-bootstrap-icons";
import { SentenceState } from "../SentenceState";
import ReactDOM from "react-dom";
import Browser from "@/components/browser/Browser";

type JapaneseSentenceProps = {
  text: string;
  parent_id: string;
  control_state: boolean;
};

const JapaneseSentence: React.FC<JapaneseSentenceProps> = (props) => {
  const words = findWords(props.text);
  const [highlightState, sethighlightState] = useState(false);

  const mouseHoverEvent = (event: any) => {
    sethighlightState(true);
  };

  const mouseLeaveEvent = (event: any) => {
    sethighlightState(false);
  };

  const handleMouseDown = () => {
    if (props.control_state) {
      return;
    }

    const ParentElement = document.getElementById(props.parent_id);

    if (ParentElement) {
      ReactDOM.render(
        <Browser
          url={`https://www.deepl.com/translator#ja/en/${props.text}`}
        />,
        ParentElement
      );
      ParentElement.style.width = "50%";
      ParentElement.style.height = "100%";
    } else {
      console.error(
        `Parent element with id '${props.parent_id}' does not exist in the DOM.`
      );
    }
  };

  const handleUserInput = (event: any) => {
    if (event.key == "Escape") {
      const ParentElement = document.getElementById(props.parent_id);
      if (ParentElement) {
        ReactDOM.unmountComponentAtNode(ParentElement);
        ParentElement.style.width = "0%";
        ParentElement.style.height = "0%";
      } else {
        console.error(
          `Parent element with id '${props.parent_id}' does not exist in the DOM.`
        );
      }
    }
  };

  //register event listener for keydown mouse down
  useEffect(() => {
    document.addEventListener("keydown", handleUserInput);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleUserInput);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    console.log("Control State: " + props.control_state);
    if (props.control_state) {
      const furiganaContainer = document.querySelector(
        ".nihongo-sensei-japanese-sentence-container-wrapper"
      );
      furiganaContainer?.addEventListener("mouseenter", mouseHoverEvent);
      furiganaContainer?.addEventListener("mouseleave", mouseLeaveEvent);
    }
    return () => {
      if (props.control_state) {
        const furiganaContainer = document.querySelector(
          ".nihongo-sensei-japanese-sentence-container-wrapper"
        );
        furiganaContainer?.removeEventListener("mouseenter", mouseHoverEvent);
        furiganaContainer?.removeEventListener("mouseleave", mouseLeaveEvent);
      }
    };
  }, [props.control_state]);

  return (
    <div className="nihongo-sensei-japanese-sentence-container-wrapper">
      <div className="nihongo-sensei-japanese-sentence-container-focused">
        {highlightState &&
          props.control_state &&
          words.map((word) => (
            <Furigana
              text={word}
              parent_id={props.parent_id}
              control_state={highlightState}
            />
          ))}
      </div>
      <div className="nihongo-sensei-japanese-sentence-container">
        {(!highlightState || !props.control_state) &&
          words.map((word) => (
            <Furigana
              text={word}
              parent_id={props.parent_id}
              control_state={false}
            />
          ))}
      </div>
    </div>
  );
};

function findWords(text: string) {
  let words = [];

  text = text
    .replace("[", "")
    .replace("]", "")
    .replace("。", "")
    .replace("、", "")
    .replace("「", "")
    .replace("」", "")
    .replace("（", "")
    .replace("）", "");

  let l: number = 0;
  let r: number = text.length - 1;

  while (l < r) {
    if (text[l] == "が") {
      l++;
      words.push("が");
      continue;
    }

    if (text[l] in [" ", "。", "", "、", "「", "」", "（", "）"]) {
      l++;
      words.push(text[l]);
      continue;
    }

    const word = text.substring(l, r);
    const results = KanjiData.getInstance().findKanjiByReading(word);
    if (results.length > 0) {
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
