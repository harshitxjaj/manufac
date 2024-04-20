import React from "react";
import "@mantine/core/styles.css";
import "./assets/css/app.css";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home/Home";

function App() {
  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}

export default App;
