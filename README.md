# 🌐 ExpoESCOM

**ExpoESCOM** es una plataforma web diseñada para facilitar la gestión de eventos académicos dentro de la ESCOM-IPN. Desarrollada como proyecto estudiantil, esta herramienta permite el registro de participantes, seguimiento de ponencias y generación de estadísticas visuales mediante interfaces modernas y responsivas.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React – Frontend interactivo y modular
- 🟢 Node.js – Backend con Express
- 🛢️ MySQL – Base de datos relacional para almacenamiento de registros
- 📦 Git & GitHub – Control de versiones y colaboración
- ✅ Kanban – Organización ágil del flujo de trabajo

---

## 📸 Capturas de pantalla

> *(Agrega aquí imágenes si las tienes, por ejemplo:)*

```
📌 ./assets/login.png
📌 ./assets/dashboard.png
```

```markdown
![Login](./assets/login.png)
![Dashboard](./assets/dashboard.png)
```

---

## 🛠️ Instalación local

1. **Clonar el repositorio**
```bash
git clone https://github.com/TeddyArellano/ExpoESCOM.git
cd ExpoESCOM
```

2. **Instalar dependencias del frontend y backend**
```bash
# En la carpeta raíz
cd client
npm install

cd ../server
npm install
```

3. **Configurar base de datos**
- Crea una base de datos en MySQL llamada `expoescom`
- Importa las tablas desde el archivo `/server/database/init.sql` (si lo tienes)

4. **Iniciar el servidor y cliente**
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

La aplicación estará disponible en `http://localhost:3000`

---

## 👤 Autor

- **Teddy Arellano** – [LinkedIn](https://www.linkedin.com/in/jarellanojr) | [GitHub](https://github.com/TeddyArellano)

---

## 📄 Licencia

Este proyecto fue creado con fines educativos y no cuenta con una licencia comercial. Puede ser utilizado como referencia para proyectos similares.
