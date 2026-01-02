import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import SkeletonLoader from '../components/SkeletonLoader';
import { adminUserAPI } from '../utils/adminApi';
import { showSuccess, showError, showConfirm } from '../utils/sweetalert';
import Swal from 'sweetalert2';
import { Search, UserPlus, Check, X, User, Mail, Phone, Calendar, Crown, Award } from 'lucide-react';

const MEMBERSHIP_PLANS = [
  {
    id: 'gold',
    name: 'Gold',
    price: 2999,
    duration: '3 Months',
    features: ['View 50 Profiles', 'Send 25 Interests', 'Chat Support'],
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-400'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 4999,
    duration: '6 Months',
    features: ['View 150 Profiles', 'Send 75 Interests', 'Priority Support', 'Profile Highlight'],
    color: 'from-gray-300 to-gray-500',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-400'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 7999,
    duration: '12 Months',
    features: ['Unlimited Profiles', 'Unlimited Interests', '24/7 Support', 'Verified Badge', 'Featured Profile'],
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-400'
  }
];

const AdminAssignMembership = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('unpaid');
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminUserAPI.getAllUsers();
      setUsers(response.data.users || []);
    } catch (error) {
      showError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignMembership = async (userId, userName) => {
    const { value: membershipType } = await Swal.fire({
      title: `Assign Membership to ${userName}`,
      html: `
        <div class="text-left space-y-4">
          <p class="text-gray-600 text-sm mb-4">Select a membership plan:</p>
          ${MEMBERSHIP_PLANS.map(plan => `
            <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-green-500 transition-colors membership-option" data-plan="${plan.id}">
              <input type="radio" name="membership" value="${plan.id}" class="mr-4 accent-green-500" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-lg">${plan.name}</span>
                  <span class="font-bold text-green-600">Rs. ${plan.price.toLocaleString()}</span>
                </div>
                <div class="text-sm text-gray-500">${plan.duration}</div>
                <div class="text-xs text-gray-400 mt-1">${plan.features.join(' | ')}</div>
              </div>
            </label>
          `).join('')}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Assign Membership',
      confirmButtonColor: '#00D26A',
      cancelButtonColor: '#6B7280',
      width: 500,
      preConfirm: () => {
        const selected = document.querySelector('input[name="membership"]:checked');
        if (!selected) {
          Swal.showValidationMessage('Please select a membership plan');
          return false;
        }
        return selected.value;
      }
    });

    if (!membershipType) return;

    setProcessing(userId);
    try {
      await adminUserAPI.assignMembership(userId, { membership_type: membershipType });
      const plan = MEMBERSHIP_PLANS.find(p => p.id === membershipType);
      showSuccess(`${plan.name} membership assigned to ${userName} successfully!`);
      fetchUsers();
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to assign membership');
    } finally {
      setProcessing(null);
    }
  };

  const handleRevokeMembership = async (userId, userName) => {
    const confirmed = await showConfirm(
      `Revoke membership from ${userName}?`,
      'This will remove their membership and mark payment as unpaid.'
    );

    if (!confirmed) return;

    setProcessing(userId);
    try {
      await adminUserAPI.revokeMembership(userId);
      showSuccess(`Membership revoked from ${userName}`);
      fetchUsers();
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to revoke membership');
    } finally {
      setProcessing(null);
    }
  };

  const handleApproveUser = async (userId, userName) => {
    setProcessing(userId);
    try {
      await adminUserAPI.updateApprovalStatus(userId, { is_approved: true });
      showSuccess(`${userName} has been approved!`);
      fetchUsers();
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to approve user');
    } finally {
      setProcessing(null);
    }
  };

  const getFullName = (user) => {
    return `${user.first_name}${user.middle_name ? ' ' + user.middle_name : ''} ${user.last_name}`;
  };

  const getMembershipBadge = (membershipType) => {
    const plan = MEMBERSHIP_PLANS.find(p => p.id === membershipType);
    if (!plan) return null;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${plan.bgColor} ${plan.textColor} border ${plan.borderColor}`}>
        {plan.name}
      </span>
    );
  };

  const filteredUsers = users.filter((user) => {
    const fullName = getFullName(user).toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'paid' && user.payment_status === 'paid') ||
      (filter === 'unpaid' && user.payment_status === 'unpaid');

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: users.length,
    paid: users.filter(u => u.payment_status === 'paid').length,
    unpaid: users.filter(u => u.payment_status === 'unpaid').length,
    gold: users.filter(u => u.membership_type === 'gold').length,
    platinum: users.filter(u => u.membership_type === 'platinum').length,
    premium: users.filter(u => u.membership_type === 'premium').length,
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          </div>
          <SkeletonLoader type="cards" />
          <SkeletonLoader type="table" rows={8} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <UserPlus className="text-primary" size={32} />
            Assign Membership
          </h1>
          <p className="text-gray-600 mt-1">Manage user memberships and payment status</p>
        </div>

        {/* Membership Plans Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div key={plan.id} className="relative rounded-xl overflow-hidden shadow-lg">
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <Crown size={24} />
                </div>
                <div className="text-3xl font-bold">Rs. {plan.price.toLocaleString()}</div>
                <p className="text-sm opacity-90">{plan.duration}</p>
              </div>
              <div className="bg-white p-4">
                <ul className="space-y-2">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t-1 border-t-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Active Users:</span>
                    <span className="font-bold text-lg">
                      {stats[plan.id] || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <User className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Paid Members</p>
                <p className="text-3xl font-bold mt-2 text-green-600">{stats.paid}</p>
              </div>
              <Award className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Unpaid Users</p>
                <p className="text-3xl font-bold mt-2 text-orange-600">{stats.unpaid}</p>
              </div>
              <X className="text-orange-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Premium Members</p>
                <p className="text-3xl font-bold mt-2 text-purple-600">{stats.premium}</p>
              </div>
              <Crown className="text-purple-500" size={40} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="all">All Users</option>
              <option value="unpaid">Unpaid Only</option>
              <option value="paid">Paid Only</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Membership</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          {user.profile_picture ? (
                            <img
                              src={user.profile_picture}
                              alt={getFullName(user)}
                              className="h-20 w-16 rounded-lg object-cover border-2 border-primary shadow-lg"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getFullName(user))}&size=80&background=00D26A&color=fff`;
                              }}
                            />
                          ) : (
                            <div className="w-16 h-20 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                              <User className="text-white" size={32} />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{getFullName(user)}</div>
                            <div className="text-xs text-gray-500">
                              {user.age} years, {user.gender} | ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail size={14} className="text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone size={14} className="text-gray-400" />
                            {user.phone || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          {user.membership_type ? (
                            <>
                              {getMembershipBadge(user.membership_type)}
                              {user.membership_expiry && (
                                <span className="text-xs text-gray-500">
                                  Expires: {new Date(user.membership_expiry).toLocaleDateString()}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400 text-sm">No membership</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium inline-block w-fit ${
                              user.payment_status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {user.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium inline-block w-fit ${
                              user.is_approved
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.is_approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          {user.payment_status === 'unpaid' || !user.membership_type ? (
                            <button
                              onClick={() => handleAssignMembership(user.id, getFullName(user))}
                              disabled={processing === user.id}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
                            >
                              {processing === user.id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Crown size={16} />
                              )}
                              Assign Membership
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRevokeMembership(user.id, getFullName(user))}
                              disabled={processing === user.id}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
                            >
                              {processing === user.id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <X size={16} />
                              )}
                              Revoke Membership
                            </button>
                          )}
                          {!user.is_approved && user.payment_status === 'paid' && (
                            <button
                              onClick={() => handleApproveUser(user.id, getFullName(user))}
                              disabled={processing === user.id}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
                            >
                              <UserPlus size={16} />
                              Approve User
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
            {filter !== 'all' && ` (filtered by ${filter})`}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAssignMembership;
