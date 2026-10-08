import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { VisitorProvider } from "@/context/VisitorContext";
import { Analytics } from "@vercel/analytics/react";
import { ChatPortfolio } from "@/components/ChatPortfolio";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { WritingPage } from "@/pages/WritingPage";

export function App() {
  return (
    <ThemeProvider>
      <VisitorProvider>
        <BrowserRouter>
          <Analytics />
          <Routes>
            <Route path="/" element={<ChatPortfolio />} />
            <Route path="/projects" element={<Projects isSearchable={true} />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/writing" element={<WritingPage />} />
          </Routes>
        </BrowserRouter>
      </VisitorProvider>
    </ThemeProvider>
  );
}

export default App;
