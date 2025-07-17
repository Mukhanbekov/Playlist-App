import { useEffect, useState } from 'react';
import { Table, Button, Tabs, message } from 'antd';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const { TabPane } = Tabs;

function AdminPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [artists, setArtists] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const artistRes = await api.get('/artists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const albumRes = await api.get('/albums', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const trackRes = await api.get('/tracks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArtists(artistRes.data);
      setAlbums(albumRes.data);
      setTracks(trackRes.data);
    } catch {
      message.error('Ошибка при загрузке данных администратора');
    }
  };

  const publishEntity = async (type: string, id: number) => {
    try {
      await api.post(`/${type}/${id}/publish`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success(`${type} опубликован`);
      fetchData();
    } catch {
      message.error('Ошибка при публикации');
    }
  };

  const deleteEntity = async (type: string, id: number) => {
    try {
      await api.delete(`/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success(`${type} удалён`);
      fetchData();
    } catch {
      message.error('Ошибка при удалении');
    }
  };

  const actionColumn = (type: string) => ({
    title: 'Действия',
    key: 'action',
    render: (_: any, record: any) => (
      <>
        {!record.isPublished && (
          <Button onClick={() => publishEntity(type, record.id)}>Опубликовать</Button>
        )}
        <Button danger onClick={() => deleteEntity(type, record.id)} style={{ marginLeft: 8 }}>
          Удалить
        </Button>
      </>
    ),
  });

  return (
    <div style={{ padding: 24 }}>
      <h2>Панель администратора</h2>
      <Tabs>
        <TabPane tab="Артисты" key="1">
          <Table dataSource={artists} rowKey="id" columns={[
            { title: 'ID', dataIndex: 'id' },
            { title: 'Имя', dataIndex: 'name' },
            { title: 'Статус', dataIndex: 'isPublished', render: (val) => val ? '✅' : '❌' },
            actionColumn('artists'),
          ]} />
        </TabPane>
        <TabPane tab="Альбомы" key="2">
          <Table dataSource={albums} rowKey="id" columns={[
            { title: 'ID', dataIndex: 'id' },
            { title: 'Название', dataIndex: 'name' },
            { title: 'Статус', dataIndex: 'isPublished', render: (val) => val ? '✅' : '❌' },
            actionColumn('albums'),
          ]} />
        </TabPane>
        <TabPane tab="Треки" key="3">
          <Table dataSource={tracks} rowKey="id" columns={[
            { title: 'ID', dataIndex: 'id' },
            { title: 'Название', dataIndex: 'name' },
            { title: 'Статус', dataIndex: 'isPublished', render: (val) => val ? '✅' : '❌' },
            actionColumn('tracks'),
          ]} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminPage;
