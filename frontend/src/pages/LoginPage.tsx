import { useState } from "react";
import { Form, Input, Button, message, Alert } from "antd";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await api.post("/users/sessions", values);
      const { token, user } = response.data;

      if (!token || !user?.role) {
        setErrorMessage("Ошибка входа. Проверьте данные.");
        return;
      }

      dispatch(setToken({ token, role: user.role }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      message.success("Вы успешно вошли в систему!");
      navigate("/");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setErrorMessage("Неверное имя пользователя или пароль");
      } else if (err?.response?.status === 404) {
        setErrorMessage("Пользователь не найден");
      } else {
        setErrorMessage("Произошла ошибка при входе");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50, textAlign: "center" }}>
      <h2>Вход</h2>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
          Войти
        </Button>
      </Form>
      <div style={{ marginTop: 16 }}>
        <span>Еще нет аккаунта?</span>
        <Button type="link" onClick={() => navigate("/register")}>
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
}


export default LoginPage;
