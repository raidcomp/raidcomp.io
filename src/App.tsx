import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { RaidCompPage } from "./pages/raid-comp";
import { IntlProvider } from "react-intl";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <IntlProvider locale="en" defaultLocale="en">
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/:expansionIDString"} element={<RaidCompPage />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </IntlProvider>
  );
}

export default App;
