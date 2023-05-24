import { useEffect } from "react";
import { Header } from "../components/Header";
import { aplicacion } from "./MainApp";

export const HomePage = () => {
useEffect(() => {
  document.title = 'Inicio - ' + aplicacion;
}, []);
  return (
    <>
      <Header />
      <p>Bienvenido al gestor de tareas</p>
    </>
  );
};
