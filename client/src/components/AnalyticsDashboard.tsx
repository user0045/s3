import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, PlayCircle, Download, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const AnalyticsDashboard = () => {
  const { data: analytics } = useQuery({
    queryKey: ['/api/analytics']
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const analyticsData = [
    { 
      title: "Total Views", 
      value: analytics ? formatNumber(analytics.totalViews) : "0",
      change: "+12%", 
      icon: Eye 
    },
    { 
      title: "Total Content", 
      value: analytics ? analytics.totalContent.toString() : "0",
      change: "+18%", 
      icon: PlayCircle 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyticsData.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-primary">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Popular Content</CardTitle>
            <CardDescription>Most watched content this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Stranger Things S4", views: "2.3M", percentage: 85 },
                { title: "The Dark Knight", views: "1.8M", percentage: 65 },
                { title: "Breaking Bad", views: "1.5M", percentage: 55 },
                { title: "Avatar", views: "1.2M", percentage: 45 },
              ].map((content, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground text-sm">{content.title}</span>
                    <span className="text-muted-foreground text-sm">{content.views}</span>
                  </div>
                  <div className="w-full bg-accent/30 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${content.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">User Engagement</CardTitle>
            <CardDescription>User activity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-foreground">Average Watch Time</span>
                  <span className="text-foreground">45 min</span>
                </div>
                <div className="w-full bg-accent/30 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-foreground">Completion Rate</span>
                  <span className="text-foreground">78%</span>
                </div>
                <div className="w-full bg-accent/30 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-4/5" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-foreground">User Retention</span>
                  <span className="text-foreground">65%</span>
                </div>
                <div className="w-full bg-accent/30 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
