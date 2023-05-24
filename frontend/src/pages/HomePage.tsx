import { useEffect } from "react";
import { Header } from "../components/Header";
import { aplicacion } from "./MainApp";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Inicio - ' + aplicacion;
  }, []);
  return (
    <>
      <p>Bienvenido al gestor de tareas</p>


    </>
  );
};
