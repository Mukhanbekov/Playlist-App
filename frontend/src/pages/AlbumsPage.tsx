import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../store/albumSlice';
import { RootState, AppDispatch } from '../store/store';
import AlbumList from '../components/AlbumList';
import { Spin, Button, Space } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

function AlbumsPage() {
  const { artistId } = useParams<{ artistId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { albums, loading } = useSelector((state: RootState) => state.album);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAlbums(Number(artistId)));
  }, [dispatch, artistId]);

  function handleSelect(albumId: number) {
    navigate(`/albums/${albumId}/tracks`);
  }

  function goBack() {
    navigate(-1); 
  }

  function goBackHome() {
    navigate('/'); 
  }


  if (loading) return <Spin size="large" />;

  return (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="default" onClick={goBack}>
          Назад
        </Button>
      </Space>
      <AlbumList albums={albums} onSelect={handleSelect} />
    </>
  );
}

export default AlbumsPage;
