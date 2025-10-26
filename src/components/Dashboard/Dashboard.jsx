import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardCards = [
    {
      title: "Reviews with Video",
      description: "Manage video testimonials and client reviews",
      path: "/dashboard/reviews-with-video",
      icon: "🎬",

      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Reviews without Video",
      description: "Manage text-based client reviews and testimonials",
      path: "/dashboard/reviews-without-video",
      icon: "📝",

      color: "bg-gradient-to-r from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      title: "FAQs",
      description: "Manage frequently asked questions",
      path: "/dashboard/faqs",
      icon: "❓",

      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      title: "Settings",
      description: "Configure your portfolio settings",
      path: "/dashboard/settings",
      icon: "⚙️",
      color: "bg-gradient-to-r from-gray-600 to-gray-700",
      hoverColor: "hover:from-gray-700 hover:to-gray-800",
    },
    {
      title: "Videos",
      description: "Configure your portfolio settings",
      path: "/dashboard/video",
      icon: "⚙️",
      color: "bg-gradient-to-r from-gray-600 to-gray-700",
      hoverColor: "hover:from-gray-700 hover:to-gray-800",
    },
  ];

  // Show back button only if not on home page
  const showBackButton = location.pathname !== "/";

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header with Back Button */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Video Editing Agency
            </h1>
            <p className="mt-1 text-gray-600">Portfolio Management System</p>
          </div>

          {/* Back to Home Button */}
          {showBackButton && (
            <button
              onClick={() => navigate("/")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Home</span>
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`
              bg-white rounded-xl shadow-md border border-gray-200 
              transform transition-all duration-300 
              hover:shadow-xl hover:-translate-y-1 
              cursor-pointer overflow-hidden
            `}
          >
            {/* Color Header */}
            <div
              className={`${card.color} ${card.hoverColor} h-2 w-full transition-all duration-300`}
            ></div>

            <div className="p-6">
              {/* Icon and Count */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{card.icon}</div>
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="mb-4 text-sm text-gray-600">{card.description}</p>

              {/* Action Button */}
              <div className="flex items-center text-sm font-medium text-blue-600">
                <span>Manage</span>
                <span className="ml-1">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
