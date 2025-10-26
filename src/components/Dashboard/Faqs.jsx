import React, { useState, useEffect } from "react";
import useApi from "../../hook/useApi";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const api = useApi();

  useEffect(() => {
    fetchFaqs();
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

  const fetchFaqs = async () => {
    try {
      const response = await api.get("/api/faqs");
      if (response.status === "success") {
        setFaqs(response.data.faqs);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
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
        await api.patch(`/api/faqs/${editingId}`, formData);
        setSuccessMessage("FAQ updated successfully!");
      } else {
        await api.post("/api/faqs", formData);
        setSuccessMessage("FAQ created successfully!");
      }

      resetForm();
      fetchFaqs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setEditingId(faq._id);
    setShowForm(true);
  };

  const handleDeleteClick = (faq) => {
    setFaqToDelete(faq);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (faqToDelete) {
      try {
        await api.delete(`/api/faqs/${faqToDelete._id}`);
        setSuccessMessage("FAQ deleted successfully!");
        fetchFaqs();
      } catch (error) {
        console.error("Error deleting FAQ:", error);
      }
    }
    setShowDeleteModal(false);
    setFaqToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setFaqToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
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
                  FAQs Management
                </h1>
                <p className="mt-1 text-gray-600">
                  Manage frequently asked questions
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              disabled={faqs.length >= 6 && !editingId}
              className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {showForm ? "Cancel" : "Add FAQ"}
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
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {faqs.length}/6
            </div>
            <div className="text-sm text-gray-600">Total FAQs</div>
            {faqs.length >= 6 && (
              <div className="mt-2 text-xs text-orange-600">
                Maximum limit reached
              </div>
            )}
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {faqs.length}
            </div>
            <div className="text-sm text-gray-600">Active FAQs</div>
          </div>
        </div>

        {/* FAQ Form */}
        {showForm && (
          <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit FAQ" : "Create New FAQ"}
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Question *
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter the frequently asked question"
                  rows="3"
                  maxLength="500"
                  className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Maximum 500 characters
                  </p>
                  <span className="text-xs text-gray-500">
                    {formData.question.length}/500
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Answer *
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  placeholder="Enter the detailed answer"
                  rows="5"
                  maxLength="2000"
                  className="w-full px-3 py-2 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Maximum 2000 characters
                  </p>
                  <span className="text-xs text-gray-500">
                    {formData.answer.length}/2000
                  </span>
                </div>
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
                  disabled={api.loading}
                  className="inline-flex items-center gap-2 px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {api.loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Saving...
                    </>
                  ) : editingId ? (
                    "Update FAQ"
                  ) : (
                    "Create FAQ"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FAQs Section */}
        <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
          {/* Section Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Frequently Asked Questions
            </h3>
            <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
              {faqs.length} items
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            {api.loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <div className="w-8 h-8 mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <p>Loading FAQs...</p>
              </div>
            ) : faqs.length === 0 ? (
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h4 className="mb-2 text-lg font-medium text-gray-900">
                  No FAQs yet
                </h4>
                <p className="mb-6 text-gray-600">
                  Get started by creating your first FAQ
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
                  Create FAQ
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={faq._id}
                    className="overflow-hidden transition-all duration-200 border border-gray-200 rounded-lg hover:shadow-md"
                  >
                    {/* FAQ Header */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                            {index + 1}
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            {faq.question}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Content */}
                    <div className="p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {faq.answer}
                      </p>
                    </div>

                    {/* FAQ Actions */}
                    <div className="flex gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => handleEdit(faq)}
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
                        onClick={() => handleDeleteClick(faq)}
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
                Delete FAQ
              </h3>
            </div>

            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the FAQ:{" "}
              <span className="font-semibold text-gray-900">
                "{faqToDelete?.question}"
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
                  "Delete FAQ"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faqs;
