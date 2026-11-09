import { Outlet } from 'react-router-dom';
import Footer from '../components/ui/footer';
import Header from '../components/ui/header';

/**
 * Estructura común de todas las pantallas: barra superior, contenido de la
 * ruta activa y pie de página.
 *
 * `<Outlet />` es el marcador donde React Router inserta la página que
 * corresponde a la URL actual.
 */
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
