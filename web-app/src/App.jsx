import './App.css'
import { HomeScreen } from "./Pages/HomeScreen"
import { ResultsScreen } from "./Pages/ResultsScreen"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="results" element={<ResultsScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App