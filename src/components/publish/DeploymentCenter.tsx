import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  Send, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  Loader2
} from 'lucide-react';
import { TargetType } from '../../types/signage';

export const DeploymentCenter: React.FC = () => {
  const { 
    layouts, 
    screens, 
    deployments, 
    deployLayout, 
    rollbackDeployment 
  } = useSignage();

  const [selectedLayoutId, setSelectedLayoutId] = useState(layouts[0]?.id || 'lay-001');
  const [targetType, setTargetType] = useState<TargetType>('all');
  const [selectedGroup, setSelectedGroup] = useState('Flagship Stores');
  const [isDeploying, setIsDeploying] = useState(false);

  const selectedLayout = layouts.find(l => l.id === selectedLayoutId);
  const availableGroups = Array.from(new Set(screens.map(s => s.group)));

  let affectedScreens = screens;
  if (targetType === 'group') {
    affectedScreens = screens.filter(s => s.group === selectedGroup);
  }

  const handlePublish = async () => {
    if (!selectedLayout) return;

    setIsDeploying(true);
    let targets: string[] = [];
    if (targetType === 'group') targets = [selectedGroup];

    await deployLayout(selectedLayout.id, targetType, targets);
    setIsDeploying(false);
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Publish & Deploy
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Push layout updates to targeted displays across your network.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Publisher */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl surface-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">1. Select Layout</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {layouts.map(layout => {
                const isSelected = layout.id === selectedLayoutId;
                return (
                  <div
                    key={layout.id}
                    onClick={() => setSelectedLayoutId(layout.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-12 h-9 rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img
                        src={layout.thumbnailUrl}
                        alt={layout.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-slate-900 truncate block">{layout.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{layout.aspectRatio}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900">2. Target Displays</h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetType('all')}
                  className={`p-2 rounded-lg border text-xs font-semibold ${
                    targetType === 'all' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  All Screens ({screens.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTargetType('group')}
                  className={`p-2 rounded-lg border text-xs font-semibold ${
                    targetType === 'group' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  By Group
                </button>
              </div>

              {targetType === 'group' && (
                <div>
                  <select
                    value={selectedGroup}
                    onChange={e => setSelectedGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
                  >
                    {availableGroups.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600">Target Count: <strong className="text-slate-900">{affectedScreens.length} Displays</strong></span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Ready</span>
            </div>

            <button
              onClick={handlePublish}
              disabled={isDeploying || affectedScreens.length === 0}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-5">
          <div className="rounded-xl surface-card p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Deployment History</span>
            </h3>

            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {deployments.map(dep => (
                <div
                  key={dep.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 truncate">{dep.layoutName}</span>
                    <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-1 py-0.2 rounded">
                      {dep.version}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">{dep.targetSummary}</p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 text-[10px] text-slate-400">
                    <span>{dep.timestamp}</span>
                    {dep.status === 'completed' && (
                      <button
                        onClick={() => rollbackDeployment(dep.id)}
                        className="flex items-center gap-1 text-amber-700 font-semibold hover:underline"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rollback</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
