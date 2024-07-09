import { useRef, useState } from "react";

function Standings() {
  const [isLoaded, setIsLoaded] = useState(false);
  const iFrameRef = useRef(null);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="h-screen w-screen">
      {!isLoaded && <div>Loading...</div>}
      <iframe
        title="Tablica"
        src="https://widgets.hrnogomet.hr/standings?league=1ZNLVS"
        width="100%"
        height="100%"
        ref={iFrameRef}
        onLoad={handleLoad}
      />
    </div>
  );
}

export default Standings;
