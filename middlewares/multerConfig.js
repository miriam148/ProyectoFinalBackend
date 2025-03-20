const multer = require('multer');
const path = require('path');

//1. SE INSTALA
//2. CARPETA UPLOADS DND VAN A IR TODAS LAS IMG
//3.ARCHIVO EN MIDDLEWARE PARA LA CONFI DE MULTER PARA QUE SEPA DND GUARDAR LAS IMG Y COMO NOMBRARLAS
//4.MULTER NO SE IMPORTA EN INDEX PQ NO SE APLICA A TODA LA APP, SOLO LO VAMOS IMPORTANDO EN LAS RUTAS DND VAYAMOS A SUBIR IMG



// Configuramos dónde y cómo se van a guardar los archivos 
const storage = multer.diskStorage({
  destination: (req, file, cb) => { //EL DESTINATION ES LA CARPETA DND SE GUARDAN LAS IMÁGENES
    cb(null, 'uploads/'); // se guarda en la carpeta uploads
  },
  filename: (req, file, cb) => { //EL FILENAME CONSTRUYE NOMBRE DEL ARCHIVO USANDO LA FECHA PARA NO SOBRESCRIBIRSE
    // El nombre del archivo será la fecha + el nombre original para que no se repita
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Creamos el middleware de multer
const upload = multer({ storage }); //ESTO ES LO QUE SUBE Y QUE USO EN LA RUTA 



module.exports = upload;
