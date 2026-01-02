import { useState, useEffect } from 'react';
import { adminUserAPI } from '../utils/adminApi';
import AdminLayout from '../components/AdminLayout';
import { showSuccess, showError } from '../utils/sweetalert';
import { Key, Save, Search } from 'lucide-react';

const AdminSetPassword = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminUserAPI.getAllUsers();
      // Filter to show only paid AND approved users
      const filteredUsers = response.data.users.filter(
        user => user.payment_status === 'paid' && user.is_approved === true
      );
      setUsers(filteredUsers);
    } catch (error) {
      showError('Failed to fetch users');
    }
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    const user = users.find(u => u.email === email);
    setSelectedUser(user);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await adminUserAPI.setPassword(selectedUser.id, { password: newPassword });

      showSuccess('Password set successfully! User can now login.');
      setSelectedEmail('');
      setSelectedUser(null);
      setNewPassword('');
      setConfirmPassword('');
      fetchUsers();
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6 p-4 md:p-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Key className="text-primary" size={32} />
            Set User Password
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">Assign password for user login</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emailSelect" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Search size={18} />
                Select User
              </label>
              <select
                id="emailSelect"
                value={selectedEmail}
                onChange={(e) => handleEmailSelect(e.target.value)}
                className="input-field text-sm md:text-base"
                required
              >
                <option value="">-- Select a user --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.first_name} {user.last_name} - {user.email}
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Selected User Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{selectedUser.first_name} {selectedUser.last_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2 font-medium">{selectedUser.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-2 font-medium">{selectedUser.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Age:</span>
                      <span className="ml-2 font-medium">{selectedUser.age} years</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <span className="ml-2 font-medium capitalize">{selectedUser.gender}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Payment Status:</span>
                      <span className="ml-2">
                        {selectedUser.payment_status === 'paid' ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Unpaid</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Approval Status:</span>
                      <span className="ml-2">
                        {selectedUser.is_approved ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">Pending</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field text-sm md:text-base"
                    placeholder="Enter password (min 6 characters)"
                    minLength="6"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field text-sm md:text-base"
                    placeholder="Re-enter password"
                    minLength="6"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {loading ? 'Setting Password...' : 'Set Password & Activate User'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSetPassword;
