import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import PatientView from './components/PatientView';
import TimelineView from './components/TimelineView';
import ChatView from './components/ChatView';
import NarrativeView from './components/NarrativeView';
import InsightsView from './components/InsightsView';
import AlertsView from './components/AlertsView';
import RightCol from './components/RightCol';
import Flyout from './components/Flyout';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('patients');
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const renderActiveView = () => {
    switch (activeView) {
      case 'patients':
        return <PatientView onOpenFlyout={(id) => setSelectedPatientId(id)} />;
      case 'timeline':
        return <TimelineView />;
      case 'chat':
        return <ChatView />;
      case 'narrative':
        return <NarrativeView />;
      case 'insights':
        return <InsightsView />;
      case 'alerts':
        return <AlertsView />;
      default:
        return <PatientView onOpenFlyout={(id) => setSelectedPatientId(id)} />;
    }
  };

  return (
    <div className="shell">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="main-col">
        <TopBar activeView={activeView} />
        <div className="content">
          {renderActiveView()}
        </div>
      </div>

      <RightCol />

      {selectedPatientId && (
        <Flyout
          patientId={selectedPatientId}
          onClose={() => setSelectedPatientId(null)}
          onViewChange={(view) => {
            setActiveView(view);
            setSelectedPatientId(null);
          }}
        />
      )}
    </div>
  );
}
