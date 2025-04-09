import React from 'react';

const SettingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Settings page is under development.</p>
        {/* Placeholder for future settings options */}
        <div className="mt-4 space-y-2">
          <p className="text-gray-500">- Change Password (Coming Soon)</p>
          <p className="text-gray-500">- Update Profile (Coming Soon)</p>
          <p className="text-gray-500">- Notification Preferences (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;