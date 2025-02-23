import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Register from "@pages/Register";
import News from "@pages/News";
import Preferences from "@pages/Preferences";
import { useAppSelector } from "@redux/hooks";
import Header from "@components/Header";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state) => state.auth);
  return token ? <Navigate to="/news" replace /> : children;
};

function App() {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Private Routes */}
        <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
        <Route path="/preferences" element={<PrivateRoute><Preferences /></PrivateRoute>} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to={token ? "/news" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
