import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
              <Route path="/recettes/:recetteID" element={<RecipePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
