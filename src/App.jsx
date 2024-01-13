import React, { useState, useEffect } from "react";
import Load from "./components/loading.jsx";
import Text from "./components/textani.jsx";
import CardStack from "./cardstack_test.jsx";

function App() {
  const [showLoad, setShowLoad] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setShowLoad(false);
      setShowText(true);
    }, 3000);

    const textTimer = setTimeout(()=>{
      setShowText(false);
    },5500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div>
      {showLoad && <Load />}
      {showText && <Text />}
      {!showLoad && !showText && <CardStack />}
    </div>
  );
}

export default App;
