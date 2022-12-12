import React from "react";
import Background from "./components/Background";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import Main from "./views/Main";
import DataProvider from "./hooks/word-hooks";
import * as dotenv from "dotenv";

const queryClient = new QueryClient();
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

console.log(result.parsed);
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
