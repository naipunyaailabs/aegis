import { useState, useEffect } from "react";
import { FileText, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsData {
  total_disclosures: number;
}

const DirectorsDisclosureAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/directors-disclosures/analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#ffffff" }}>
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: "#75479C" }} />
          <p className="text-lg" style={{ color: "#000000" }}>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#ffffff" }}>
        <div className="text-center p-6 max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" style={{ color: "#EF4444" }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: "#000000" }}>Error Loading Analytics</h2>
          <p className="mb-4" style={{ color: "#000000" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: "#ffffff" }}>
      <div className="mb-6">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8" style={{ color: "#75479C" }} />
              <div>
                <CardTitle className="text-2xl font-bold" style={{ color: "#000000" }}>
                  Disclosure Analytics
                </CardTitle>
                <CardDescription style={{ color: '#666666' }}>
                  Statistical insights of directors' disclosures
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Total Count */}
      <div className="max-w-2xl">
        <Card className="border-0 shadow-lg" style={{ borderLeft: '4px solid #75479C' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Total Disclosures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" style={{ color: '#75479C' }}>
              {analytics?.total_disclosures || 0}
            </div>
            <div className="text-sm mt-2" style={{ color: '#666666' }}>
              All time records
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DirectorsDisclosureAnalytics;
