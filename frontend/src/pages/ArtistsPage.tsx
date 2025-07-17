import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtists } from "../store/artistSlice";
import { RootState, AppDispatch } from "../store/store";
import ArtistList from "../components/ArtistList";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

function ArtistsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { artists, loading } = useSelector((state: RootState) => state.artist);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  function handleSelect(artistId: number) {
    navigate(`/artists/${artistId}/albums`);
  }

  if (loading) return <Spin size="large" />;

  return <ArtistList artists={artists} onSelect={handleSelect} />;
}

export default ArtistsPage;
