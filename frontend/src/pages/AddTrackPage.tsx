import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import api from "../services/api";
import { Artist, Album } from "../types/models";
import { useNavigate } from "react-router-dom";

function AddTrackPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await api.get("/artists");
        setArtists(response.data);
      } catch (error) {
        message.error("Ошибка загрузки артистов");
      }
    }

    fetchArtists();
  }, []);

  useEffect(() => {
    async function fetchAlbums() {
      if (!selectedArtistId) return;
      try {
        const response = await api.get(`/albums?artistId=${selectedArtistId}`);
        setAlbums(response.data);
      } catch (error) {
        message.error("Ошибка загрузки альбомов");
      }
    }

    fetchAlbums();
  }, [selectedArtistId]);

  const onFinish = async (values: {
    name: string;
    trackNumber: number;
    duration?: string;
    youtubeUrl: string;
    albumId: number;
  }) => {
    try {
      setLoading(true);
      await api.post(`/tracks/${values.albumId}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Трек добавлен");
      navigate("/");
    } catch (error) {
      message.error("Ошибка при добавлении трека");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 40 }}>
      <h2>Добавить трек</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Исполнитель"
          name="artistId"
          rules={[{ required: true, message: "Выберите исполнителя" }]}
        >
          <Select
            placeholder="Выберите исполнителя"
            onChange={(id: number) => {
              setSelectedArtistId(id);
              setAlbums([]);
            }}
          >
            {artists.map((artist) => (
              <Select.Option key={artist.id} value={artist.id}>
                {artist.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Альбом"
          name="albumId"
          rules={[{ required: true, message: "Выберите альбом" }]}
        >
          <Select placeholder="Выберите альбом">
            {albums.map((album) => (
              <Select.Option key={album.id} value={album.id}>
                {album.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Название трека"
          name="name"
          rules={[{ required: true, message: "Введите название трека" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Длительность (опционально)" name="duration">
          <Input />
        </Form.Item>

        <Form.Item
          label="Номер трека"
          name="trackNumber"
          rules={[{ required: true, message: "Введите номер трека" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="YouTube ссылка"
          name="youtubeUrl"
          rules={[{ required: true, message: "Введите ссылку на видео" }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить
        </Button>
      </Form>
    </div>
  );
}

export default AddTrackPage;
