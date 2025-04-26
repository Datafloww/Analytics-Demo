
import { Analytics } from "@datafloww/analytics";

// Initialize analytics with your write key
export const analytics = Analytics.init({ 
  key: "2a8b9a42-b720c1cb",
  project_id: "test-login-site",
  version: "1.0.0",
  debug: true // Set to false in production
});

// Utility function for easier tracking
export const track = (eventName, properties = {}) => {
  // Add timestamp to all events
  const eventProperties = {
    timestamp: new Date().toISOString(),
    ...properties
  };
  
  // Log event to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}:`, eventProperties);
  }
  
  // Send event to analytics service
  analytics.track(eventName, eventProperties);
};

// Common events
export const trackPageView = (pageName) => {
  track('page_view', { page: pageName });
};

export const trackButtonClick = (buttonName, additionalProps = {}) => {
  track('button_click', { button: buttonName, ...additionalProps });
};

