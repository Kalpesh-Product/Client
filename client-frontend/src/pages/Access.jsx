import HierarchyTree from "../components/HierarchyTree";
import { data } from "../utils/data";
import TestSide from "../components/Sidetest";

export default function Access() {

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <TestSide />

      {/* Main Content */}
      <main className="flex-1 p-4 ml-4 md:p-8 motion-preset-blur-right-md overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Access
          </h1>
        </div>

        <div className="overflow-x-auto p-4 md:p-8 flex justify-center">
          <div className="max-w-4xl w-full motion-preset-expand">
            <HierarchyTree data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
