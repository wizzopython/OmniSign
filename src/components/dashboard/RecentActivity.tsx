import React from 'react';
import { useSignage } from '../../context/SignageContext';
import { CheckCircle2, Clock, Activity, AlertCircle, ArrowUpRight, Radio } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const { auditLogs, deployments } = useSignage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Real-Time Security Audit Stream (Col 6) */}
      <div className="lg:col-span-6 bento-card p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                Real-Time Security Audit
              </h3>
              <p className="text-[11px] text-slate-500">Immutable hardware & administrative operation trail</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Streaming
          </span>
        </div>

        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {auditLogs.slice(0, 4).map(log => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-indigo-200 transition-all flex items-start gap-3 text-xs"
            >
              <div className="mt-0.5 p-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                {log.status === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 truncate">{log.action}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{log.timestamp.split(' ')[1]}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{log.details}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-400">
                  <span className="font-bold text-indigo-700">{log.userName}</span>
                  <span>•</span>
                  <span className="truncate">{log.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Deployment Stream (Col 6) */}
      <div className="lg:col-span-6 bento-card p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                Target Deployments
              </h3>
              <p className="text-[11px] text-slate-500">Live payload propagation across screen groups</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-bold">
            {deployments.length} Releases
          </span>
        </div>

        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {deployments.slice(0, 4).map(dep => (
            <div
              key={dep.id}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-cyan-200 transition-all flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 truncate">{dep.layoutName}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {dep.version}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">{dep.targetSummary}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-400 font-mono">
                  <span>Pushed by {dep.publishedBy}</span>
                  <span>•</span>
                  <span>{dep.timestamp.split(' ')[1]}</span>
                </div>
              </div>

              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                ACTIVE
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
