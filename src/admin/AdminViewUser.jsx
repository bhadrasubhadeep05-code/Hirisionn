import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserStats, downloadUserResume, exportAllUsersCSV, exportNewUsersCSV } from '../services/admin.api.js';

const AdminViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [lastDownloadTime, setLastDownloadTime] = useState(localStorage.getItem('lastUserDownloadTime') || null);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getUserStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDownloadResume = async (userId) => {
    try {
      console.log(userId);
      const blob = await downloadUserResume(userId);
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume-${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Refresh user list
      fetchUsers();
      fetchStats();
      alert('Resume downloaded successfully and removed from server');
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume');
    }
  };

  const handleDownloadAllCSV = async () => {
    try {
      const blob = await exportAllUsersCSV();
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `all-users-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Update last download time
      const now = new Date().toISOString();
      localStorage.setItem('lastUserDownloadTime', now);
      setLastDownloadTime(now);
      
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV');
    }
  };

  const handleDownloadNewUsersCSV = async () => {
    try {
      const blob = await exportNewUsersCSV(lastDownloadTime);
      
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `new-users-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Update last download time
      const now = new Date().toISOString();
      localStorage.setItem('lastUserDownloadTime', now);
      setLastDownloadTime(now);
      
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Error downloading new users CSV:', error);
      alert('Failed to download new users CSV');
    }
  };

  const pendingUsers = users.filter(user => !user.downloaded);
  const downloadedUsers = users.filter(user => user.downloaded);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-gray-600">Manage user resumes and export user data</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Pending Resumes</p>
          <p className="text-2xl font-bold text-orange-600">{stats.pendingUsers || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Already Downloaded</p>
          <p className="text-2xl font-bold text-green-600">{stats.downloadedUsers || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Complete Profiles</p>
          <p className="text-2xl font-bold text-blue-600">{stats.completeProfiles || 0}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={handleDownloadAllCSV}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download All Users CSV
        </button>
        <button
          onClick={handleDownloadNewUsersCSV}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Download Only New Users
          {pendingUsers.length > 0 && (
            <span className="bg-white text-green-600 rounded-full px-2 py-1 text-xs font-bold">
              {pendingUsers.length}
            </span>
          )}
        </button>
      </div>

      {lastDownloadTime && (
        <div className="mb-4 text-sm text-gray-500">
          Last CSV download: {new Date(lastDownloadTime).toLocaleString()}
        </div>
      )}

      {/* Pending Users Section */}
      {pendingUsers.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            New Users (Resumes Pending Download)
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Profile</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{user.fullName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phoneNo}</td>
                    <td className="px-4 py-3">
                      {user.isProfileComplete ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Complete
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Incomplete
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {user.profile?.resume?.url ? (
                        <button
                          onClick={() => handleDownloadResume(user._id)}
                          className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Resume
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">No resume</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Downloaded Users Section */}
      {downloadedUsers.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Already Downloaded Users
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden opacity-75">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {downloadedUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{user.fullName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phoneNo}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Downloaded
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No users found in the system
        </div>
      )}
    </div>
  );
};

export default AdminViewUser;