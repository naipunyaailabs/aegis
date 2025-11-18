import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Badge with tiny pulse for "live"
const StatusBadge = ({ status }: { status: "live" | "coming-soon" | "offline"  }) => {
  const cfg = {
    live:   { wrap: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500 animate-ping" },
    "coming-soon":   { wrap: "bg-yellow-50 text-yellow-700",   dot: "bg-yellow-500 animate-pulse" },
    offline:{ wrap: "bg-gray-100 text-gray-600",      dot: "bg-gray-400" },
  }[status];
  return (
    <span className={`ml-2 inline-flex items-center gap-1 text-xs font-medium rounded-lg px-2 py-0.5 ${cfg.wrap}`}>
      <span className={`h-2 w-2 rounded-lg ${cfg.dot}`} />
      {status === "live" ? "Live" : status === "coming-soon" ? "coming-soon" : "Offline"}
    </span>
  );
};

const HierarchyStructure = () => {
  const navigate = useNavigate();
  const [bseMonthlyAvg, setBseMonthlyAvg] = useState<number | null>(null);
  const [bseTotalCount, setBseTotalCount] = useState<number | null>(null);
  const [rbiTotalCount, setRbiTotalCount] = useState<number | null>(null);
  const [sebiTotalCount, setSebiTotalCount] = useState<number | null>(null);
  
  // Map child IDs to their respective routes
  const getChildRoute = (childId: string): string | null => {
    const routeMap: { [key: string]: string } = {
      "bse-analysis": "/bse-alerts",
      "rbi-analysis": "/rbi-dashboard",
      "sebi-analysis": "/sebi-dashboard",
      "minutes-preparation": "/minutes-preparation",
    };
    return routeMap[childId] || null;
  };
  
  const handleChildClick = (childId: string) => {
    const route = getChildRoute(childId);
    if (route) {
      navigate(route);
    }
  };
  
  useEffect(() => {
    // Fetch the BSE monthly stats (average and total)
    const fetchBseMonthlyStats = async () => {
      try {
        const response = await fetch("/api/bse-alerts-monthly-count");
        if (response.ok) {
          const data = await response.json();
          setBseMonthlyAvg(typeof data.average_count === "number" ? data.average_count : 0);
          setBseTotalCount(typeof data.total_count === "number" ? data.total_count : 0);
        }
      } catch (error) {
        console.error("Error fetching BSE monthly count:", error);
      }
    };

    // Fetch RBI total count
    const fetchRbiTotalCount = async () => {
      try {
        const response = await fetch("/api/rbi-total-count");
        if (response.ok) {
          const data = await response.json();
          setRbiTotalCount(typeof data.count === "number" ? data.count : 0);
        }
      } catch (error) {
        console.error("Error fetching RBI total count:", error);
      }
    };

    // Fetch SEBI total count
    const fetchSebiTotalCount = async () => {
      try {
        const response = await fetch("/api/sebi-total-count");
        if (response.ok) {
          const data = await response.json();
          setSebiTotalCount(typeof data.count === "number" ? data.count : 0);
        }
      } catch (error) {
        console.error("Error fetching SEBI total count:", error);
      }
    };

    fetchBseMonthlyStats();
    fetchRbiTotalCount();
    fetchSebiTotalCount();
  }, []);

  const hierarchyData = [
    {
      id: "Pragnesh Darji",
      name: "Pragnesh Darji",
      image: "images/pragnesh.jpg",
      email:"pragnesh.darji@adani.com",
      children: [
        { id: "bse-analysis", name: "BSE Analysis", status: "live" as const },
        { id: "rbi-analysis", name: "RBI Analysis", status: "live" as const },
        { id: "sebi-analysis", name: "SEBI Analysis", status: "live" as const },
      ],
    },
    {
      id: "kamlesh-bhagia",
      name: "kamlesh-bhagia",
      image: "https://via.placeholder.com/50",
      email:"kamlesh.bhagia@adani.com",
      children: [
        { id: "insider-trading", name: "Insider Trading", status: "coming-soon" as const },
        { id: "directors-disclosure", name: "Directors Disclosure", status: "coming-soon" as const },
        { id: "minutes-preparation", name: "Minutes Preparation", status: "live" as const },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-primary">Agent Organogram - Secretrial</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg ">
            <div className="pt-4 space-y-16">
              {hierarchyData.map((person) => (
                <div key={person.id} className="flex flex-col items-center">
                  {/* Parent */}
                  <div onClick={() => {window.location.href = `mailto:${person.email}`}} className="cursor-pointer text-primary-foreground rounded-lg px-6 py-3 font-semibold  relative z-10 flex flex-col items-center gap-3">
                    {/* Placeholder for photo - you would replace this with actual image */}
                    <img 
                      src={person.image} 
                      alt={person.name} 

                      className="w-36 h-40 rounded-lg object-cover border-2 border-white "
                    />
                    <span>{person.name}</span>
                  </div>
                  {/* vertical down to the child row's top rail */}
                  <div className="h-8 w-0.5 bg-gray-400" />

                  {/* === Child Row (grid anchored) === */}
                  <div className="relative w-full">
                    {/* horizontal rail */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gray-400" />

                    {/* grid of children; each cell owns its connector */}
                    <div
                      className="grid gap-x-10 pt-6"
                      style={{
                        gridTemplateColumns: `repeat(${person.children.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {person.children.map((child) => {
                        const hasRoute = getChildRoute(child.id) !== null;
                        return (
                        <div key={child.id} className="relative flex flex-col items-center">
                          {/* cell-local connector aligned to the cell center */}
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-0.5 bg-gray-400" />
                          <div 
                            className={`bg-muted rounded-lg px-4 py-2 text-sm shadow-sm text-center min-w-[150px] flex flex-col items-center gap-1 ${hasRoute ? 'cursor-pointer hover:bg-muted/80 transition-colors' : ''}`}
                            onClick={() => hasRoute && handleChildClick(child.id)}
                          >
                            <div className="flex items-center justify-center gap-2">
                              {child.name}
                              <StatusBadge status={child.status} />
                            </div>
                            {/* Display counts for BSE Analysis */}
                            {child.id === "bse-analysis" && (bseMonthlyAvg !== null || bseTotalCount !== null) && (
                              <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                                {bseMonthlyAvg !== null && (
                                  <div>Months Average Count: {bseMonthlyAvg}</div>
                                )}
                                {bseTotalCount !== null && (
                                  <div>Total Notification Count: {bseTotalCount}</div>
                                )}
                              </div>
                            )}
                            {/* Display total count for RBI Analysis */}
                            {child.id === "rbi-analysis" && rbiTotalCount !== null && (
                              <div className="text-xs text-muted-foreground mt-1">
                                <div>Total Notification Count: {rbiTotalCount}</div>
                              </div>
                            )}
                            {/* Display total count for SEBI Analysis */}
                            {child.id === "sebi-analysis" && sebiTotalCount !== null && (
                              <div className="text-xs text-muted-foreground mt-1">
                                <div>Total Notification Count: {sebiTotalCount}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* === /Child Row === */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HierarchyStructure;