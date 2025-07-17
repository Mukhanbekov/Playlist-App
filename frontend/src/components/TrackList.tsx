import { Table, Button, message } from "antd";
import { PlayCircleOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Track {
  id: number;
  name: string;
  trackNumber: number;
  youtubeUrl?: string;
  isPublished: boolean;
}

interface TrackListProps {
  tracks: Track[];
}

function TrackList({ tracks }: TrackListProps) {
  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");

  const handleAddToHistory = async (trackId: number) => {
    if (!token) {
      message.error("Ошибка: Токен не найден, войдите в систему снова.");
      return;
    }

    try {
      await api.post(
        "/track_history",
        { trackId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Трек добавлен в историю");
    } catch (error) {
      console.error("Ошибка сервера:", error);
      message.error("Ошибка при добавлении в историю.");
    }
  };

  const columns = [
    {
      title: "Номер",
      dataIndex: "trackNumber",
      key: "trackNumber",
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Статус",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (isPublished: boolean) =>
        isPublished ? "Опубликован" : "Неопубликован",
    },
    {
      title: "Действие",
      key: "action",
      render: (_: any, record: Track) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {record.youtubeUrl && (
            <Button
              type="link"
              icon={<PlayCircleOutlined />}
              onClick={() =>
                window.open(record.youtubeUrl, "_blank", "noopener,noreferrer")
              }
            >
              Воспроизвести
            </Button>
          )}
          <Button
            type="default"
            icon={<PlusOutlined />}
            onClick={() => handleAddToHistory(record.id)}
          >
            Добавить в историю
          </Button>
        </div>
      ),
    },
  ];

  return <Table dataSource={tracks} columns={columns} rowKey="id" />;
}

export default TrackList;
