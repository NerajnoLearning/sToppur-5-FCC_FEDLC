import React from 'react';
import Timer from './components/Timer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">25 + 5 Clock</h1>
        <Timer />
      </div>
    </div>
  );
};

export default App;
