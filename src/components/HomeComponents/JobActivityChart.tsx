/** @format */

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { day: "Mon", value: 60 },
  { day: "Tues", value: 80 },
  { day: "Wed", value: 70 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 75 },
];

export default function JobActivityPage() {
  return (
    <div className=" bg-white p-8">
      <Card className="w-full border-0 shadow-none">
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl font-normal text-gray-700">
            This Week&apos;s Job Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 150, left: 40, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={true}
              />
              <XAxis
                type="number"
                stroke="#9ca3af"
                domain={[0, 120]}
                ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                label={{
                  value: "Active Jobs",
                  position: "insideBottom",
                  offset: -10,
                  style: { fill: "#9ca3af", fontSize: 12 },
                }}
              />
              <YAxis
                dataKey="day"
                type="category"
                stroke="none"
                tick={{ fontSize: 13, fill: "#6b7280" }}
                width={40}
                label={{
                  value: "Weekly Days",
                  angle: 90,
                  position: "insideLeft",
                  offset: -10,
                  style: {
                    fill: "#9ca3af",
                    fontSize: 12,
                    textAnchor: "middle",
                  },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              <Bar dataKey="value" fill="#5b7b94" radius={[0, 8, 8, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={"#5b7b94"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
