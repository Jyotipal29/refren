import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./pages/charcaterlist";
import Navbar from "./components/navbar";
import Profile from "./pages/charcaterprofile";
import EpisodeList from "./pages/episodelist";
import CharactersOfEpisode from "./pages/characterofepisodes";
import LocationList from "./pages/locationlist";
import CharactersOfLocation from "./pages/characteroflocation";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/episode" element={<EpisodeList />} />
          <Route
            path="/characterofepisode/:id"
            element={<CharactersOfEpisode />}
          />
          <Route path="/location" element={<LocationList />} />
          <Route
            path="/characteroflocations/:id"
            element={<CharactersOfLocation />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
