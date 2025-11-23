import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
    } else if (val === '=') {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(equation + display).toString();
        setDisplay(res);
        setEquation('');
      } catch {
        setDisplay('Error');
      }
    } else if (['+', '-', '*', '/'].includes(val)) {
      setEquation(equation + display + val);
      setDisplay('0');
    } else {
      setDisplay(display === '0' ? val : display + val);
    }
  };

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', '']
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white p-4">
      <div className="flex-1 flex flex-col justify-end items-end pb-8 space-y-2">
        <div className="text-gray-400 text-xl h-6">{equation}</div>
        <div className="text-6xl font-light">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-4 pb-8">
        {buttons.flat().map((btn, i) => (
            btn === '' ? <div key={i}></div> :
          <button
            key={i}
            onClick={() => handlePress(btn)}
            className={`h-20 w-20 rounded-full flex items-center justify-center text-2xl font-medium transition-colors active:opacity-70
              ${['/', '*', '-', '+', '='].includes(btn) ? 'bg-orange-500 text-white' : 
                btn === 'C' ? 'bg-gray-300 text-black' : 'bg-gray-800 text-white'}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;