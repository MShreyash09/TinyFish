import { useState } from 'react';
import AgentTerminal from './AgentTerminal';
import DossierCard, { DossierData } from './DossierCard';

export default function AgentWorkspace({ targetName }: { targetName: string }) {
  const [isRunning, setIsRunning] = useState(true);
  const [dossier, setDossier] = useState<DossierData | null>(null);

  const handleComplete = (data: DossierData) => {
    setDossier(data);
    setIsRunning(false);
  };

  return (
    <div className="workspace-instance" style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <h3 style={{ color: '#8b5cf6', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}>
          [ORCHESTRATOR NODE] Thread Active: {targetName}
        </h3>
        {isRunning && (
          <button 
            onClick={() => setIsRunning(false)} 
            className="btn" 
            style={{ borderColor: 'var(--warning)', color: 'var(--warning)', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
          >
            Abort Thread
          </button>
        )}
      </div>
      <div className="split-view">
        <AgentTerminal targetName={targetName} isRunning={isRunning} onComplete={handleComplete} />
        <DossierCard data={dossier} />
      </div>
    </div>
  );
}
