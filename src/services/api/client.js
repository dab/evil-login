/**
 * API Client
 * Mock authentication API for demonstration
 */

const CONFIG = {
  MOCK_DELAY_MS: 1500,
  NETWORK_ERROR_RATE: 0.15,
  TEST_CREDENTIALS: {
    email: 'demo@example.com',
    password: 'password123'
  },
  ERROR_TRIGGER_EMAIL: 'error@test.com'
};

/**
 * Authenticates user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{success: boolean, token: string}>} Authentication result
 * @throws {Error} Network error, server error, or invalid credentials
 */
export async function login(email, password) {
  await new Promise(resolve => setTimeout(resolve, CONFIG.MOCK_DELAY_MS));

  if (Math.random() < CONFIG.NETWORK_ERROR_RATE) {
    throw new Error('Network error. Please check your connection and try again.');
  }

  if (email === CONFIG.ERROR_TRIGGER_EMAIL) {
    throw new Error('Server error. Please try again later.');
  }

  if (email === CONFIG.TEST_CREDENTIALS.email && password === CONFIG.TEST_CREDENTIALS.password) {
    return { success: true, token: 'mock-jwt-token' };
  }

  throw new Error('Invalid email or password. Please try again.');
}
