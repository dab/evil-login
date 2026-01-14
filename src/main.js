/**
 * Main Entry Point
 * Imports all CSS in correct order and initializes the login page
 */

// Import CSS in order: tokens → base → components → utilities
import './styles/tokens.css';
import './styles/base.css';
import './styles/components/input.css';
import './styles/components/form.css';
import './styles/components/button.css';
import './styles/components/card.css';
import './styles/utilities.css';

// Initialize login page
import './pages/login/login.js';
