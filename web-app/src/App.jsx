import './App.css'
import { HomePage } from "./Pages/HomePage"
import SimpleBottomNavigation from "./Components/Navigation"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <HomePage />
    </div>
  )
}

export default App


//{/* <BrowserRouter>
//<Routes>
//<Route path="/" element={<SimpleBottomNavigation />}>
//  <Route path="/home" element={<HomePage />} />
//</Route>
//</Routes>
//</BrowserRouter> */}