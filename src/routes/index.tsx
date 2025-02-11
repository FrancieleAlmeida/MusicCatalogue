import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import PopularWeeklyHighlights from "../components/PopularWeeklyHighlights"; 
import WeeklyHighlights from "../pages/WeeklyHighlights";
import PopularArtists from "../components/PopularArtists"; 
import ArtistDetails from "../pages/ArtistDetails";
import Search from "../pages/Search";
import Playlist from "../pages/Playlist";
import PopularPlaylists from "../components/PopularPlaylists"; 
import Album from "@/pages/Album";
import PopularAlbums from "../components/PopularAlbums"; 

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekly-highlights" element={<PopularWeeklyHighlights />} />
        <Route path="/weekly-highlights/:id" element={<WeeklyHighlights />} />
        <Route path="/artist" element={<PopularArtists />} />
        <Route path="/artist/:id" element={<ArtistDetails />} />
        <Route path="/albums" element={<PopularAlbums />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/search" element={<Search />} />
        <Route path="/playlists" element={<PopularPlaylists />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
