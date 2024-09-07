import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./pages/charcaterlist";
import Navbar from "./components/navbar";
import Profile from "./pages/charcaterprofile";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
