import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

function AddArtistPage() {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const onFinish = async (values: { name: string; photo: string; info: string }) => {
    try {
      setLoading(true);
      await api.post("/artists", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Исполнитель добавлен");
      navigate("/");
    } catch (error) {
      message.error("Ошибка при добавлении исполнителя");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 40 }}>
      <h2>Добавить исполнителя</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Имя исполнителя"
          name="name"
          rules={[{ required: true, message: "Введите имя исполнителя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="URL фото"
          name="photo"
          rules={[{ required: true, message: "Введите URL изображения" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Информация"
          name="info"
          rules={[{ required: true, message: "Введите описание" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить
        </Button>
      </Form>
    </div>
  );
}

export default AddArtistPage;
