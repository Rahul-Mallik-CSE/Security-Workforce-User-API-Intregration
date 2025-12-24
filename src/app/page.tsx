/** @format */

import DashboardComponent from "@/components/HomeComponents/DashboardComponent";

export default function Home() {
  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-[2000px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Dashboard</h1>

        <DashboardComponent />
      </div>
    </div>
  );
}
