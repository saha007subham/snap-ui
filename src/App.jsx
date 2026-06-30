import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@/pages/Home";
import { CardDocs } from "@/pages/CardDocs";
import { AccordionDocs } from "@/pages/AccordionDocs";
import { AutocompleteSearchDocs } from "@/pages/AutocompleteSearchDocs";
import { ButtonDocs } from "@/pages/ButtonDocs";
import { InputDocs } from "@/pages/InputDocs";
import { PasswordInputDocs } from "@/pages/PasswordInputDocs";
import { CheckBoxDocs } from "@/pages/CheckBoxDocs";
import { CheckboxCardDocs } from "@/pages/CheckboxCardDocs";
import { RadioButtonDocs } from "@/pages/RadioButtonDocs";
import { NumberFieldDocs } from "@/pages/NumberFieldDocs";
import { SwitchDocs } from "@/pages/SwitchDocs";
import { SliderDocs } from "@/pages/SliderDocs";
import { ComboBoxDocs } from "@/pages/ComboBoxDocs";
import { ColourPickerDocs } from "@/pages/ColourPickerDocs";
import { DatePickerDocs } from "@/pages/DatePickerDocs";
import { FileUploadDocs } from "@/pages/FileUploadDocs";
import { PinInputDocs } from "@/pages/PinInputDocs";
import { StarRatingDocs } from "@/pages/StarRatingDocs";
import { TagsInputDocs } from "@/pages/TagsInputDocs";
import { SegmentedControlDocs } from "@/pages/SegmentedControlDocs";
import { LoadingSpinnerDocs } from "@/pages/LoadingSpinnerDocs";
import { OverviewDocs } from "@/pages/OverviewDocs";
import { ComponentDocs } from "./pages/ComponentDocs";
import { Header } from "@/components/core-components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <ScrollToTop />
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
                <Route path="/components/*" element={<ComponentDocs />}>
                  <Route
                    index
                    element={<Navigate to="/components/overview" replace />}
                  />
                  <Route path="overview" element={<OverviewDocs />} />
                  <Route path="accordion" element={<AccordionDocs />} />
                  <Route path="autocompletesearch" element={<AutocompleteSearchDocs />} />
                  <Route path="card" element={<CardDocs />} />
                  <Route path="button" element={<ButtonDocs />} />
                  <Route path="input" element={<InputDocs />} />
                  <Route path="loadingspinner" element={<LoadingSpinnerDocs />} />
                  <Route path="passwordinput" element={<PasswordInputDocs />} />
                  <Route path="checkbox" element={<CheckBoxDocs />} />
                  <Route path="checkboxcard" element={<CheckboxCardDocs />} />
                  <Route path="radiobutton" element={<RadioButtonDocs />} />
                  <Route path="numberfield" element={<NumberFieldDocs />} />
                  <Route path="switch" element={<SwitchDocs />} />
                  <Route path="slider" element={<SliderDocs />} />
                  <Route path="starrating" element={<StarRatingDocs />} />
                  <Route path="combobox" element={<ComboBoxDocs />} />
                  <Route path="colourpicker" element={<ColourPickerDocs />} />
                  <Route path="datepicker" element={<DatePickerDocs />} />
                  <Route path="fileupload" element={<FileUploadDocs />} />
                  <Route path="pininput" element={<PinInputDocs />} />
                  <Route path="tagsinput" element={<TagsInputDocs />} />
                  <Route path="segmentedcontrol" element={<SegmentedControlDocs />} />
                  <Route
                    path="*"
                    element={<Navigate to="/components/overview" replace />}
                  />
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
