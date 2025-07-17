import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      await api.post('/users', values);
      message.success('Регистрация прошла успешно! Теперь войдите в систему.');
      navigate('/login'); 
    } catch (error) {
      message.error('Ошибка при регистрации.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="register" onFinish={onFinish}>
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[{ required: true, message: 'Введите имя пользователя!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Зарегистрироваться
      </Button>
    </Form>
  );
}

export default RegisterPage;
