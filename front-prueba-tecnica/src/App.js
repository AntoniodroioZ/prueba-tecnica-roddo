import Login from "./components/Login";
import List from "./components/List";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/listado' element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
