/**
 * Map backend error responses to user-friendly messages
 */
export const mapErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';

  // Network error
  if (error.message === 'Network Error') {
    return 'Network error. Please check your connection.';
  }

  // Timeout
  if (error.code === 'ECONNABORTED') {
    return 'Request timeout. Please try again.';
  }

  // Axios error response
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    const fieldErrors = data?.errors ? Object.values(data.errors) : [];
    const firstFieldError = fieldErrors.length > 0 ? fieldErrors[0] : null;

    // 400 Bad Request
    if (status === 400) {
      return firstFieldError || data.message || 'Invalid request. Please check your input.';
    }

    // 401 Unauthorized
    if (status === 401) {
      return 'Unauthorized. Please log in again.';
    }

    // 403 Forbidden
    if (status === 403) {
      return 'Access denied. You do not have permission.';
    }

    // 404 Not Found
    if (status === 404) {
      return 'Resource not found.';
    }

    // 409 Conflict
    if (status === 409) {
      return data.message || 'This resource already exists.';
    }

    // 422 Unprocessable Entity
    if (status === 422) {
      return data.message || 'Validation error. Please check your input.';
    }

    // 500+ Server Error
    if (status >= 500) {
      return 'Server error. Please try again later.';
    }

    // Custom backend message
    if (data.message) {
      return data.message;
    }
  }

  // Default error message
  return error.message || 'An error occurred. Please try again.';
};

/**
 * Parse form validation errors from backend
 */
export const parseValidationErrors = (error) => {
  if (error.response?.data?.errors) {
    const errors = {};
    Object.keys(error.response.data.errors).forEach(field => {
      const value = error.response.data.errors[field];
      errors[field] = Array.isArray(value) ? value[0] : value;
    });
    return errors;
  }
  return {};
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error) => {
  return !error.response && error.message === 'Network Error';
};

/**
 * Check if error is auth-related
 */
export const isAuthError = (error) => {
  return error.response?.status === 401 || error.response?.status === 403;
};
