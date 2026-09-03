import React, { useState } from 'react';
import { useSignage } from '../../context/SignageContext';
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Check, 
  X, 
  Mail
} from 'lucide-react';
import { UserRole } from '../../types/signage';
import { getRoleBadge } from '../../utils/helpers';
import { Modal } from '../common/Modal';

export const UserManagement: React.FC = () => {
  const { users, currentUser, setCurrentUserRole, auditLogs } = useSignage();

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('content_manager');

  const permissionsMatrix = [
    { module: 'Device Fleet Operations (Reboot, Sync)', super_admin: true, content_manager: false, operator: true, viewer: false },
    { module: 'Pairing Hardware Displays', super_admin: true, content_manager: false, operator: true, viewer: false },
    { module: 'Canvas Studio & Layouts', super_admin: true, content_manager: true, operator: false, viewer: false },
    { module: 'Asset Repository (4K Media Uploads)', super_admin: true, content_manager: true, operator: false, viewer: false },
    { module: 'Scheduling & Dayparting Rules', super_admin: true, content_manager: true, operator: false, viewer: false },
    { module: 'Publishing to Fleet Displays', super_admin: true, content_manager: true, operator: false, viewer: false },
    { module: 'Emergency Broadcast Override', super_admin: true, content_manager: false, operator: true, viewer: false },
    { module: 'Proof-of-Play & Analytics', super_admin: true, content_manager: true, operator: true, viewer: true },
  ];

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            User Roles & Access Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage administrative permissions and team accounts.
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {users.map(user => {
          const badge = getRoleBadge(user.role);
          const isCurrent = currentUser.id === user.id;

          return (
            <div
              key={user.id}
              className={`p-4 rounded-xl surface-card flex flex-col justify-between ${
                isCurrent ? 'ring-2 ring-blue-500 shadow-sm' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.badgeClass}`}>
                    {badge.label}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{user.name}</h3>
                <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{user.email}</span>
                </p>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                {isCurrent ? (
                  <span className="text-[10px] font-bold text-blue-600">Active User</span>
                ) : (
                  <button
                    onClick={() => setCurrentUserRole(user.role)}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Switch Role
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-xl surface-card p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Role Permissions Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Capability</th>
                <th className="py-2.5 px-3 font-semibold text-center">Super Admin</th>
                <th className="py-2.5 px-3 font-semibold text-center">Content Mgr</th>
                <th className="py-2.5 px-3 font-semibold text-center">Operator</th>
                <th className="py-2.5 px-3 font-semibold text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-medium text-slate-800">{item.module}</td>
                  <td className="py-2.5 px-3 text-center">
                    {item.super_admin ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.content_manager ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.operator ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.viewer ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Invite Member"
        subtitle="Add a new administrator to the digital signage platform"
        maxWidth="sm"
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            setIsAddUserOpen(false);
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              placeholder="jordan@company.com"
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
            <select
              value={userRole}
              onChange={e => setUserRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
            >
              <option value="super_admin">Super Admin</option>
              <option value="content_manager">Content Manager</option>
              <option value="operator">Operator</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddUserOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg"
            >
              Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
