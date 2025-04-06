
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './utils/analytics' // Import to initialize analytics - no need to assign to variable

createRoot(document.getElementById("root")).render(<App />);
