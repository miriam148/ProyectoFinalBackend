
🌍 Backend - Proyecto Final: Experiencias de Viaje

Este proyecto es el backend de una aplicación donde los usuarios pueden registrarse, iniciar sesión, cerrar sesión, crear, editar y eliminar experiencias de viaje, así como subir imágenes tanto de perfil como de las experiencias, editarlas, eliminar su perfil y editarlo.

🚀 Tecnologías utilizadas

Node.js

Express

MongoDB + Mongoose

Multer (para subir imágenes)

JSON Web Token (JWT)

Dotenv

CORS

Bcryptjs (para encriptar contraseñas)

Nodemon (como dependencia de desarrollo)

📁 Estructura principal del backend

/controllers → Lógica de cada endpoint (auth, user, experience)

/routes → Definición de rutas

/models → Modelos Mongoose (User, Experience)

/middlewares → Middlewares (auth, multerConfig)

/uploads → Carpeta donde se guardan las imágenes

/db → Conexión a base de datos

🔧 Instalación y uso

Clona el repositorio:

 git clone https://github.com/miriam148/ProyectoFinalBackend.git

Accede a la carpeta:

 cd ProyectoFinalBackend

Instala las dependencias:

 npm install

Crea un archivo .env en la raíz del proyecto con este contenido (ajusta los valores según tu configuración local) :

MONGO_URI=mongodb://127.0.0.1:27017/tuNombreDeBaseDeDatos
ACCESS_SECRET=tu_clave_secreta_a_elección
REFRESH_SECRET=

ACCESS_SECRET es una clave privada que tú eliges, puede ser cualquier cadena de texto aleatoria, es una clave secreta que se usa para firmar los tokens.
Para generar tu clave secreta de forma sencilla, abre tu terminal y ejecuta:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Copia el resultado y pégalo en tu .env 
Si quieres generar dos para el refresh token, repite el mismo paso y lo que te devuelva lo copias en REFRESH_SECRET=

Inicia el servidor:

 npm start

El servidor estará corriendo en:

 http://localhost:3001

✏️ Endpoints principales

Auth:

POST /api/auth/register

POST /api/auth/login

Users:

GET /api/user

PUT /api/user/profile-image

Experiences:

GET /api/experience

POST /api/experience (con imagen)

GET /api/experience/:id

PUT /api/experience/:id (editar texto)

PUT /api/experience/:id/image (editar imagen)

DELETE /api/experience/:id

📖 Autora

Miriam Ibáñez Muñoz GitHub: https://github.com/miriam148
