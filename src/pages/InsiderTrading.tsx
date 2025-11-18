import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, Database, Home } from 'lucide-react';
import ProductDashboardLayout from '@/components/layout/ProductDashboardLayout';

const InsiderTrading = () => {
  // Define navigation items for this product
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '/',
    },
    {
      id: 'dashboard',
      label: 'Insider Trading',
      icon: Database,
      href: '/insider-trading',
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: Database,
      href: '/insider-trading/analysis',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: Database,
      href: '/insider-trading/reports',
    }
  ];

  return (
    <ProductDashboardLayout 
      productName="Insider Trading" 
      productRoute="/insider-trading"
      navigationItems={navigationItems}
    >
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Insider Trading Analysis</h1>
            <p className="text-muted-foreground">Monitor and analyze insider trading activities</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto mt-12">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-purple-500" />
            </div>
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
            <CardDescription>
              Insider Trading Analysis features are currently under development
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              This section will provide tools to monitor, analyze, and report on insider trading activities, 
              including unusual trading patterns, regulatory compliance, and risk assessment.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Features Coming Soon:</h3>
              <ul className="text-left list-disc pl-5 space-y-1 text-sm">
                <li>Insider trading pattern detection</li>
                <li>Unusual trading activity alerts</li>
                <li>Regulatory compliance monitoring</li>
                <li>Risk assessment tools</li>
                <li>Reporting and analytics dashboard</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductDashboardLayout>
  );
};

export default InsiderTrading;