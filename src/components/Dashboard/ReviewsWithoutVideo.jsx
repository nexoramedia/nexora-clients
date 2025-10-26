import React, { useState, useEffect } from "react";
import useApi from "../../hook/useApi";

const ReviewsWithoutVideo = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    profileImage: "", // Changed from initials
    position: "",
    quote: "",
    views: "",
    subscribers: "",
    joined: "",
    results: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const api = useApi();

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/api/reviews-without-video");
      if (response.status === "success") {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
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
      if (editingId) {
        await api.patch(`/api/reviews-without-video/${editingId}`, formData);
        setSuccessMessage("Review updated successfully!");
      } else {
        await api.post("/api/reviews-without-video", formData);
        setSuccessMessage("Review created successfully!");
      }

      resetForm();
      fetchReviews();
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleEdit = (review) => {
    setFormData({
      name: review.name,
      profileImage: review.profileImage, // Changed from initials
      position: review.position,
      quote: review.quote,
      views: review.views,
      subscribers: review.subscribers,
      joined: review.joined,
      results: review.results,
    });
    setEditingId(review._id);
    setShowForm(true);
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (reviewToDelete) {
      try {
        await api.delete(`/api/reviews-without-video/${reviewToDelete._id}`);
        setSuccessMessage("Review deleted successfully!");
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      profileImage: "", // Changed from initials
      position: "",
      quote: "",
      views: "",
      subscribers: "",
      joined: "",
      results: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleActive = async (review) => {
    try {
      await api.patch(`/api/reviews-without-video/${review._id}`, {
        isActive: !review.isActive,
      });
      setSuccessMessage(
        `Review ${!review.isActive ? "activated" : "deactivated"} successfully!`
      );
      fetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

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
                  Text Reviews
                </h1>
                <p className="mt-1 text-gray-600">
                  Manage customer text testimonials and reviews
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
              {showForm ? "Cancel" : "Add Review"}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {reviews.filter((r) => r.isActive).length}/8
            </div>
            <div className="text-sm text-gray-600">Active Reviews</div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {reviews.length}
            </div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Review" : "Create New Review"}
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
                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter reviewer name"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Profile Image URL *
                  </label>
                  <input
                    type="url"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Profile image URL
                  </p>
                </div>

                {/* Position */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Position/Company *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Position at Company"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Views */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Views Count *
                  </label>
                  <input
                    type="text"
                    name="views"
                    value={formData.views}
                    onChange={handleInputChange}
                    placeholder="1.2M views"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Subscribers */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Subscribers *
                  </label>
                  <input
                    type="text"
                    name="subscribers"
                    value={formData.subscribers}
                    onChange={handleInputChange}
                    placeholder="500K subscribers"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Joined */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Join Date *
                  </label>
                  <input
                    type="text"
                    name="joined"
                    value={formData.joined}
                    onChange={handleInputChange}
                    placeholder="Joined 2020"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Results */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Results Timeline *
                  </label>
                  <input
                    type="text"
                    name="results"
                    value={formData.results}
                    onChange={handleInputChange}
                    placeholder="Results in 3 months"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Quote */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Review Quote *
                  </label>
                  <textarea
                    name="quote"
                    value={formData.quote}
                    onChange={handleInputChange}
                    placeholder="What did the reviewer say?"
                    rows="4"
                    className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Profile Image Preview */}
              {formData.profileImage && (
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    Profile Image Preview:
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.profileImage}
                      alt="Profile preview"
                      className="object-cover w-16 h-16 border-2 border-gray-300 rounded-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                    <div className="items-center justify-center hidden w-16 h-16 text-lg font-bold text-white bg-blue-600 rounded-lg">
                      {formData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Preview of the profile image
                    </div>
                  </div>
                </div>
              )}

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
                  disabled={api.loading}
                  className="inline-flex items-center gap-2 px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {api.loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Saving...
                    </>
                  ) : editingId ? (
                    "Update Review"
                  ) : (
                    "Create Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Section */}
        <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          {/* Section Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Text Reviews
            </h3>
            <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
              {reviews.length} items
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            {api.loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <div className="w-8 h-8 mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <p>Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <h4 className="mb-2 text-lg font-medium text-gray-900">
                  No reviews yet
                </h4>
                <p className="mb-6 text-gray-600">
                  Get started by creating your first text review
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
                  Create Review
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
                      !review.isActive ? "opacity-70 bg-gray-50" : "bg-white"
                    }`}
                  >
                    {/* Card Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="flex items-center justify-center w-12 h-12 text-sm font-semibold text-white bg-blue-600 rounded-lg">
                            <img
                              src={review.profileImage}
                              alt={review.name}
                              className="object-cover w-full h-full rounded-lg"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextElementSibling.style.display =
                                  "flex";
                              }}
                            />
                            <div className="absolute inset-0 items-center justify-center hidden bg-blue-600 rounded-lg">
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {review.name}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {review.position}
                          </p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            review.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {review.isActive ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <p className="mb-4 italic text-gray-700 line-clamp-4">
                        "{review.quote}"
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-gray-500">Views</div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.views}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            Subscribers
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.subscribers}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Joined</div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.joined}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Results</div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.results}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => handleEdit(review)}
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
                        onClick={() => toggleActive(review)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          review.isActive
                            ? "text-yellow-700 bg-yellow-100 border border-yellow-300 hover:bg-yellow-200"
                            : "text-green-700 bg-green-100 border border-green-300 hover:bg-green-200"
                        }`}
                      >
                        {review.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(review)}
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
                ))}
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
                Delete Review
              </h3>
            </div>

            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the review from{" "}
              <span className="font-semibold text-gray-900">
                {reviewToDelete?.name}
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
                  "Delete Review"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsWithoutVideo;
