import adminApi from "./AdminApi";

/**
 * Fetch paginated and filtered admin emails
 * @param {Object} options
 * @param {number} [options.page=1]
 * @param {number} [options.limit=20]
 * @param {string} [options.category=""]
 * @param {string} [options.subCategory=""]
 * @returns {Promise<{success: boolean, count: number, total: number, page: number, limit: number, totalPages: number, emails: Array}>}
 */
export const getAdminEmails = async ({
  page = 1,
  limit = 20,
  category = "",
  subCategory = "",
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (category) {
    params.set("category", category);
  }

  if (subCategory) {
    params.set("subCategory", subCategory);
  }

  const response = await adminApi.get(`/admin/emails?${params.toString()}`);
  return response.data;
};

/**
 * Fetch email statistics aggregated by category and subcategory
 * @returns {Promise<{success: boolean, stats: {total: number, categories: Object}}>}
 */
export const getEmailStats = async () => {
  const response = await adminApi.get("/admin/emails/stats");
  return response.data;
};

/**
 * Fetch a single email by MongoDB _id (includes html body)
 * @param {string} id
 * @returns {Promise<{success: boolean, email: Object}>}
 */
export const getEmailById = async (id) => {
  const response = await adminApi.get(`/admin/emails/${id}`);
  return response.data;
};

/**
 * Trigger backend Gmail synchronization
 * @returns {Promise<{success: boolean, count: number, emails: Array}>}
 */
export const syncAdminEmails = async () => {
  const response = await adminApi.post("/admin/emails/sync");
  return response.data;
};
