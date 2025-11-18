import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, Lock, Users } from 'lucide-react';
import ProductDashboardLayout from '@/components/layout/ProductDashboardLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { authenticateAdmin, isAdmin, logoutAdmin } from '@/utils/adminAuth';

interface Director {
  id: number;
  name: string;
  din: string;
  created_at: string;
}

export default function MinutesPreparation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [isLoadingDirectors, setIsLoadingDirectors] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Define navigation items for this product
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: FileText,
      href: '/',
    },
    {
      id: 'dashboard',
      label: 'Minutes Preparation',
      icon: FileText,
      href: '/minutes-preparation',
    },
    {
      id: 'directors',
      label: 'Directors',
      icon: Users,
      href: '/minutes-preparation/directors',
    }
  ];

  // Check authentication status on component mount
  useEffect(() => {
    setIsAuthenticated(isAdmin());
  }, []);

  // Fetch directors data
  useEffect(() => {
    const fetchDirectorsData = async () => {
      if (!isAuthenticated) return;
      
      setIsLoadingDirectors(true);
      try {
        const response = await fetch('/directors');
        if (response.ok) {
          const result = await response.json();
          setDirectors(result.data);
        } else {
          console.error('Failed to fetch directors data');
        }
      } catch (error) {
        console.error('Error fetching directors data:', error);
      } finally {
        setIsLoadingDirectors(false);
      }
    };

    fetchDirectorsData();
  }, [isAuthenticated]);

  // Handle login
  const handleLogin = async () => {
    try {
      const success = await authenticateAdmin(username, password);
      if (success) {
        setIsAuthenticated(true);
        setShowLogin(false);
        setUsername('');
        setPassword('');
        setLoginError('');
        
        // Dispatch a storage event to notify other components
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'isAdmin',
          newValue: 'true'
        }));
        
        // Also dispatch for adminToken if it exists
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

  // Handle logout
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    
    // Dispatch storage events to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'isAdmin',
      newValue: null
    }));
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'adminToken',
      newValue: null
    }));
  };

  // Handle navigation to form generator
  const handleNavigateToFormGenerator = () => {
    navigate('/minutes-preparation/form-generator');
  };

  // Handle key press for login form
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Filter directors based on search term
  const filteredDirectors = directors.filter(director => 
    director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    director.din.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProductDashboardLayout 
      productName="Minutes Preparation" 
      productRoute="/minutes-preparation"
      navigationItems={navigationItems}
    >
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Minutes Preparation</h1>
            <p className="text-muted-foreground">Automated meeting minutes generation</p>
          </div>
          <div className="flex gap-2">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Admin Login
              </Button>
            )}
          </div>
        </div>

        {/* Directors List Section */}
        {location.pathname === '/minutes-preparation/directors' && isAuthenticated ? (
          <div className="mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold">Directors List</h2>
                <p className="text-muted-foreground">View and manage company directors</p>
              </div>
              <div className="w-full md:w-64">
                <Input
                  placeholder="Search directors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                {isLoadingDirectors ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2">Loading directors...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>DIN</TableHead>
                        <TableHead>Created At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDirectors.length > 0 ? (
                        filteredDirectors.map((director) => (
                          <TableRow key={director.id}>
                            <TableCell className="font-medium">{director.name}</TableCell>
                            <TableCell>{director.din}</TableCell>
                            <TableCell>{new Date(director.created_at).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8">
                            {searchTerm ? 'No directors found matching your search.' : 'No directors found.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        ) : location.pathname === '/minutes-preparation/directors' && !isAuthenticated ? (
          <Card className="max-w-2xl mx-auto mt-12">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-red-500" />
              </div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription>
                You need to be logged in as an administrator to view directors information.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                className="w-full flex items-center justify-center gap-2 py-6 text-lg"
                onClick={() => setShowLogin(true)}
              >
                <Lock className="h-5 w-5" />
                Login to View Directors
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Generate Minutes Card - Only Feature */}
            <div className="max-w-2xl mx-auto mt-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <FileText className="h-12 w-12 text-blue-500" />
                  </div>
                  <CardTitle className="text-center">Generate Meeting Minutes</CardTitle>
                  <CardDescription className="text-center">
                    Create professional meeting minutes from templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {isAuthenticated ? (
                    <Button 
                      className="w-full flex items-center justify-center gap-2 py-6 text-lg"
                      onClick={handleNavigateToFormGenerator}
                    >
                      <FileText className="h-5 w-5" />
                      Generate Minutes
                    </Button>
                  ) : (
                    <Button 
                      className="w-full flex items-center justify-center gap-2 py-6 text-lg"
                      onClick={() => setShowLogin(true)}
                    >
                      <Lock className="h-5 w-5" />
                      Login to Generate Minutes
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Information Section */}
            <Card className="max-w-4xl mx-auto mt-12">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Minutes Generation</CardTitle>
                <CardDescription>
                  Generate professional meeting minutes with our template-based system
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">
                  This tool allows you to generate meeting minutes quickly and efficiently using predefined templates.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">How it works:</h3>
                  <ul className="text-left list-disc pl-5 space-y-1 text-sm">
                    <li>Select a quarterly template (Q1-Q4)</li>
                    <li>Fill in the required information in the form</li>
                    <li>Generate and download your professional meeting minutes document</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Admin Login</DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter your credentials to access the minutes generation tool.
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
    </ProductDashboardLayout>
  );
};
