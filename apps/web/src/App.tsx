import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import OrchestratorDashboard from './pages/OrchestratorDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The orchestration engine is currently syncing this view. Please wait for the DAG dependency resolution to complete.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<OrchestratorDashboard />} />
          <Route path="/executions" element={<Placeholder name="Live Execution Pipeline" />} />
          <Route path="/dag" element={<Placeholder name="DAG Graph Designer" />} />
          <Route path="/schedules" element={<Placeholder name="Event & Cron Scheduler" />} />
          <Route path="/promotion" element={<Placeholder name="Environment Promotion Workflows" />} />
          <Route path="/artifacts" element={<Placeholder name="Artifact Repository" />} />
          <Route path="/governance" element={<Placeholder name="Pipeline Governance & Policy" />} />
          <Route path="/logs" element={<Placeholder name="Centralized Pipeline Logs" />} />
          <Route path="/health" element={<Placeholder name="Orchestrator Cluster Health" />} />
          <Route path="/settings" element={<Placeholder name="Global Orchestrator Config" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
