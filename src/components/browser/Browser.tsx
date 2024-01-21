import "./Browser.css";

interface BrowserProps {
  url: string;
}

export default function Browser({ url }: BrowserProps) {
  return (
    <>
      <div className='nihongo-sensei-browser-container'>
        <webview src={url} data-home={url} id='nihongo-sensei-browser-webview'></webview>
      </div>
    </>
  );
}