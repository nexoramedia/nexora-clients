import React, { useState, useEffect } from "react";
import useApi from "../../hook/useApi";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("youtube");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    category: "",
    tags: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const api = useApi();

  // Category configuration
  const videoCategories = [
    { value: "youtube", label: "YouTube Videos", limit: 4 },
    { value: "shorts", label: "Shorts", limit: 3 },
    { value: "saas", label: "SaaS Videos", limit: 4 },
    { value: "ads-vsl", label: "Ads & VSL", limit: 4 },
    { value: "introduction", label: "Introduction", limit: 1 },
    { value: "case-study", label: "Case Study", limit: 1 }, // New category", label: "Other", limit: 4 },
  ];

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchVideos = async () => {
    try {
      const response = await api.get(
        `/api/video-reels/category/${selectedCategory}`
      );

      if (response.status === "success") {
        setVideos(response.data.videoReels || response.data.videos || []);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const getCategoryLimit = (category) => {
    const cat = videoCategories.find((c) => c.value === category);
    return cat ? cat.limit : 0;
  };

  const getCurrentCategoryCount = (category) => {
    return videos.filter((video) => video.category === category).length;
  };

  const canAddVideo = (category) => {
    const currentCount = getCurrentCategoryCount(category);
    const limit = getCategoryLimit(category);
    return currentCount < limit;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const videoData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (editingId) {
        await api.patch(`/api/video-reels/${editingId}`, videoData);
        setSuccessMessage("Video updated successfully!");
      } else {
        await api.post("/api/video-reels", videoData);
        setSuccessMessage("Video created successfully!");
      }

      resetForm();
      fetchVideos();
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };

  const handleEdit = (video) => {
    setFormData({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      category: video.category,
      tags: video.tags ? video.tags.join(", ") : "",
    });
    setEditingId(video._id);
    setShowForm(true);
  };

  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (videoToDelete) {
      try {
        await api.delete(`/api/videos/${videoToDelete._id}`);
        setSuccessMessage("Video deleted successfully!");
        fetchVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
    setShowDeleteModal(false);
    setVideoToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setVideoToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      category: "",
      tags: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const extractYouTubeId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const getCategoryStats = () => {
    const stats = {};
    videoCategories.forEach((cat) => {
      stats[cat.value] = {
        current: getCurrentCategoryCount(cat.value),
        limit: cat.limit,
        label: cat.label,
      };
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Video Management
                </h1>
                <p className="mt-1 text-gray-600">
                  Manage your video content across different categories
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {showForm ? "Cancel" : "Add Video"}
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="flex items-center justify-between p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-green-700">{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-500 transition-colors duration-200 hover:text-green-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Error Alert */}
        {api.error && (
          <div className="flex items-center justify-between p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700">Error: {api.error}</span>
            </div>
            <button
              onClick={api.clearError}
              className="text-red-500 transition-colors duration-200 hover:text-red-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Category Stats */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {videoCategories.map((category) => {
            const stats = categoryStats[category.value];
            const isFull = stats.current >= stats.limit;
            return (
              <div
                key={category.value}
                className={`p-4 border rounded-lg ${
                  isFull
                    ? "bg-orange-50 border-orange-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="text-sm font-medium text-gray-900">
                  {category.label}
                </div>
                <div
                  className={`text-2xl font-bold ${
                    isFull ? "text-orange-600" : "text-gray-900"
                  }`}
                >
                  {stats.current}/{stats.limit}
                </div>
                {isFull && (
                  <div className="mt-1 text-xs text-orange-600">
                    Limit reached
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="p-6 mb-8 bg-white border border-gray-200 rounded-xl">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {videoCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Video Form */}
        {showForm && (
          <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Video" : "Add New Video"}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div
                  className={`w-2 h-2 rounded-full ${
                    editingId ? "bg-yellow-500" : "bg-green-500"
                  }`}
                ></div>
                {editingId ? "Editing Mode" : "Creating New"}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter video title"
                    maxLength="200"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Maximum 200 characters
                    </p>
                    <span className="text-xs text-gray-500">
                      {formData.title.length}/200
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {videoCategories.map((category) => {
                      const canAdd = canAddVideo(category.value) || editingId;
                      return (
                        <option
                          key={category.value}
                          value={category.value}
                          disabled={!canAdd && !editingId}
                        >
                          {category.label} (
                          {getCurrentCategoryCount(category.value)}/
                          {category.limit})
                        </option>
                      );
                    })}
                  </select>
                  {formData.category &&
                    !canAddVideo(formData.category) &&
                    !editingId && (
                      <p className="mt-1 text-xs text-red-600">
                        This category has reached its maximum limit
                      </p>
                    )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  YouTube URL *
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {formData.videoUrl && !extractYouTubeId(formData.videoUrl) && (
                  <p className="mt-1 text-xs text-red-600">
                    Please enter a valid YouTube URL
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter video description"
                  rows="4"
                  maxLength="1000"
                  className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Maximum 1000 characters
                  </p>
                  <span className="text-xs text-gray-500">
                    {formData.description.length}/1000
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="tag1, tag2, tag3"
                  className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    api.loading ||
                    (formData.category &&
                      !canAddVideo(formData.category) &&
                      !editingId) ||
                    (formData.videoUrl && !extractYouTubeId(formData.videoUrl))
                  }
                  className="inline-flex items-center gap-2 px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {api.loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Saving...
                    </>
                  ) : editingId ? (
                    "Update Video"
                  ) : (
                    "Create Video"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Videos Section */}
        <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          {/* Section Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Videos{" "}
              {videoCategories.find((c) => c.value === selectedCategory)?.label}
            </h3>
            <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
              {videos.length} items
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            {api.loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <div className="w-8 h-8 mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <p>Loading videos...</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="py-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <h4 className="mb-2 text-lg font-medium text-gray-900">
                  No videos yet
                </h4>
                <p className="mb-6 text-gray-600">
                  Get started by adding your first video
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Video
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => {
                  const videoId = extractYouTubeId(video.videoUrl);
                  const thumbnailUrl = videoId
                    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                    : null;

                  return (
                    <div
                      key={video._id}
                      className="overflow-hidden transition-all duration-200 border border-gray-200 rounded-lg hover:shadow-md"
                    >
                      {/* Video Thumbnail */}
                      {thumbnailUrl && (
                        <div className="bg-gray-200 aspect-video">
                          <img
                            src={thumbnailUrl}
                            alt={video.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}

                      {/* Video Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 line-clamp-2">
                            {video.title}
                          </h4>
                          <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full whitespace-nowrap">
                            {
                              videoCategories.find(
                                (c) => c.value === video.category
                              )?.label
                            }
                          </span>
                        </div>

                        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                          {video.description}
                        </p>

                        {video.tags && video.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {video.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {video.tags.length > 3 && (
                              <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                                +{video.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="text-xs text-gray-500">
                          Added:{" "}
                          {new Date(video.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Video Actions */}
                      <div className="flex gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
                        <button
                          onClick={() => handleEdit(video)}
                          className="inline-flex items-center justify-center flex-1 gap-1 px-3 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(video)}
                          className="inline-flex items-center justify-center flex-1 gap-1 px-3 py-2 text-sm text-red-700 transition-colors duration-200 bg-red-100 border border-red-300 rounded-md hover:bg-red-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Video
              </h3>
            </div>

            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the video:{" "}
              <span className="font-semibold text-gray-900">
                "{videoToDelete?.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={api.loading}
                className="inline-flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {api.loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete Video"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
