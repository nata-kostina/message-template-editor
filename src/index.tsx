import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { WidgetProvider } from "./contexts/widget/widget.context";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <WidgetProvider>
        <App />
    </WidgetProvider>
    ,
);
