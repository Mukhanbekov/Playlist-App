import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Artist } from "../types/models";

function AddAlbumPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await api.get("/artists");
        setArtists(response.data);
      } catch (error) {
        message.error("Не удалось загрузить исполнителей");
      }
    }

    fetchArtists();
  }, []);

  const onFinish = async (values: {
    name: string;
    year: number;
    coverImage: string;
    artistId: number;
  }) => {
    try {
      setLoading(true);
      await api.post("/albums", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Альбом добавлен");
      navigate("/");
    } catch (error) {
      message.error("Ошибка при добавлении альбома");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 40 }}>
      <h2>Добавить альбом</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Название альбома"
          name="name"
          rules={[{ required: true, message: "Введите название альбома" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Год выпуска"
          name="year"
          rules={[{ required: true, message: "Введите год" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Обложка (URL)"
          name="coverImage"
          rules={[{ required: true, message: "Введите ссылку на обложку" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Исполнитель"
          name="artistId"
          rules={[{ required: true, message: "Выберите исполнителя" }]}
        >
          <Select placeholder="Выберите исполнителя">
            {artists.map((artist) => (
              <Select.Option key={artist.id} value={artist.id}>
                {artist.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить
        </Button>
      </Form>
    </div>
  );
}

export default AddAlbumPage;
