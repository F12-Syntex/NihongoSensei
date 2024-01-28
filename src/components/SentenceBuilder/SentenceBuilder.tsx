import { useEffect, useState } from "react";
import Furigana from "./JapaneseText/Furigana";
import "./SentenceBuilder.css";
import kuromoji from "kuromoji";
import axios from "axios";
import JapaneseSentence from "./JapaneseText/JapaneseSentence";
import { SentenceState } from "./SentenceState";

function SentenceBuilder() {
  const [hoveredWord, setHoveredWord] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey) {
        setIsFocused(true);
      }
    };

    const handleKeyUp = (event: any) => {
      if (!event.ctrlKey) {
        setIsFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Tokenize the Japanese sentence using kuromoji
  const sentence = "話すことは人間の能力の一つである";

  return (
    <div className="nihongo-sensei-sentence-builder-container">
      <div className="nihongo-sensei-sentence-builder-content">
        <JapaneseSentence text={sentence} parent_id="sentence-builder" control_state={isFocused} />
      </div>
      <div
        className="nihongo-sensei-sentence-builder-metainformation"
        id="sentence-builder"
      >
      </div>
    </div>
  );
}

export default SentenceBuilder;
