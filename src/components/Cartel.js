import React, { useState } from 'react';
import { generateCartel } from '../services/cartelService';
import './Cartel.css';

export default function Cartel() {
  const [email, setEmail] = useState('');
  const [boleta, setBoleta] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProjectFound, setIsProjectFound] = useState(false);

  const handleProjectSearch = (e) => {
    e.preventDefault();
    // TODO: Implement database connection and search using both email and boleta
    console.log('Searching for project with email:', email, 'and boleta:', boleta);
    
    // Aquí se haría la validación con la base de datos
    if (email && boleta) {
      setProjectName('Proyecto de Ejemplo'); // This would come from the DB
      setIsProjectFound(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setImage(file); // Guardamos el archivo
        setImagePreview(URL.createObjectURL(file)); // Creamos URL para previsualización
      } else {
        alert('Por favor selecciona una imagen en formato JPG o PNG');
        e.target.value = null;
      }
    }
  };

  const handleGenerateCartel = async () => {
    try {
      const projectData = {
        email,
        boleta,
        projectName,
        description,
        image: image // Ahora enviamos el archivo directamente
      };
      
      await generateCartel(projectData);
      alert('¡Cartel generado exitosamente!');
      
    } catch (error) {
      console.error('Error generating cartel:', error);
      alert('Error al generar el cartel. Por favor intente de nuevo.');
    }
  };

  return (
    <div className="cartel-page" id="cartel">
      <div className="form-container">
        <h1>Generación de Cartel</h1>
        <form onSubmit={handleProjectSearch}>
          <div className="form-group">
            <label htmlFor="email">Correo Institucional</label>
            <input
              type="email"
              id="email"
              placeholder="@alumno/maestro.ipn.mx"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="boleta">Número de Boleta</label>
            <input
              type="text"
              id="boleta"
              value={boleta}
              onChange={(e) => setBoleta(e.target.value)}
              placeholder="Ingresa tu número de boleta"
              required
            />
          </div>

          <button type="submit" className="search-button">
            Buscar Proyecto
          </button>
          
          {isProjectFound && (
            <>
              <div className="form-group">
                <label htmlFor="projectName">Nombre del Proyecto</label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Nombre del proyecto"
                />
                <small className="help-text">Puedes editar el nombre si es necesario</small>
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción del Proyecto</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ingresa la descripción de tu proyecto (opcional)"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Imagen del Proyecto (opcional)</label>
                <input
                  type="file"
                  id="image"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                />
                <small className="help-text">Formatos aceptados: JPG y PNG</small>
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Vista previa" style={{ maxWidth: '200px' }} />
                  </div>
                )}
              </div>

              <button 
                type="button" 
                className="generate-button"
                onClick={handleGenerateCartel}
              >
                Generar Cartel
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
