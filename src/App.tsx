import { cn } from "./lib/utils";
import { KPISection } from "./components/KPISection";

function App() {
  return (
    <div className="h-screen w-screen bg-blue-50 p-8">
      <div
        className={cn(
          "h-full grid grid-cols-[220px_1fr] text-2xl max-w-8xl mx-auto border border-gray-800 rounded-[20px]",
        )}
      >
        <div className="border-r border-gray-800 p-4">Sidebar</div>
        <div>
          <div className="border-b border-gray-800 p-4">Header</div>
          <div className="p-6">
            <KPISection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
