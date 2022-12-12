import React from "react";
import Background from "./components/Background";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import Main from "./views/Main";
import DataProvider from "./hooks/word-hooks";

const queryClient = new QueryClient();

const App = () => {
  return (
    <DataProvider>
      <QueryClientProvider client={queryClient}>
        <Background>
          <Main />
        </Background>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </DataProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
