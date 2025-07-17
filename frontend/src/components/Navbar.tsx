import { Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearToken } from "../store/authSlice";

function Navbar() {
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  if (!token) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h2 style={{ margin: 0 }}>🎵 Музыкальное приложение</h2>
      <Menu mode="horizontal" style={{ flex: 1 }}>
        <Menu.Item key="home">
          <Link to="/">Главная</Link>
        </Menu.Item>
        <Menu.Item key="track-history">
          <Link to="/track-history">История</Link>
        </Menu.Item>

        {role === "user" && (
          <>
            <Menu.Item key="add-artist">
              <Link to="/add-artist">Добавить исполнителя</Link>
            </Menu.Item>
            <Menu.Item key="add-album">
              <Link to="/add-album">Добавить альбом</Link>
            </Menu.Item>
            <Menu.Item key="add-track">
              <Link to="/add-track">Добавить трек</Link>
            </Menu.Item>
          </>
        )}

        {role === "admin" && (
          <Menu.Item key="admin">
            <Link to="/admin">Админка</Link>
          </Menu.Item>
        )}
      </Menu>
      <Button onClick={handleLogout} type="primary" style={{ marginLeft: "auto" }}>
        Выйти
      </Button>
    </div>
  );
}

export default Navbar;
