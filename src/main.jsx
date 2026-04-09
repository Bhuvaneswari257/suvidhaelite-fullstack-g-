import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { BookingProvider } from "./context/BookingContext";
import { ReviewProvider } from "./context/ReviewContext";

/* ✅ ADD THIS IMPORT */
import { SupportProvider } from "./context/SupportContext";

/* ✅ NEW (ONLY ADDITION) */
import { ProfessionalProvider } from "./pages/professional/ProfessionalContext";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <ProfessionalProvider>   {/* 🔥 ADD THIS */}

          <NotificationProvider>

            <SupportProvider>

              <BookingProvider>
                <ReviewProvider>
                  <App />
                </ReviewProvider>
              </BookingProvider>

            </SupportProvider>

          </NotificationProvider>

        </ProfessionalProvider>  {/* 🔥 END */}

      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);