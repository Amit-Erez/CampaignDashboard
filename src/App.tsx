import { cn } from "./lib/utils";
import { KPISection } from "./components/KPISection";

function App() {


  return (
    <div className="h-screen w-screen bg-[#E3FAFF] p-8">
      <div
        className={cn(
          "h-full grid grid-cols-[220px_1fr] gap-4 text-2xl max-w-8xl mx-auto rounded-[20px]",
        )}
      >
        <div className="rounded-[20px] p-4 mr-1 bg-gray-50 hidden md:block">Sidebar</div>
        <div className="rounded-[20px] bg-gray-50 flex flex-col col-span-2 md:col-2">
          <div className=" pt-4 pb-4 pl-6 text-4xl font-bold text-[#0E5585]">Campaign Dashboard</div>
          <div className="p-6">
            <KPISection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
