import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { profileAPI, authAPI } from '../utils/api';
import { showSuccess, showError, showLoading } from '../utils/sweetalert';
import Swal from 'sweetalert2';
import { Camera, Upload, User, Trash2 } from 'lucide-react';
import ImageCropper from '../components/ImageCropper';

const EditProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Profile Picture Skeleton */}
      <div className="card mb-6">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="card mb-6">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j}>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    // Personal Info
    full_name: '',
    phone: '',
    age: '',

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
        age: userData.age || '',
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset file input
    e.target.value = '';

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showError('Image size should be less than 5MB');
      return;
    }

    // Create URL for cropper
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setShowCropper(true);
  };

  const handleCropComplete = async (croppedBlob) => {
    setShowCropper(false);
    setSelectedImage(null);
    setUploadingPhoto(true);
    showLoading('Uploading photo...');

    try {
      const formData = new FormData();
      formData.append('photo', croppedBlob, 'profile.jpg');

      const response = await profileAPI.uploadPhoto(formData);

      setProfileData(prev => ({
        ...prev,
        profile_picture: response.data.profile_picture
      }));

      // Update user context so the profile picture is available across all pages
      if (updateUser) {
        updateUser({ profile_picture: response.data.profile_picture });
      }

      Swal.close();
      showSuccess('Photo uploaded successfully!');
    } catch (error) {
      Swal.close();
      showError(error.response?.data?.error || 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
  };

  const handleRemovePhoto = async () => {
    const result = await Swal.fire({
      title: 'Remove Photo?',
      text: 'Are you sure you want to remove your profile photo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it'
    });

    if (result.isConfirmed) {
      setProfileData(prev => ({
        ...prev,
        profile_picture: ''
      }));
      showSuccess('Photo removed. Remember to save your changes.');
    }
  };

  if (loading) {
    return <EditProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Picture Section - At the Top */}
        <div className="card mb-6">
          <div className="flex flex-col items-center py-6">
            {/* Large Profile Picture Display */}
            <div className="relative mb-6">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                {profileData.profile_picture ? (
                  <img
                    src={profileData.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.full_name || 'User')}&size=200&background=00D26A&color=fff`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <User className="w-16 h-16 md:w-20 md:h-20 text-primary/50" />
                  </div>
                )}
              </div>

              {/* Camera Button Overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="absolute bottom-2 right-2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 hover:scale-110"
              >
                {uploadingPhoto ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* User Name */}
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {profileData.full_name || 'Your Name'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {profileData.city && profileData.state
                ? `${profileData.city}, ${profileData.state}`
                : 'Add your location'}
            </p>

            {/* Upload/Remove Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 font-medium"
              >
                {uploadingPhoto ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    {profileData.profile_picture ? 'Change Photo' : 'Upload Photo'}
                  </>
                )}
              </button>

              {profileData.profile_picture && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex items-center gap-2 px-5 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Help Text */}
            <p className="text-xs text-gray-400 mt-4 text-center">
              Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB<br />
              Your photo will be stored securely on our servers.
            </p>
          </div>
        </div>

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
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="25"
                  min="18"
                  max="100"
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
                  placeholder="FC, BC, MBC"
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

      {/* Image Cropper Modal */}
      {showCropper && selectedImage && (
        <ImageCropper
          imageSrc={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          aspectRatio={1}
        />
      )}
    </div>
  );
};

export default EditProfile;
