import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { matchAPI, profileAPI } from '../utils/api';
import ProfileCard from '../components/ProfileCard';
import CardSkeleton from '../components/CardSkeleton';
import { showSuccess, showError } from '../utils/sweetalert';

const Dashboard = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recsError, setRecsError] = useState(null);
  const [stats, setStats] = useState({
    receivedInterests: 0,
    sentInterests: 0,
    profileViews: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setRecsError(null);

    // Fetch all data in parallel, but handle errors gracefully
    const results = await Promise.allSettled([
      matchAPI.getRecommendations(6),
      matchAPI.getTopMatches(),
      matchAPI.getReceivedInterests(),
      matchAPI.getSentInterests(),
      profileAPI.getProfileViewsCount(),
    ]);

    // Handle recommendations
    if (results[0].status === 'fulfilled') {
      setRecommendations(results[0].value.data.recommendations || []);
    } else {
      console.error('Error fetching recommendations:', results[0].reason);
      const errorMsg = results[0].reason?.response?.data?.error || 'Failed to load recommendations';
      setRecsError(errorMsg);
    }

    // Handle top matches
    if (results[1].status === 'fulfilled') {
      setTopMatches(results[1].value.data.topMatches || []);
    }

    // Handle stats - use defaults if any fail
    const receivedInterests = results[2].status === 'fulfilled'
      ? results[2].value.data.interests?.length || 0
      : 0;
    const sentInterests = results[3].status === 'fulfilled'
      ? results[3].value.data.interests?.length || 0
      : 0;
    const profileViews = results[4].status === 'fulfilled'
      ? results[4].value.data.viewCount || 0
      : 0;

    setStats({
      receivedInterests,
      sentInterests,
      profileViews,
    });

    setLoading(false);
  };

  const handleInterestSent = async (profileId) => {
    try {
      await matchAPI.sendInterest({ receiver_id: profileId });
      showSuccess('Interest sent successfully!');
      fetchDashboardData();
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to send interest');
      throw error; // Re-throw to let ProfileCard know it failed
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.full_name}!
          </h1>
          <p className="text-gray-600">Find your perfect match today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/interests" className="card hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Received Interests</p>
                <p className="text-3xl font-bold text-primary">{stats.receivedInterests}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </Link>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Sent Interests</p>
                <p className="text-3xl font-bold text-blue-600">{stats.sentInterests}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Profile Views</p>
                <p className="text-3xl font-bold text-purple-600">{stats.profileViews}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/recommendations" className="bg-primary text-white rounded-lg p-4 flex items-center justify-between hover:bg-primary-dark transition-colors">
            <span className="font-semibold">View Daily Matches</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link to="/search" className="bg-gray-800 text-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition-colors">
            <span className="font-semibold">Advanced Search</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <Link to="/profile/edit" className="bg-white border-2 border-primary text-primary rounded-lg p-4 flex items-center justify-between hover:bg-primary hover:text-white transition-colors">
            <span className="font-semibold">Edit Profile</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
        </div>

        {/* Admin-Assigned Top Matches */}
        {topMatches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">Top Matches</h2>
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Admin Selected
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topMatches.slice(0, 6).map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  showMatchScore={true}
                  onInterestSent={handleInterestSent}
                />
              ))}
            </div>
          </div>
        )}

        {/* System Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">System Recommendations</h2>
              {/* <span className="bg-blue-100 text-blue-700 text-4xl font-semibold px-5 py-3 rounded-xl">
                System Recommendations
              </span> */}
            </div>
            <Link to="/recommendations" className="text-primary hover:text-primary-dark font-semibold text-sm">
              View All →
            </Link>
          </div>

          {loading ? (
            <CardSkeleton count={6} />
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  showMatchScore={true}
                  onInterestSent={handleInterestSent}
                />
              ))}
            </div>
          ) : recsError ? (
            <div className="card text-center py-12">
              <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-600 mb-4">{recsError}</p>
              <button onClick={() => fetchDashboardData()} className="btn-secondary mr-2">
                Retry
              </button>
              <Link to="/search" className="btn-primary inline-block">
                Search Profiles
              </Link>
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600">No recommendations available at the moment.</p>
              <Link to="/search" className="btn-primary mt-4 inline-block">
                Search Profiles
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
