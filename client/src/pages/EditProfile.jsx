import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { profileAPI, authAPI } from '../utils/api';
import { showSuccess, showError, showLoading } from '../utils/sweetalert';
import Swal from 'sweetalert2';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    // Personal Info
    full_name: '',
    phone: '',
    date_of_birth: '',

    // Physical Attributes
    height: '',
    weight: '',

    // Background
    marital_status: 'never_married',
    religion: '',
    caste: '',
    mother_tongue: '',

    // Education & Career
    education: '',
    occupation: '',
    annual_income: '',

    // Location
    city: '',
    state: '',
    country: 'India',

    // About
    about_me: '',
    looking_for: '',
    hobbies: '',

    // Other
    created_by: 'self',
    profile_picture: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      const userData = response.data.user;

      setProfileData({
        full_name: userData.full_name || '',
        phone: userData.phone || '',
        date_of_birth: userData.date_of_birth || '',
        height: userData.height || '',
        weight: userData.weight || '',
        marital_status: userData.marital_status || 'never_married',
        religion: userData.religion || '',
        caste: userData.caste || '',
        mother_tongue: userData.mother_tongue || '',
        education: userData.education || '',
        occupation: userData.occupation || '',
        annual_income: userData.annual_income || '',
        city: userData.city || '',
        state: userData.state || '',
        country: userData.country || 'India',
        about_me: userData.about_me || '',
        looking_for: userData.looking_for || '',
        hobbies: userData.hobbies || '',
        created_by: userData.created_by || 'self',
        profile_picture: userData.profile_picture || ''
      });
    } catch (error) {
      showError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    showLoading('Saving your profile...');

    try {
      await profileAPI.updateProfile(profileData);

      Swal.close();
      await showSuccess('Profile updated successfully!', 'Success!');
      navigate('/dashboard');
    } catch (error) {
      Swal.close();
      showError(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update your profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={profileData.full_name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={profileData.date_of_birth}
                  onChange={handleChange}
                  className="input-field"
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Created By
                </label>
                <select
                  name="created_by"
                  value={profileData.created_by}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="self">Self</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                </select>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">
              Physical Attributes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={profileData.height}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="170"
                  min="100"
                  max="250"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={profileData.weight}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="65"
                  min="30"
                  max="200"
                />
              </div>
            </div>
          </div>

          {/* Background */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">
              Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status
                </label>
                <select
                  name="marital_status"
                  value={profileData.marital_status}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="never_married">Never Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <input
                  type="text"
                  name="religion"
                  value={profileData.religion}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Hindu, Muslim, Christian"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caste
                </label>
                <input
                  type="text"
                  name="caste"
                  value={profileData.caste}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mother Tongue
                </label>
                <input
                  type="text"
                  name="mother_tongue"
                  value={profileData.mother_tongue}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Hindi, Tamil, Telugu"
                />
              </div>
            </div>
          </div>

          {/* Education & Career */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">
              Education & Career
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={profileData.education}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., B.Tech, MBA, MBBS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={profileData.occupation}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Software Engineer, Doctor"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income
                </label>
                <input
                  type="text"
                  name="annual_income"
                  value={profileData.annual_income}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 5-10 LPA, 10-15 LPA"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">
              Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Mumbai, Delhi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Maharashtra"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="India"
                />
              </div>
            </div>
          </div>

          {/* About & Preferences */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">
              About You
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Me
                </label>
                <textarea
                  name="about_me"
                  value={profileData.about_me}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What I'm Looking For
                </label>
                <textarea
                  name="looking_for"
                  value={profileData.looking_for}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Describe your ideal partner..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hobbies & Interests
                </label>
                <input
                  type="text"
                  name="hobbies"
                  value={profileData.hobbies}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Reading, Traveling, Music, Sports"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  name="profile_picture"
                  value={profileData.profile_picture}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a URL to your profile picture (or use a placeholder service like pravatar.cc)
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
