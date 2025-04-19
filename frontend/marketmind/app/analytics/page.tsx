export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Performance charts will be displayed here</p>
          </div>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Market Trends</h2>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Trend analysis will be shown here</p>
          </div>
        </div>
      </div>
    </div>
  );
} 