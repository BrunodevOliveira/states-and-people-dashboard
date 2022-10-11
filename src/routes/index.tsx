import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListagemDePessoas } from "../pages";
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
        icon: "people",
        label: "Pessoas",
        path: "/pessoas",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<p>Detallhe</p>} />

      {/* Redireciona para página inicial caso não encontre a rota */}
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
