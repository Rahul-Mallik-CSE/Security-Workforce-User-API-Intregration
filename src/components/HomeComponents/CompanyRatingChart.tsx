/** @format */

"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { DashboardRatingPerformance } from "@/types/AllTypes";

interface CompanyRatingChartProps {
  ratingPerformance?: DashboardRatingPerformance;
}

const defaultRatingData = [
  { name: "Communication", value: 2.5, color: "#EF4444", maxValue: 5 },
  { name: "Payment reliability", value: 4.5, color: "#3B82F6", maxValue: 5 },
  { name: "Pay rates", value: 3.0, color: "#10B981", maxValue: 5 },
  { name: "Professionalism", value: 2.5, color: "#1E293B", maxValue: 5 },
  { name: "Job Support", value: 3.5, color: "#F59E0B", maxValue: 5 },
];

// Data for the donut chart - multi-colored segments
const donutData = [
  { value: 1, color: "#1E293B" }, // Dark blue/navy
  { value: 1, color: "#F59E0B" }, // Yellow/Orange
  { value: 1, color: "#10B981" }, // Green
  { value: 1, color: "#3B82F6" }, // Blue
  { value: 1, color: "#EF4444" }, // Red
];

export default function CompanyRatingChart({
  ratingPerformance,
}: CompanyRatingChartProps) {
  // Map API data to chart format
  const ratingData = ratingPerformance
    ? [
        {
          name: "Communication",
          value: ratingPerformance.communication,
          color: "#EF4444",
          maxValue: 5,
        },
        {
          name: "Payment reliability",
          value: ratingPerformance.payment_reliability,
          color: "#3B82F6",
          maxValue: 5,
        },
        {
          name: "Pay rates",
          value: ratingPerformance.pay_rates,
          color: "#10B981",
          maxValue: 5,
        },
        {
          name: "Professionalism",
          value: ratingPerformance.Professionalism,
          color: "#1E293B",
          maxValue: 5,
        },
        {
          name: "Job Support",
          value: ratingPerformance["Job Support"],
          color: "#F59E0B",
          maxValue: 5,
        },
      ]
    : defaultRatingData;

  // Calculate average rating from the rating data
  const averageRating =
    ratingData.length > 0
      ? (
          ratingData.reduce((sum, item) => sum + item.value, 0) /
          ratingData.length
        ).toFixed(1)
      : "0.0";
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-black mb-6">
        Company Performance Rating
      </h2>

      {/* Circular Rating Chart */}
      <div className="relative flex items-center justify-center mb-8">
        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={450}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500">Average</p>
          <p className="text-xs text-gray-500">Rating</p>
          <p className="text-4xl font-bold text-gray-900 mt-1">
            {averageRating}/5
          </p>
        </div>
      </div>

      {/* Rating List with Progress Bars */}
      <div className="space-y-4">
        {ratingData.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg font-bold text-gray-900">
                {item.value}/{item.maxValue}
              </span>
              <span className="text-sm text-gray-500">{item.name}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(item.value / item.maxValue) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
