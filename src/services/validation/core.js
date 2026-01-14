/**
 * Validation Core Logic
 * Handles validation state management and error display
 */

import { validators } from './rules.js';

/**
 * Error element cache for performance optimization
 * Avoids repeated DOM queries for the same error elements
 */
const errorElementCache = new Map();

/**
 * Gets or caches the error element for an input field
 * @param {HTMLInputElement} input - The input element
 * @returns {HTMLElement|null} The error element or null if not found
 */
function getErrorElement(input) {
  if (!errorElementCache.has(input)) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElementCache.set(input, errorElement);
  }
  return errorElementCache.get(input);
}

/**
 * Displays an error message for an input field
 * Uses Constraint Validation API for native browser integration
 * @param {HTMLInputElement} input - The input element
 * @param {string} message - The error message to display
 */
export function showError(input, message) {
  const errorElement = getErrorElement(input);
  if (!errorElement) return;

  errorElement.textContent = message;
  input.setAttribute('aria-invalid', 'true');
  input.setCustomValidity(message);
}

/**
 * Clears the error message for an input field
 * @param {HTMLInputElement} input - The input element
 */
export function clearError(input) {
  const errorElement = getErrorElement(input);
  if (!errorElement) return;

  errorElement.textContent = '';
  input.removeAttribute('aria-invalid');
  input.setCustomValidity('');
}

/**
 * Marks an input field as valid
 * @param {HTMLInputElement} input - The input element
 */
export function markValid(input) {
  clearError(input);
  input.setAttribute('aria-invalid', 'false');
}

/**
 * Validates a single input field
 * @param {HTMLInputElement} input - The input element to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateField(input) {
  const validator = validators.get(input.id);

  if (!validator) return true;

  if (!input.value) {
    showError(input, validator.messages.required);
    return false;
  }

  if (!validator.test(input.value)) {
    showError(input, validator.messages.invalid);
    return false;
  }

  markValid(input);
  return true;
}

/**
 * Sets up validation event listeners for an input field
 * Implements optimal UX validation timing:
 * - input: clears errors when field becomes valid (non-intrusive)
 * - change: validates after user interaction complete
 * - blur: validates only if field has value (avoids premature errors)
 *
 * @param {HTMLInputElement} input - The input element
 */
export function setupFieldValidation(input) {
  const validator = validators.get(input.id);

  if (!validator) return;

  input.addEventListener('input', () => {
    if (!input.validity.valid && input.value && validator.test(input.value)) {
      markValid(input);
    }
  });

  input.addEventListener('change', () => validateField(input));

  input.addEventListener('blur', () => {
    if (input.value) {
      validateField(input);
    }
  });
}
