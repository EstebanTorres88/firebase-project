import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/protected-route';
import Layout from './layouts/layout';
import Login from './pages/login';
import StudentNew from './pages/student-new';
import Students from './pages/students';

export default function App() {
  return (
    <Routes>
      {/* Ruta pública: única pantalla accesible sin sesión. */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas: sin sesión redirigen a /login. */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Students />} />
          <Route path="/registrar" element={<StudentNew />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
