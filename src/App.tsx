import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import "./locales";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useOfflineNetwork from "./hooks/useOfflineNetwork";

function App() {
  const queryClient = new QueryClient();
  const isOffline = useOfflineNetwork();

  if (isOffline) {
    return <div>No internet connection!</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
