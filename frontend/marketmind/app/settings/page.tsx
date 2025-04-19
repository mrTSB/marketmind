export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="space-y-6">
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email Notifications</span>
              <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                Enabled
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Dark Mode</span>
              <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                System
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">API Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">API Key</span>
              <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 