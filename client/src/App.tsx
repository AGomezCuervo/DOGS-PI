import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Cards from "./components/Cards/Cards";
import { Form, Route, Routes } from "react-router-dom";
import Detail from "./components/Detail/Detail";

function App() {

   return (
      <div className="App">
         <NavBar/>
         <Routes>
            <Route path="/" element={<Cards/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/form" element={<Form/>}/>
         </Routes>

      </div>
      
   );
}

export default App;
