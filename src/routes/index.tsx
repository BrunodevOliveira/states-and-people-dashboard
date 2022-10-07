import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListagemDeCidades } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      //serve para add item no menu lateral
      {
        icon: "home",
        label: "Página inicial",
        path: "/pagina-inicial",
      },
      {
        icon: "location_city",
        label: "Cidades",
        path: "/cidades",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/cidades" element={<ListagemDeCidades />} />

      {/* Redireciona para página inicial caso não encontre a rota */}
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
