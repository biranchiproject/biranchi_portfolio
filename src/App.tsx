import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/motion/ScrollProgress";
import SeoManager from "./components/SeoManager";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import AdminDashboard from "./pages/AdminDashboard";
import Achievements from "./pages/Achievements";
import StudentLancer from "./pages/StudentLancer";
import Services from "./pages/Services";
import Cybersecurity from "./pages/Cybersecurity";
import Education from "./pages/Education";
import { SiteDesignProvider } from "./lib/siteDesign";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteDesignProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <SeoManager />
          <ScrollProgress />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/student-lancer" element={<StudentLancer />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cybersecurity" element={<Cybersecurity />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/achievements" element={<Achievements />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SiteDesignProvider>
  </QueryClientProvider>
);

export default App;
