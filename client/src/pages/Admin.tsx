
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  PlayCircle,
  Calendar,
  LogOut
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContentManagement from "@/components/ContentManagement";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import ContentUploadForm from "@/components/ContentUploadForm";
import UpcomingContentManagement from "@/components/UpcomingContentManagement";
import AdminAuth from "@/components/AdminAuth";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <ContentUploadForm />;
      case "upcoming":
        return <UpcomingContentManagement />;
      case "manage":
        return <ContentManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return <ContentUploadForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Content Admin</h1>
            <p className="text-muted-foreground">Upload, manage and analyze your content</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "upload" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-foreground hover:bg-accent"
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Content
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "upcoming" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-foreground hover:bg-accent"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Upcoming Content
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "manage" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-foreground hover:bg-accent"
            }`}
          >
            <PlayCircle className="h-4 w-4" />
            Manage Content
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "analytics" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-foreground hover:bg-accent"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
