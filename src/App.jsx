import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {} from "react";

import { Toaster } from "@/components/ui/toaster";

import ModelContainer from "./components/organisms/Models/ModelContainer";
import AppContextProvider from "./context/AppContextProvider";
import { AppRoutes } from "./pages/Routes";
import { ErrorBoundary } from "react-error-boundary";
import CustomErrorBoundary from "./components/atoms/ErrorBoundary/CustomErrorBoundary";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ErrorBoundary FallbackComponent={CustomErrorBoundary} onReset={() => window.location.reload()}>
          <AppRoutes />
        </ErrorBoundary>
        <ModelContainer />
        <Toaster />
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
