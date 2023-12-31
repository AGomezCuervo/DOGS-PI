import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Cards from "./components/Cards/Cards";
import { Route, Routes } from "react-router-dom";
import Form from "./components/Form/Form";
import Detail from "./components/Detail/Detail";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<Cards/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/form" element={<Form/>}/>
         </Routes>

      </div>
      
   );
}

export default App;
