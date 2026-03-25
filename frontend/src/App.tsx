import { useState } from 'react';
import AgentTerminal from './components/AgentTerminal';
import DossierCard, { DossierData } from './components/DossierCard';

function App() {
  const [targetName, setTargetName] = useState('');
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [dossier, setDossier] = useState<DossierData | null>(null);

  const handleLaunch = () => {
    if (!targetName.trim()) return;
    setActiveTarget(targetName);
    setIsRunning(true);
    setDossier(null);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleComplete = (data: DossierData) => {
    setDossier(data);
    setIsRunning(false);
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1 className="title">KYC/AML Autonomous Operator</h1>
        <p className="subtitle">Powered by TinyFish Agentic Web Engine</p>
      </header>

      <div className="control-panel">
        <input 
          type="text" 
          className="input-field" 
          placeholder="Enter target corporate entity (e.g., 'Global Trade Corp')" 
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
          disabled={isRunning}
        />
        <button 
          className="btn" 
          onClick={handleLaunch} 
          disabled={isRunning || !targetName.trim()}
        >
          {isRunning ? 'Engaged' : 'Launch Recon'}
        </button>
        {isRunning && (
          <button className="btn" style={{ borderColor: 'var(--warning)', color: 'var(--warning)' }} onClick={handleStop}>
            Abort
          </button>
        )}
      </div>

      <div className="split-view">
        <AgentTerminal targetName={activeTarget} isRunning={isRunning} onComplete={handleComplete} />
        <DossierCard data={dossier} />
      </div>
    </div>
  );
}

export default App;
