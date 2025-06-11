
import { QueryClient } from "@tanstack/react-query";
import { apiEndpoints } from "./api";

// Create a query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Mock the apiRequest function to use our Supabase endpoints
export const apiRequest = async (endpoint: string, options?: any) => {
  if (endpoint in apiEndpoints) {
    return { data: await apiEndpoints[endpoint as keyof typeof apiEndpoints]() };
  }
  
  // Handle other endpoints as needed
  throw new Error(`Endpoint ${endpoint} not implemented`);
};
