import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(true);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef<HTMLInputElement>(null);

  const copyPassword = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
    }
  }, [password]);


  const generatePassword = useCallback(() => {
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let characterSet = "";
    if (numberAllowed) characterSet += numbers;
    if (symbolAllowed) characterSet += symbols;
    if (lowercaseAllowed) characterSet += lowercase;
    if (uppercaseAllowed) characterSet += uppercase;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      generatedPassword += characterSet[randomIndex];
    }
    setPassword(generatedPassword);
  }, [
    length,
    numberAllowed,
    symbolAllowed,
    lowercaseAllowed,
    uppercaseAllowed,
    setPassword,
  ]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed, lowercaseAllowed, uppercaseAllowed, generatePassword]);

  return (
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-green-500 bg-gray-800">
      <h1 className="text-4xl text-center text-blue-500 my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3 bg-white"
          value={password}
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPassword}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-3">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min="4"
            max="100"
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numbers"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="symbols"
            checked={symbolAllowed}
            onChange={(e) => setSymbolAllowed(e.target.checked)}
          />
          <label htmlFor="symbols">Symbols</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="lowercase"
            checked={lowercaseAllowed}
            onChange={(e) => setLowercaseAllowed(e.target.checked)}
          />
          <label htmlFor="lowercase">Lowercase</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="uppercase"
            checked={uppercaseAllowed}
            onChange={(e) => setUppercaseAllowed(e.target.checked)}
          />
          <label htmlFor="uppercase">Uppercase</label>
          
        </div>
      </div>
    </div>
  );
}

export default App;
