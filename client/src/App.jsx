
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "./Register";
import Tasks from "./Tasks";
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
