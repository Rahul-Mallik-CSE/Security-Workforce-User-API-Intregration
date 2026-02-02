/** @format */
"use client";
import DashboardComponent from "@/components/HomeComponents/DashboardComponent";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateNewJob = () => {
    router.push("/job-management/create-new-job");
  };
  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-[2000px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Dashboard</h1>
        <div className="flex w-full justify-center items-center  gap-4 mb-2 flex-wrap">
          {/* Create New Job Button */}
          <Button
            onClick={handleCreateNewJob}
            className="flex items-center gap-2 px-10 py-8 bg-orange-500 text-white rounded-lg  hover:bg-orange-600 transition-colors whitespace-nowrap"
          >
            <span className="text-2xl ">+</span>
            <span className="text-2xl font-bold">Post a Job</span>
          </Button>
        </div>

        <DashboardComponent />
      </div>
    </div>
  );
}
