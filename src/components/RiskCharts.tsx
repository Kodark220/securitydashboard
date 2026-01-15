import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { SystemStatus } from '../types/contract';

interface RiskChartsProps {
  status: SystemStatus;
}

const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

export const RiskCharts = ({ status }: RiskChartsProps) => {
  const statsData = [
    { name: 'Total Scans', value: status.statistics.total_scans },
    { name: 'Threats', value: status.statistics.total_threats },
    { name: 'Pauses', value: status.statistics.total_pauses },
  ];

  const countsData = [
    { name: 'Operators', value: status.counts.operators },
    { name: 'Blacklisted', value: status.counts.blacklisted },
    { name: 'Whitelisted', value: status.counts.whitelisted },
    { name: 'Tracked', value: status.counts.tracked_addresses },
  ];

  const threatDistribution = [
    { name: 'Safe', value: Math.max(0, status.statistics.total_scans - status.statistics.total_threats) },
    { name: 'Threats', value: status.statistics.total_threats },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Statistics Chart */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-blue-400">Security Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Threat Distribution */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-blue-400">Threat Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={threatDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#f3f4f6' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Address Management */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-blue-400">Address Management</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={countsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-blue-400">System Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">Average Risk per Scan</span>
            <span className="text-yellow-400 font-bold">
              {status.statistics.total_scans > 0
                ? Math.round((status.statistics.total_threats / status.statistics.total_scans) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">Detection Rate</span>
            <span className="text-blue-400 font-bold">
              {status.statistics.total_scans > 0
                ? ((status.statistics.total_threats / status.statistics.total_scans) * 100).toFixed(1)
                : 0}
              %
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">Auto-pauses Triggered</span>
            <span className={`font-bold ${status.statistics.total_pauses > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {status.statistics.total_pauses}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-400">System Status</span>
            <span className={`font-bold ${status.system.paused ? 'text-red-400' : 'text-green-400'}`}>
              {status.system.paused ? '🔴 PAUSED' : '🟢 ACTIVE'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
