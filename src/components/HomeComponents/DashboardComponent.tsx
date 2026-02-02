/** @format */
"use client";
import StatCard from "./StatCard";
import { Star } from "lucide-react";
import JobActivityChart from "./JobActivityChart";
import CompanyRatingChart from "./CompanyRatingChart";
import { useGetDashboardMetricsQuery } from "@/redux/freatures/dashboardAPI";

const DashboardComponent = () => {
  const {
    data: dashboardResponse,
    isLoading,
    error,
  } = useGetDashboardMetricsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600">
            Failed to load dashboard data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const overview = dashboardResponse?.data?.overview;
  const weeklyActivity = dashboardResponse?.data?.weekly_activity;
  const ratingPerformance = dashboardResponse?.data?.rating_performance;

  const statCards = [
    { label: "Untasked Jobs", value: overview?.unticked_jobs || 0 },
    { label: "Job in Progress", value: overview?.jobs_in_progress || 0 },
    { label: "Completed Jobs", value: overview?.completed_jobs || 0 },
    {
      label: "Industry Performance Rating",
      value: overview?.average_rating || 0,
      icon: <Star className="w-6 h-6 fill-yellow-500" />,
    },
    // {
    //   label: "Industry Performance Rating",
    //   value: overview?.industry_rating || 0,
    //   icon: <Star className="w-6 h-6 fill-yellow-500" />,
    // },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <JobActivityChart weeklyActivity={weeklyActivity} />
        </div>
        <div className="lg:col-span-1">
          <CompanyRatingChart ratingPerformance={ratingPerformance} />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
