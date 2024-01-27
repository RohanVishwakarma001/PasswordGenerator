import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [passLength, setPassLength] = useState(6);
  const [numInclude, setNumInclude] = useState(false);
  const [charInclude, setCharInclude] = useState(false);
  const [password, setPassword] = useState();
  const passRef = useRef(null);

  const copyPass = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, passLength + 1);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopgrstuvwxyz";
    if (numInclude) {
      str += "0123456789";
    } else if (charInclude) {
      str += "@#$&|";
    }
    for (let i = 0; i <= passLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [passLength, numInclude, charInclude, setPassword]);
  useEffect(() => {
    passGenerator();
  }, [passLength, numInclude, charInclude, setPassword]);
  return (
    <>
      <div className="mainDiv">
        <h1 className="heading">Password Generator:</h1>
        <div className="centerDiv">
          <div className="mainContant">
            <div className="inputDiv">
              <input
                type="text"
                value={password}
                placeholder="Password"
                readOnly
                ref={passRef}
              />
              <button
                onClick={copyPass}
                className="outline-none bg-green-400 text-white px-3 py-0.5 shrink-0"
              >
                Copy
              </button>
            </div>
            <div className="inputSec">
              <div className="flex items-center gap-x-1">
                <label className="text-white">Length : {passLength}</label>
                <input
                  type="range"
                  min={6}
                  max={20}
                  value={passLength}
                  className="cursor-pointer"
                  onChange={(e) => {
                    setPassLength(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center gap-x-1">
                <label className="text-white">Number :</label>
                <input
                  type="checkbox"
                  defaultValue={numInclude}
                  id="numInclude"
                  onChange={() => {
                    setNumInclude((prev) => !prev);
                  }}
                />
              </div>
              <div className="flex items-center gap-x-1">
                <label className="text-white">Character :</label>
                <input
                  type="checkbox"
                  defaultValue={charInclude}
                  id="numInclude"
                  onChange={() => {
                    setCharInclude((prev) => !prev);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
