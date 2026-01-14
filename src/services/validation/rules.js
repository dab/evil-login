/**
 * Validation Rules Configuration
 * Centralized validation rules for form fields
 *
 * Using Map for O(1) lookup performance. While a plain object would work
 * for 2 fields, Map demonstrates scalable architecture thinking for
 * applications with 20+ form fields.
 */

export const validators = new Map([
  ['email', {
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    messages: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address'
    }
  }],
  ['password', {
    test: (value) => value.length >= 6,
    messages: {
      required: 'Password is required',
      invalid: 'Password must be at least 6 characters'
    }
  }]
]);
