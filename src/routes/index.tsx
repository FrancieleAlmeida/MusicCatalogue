import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import PopularArtists from "../components/PopularArtists"; 
import ArtistDetails from "../pages/ArtistDetails";
import Search from "../pages/Search";
import Playlist from "../pages/Playlist";
import Album from "@/pages/Album";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<PopularArtists />} />
        <Route path="/artist/:id" element={<ArtistDetails />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/search" element={<Search />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
