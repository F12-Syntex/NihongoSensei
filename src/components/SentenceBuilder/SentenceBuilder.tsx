import Furigana from "./JapaneseText/Furigana";
import "./SentenceBuilder.css";

function SentenceBuilder() {
  return (
    <div className="nihongo-sensei-sentence-builder-container">
      
        <Furigana text={"鳥"} />
        <Furigana text={"は"} />
        <Furigana text={"料理人"} />
        <Furigana text={"が"} />
        <Furigana text={"ほどよく"} />
        <Furigana text={"焼いた"} />
    </div>
  );
}

export default SentenceBuilder;
