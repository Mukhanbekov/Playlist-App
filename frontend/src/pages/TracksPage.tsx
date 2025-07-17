import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Spin, message, Button } from "antd";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Track {
  id: number;
  name: string;
  trackNumber: number;
  duration?: string;
  youtubeUrl: string;
}

function TracksPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const { albumId } = useParams();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await api.get(`/tracks?albumId=${albumId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTracks(response.data);
      } catch {
        message.error("Ошибка при загрузке треков.");
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, [albumId, token]);

  const handleListen = async (trackId: number) => {
    try {
      await api.post(
        "/track_history",
        { trackId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Трек добавлен в историю");
    } catch {
      message.error("Ошибка при записи в историю");
    }
  };

  const columns = [
    { title: "№", dataIndex: "trackNumber", key: "trackNumber" },
    { title: "Название", dataIndex: "name", key: "name" },
    { title: "Длительность", dataIndex: "duration", key: "duration" },
    {
      title: "YouTube",
      key: "youtube",
      render: (_: any, record: Track) => (
        <a href={record.youtubeUrl} target="_blank" rel="noopener noreferrer">
          Смотреть
        </a>
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: Track) => (
        <Button onClick={() => handleListen(record.id)}>🎧 Добавить в историю</Button>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;

  return <Table dataSource={tracks} columns={columns} rowKey="id" />;
}

export default TracksPage;
