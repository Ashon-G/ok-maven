import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SplashScreen } from "@/components/ui/splash-screen";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { StrictMode } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import FounderSignup from "./pages/signup/FounderSignup";
import MavenSignup from "./pages/signup/MavenSignup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/dashboard/Tasks";
import Chat from "./pages/dashboard/Chat";
import Profile from "./pages/dashboard/Profile";
import Admin from "./pages/dashboard/Admin";
import Treasury from "./pages/dashboard/Treasury";
import UpgradePlan from "./pages/UpgradePlan";
import CompliancePackages from "./pages/CompliancePackages";
import BlogPost from "./pages/blog/[slug]";
import Integrations from "./pages/dashboard/Integrations";
import { useAuth } from "@/components/auth/AuthProvider";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly) {
    const isAdmin = session.user.user_metadata.user_type === 'admin';
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/founder" element={<FounderSignup />} />
      <Route path="/signup/maven" element={<MavenSignup />} />
      <Route path="/upgrade" element={<UpgradePlan />} />
      <Route path="/compliance-packages" element={<CompliancePackages />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="tasks" replace />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="chat" element={<Chat />} />
        <Route path="treasury" element={<Treasury />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={
          <ProtectedRoute adminOnly>
            <Admin />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="/signup" element={<Navigate to="/signup/founder" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider delayDuration={0}>
              <SplashScreen />
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;