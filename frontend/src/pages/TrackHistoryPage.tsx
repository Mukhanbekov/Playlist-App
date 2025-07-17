import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Table, Spin, message } from "antd";

interface TrackHistory {
  id: number;
  datetime: string;
  track: {
    id: number;
    name: string;
    album: {
      name: string;
      artist: {
        name: string;
      };
    };
  };
}

function TrackHistoryPage() {
  const [history, setHistory] = useState<TrackHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchHistory() {
      try {
        const response = await api.get("/track_history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data);
      } catch {
        message.error("Ошибка при загрузке истории.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [token, navigate]);

  if (loading) return <Spin size="large" />;

  const columns = [
    {
      title: "Трек",
      dataIndex: ["track", "name"],
      key: "trackName",
    },
    {
      title: "Исполнитель",
      dataIndex: ["track", "album", "artist", "name"],
      key: "artistName",
    },
    {
      title: "Дата и время",
      dataIndex: "datetime",
      key: "datetime",
      render: (datetime: string) => new Date(datetime).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>История прослушиваний</h2>
      <Table dataSource={history} columns={columns} rowKey="id" />
    </div>
  );
}

export default TrackHistoryPage;
