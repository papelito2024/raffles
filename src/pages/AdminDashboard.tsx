import React from 'react';
import { Link } from 'react-router-dom';
import { useRaffles } from '../context/RaffleContext';
import { PlusCircle, Gift, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { raffles, deleteRaffle } = useRaffles();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link
          to="/admin/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create New Raffle</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Raffle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prizes
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {raffles.map((raffle) => (
                <tr key={raffle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Gift className="h-5 w-5 text-indigo-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {raffle.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {raffle.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(raffle.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {raffle.prizes.length} prizes
                    </div>
                    <div className="text-sm text-gray-500">
                      {raffle.prizes.slice(0, 2).join(', ')}
                      {raffle.prizes.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteRaffle(raffle.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {raffles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No raffles created yet.</p>
          <Link
            to="/admin/create"
            className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center space-x-1 mt-4"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create your first raffle</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;