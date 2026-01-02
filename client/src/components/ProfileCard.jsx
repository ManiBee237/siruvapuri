import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, showMatchScore = false, onInterestSent }) => {
  const navigate = useNavigate();
  const [sendingInterest, setSendingInterest] = useState(false);
  const [interestSent, setInterestSent] = useState(false);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewProfile = () => {
    navigate(`/profile/${profile.id}`);
  };

  const handleSendInterest = async () => {
    if (sendingInterest || interestSent) return;

    setSendingInterest(true);
    try {
      await onInterestSent(profile.id);
      setInterestSent(true);
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setSendingInterest(false);
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getMembershipBadge = (membershipType) => {
    if (!membershipType) return null;

    const badges = {
      gold: {
        bg: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        text: 'Gold',
        icon: '👑'
      },
      platinum: {
        bg: 'bg-gradient-to-r from-gray-300 to-gray-500',
        text: 'Platinum',
        icon: '💎'
      },
      premium: {
        bg: 'bg-gradient-to-r from-purple-400 to-purple-600',
        text: 'Premium',
        icon: '⭐'
      }
    };

    return badges[membershipType.toLowerCase()] || null;
  };

  const membershipBadge = getMembershipBadge(profile.membership_type);

  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="relative">
        <img
          src={profile.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'User')}&size=300&background=00D26A&color=fff`}
          alt={profile.full_name}
          className="w-full h-64 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'User')}&size=300&background=00D26A&color=fff`;
          }}
        />
        {showMatchScore && profile.match_score !== undefined && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow-md">
            <span className={`font-bold text-lg ${getMatchScoreColor(profile.match_score)}`}>
              {profile.match_score}%
            </span>
            <span className="text-xs text-gray-600 ml-1">Match</span>
          </div>
        )}
        {membershipBadge && (
          <div className={`absolute top-2 left-2 ${membershipBadge.bg} text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1`}>
            <span>{membershipBadge.icon}</span>
            <span>{membershipBadge.text}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{profile.full_name}</h3>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{profile.age || calculateAge(profile.date_of_birth)} yrs</span>
          {profile.height && <span>{profile.height} cm</span>}
          {profile.city && <span>{profile.city}</span>}
        </div>

        <div className="space-y-1 text-sm">
          {profile.education && (
            <p className="text-gray-700">
              <span className="font-semibold">Education:</span> {profile.education}
            </p>
          )}
          {profile.occupation && (
            <p className="text-gray-700">
              <span className="font-semibold">Occupation:</span> {profile.occupation}
            </p>
          )}
          {profile.religion && (
            <p className="text-gray-700">
              <span className="font-semibold">Religion:</span> {profile.religion}
            </p>
          )}
        </div>

        {profile.about_me && (
          <p className="text-gray-600 text-sm line-clamp-2 mt-2">
            {profile.about_me}
          </p>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleViewProfile}
            className="flex-1 btn-secondary text-sm py-2"
          >
            View Profile
          </button>
          {onInterestSent && (
            <button
              onClick={handleSendInterest}
              disabled={sendingInterest || interestSent}
              className={`flex-1 text-sm py-2 flex items-center justify-center gap-2 ${
                interestSent
                  ? 'bg-green-100 text-green-700 rounded-lg cursor-not-allowed'
                  : 'btn-primary disabled:opacity-50'
              }`}
            >
              {sendingInterest ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : interestSent ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sent
                </>
              ) : (
                'Send Interest'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
