import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@/pages/Home";
import { CardDocs } from "@/pages/CardDocs";
import { ButtonDocs } from "@/pages/ButtonDocs";
import { InputDocs } from "@/pages/InputDocs";
import { CheckBoxDocs } from "@/pages/CheckBoxDocs";
import { ComponentDocs } from "./pages/ComponentDocs";
import { Header } from "@/components/core-components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <div className="relative h-screen w-full bg-[#fafafa] dark:bg-slate-950 transition-colors overflow-hidden">
          {/* Background Glow Effect */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Primary blue glow */}
            <div className="absolute w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] -top-32 -left-32" />
            {/* Secondary cyan glow */}
            <div className="absolute w-[500px] h-[500px] bg-cyan-300/20 dark:bg-cyan-500/20 rounded-full blur-[100px] top-1/4 right-1/4" />
          </div>

          {/* Foreground App Content */}
          <div className="relative z-10 flex h-full flex-col">
            <Header />
            <main className="flex-1 flex flex-col min-h-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/components" element={<ComponentDocs />}>
                  <Route index element={<Navigate to="/components/card" replace />} />
                  <Route path="card" element={<CardDocs />} />
                  <Route path="button" element={<ButtonDocs />} />
                  <Route path="input" element={<InputDocs />} />
                  <Route path="checkbox" element={<CheckBoxDocs />} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
