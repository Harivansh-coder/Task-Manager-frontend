"use client";
import React, { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/api";

interface Analytics {
  totalTasks: number;
  finishedTasks: number;
  pendingTasks: number;
  averageCompletionTime: number;
  totalLapsedTime: number;
  totalEstimatedTime: number;
}

interface DashboardProps {
  totalTasks: number;
  finishedTasks: number;
  pendingTasks: number;
  percentageTasksFinished: number;
  percentageTasksPending: number;
  averageCompletionTime: number;
  totalLapsedTime: number;
  totalEstimatedTime: number;
}

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<DashboardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data: Analytics = await getAnalytics();

        // Calculate percentages
        const totalTasks = data.totalTasks || 1; // Avoid division by zero
        const percentageTasksFinished = (data.finishedTasks / totalTasks) * 100;
        const percentageTasksPending = (data.pendingTasks / totalTasks) * 100;

        setAnalytics({
          ...data,
          percentageTasksFinished,
          percentageTasksPending,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch analytics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!analytics) return <p>No analytics data available.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Section */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Tasks Overview</h2>
          <p className="text-gray-700 mb-2">
            Total Tasks:{" "}
            <span className="font-bold">{analytics.totalTasks}</span>
          </p>
          <p className="text-gray-700 mb-2">
            Finished Tasks:{" "}
            <span className="font-bold">{analytics.finishedTasks}</span>
          </p>
          <p className="text-gray-700 mb-2">
            Pending Tasks:{" "}
            <span className="font-bold">{analytics.pendingTasks}</span>
          </p>
          <div className="flex items-center justify-between">
            <p className="text-green-500">
              Tasks Finished: {analytics.percentageTasksFinished.toFixed(2)}%
            </p>
            <p className="text-red-500">
              Tasks Pending: {analytics.percentageTasksPending.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Time Section */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Time Insights</h2>
          <p className="text-gray-700 mb-2">
            Average Completion Time:{" "}
            <span className="font-bold">
              {analytics.averageCompletionTime} hrs
            </span>
          </p>
          <p className="text-gray-700 mb-2">
            Total Lapsed Time:{" "}
            <span className="font-bold">{analytics.totalLapsedTime} hrs</span>
          </p>
          <p className="text-gray-700">
            Total Estimated Time:{" "}
            <span className="font-bold">
              {analytics.totalEstimatedTime} hrs
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
