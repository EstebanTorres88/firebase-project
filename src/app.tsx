import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import StudentNew from './pages/student-new';
import Students from './pages/students';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Students />} />
        <Route path="/registrar" element={<StudentNew />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
