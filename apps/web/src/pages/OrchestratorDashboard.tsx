import React from 'react';
import ReactFlow, { Background, Controls, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowRight,
  Plus,
  Monitor,
  Cpu
} from 'lucide-react';

const initialNodes: Node[] = [
  { id: '1', position: { x: 50, y: 150 }, data: { label: 'Lint & Validate' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' } },
  { id: '2', position: { x: 250, y: 50 }, data: { label: 'Unit Tests' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' } },
  { id: '3', position: { x: 250, y: 250 }, data: { label: 'SAST Scan' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' } },
  { id: '4', position: { x: 450, y: 150 }, data: { label: 'Build Docker Image' }, style: { background: '#4f46e5', color: '#fff', border: '1px solid #6366f1', borderRadius: '8px' } },
  { id: '5', position: { x: 650, y: 150 }, data: { label: 'Deploy to Staging' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
];

const KPI_CARDS = [
  { title: 'Total Active Pipelines', value: '142', trend: '8 deployed in last hour', color: 'indigo', icon: Play },
  { title: 'Avg. Lead Time', value: '14m 22s', trend: '-2m vs yesterday', color: 'emerald', icon: Clock },
  { title: 'Deployment Success', value: '98.4%', trend: 'No failed prod builds', color: 'blue', icon: CheckCircle2 },
  { title: 'Resource Overhead', value: '1.2 TB/m', trend: 'Artifact storage efficiency 92%', color: 'rose', icon: Cpu },
];

const OrchestratorDashboard = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pipeline Orchestration Hub</h1>
          <p className="text-slate-400">DAG-based workflow management across hybrid-cloud environments.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <Plus size={16} /> New Pipeline
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <Play size={16} /> Trigger Global Build
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
        {/* DAG Visualization */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Primary CI/CD DAG (v2.4.1)</h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                STEP: BUILD_IMAGE
              </span>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Edit Graph</button>
            </div>
          </div>
          <div className="flex-1 bg-slate-950/50">
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              fitView
              className="bg-slate-950"
            >
              <Background color="#1e293b" gap={20} />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        {/* Execution History */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Live Execution Feed</h3>
            <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-1 rounded border border-indigo-500/20">Real-time</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {[
              { id: 'exec-892', pipe: 'Core-API', status: 'Running', time: '2m ago', step: 'Docker Build' },
              { id: 'exec-891', pipe: 'Payment-Gateway', status: 'Success', time: '12m ago', step: 'Prod Deploy' },
              { id: 'exec-890', pipe: 'Auth-Engine', status: 'Failed', time: '24m ago', step: 'Linting' },
              { id: 'exec-889', pipe: 'Web-Portal', status: 'Success', time: '45m ago', step: 'Staging Deploy' },
              { id: 'exec-888', pipe: 'Data-Pipeline', status: 'Running', time: '1h ago', step: 'ETL Load' },
            ].map((exec, i) => (
              <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      exec.status === 'Running' ? 'bg-indigo-500 animate-pulse' :
                      exec.status === 'Success' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}></div>
                    <span className="font-semibold text-sm text-slate-200">{exec.pipe}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{exec.time}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-400 italic">#{exec.id} • {exec.step}</p>
                  <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-400 transition-all">
            View All Executions
          </button>
        </div>
      </div>

      {/* Artifact Store Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Build Artifacts (v3-scoped)</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Manage Storage</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Artifact Name</th>
                <th className="px-6 py-4 font-semibold">Version</th>
                <th className="px-6 py-4 font-semibold">Environment</th>
                <th className="px-6 py-4 font-semibold">Size</th>
                <th className="px-6 py-4 font-semibold">Security Scan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'core-api-server.tar.gz', ver: '2.4.1-rc1', env: 'STAGING', size: '1.2 GB', scan: 'PASSED' },
                { name: 'web-portal-frontend.zip', ver: '1.12.0', env: 'PROD', size: '450 MB', scan: 'PASSED' },
                { name: 'auth-middleware.js', ver: '0.8.4', env: 'DEV', size: '12 MB', scan: 'WARNING' },
                { name: 'data-worker-image.img', ver: '4.0.0', env: 'STAGING', size: '2.8 GB', scan: 'PASSED' },
              ].map((art, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">{art.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">{art.ver}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      art.env === 'PROD' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-500'
                    }`}>{art.env}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{art.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className={`w-4 h-4 ${art.scan === 'PASSED' ? 'text-emerald-500' : 'text-amber-500'}`} />
                      <span className="text-xs font-bold text-slate-300">{art.scan}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrchestratorDashboard;
