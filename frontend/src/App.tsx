import { useState, useRef } from 'react';
import AgentWorkspace from './components/AgentWorkspace';

function App() {
  const [targetName, setTargetName] = useState('');
  const [activeTargets, setActiveTargets] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLaunch = () => {
    if (!targetName.trim()) return;
    setActiveTargets([targetName]);
  };

  const handleClear = () => {
    setTargetName('');
    setActiveTargets([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const names = text.split('\n')
        .map(line => line.split(',')[0].replace(/['"]/g, '').trim())
        .filter(n => n.length > 0);
      
      if (names.length > 0) {
        // Capping at 3 simultaneous threads for demo API safe-limits, can expand later
        setActiveTargets(names.slice(0, 3)); 
      }
    };
    reader.readAsText(file);
    // Reset input so they can upload again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="dashboard-container" style={{ height: 'auto', minHeight: '90vh' }}>
      <header className="header">
        <h1 className="title">KYC/AML Autonomous Operator</h1>
        <p className="subtitle">Powered by TinyFish Agentic Web Engine &amp; Spring WebFlux</p>
      </header>

      <div className="control-panel" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Enter single corporate entity (e.g., 'Tesla, Inc.')" 
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
        />
        <button 
          className="btn" 
          onClick={handleLaunch} 
          disabled={!targetName.trim()}
        >
          Launch Single Recon
        </button>

        <button 
          className="btn" 
          onClick={handleClear} 
          style={{ marginLeft: '10px', backgroundColor: 'transparent', borderColor: '#ef4444', color: '#ef4444' }}
        >
          Clear
        </button>

        <div style={{ width: '1px', height: '30px', background: 'var(--border-color)', margin: '0 1rem' }}></div>

        <input 
          type="file" 
          accept=".csv,.txt"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button 
          className="btn" 
          onClick={() => fileInputRef.current?.click()}
          style={{ borderColor: '#8b5cf6', color: '#8b5cf6' }}
        >
          Upload CSV Batch
        </button>
      </div>

      <div className="workspaces-container">
        {activeTargets.map((target, idx) => (
          <AgentWorkspace key={idx} targetName={target} />
        ))}
      </div>
    </div>
  );
}

export default App;
