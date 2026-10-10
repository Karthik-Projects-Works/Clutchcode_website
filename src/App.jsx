import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton";
import {
  initSmoothScroll,
  destroySmoothScroll,
  useRouteScrollReset,
} from "./lib/motion";

const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ClutchKartPage = lazy(() => import("./pages/ClutchKartPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export default function App() {
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      if (lenis) destroySmoothScroll();
    };
  }, []);

  useRouteScrollReset();

  return (
    <>
      <Header />
<Suspense
        fallback={
          <div className="route-loading" role="status">
            <span className="route-loading-dot" />
            LOADING…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services.html" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work.html" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/clutchkart" element={<ClutchKartPage />} />
          <Route path="/clutchkart.html" element={<ClutchKartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact.html" element={<ContactPage />} />
        </Routes>
</Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
