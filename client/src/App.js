import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Home from "./components/home/Home.jsx";
import Form from "./components/form/Form.jsx";
import Detail from "./components/detail/Detail.jsx";
import About from "./components/about/About.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/home/:id" element={<Detail/>}/>
          <Route path="/create-recipe" element={<Form/>}/>
          <Route path="/update-recipe/:id" element={<Form/>}/>
          <Route path="/aboutme" element={<About/>}/>
          <Route path="*" element={<LandingPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
