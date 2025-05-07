import { useEffect, useState } from "react";

const Actividades = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/actividades/")
      .then(response => response.json())
      .then(data => setActividades(data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Actividades</h1>
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad.id}>{actividad.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Actividades;
