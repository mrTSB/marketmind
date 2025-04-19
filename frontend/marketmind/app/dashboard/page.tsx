export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
          <p className="text-muted-foreground">Your market insights will appear here</p>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">Your recent activities will be shown here</p>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <p className="text-muted-foreground">Common actions will be available here</p>
        </div>
      </div>
    </div>
  );
} 