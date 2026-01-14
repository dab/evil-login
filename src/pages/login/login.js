/**
 * Login Page
 * Orchestrates login form behavior and user interactions
 */

import { validateField, setupFieldValidation } from '../../services/validation/index.js';
import { login } from '../../services/api/index.js';

const elements = {
  form: document.getElementById('loginForm'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  submitButton: document.getElementById('submitButton'),
  togglePassword: document.getElementById('togglePassword'),
  formError: document.getElementById('form-error')
};

/**
 * Toggles password visibility between hidden and visible
 */
function togglePasswordVisibility() {
  const isPassword = elements.password.type === 'password';
  elements.password.type = isPassword ? 'text' : 'password';
  elements.togglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
}

/**
 * Displays a message in the form error area
 * @param {string} message - The message to display
 * @param {'error'|'success'} type - The type of message
 */
function setFormMessage(message, type = 'error') {
  elements.formError.classList.remove('form-error--success');
  elements.formError.classList.toggle('form-error--success', type === 'success');
  elements.formError.textContent = message;
}

/**
 * Sets the loading state of the form
 * @param {boolean} isLoading - Whether the form is loading
 */
function setFormLoading(isLoading) {
  elements.submitButton.disabled = isLoading;
  elements.submitButton.classList.toggle('loading', isLoading);
  elements.form.setAttribute('aria-busy', isLoading);
}

/**
 * Focuses the first invalid field in the form
 * @param {HTMLInputElement[]} fields - Array of form fields
 */
function focusFirstInvalidField(fields) {
  const firstInvalid = fields.find(field => !field.validity.valid);
  firstInvalid?.focus();
}

/**
 * Handles form submission
 * @param {SubmitEvent} event - The submit event
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  setFormMessage('', 'error');

  const fields = [elements.email, elements.password];
  const validationResults = fields.map(validateField);
  const isValid = validationResults.every(Boolean);

  if (!isValid) {
    focusFirstInvalidField(fields);
    return;
  }

  setFormLoading(true);

  try {
    const formData = new FormData(elements.form);
    const result = await login(
      formData.get('email'),
      formData.get('password')
    );

    setFormMessage('✓ Login successful! Redirecting...', 'success');

    setTimeout(() => {
      console.log('Login successful:', result);
      alert('Login successful! Check console for details.');
    }, 500);

  } catch (error) {
    setFormMessage(error.message, 'error');
    setFormLoading(false);
  }
}

/**
 * Handles click events on demo links
 * @param {MouseEvent} event - The click event
 * @param {string} message - The message to display
 */
function handleLinkClick(event, message) {
  event.preventDefault();
  alert(message);
}

/**
 * Initializes the login form
 */
function init() {
  [elements.email, elements.password].forEach(setupFieldValidation);

  elements.togglePassword.addEventListener('click', togglePasswordVisibility);
  elements.form.addEventListener('submit', handleFormSubmit);

  const forgotLink = document.querySelector('.forgot-link');
  const signupLink = document.querySelector('.signup-prompt a');

  forgotLink?.addEventListener('click', (e) =>
    handleLinkClick(e, 'Password reset functionality would be implemented here.')
  );

  signupLink?.addEventListener('click', (e) =>
    handleLinkClick(e, 'Sign up page would be implemented here.')
  );
}

init();
