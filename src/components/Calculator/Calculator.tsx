"use client";
import { useState } from "react";
import { evaluate, round } from "mathjs";
import { Calculator, History, Delete, X, Plus, Minus, Percent, ArrowLeftRight } from "lucide-react";
import "./Calculator.scss";

const AdvancedCalculator = () => {
  const [input, setInput] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const scientificFunctions = [
    { label: "(", func: "(" },
    { label: ")", func: ")" },
    { label: "abs", func: "abs" },
    { label: "mod", func: "mod" },
    { label: "exp", func: "exp" },
    { label: "√", func: "sqrt" },
    { label: "π", func: "pi" },
    { label: "e", func: "e" },
    { label: "x²", func: "^2" },
    { label: "x³", func: "^3" },
    { label: "x^y", func: "^" },
    { label: "10^x", func: "10^" },
    { label: "Ans", func: "Ans" },
    { label: "sin", func: "sin" },
    { label: "cos", func: "cos" },
    { label: "tan", func: "tan" },
    { label: "log", func: "log" },
  ];

  const handleButtonClick = (value: string) => {
    if (input === "0" || input === "Error") {
      setInput(value);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleScientificFunction = (func: string) => {
    const isConstant = ["pi", "e"].includes(func);
    const append = isConstant ? func : `${func}(`;
    setInput((prev) => (prev === "0" || prev === "Error" ? append : prev + append));
  };

  const calculateResult = () => {
    try {
      if (!input.trim() || input === "Error") return;
      let result = evaluate(input);
      result = round(result, 8);
      if (!isFinite(result)) throw new Error("Invalid result");
      setHistory((prev) => [`${input} = ${result}`, ...prev.slice(0, 9)]);
      setInput(result.toString());
    } catch {
      setInput("Error");
      setTimeout(() => setInput("0"), 1500);
    }
  };

  const clearInput = () => setInput("0");

  const deleteLastChar = () => {
    setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handlePercentage = () => {
    try {
      const result = evaluate(input) / 100;
      setInput(result.toString());
    } catch {
      setInput("Error");
      setTimeout(() => setInput("0"), 1500);
    }
  };

  const toggleSign = () => {
    if (input.startsWith("-")) {
      setInput(input.slice(1));
    } else {
      setInput("-" + input);
    }
  };

  return (
    <div className={`calculator-container flex justify-center p-4 ${darkMode ? "dark-mode" : ""}`}>
      <div
        className={`w-full max-w-[360px] rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#1f1f1f] text-white" : "bg-white text-gray-900"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 font-semibold">
            <Calculator size={20} />
            <span>Advanced Calculator</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${darkMode ? "bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] justify-end" : "bg-gray-300 justify-start"}`}
            >
              <span className="w-4 h-4 rounded-full bg-white mx-1 shadow-sm transition-transform duration-300"></span>
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-1.5 rounded-md transition-colors ${showHistory ? "bg-[#a200ff]/10 text-[#ff3b7c] dark:bg-blue-900 dark:text-blue-300" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              <History size={18} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Display */}
          <input
            type="text"
            value={input}
            readOnly
            className={`w-full text-right text-3xl h-16 mb-4 px-3 rounded-lg border-none focus:outline-none ${darkMode ? "bg-[#2a2a2a] text-white" : "bg-gray-100 text-gray-900"}`}
          />

          {/* History Panel */}
          {showHistory && history.length > 0 && (
            <div
              className={`mb-4 rounded-lg overflow-hidden border ${darkMode ? "border-gray-700 bg-[#2a2a2a]" : "border-gray-200 bg-gray-50"}`}
            >
              <div className="flex justify-between items-center p-2 border-b border-inherit">
                <span className="text-xs font-semibold text-gray-500 uppercase">History</span>
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="max-h-40 overflow-y-auto p-2 space-y-2">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className={`text-sm font-mono text-right p-1.5 rounded ${darkMode ? "bg-[#333]" : "bg-white shadow-sm"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standard Controls */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            <button
              className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-1"
              onClick={clearInput}
            >
              AC
            </button>
            <button
              className={`py-3 rounded-lg transition-colors flex items-center justify-center ${darkMode ? "bg-[#333] hover:bg-[#444]" : "bg-gray-100 hover:bg-gray-200"}`}
              onClick={deleteLastChar}
            >
              <Delete size={18} />
            </button>
            <button
              className={`py-3 rounded-lg transition-colors flex items-center justify-center ${darkMode ? "bg-[#333] hover:bg-[#444]" : "bg-gray-100 hover:bg-gray-200"}`}
              onClick={handlePercentage}
            >
              <Percent size={18} />
            </button>
          </div>

          {/* Number Pad & Basic Operators */}
          {[
            [{ label: "7" }, { label: "8" }, { label: "9" }, { label: "*", icon: <X size={18} /> }],
            [
              { label: "4" },
              { label: "5" },
              { label: "6" },
              { label: "-", icon: <Minus size={18} /> },
            ],
            [
              { label: "1" },
              { label: "2" },
              { label: "3" },
              { label: "+", icon: <Plus size={18} /> },
            ],
          ].map((row, i) => (
            <div className="grid grid-cols-4 gap-2 mb-2" key={i}>
              {row.slice(0, 3).map((btn) => (
                <button
                  key={btn.label}
                  className={`text-lg font-medium py-3 rounded-lg transition-colors ${darkMode ? "bg-[#2a2a2a] hover:bg-[#333]" : "bg-white border border-gray-200 hover:bg-gray-50"}`}
                  onClick={() => handleButtonClick(btn.label)}
                >
                  {btn.label}
                </button>
              ))}
              <button
                className="bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] hover:opacity-90 transition-opacity text-white py-3 rounded-lg transition-colors flex items-center justify-center"
                onClick={() => handleButtonClick(row[3].label)}
              >
                {row[3].icon}
              </button>
            </div>
          ))}

          {/* Bottom Row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <button
              className={`py-3 rounded-lg transition-colors flex items-center justify-center ${darkMode ? "bg-[#333] hover:bg-[#444]" : "bg-gray-100 hover:bg-gray-200"}`}
              onClick={toggleSign}
            >
              <ArrowLeftRight size={18} />
            </button>
            <button
              className={`text-lg font-medium py-3 rounded-lg transition-colors ${darkMode ? "bg-[#2a2a2a] hover:bg-[#333]" : "bg-white border border-gray-200 hover:bg-gray-50"}`}
              onClick={() => handleButtonClick("0")}
            >
              0
            </button>
            <button
              className={`text-lg font-medium py-3 rounded-lg transition-colors ${darkMode ? "bg-[#2a2a2a] hover:bg-[#333]" : "bg-white border border-gray-200 hover:bg-gray-50"}`}
              onClick={() => handleButtonClick(".")}
            >
              .
            </button>
            <button
              className="bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] hover:opacity-90 transition-opacity text-white text-xl font-bold py-3 rounded-lg transition-colors"
              onClick={calculateResult}
            >
              =
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Scientific
            </span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>

          {/* Scientific Functions */}
          <div className="grid grid-cols-4 gap-2">
            {scientificFunctions.map((func, index) => (
              <button
                key={index}
                title={func.func}
                className={`text-sm py-2 rounded transition-colors ${darkMode ? "bg-[#333] hover:bg-[#444]" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => handleScientificFunction(func.func)}
              >
                {func.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCalculator;
