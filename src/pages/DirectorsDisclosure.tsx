import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Database, BarChart3, Menu, X, Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
    id: 'datasource',
    label: 'Data Source',
    icon: <FileText className="h-5 w-5" />,
    color: '#0B74B0'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    color: '#75479C'
  },
  {
    id: 'masterdata',
    label: 'Master Data',
    icon: <Database className="h-5 w-5" />,
    color: '#BD3861'
  }
];

const DirectorsDisclosure = () => {
  const [activeTab, setActiveTab] = useState<TabType>('datasource');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const renderContent = () => {
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
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <FileText className="h-8 w-8" style={{ color: "#75479C" }} />
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "#000000" }}>
                  Directors' Disclosure
                </h1>
                <p className="text-sm" style={{ color: '#666666' }}>
                  Track and analyze directors' disclosure reports
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
              style={{ borderColor: '#75479C', color: '#75479C' }}
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
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
    </div>
  );
};

export default DirectorsDisclosure;