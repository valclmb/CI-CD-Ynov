import { Toaster } from "@/components/ui/toaster";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
      <Toaster />
    </QueryClientProvider>
  );
};
export { renderWithQueryClient };
