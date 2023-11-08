import React from "react";
import ReactDOM from "react-dom/client";

import Providers from "./providers.tsx";
import Routes from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>
);
