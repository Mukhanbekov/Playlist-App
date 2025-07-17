import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ArtistsPage from "./pages/ArtistsPage";
import AlbumsPage from "./pages/AlbumsPage";
import TracksPage from "./pages/TracksPage";
import TrackHistoryPage from "./pages/TrackHistoryPage";
import AddArtistPage from "./pages/AddArtistPage";
import AddAlbumPage from "./pages/AddAlbumPage";
import AddTrackPage from "./pages/AddTrackPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { RootState } from "./store/store";

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={token ? <ArtistsPage /> : <Navigate to="/login" />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/artists/:artistId/albums" element={<AlbumsPage />} />
          <Route path="/albums/:albumId/tracks" element={<TracksPage />} />
          <Route path="/track-history" element={<TrackHistoryPage />} />

          {role === "user" && (
            <>
              <Route path="/add-artist" element={<AddArtistPage />} />
              <Route path="/add-album" element={<AddAlbumPage />} />
              <Route path="/add-track" element={<AddTrackPage />} />
            </>
          )}

          {role === "admin" && <Route path="/admin" element={<AdminPage />} />}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
