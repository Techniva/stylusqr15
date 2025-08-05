"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Bell, User, Settings, LogOut, Search, QrCode } from 'lucide-react';

interface AdminHeaderProps {
  admin: any;
  onLogout: () => void;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export default function AdminHeader({ admin, onLogout, onMenuToggle, sidebarOpen }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLogoutLoading(true);
    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    router.push('/admin/settings');
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-2 sm:px-3 lg:px-4 h-16">
          {/* Left side - Menu button and title */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#063970]"
              onClick={onMenuToggle}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <QrCode className="h-6 w-6 text-[#063970] mr-2" />
                <h1 className="text-xl font-bold text-gray-900">StylusQR Admin Panel</h1>
              </div>
            </div>
          </div>

          {/* Right side - Notifications and user menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#063970] rounded-lg hover:bg-gray-100">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#063970] transition-colors"
              >
                <div className="w-8 h-8 bg-[#063970] rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{admin?.fullName || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{admin?.role || 'Administrator'}</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{admin?.fullName || 'Admin'}</p>
                    <p className="text-xs text-gray-500">{admin?.email || 'admin@stylusqr.com'}</p>
                  </div>
                  
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </button>
                  
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <div className="flex items-center mb-4">
                <LogOut className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Confirm Logout</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to logout from the admin panel?
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {logoutLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <span>Logout</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 