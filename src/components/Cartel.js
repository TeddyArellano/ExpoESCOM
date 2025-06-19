import React, { useState, useEffect } from 'react';
import { generateCartel } from '../services/cartelService';
import { useNavigate } from 'react-router-dom';
import './Cartel.css';

export default function Cartel() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [boleta, setBoleta] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProjectFound, setIsProjectFound] = useState(false);
  
  // Función para manejar la navegación a la página principal y desplazarse a una sección
  const handleNavigation = (section) => {
    navigate('/');
    // Usamos setTimeout para asegurar que la navegación ocurra primero
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  // Eventos para interceptar los clics en los enlaces del Navbar
  useEffect(() => {
    const handleNavLinkClick = (e) => {
      // Obtener todos los enlaces del Navbar
      const navLinks = document.querySelectorAll('.nav-link');
      
      // Agregar listener a cada enlace
      navLinks.forEach(link => {
        if (link.textContent === 'REGISTRO') {
          link.addEventListener('click', (e) => {
            // Solo para enlaces de ScrollLink, no RouterLink
            if (!link.getAttribute('href') || !link.getAttribute('href').startsWith('/')) {
              e.preventDefault();
              handleNavigation('registro');
            }
          });
        } else if (link.textContent === 'ASISTENCIA') {
          link.addEventListener('click', (e) => {
            if (!link.getAttribute('href') || !link.getAttribute('href').startsWith('/')) {
              e.preventDefault();
              handleNavigation('asistencia');
            }
          });
        } else if (link.textContent === 'PROYECTOS' || link.textContent === 'PONENCIAS') {
          link.addEventListener('click', (e) => {
            if (!link.getAttribute('href') || !link.getAttribute('href').startsWith('/')) {
              e.preventDefault();
              handleNavigation('ponencias');
            }
          });
        } else if (link.textContent === 'CONTACTO') {
          link.addEventListener('click', (e) => {
            if (!link.getAttribute('href') || !link.getAttribute('href').startsWith('/')) {
              e.preventDefault();
              handleNavigation('footer');
            }
          });
        }
      });
    };
    
    // Ejecutamos esta función después de que el componente se monte
    setTimeout(handleNavLinkClick, 500);
    
    // Limpieza al desmontar el componente
    return () => {
      // La limpieza no es necesaria ya que los event listeners se eliminarán cuando se desmonte el componente
    };
  }, [navigate]);

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
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')} className="nav-button">Inicio</button>
        <button onClick={() => handleNavigation('registro')} className="nav-button">Registro</button>
        <button onClick={() => handleNavigation('ponencias')} className="nav-button">Proyectos</button>
        <button onClick={() => handleNavigation('footer')} className="nav-button">Contacto</button>
      </div>
      
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
