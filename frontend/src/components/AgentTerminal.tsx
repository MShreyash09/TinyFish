/// <reference types="vite/client" />
import { useEffect, useState, useRef } from 'react';

interface AgentTerminalProps {
  targetName: string | null;
  isRunning: boolean;
  onComplete: (data: any) => void;
}

const AgentTerminal = ({ targetName, isRunning, onComplete }: AgentTerminalProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Scroll to bottom whenever logs update
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (!isRunning || !targetName) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        setLogs(prev => [...prev, '[SYSTEM] Connection terminated by user.']);
      }
      return;
    }

    setLogs(['[SYSTEM] Initializing TinyFish Stealth Browser...', `[SYSTEM] Target Acquired: ${targetName}`, '[SYSTEM] Establishing secure SSE connection to orchestration backend...']);

    // Dynamically connect to the Production Backend OR Local Dev Server 
    const isRelative = import.meta.env.VITE_USE_RELATIVE_API === 'true';
    const backendUrl = isRelative ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:8080');
    
    const es = new EventSource(`${backendUrl}/api/kyc/investigate?company=${encodeURIComponent(targetName)}`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      // In a real stream, parsing JSON or just using raw text lines. TinyFish sends SSE text.
      setLogs(prev => [...prev, `[AGENT] ${event.data}`]);
      
      if (event.data.includes('"type":"COMPLETE"')) {
        es.close();
        setLogs(prev => [...prev, '[SYSTEM] Reconnaissance Complete. Connection closed gracefully.']);
        try {
          const payload = JSON.parse(event.data);
          let extractedData = null;
          
          // Recursive search for the actual dossier data because LLM keys can fluctuate
          const findDossier = (obj: any): any => {
            if (!obj || typeof obj !== 'object') return null;
            if (obj.target_company && obj.risk_level) return obj; // Found the core object!
            for (const key in obj) {
              const res = findDossier(obj[key]);
              if (res) return res;
            }
            return null;
          };
          
          // First try to find the dossier object organically
          extractedData = findDossier(payload.result);
          
          // Fallback if structured slightly differently
          if (!extractedData) {
              extractedData = payload.result?.phase_3?.embedded_json || 
                              payload.result?.phase_3 || 
                              payload.result?.phase3 || 
                              payload.result;
          }

          if (extractedData) onComplete(extractedData);
        } catch (e) {
          console.error("Parse error", e);
        }
      }
    };

    es.onerror = (err) => {
      console.error('SSE Error:', err);
      setLogs(prev => [...prev, '[ERROR] Disconnected from Agent Orchestrator. Retrying state...']);
      es.close();
    };

    return () => {
      es.close();
    };
  }, [isRunning, targetName]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
        <div className="terminal-title">~/tinyfish/kyc-agent &mdash; bash</div>
        <div style={{ flex: 1 }}></div>
        {isRunning && (
          <div className="status-indicator">
            <div className="pulse"></div>
            <span>LIVE</span>
          </div>
        )}
      </div>
      <div className="terminal-body">
        {logs.map((log, idx) => (
          <div key={idx} className="log-line">
            <span className="log-prefix">►</span>
            <span>{log}</span>
          </div>
        ))}
        {isRunning && (
          <div className="log-line" style={{ color: 'var(--text-muted)' }}>
            <span className="log-prefix">_</span>
            <span style={{ animation: 'pulse-anim 1s infinite' }}>Awaiting telemetry...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default AgentTerminal;
