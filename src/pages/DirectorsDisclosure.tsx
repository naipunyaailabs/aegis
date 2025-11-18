import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Database, BarChart3, Menu, X, Home, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { authenticateAdmin, isAdmin, logoutAdmin } from '@/utils/adminAuth';
import DirectorsDisclosureDataSource from "./DirectorsDisclosure/DirectorsDisclosureDataSource";
import DirectorsDisclosureAnalytics from "./DirectorsDisclosure/DirectorsDisclosureAnalytics";
import DirectorsDisclosureMasterData from "./DirectorsDisclosure/DirectorsDisclosureMasterData";

type TabType = 'datasource' | 'analytics' | 'masterdata';

interface SidebarItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    color: '#75479C'
  },
  {
    id: 'datasource',
    label: 'Data Source',
    icon: <FileText className="h-5 w-5" />,
    color: '#0B74B0'
  },
  {
    id: 'masterdata',
    label: 'Master Data',
    icon: <Database className="h-5 w-5" />,
    color: '#BD3861'
  }
];

const DirectorsDisclosure = () => {
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAdmin());
  }, []);

  const handleLogin = async () => {
    try {
      const success = await authenticateAdmin(username, password);
      if (success) {
        setIsAuthenticated(true);
        setShowLogin(false);
        setUsername('');
        setPassword('');
        setLoginError('');
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'isAdmin',
          newValue: 'true'
        }));
        
        const token = localStorage.getItem('adminToken');
        if (token) {
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'adminToken',
            newValue: token
          }));
        }
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setLoginError('An error occurred during login. Please try again.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'isAdmin',
      newValue: null
    }));
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'adminToken',
      newValue: null
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#ffffff" }}>
          <Card className="max-w-md w-full">
            <div className="p-8 text-center">
              <Lock className="h-16 w-16 mx-auto mb-4" style={{ color: '#BD3861' }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>Authentication Required</h2>
              <p className="mb-6" style={{ color: '#666666' }}>
                You need to be logged in as an administrator to access Directors' Disclosure.
              </p>
              <Button
                onClick={() => setShowLogin(true)}
                className="w-full flex items-center justify-center gap-2"
                style={{ backgroundColor: '#75479C', color: 'white' }}
              >
                <Lock className="h-4 w-4" />
                Login to Continue
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    switch (activeTab) {
      case 'datasource':
        return <DirectorsDisclosureDataSource />;
      case 'analytics':
        return <DirectorsDisclosureAnalytics />;
      case 'masterdata':
        return <DirectorsDisclosureMasterData />;
      default:
        return <DirectorsDisclosureDataSource />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b"
        style={{ backgroundColor: '#ffffff', borderBottomColor: '#e5e7eb' }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/adani.svg" alt="Adani Logo" className="h-8 w-auto md:h-10 lg:h-12" />
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "#000000" }}>
                  Directors' Disclosure
                </h1>
                <p className="text-sm" style={{ color: '#666666' }}>
                  Track and analyze directors' disclosure reports
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                  style={{ borderColor: '#BD3861', color: '#BD3861' }}
                >
                  <Lock className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2"
                  style={{ borderColor: '#75479C', color: '#75479C' }}
                >
                  <Lock className="h-4 w-4" />
                  Admin Login
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
                style={{ borderColor: '#0B74B0', color: '#0B74B0' }}
              >
                <Home className="h-4 w-4" />
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="fixed lg:sticky top-0 left-0 h-screen w-64 border-r z-40 lg:z-0"
          style={{ backgroundColor: '#ffffff', borderRightColor: '#e5e7eb' }}
        >
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3 h-12"
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  style={activeTab === item.id ? {
                    backgroundColor: item.color,
                    color: 'white'
                  } : {
                    color: '#000000'
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderTopColor: '#e5e7eb' }}>
            <Card className="p-3" style={{ backgroundColor: '#f9fafb' }}>
              <div className="text-xs font-medium" style={{ color: '#666666' }}>
                Active Module
              </div>
              <div className="text-sm font-bold mt-1" style={{ color: '#000000' }}>
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </div>
            </Card>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Admin Login</DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter your credentials to access Directors' Disclosure.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {loginError && (
              <div className="text-red-500 text-sm">{loginError}</div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowLogin(false);
                  setLoginError('');
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DirectorsDisclosure;