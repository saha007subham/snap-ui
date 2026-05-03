import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@/pages/Home";
import { CardDocs } from "@/pages/CardDocs";
import { ComponentDocs } from "./pages/ComponentDocs";
import { Header } from "@/components/core-components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<ComponentDocs />}>
              <Route index element={<Navigate to="/components/card" replace />} />
              <Route path="card" element={<CardDocs />} />
              <Route path="button" element={<div className="p-16 text-slate-500">Button Component Docs coming soon...</div>} />
              <Route path="input" element={<div className="p-16 text-slate-500">Input Component Docs coming soon...</div>} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
