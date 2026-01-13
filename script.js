const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submitButton');
const togglePasswordButton = document.getElementById('togglePassword');
const formError = document.getElementById('form-error');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(input, message) {
  const errorElement = document.getElementById(`${input.id}-error`);
  errorElement.textContent = message;
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-errormessage', `${input.id}-error`);
}

function clearError(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  errorElement.textContent = '';
  input.removeAttribute('aria-invalid');
}

function markValid(input) {
  clearError(input);
  input.setAttribute('aria-invalid', 'false');
}

function validateField(input) {
  if (input.id === 'email') {
    if (!input.value) {
      showError(input, 'Email is required');
      return false;
    }
    if (!validateEmail(input.value)) {
      showError(input, 'Please enter a valid email address');
      return false;
    }
    markValid(input);
    return true;
  }

  if (input.id === 'password') {
    if (!input.value) {
      showError(input, 'Password is required');
      return false;
    }
    if (!validatePassword(input.value)) {
      showError(input, 'Password must be at least 6 characters');
      return false;
    }
    markValid(input);
    return true;
  }

  return true;
}

emailInput.addEventListener('input', () => {
  if (emailInput.hasAttribute('aria-invalid')) {
    if (validateEmail(emailInput.value)) {
      markValid(emailInput);
    }
  }
});

emailInput.addEventListener('change', () => {
  validateField(emailInput);
});

emailInput.addEventListener('blur', () => {
  if (emailInput.value) {
    validateField(emailInput);
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.hasAttribute('aria-invalid')) {
    if (validatePassword(passwordInput.value)) {
      markValid(passwordInput);
    }
  }
});

passwordInput.addEventListener('change', () => {
  validateField(passwordInput);
});

passwordInput.addEventListener('blur', () => {
  if (passwordInput.value) {
    validateField(passwordInput);
  }
});

togglePasswordButton.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  const label = type === 'password' ? 'Show password' : 'Hide password';
  togglePasswordButton.setAttribute('aria-label', label);
});

async function mockFetch(email, password) {
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (Math.random() < 0.15) {
    throw new Error('Network error. Please check your connection and try again.');
  }

  if (email === 'error@test.com') {
    throw new Error('Server error. Please try again later.');
  }

  if (email === 'demo@example.com' && password === 'password123') {
    return { success: true, token: 'mock-jwt-token' };
  }

  throw new Error('Invalid email or password. Please try again.');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  formError.textContent = '';

  const isEmailValid = validateField(emailInput);
  const isPasswordValid = validateField(passwordInput);

  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  submitButton.disabled = true;
  submitButton.classList.add('loading');
  submitButton.autocomplete = 'off';

  try {
    const result = await mockFetch(emailInput.value, passwordInput.value);

    formError.style.background = 'oklch(60% 0.15 145 / 0.1)';
    formError.style.color = 'oklch(60% 0.15 145)';
    formError.style.borderColor = 'oklch(60% 0.15 145)';
    formError.textContent = '✓ Login successful! Redirecting...';

    setTimeout(() => {
      console.log('Login successful:', result);
      alert('Login successful! Check console for details.');
    }, 500);

  } catch (error) {
    formError.style.background = 'oklch(55% 0.20 25 / 0.1)';
    formError.style.color = 'oklch(55% 0.20 25)';
    formError.style.borderColor = 'oklch(55% 0.20 25)';
    formError.textContent = error.message;

    submitButton.classList.remove('loading');
    submitButton.disabled = false;
  }
});

const forgotLink = document.querySelector('.forgot-link');
forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Password reset functionality would be implemented here.');
});

const signupLink = document.querySelector('.signup-prompt a');
signupLink.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Sign up page would be implemented here.');
});
