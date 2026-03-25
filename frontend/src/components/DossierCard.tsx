import React from 'react';

export interface DossierData {
  target_company: string;
  directors_found?: string[];
  ofac_matches?: { name: string; status: string; details: string }[];
  risk_level: string;
}

export default function DossierCard({ data }: { data: DossierData | null }) {
  if (!data) {
    return (
      <div className="dossier-card empty">
        <div className="pulse" style={{ backgroundColor: 'var(--text-muted)', boxShadow: 'none' }}></div>
        <p>Awaiting Intelligence Dossier...</p>
      </div>
    );
  }

  return (
    <div className="dossier-card">
      <div className="dossier-header">
        <h2>Intelligence Dossier</h2>
        <span className={`risk-badge ${(data.risk_level || 'UNKNOWN').toLowerCase()}`}>
          Risk: {data.risk_level || 'EVALUATING'}
        </span>
      </div>
      <div className="dossier-section">
        <h3>Target Entity</h3>
        <p>{data.target_company || 'Unknown'}</p>
      </div>
      <div className="dossier-section">
        <h3>Board of Directors & Sanction Status</h3>
        <ul className="director-list">
          {data.ofac_matches?.map((match, idx) => (
            <li key={idx} className="director-item">
              <span className="director-name">{match.name}</span>
              <span className={`status-badge ${match.status === 'CLEAR' ? 'clear' : 'match'}`}>
                {match.status}
              </span>
            </li>
          )) || data.directors_found?.map((name, idx) => (
            <li key={idx} className="director-item">
              <span className="director-name">{name}</span>
              <span className="status-badge unknown">UNKNOWN</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
