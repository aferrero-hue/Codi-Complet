const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors"); // Importa el paquete cors
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const uri = "mongodb+srv://aferrero:13PWFW5OpgDQ56fu@cluster0.nxj9ol6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Variable para almacenar el Access Token
let accessToken = null;

// Conectar a la base de datos
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
//--------------------------------------------------------------------
//POST User [PENDENT]
async function POSTuser(Nom, Email, Contrasenya) {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Seleccionar la base de datos y la colección
        const database = client.db("Estetica");
        const collection = database.collection("Usuaris");
        const Status = "Undefined";

        //Encriptar contrasenya
        Contrasenya = encriptarConSHA256(Contrasenya);

        //Verificar si l'usuari existeix en la BDD o el correu [PENDENT]
        const existingUser = await collection.findOne({ name: Nom });
        const existingEmail = await collection.findOne({ name: Email });

        if (existingUser) {
            if(existingEmail){
                return "Email no disponible";

            }else{
                return "Usuari no disponible";
            }
        }else{
            // Crear un nuevo documento para insertar en la colección
            const nuevoUsuario = {
                name: Nom,
                email: Email,
                passwd: Contrasenya,
                status: Status
            };
            // Insertar el nuevo documento en la colección
            const resultado = await collection.insertOne(nuevoUsuario);
            console.log("Nuevo usuario insertado:", resultado.insertedId);
        }
        return Nom;

    } catch (error) { 
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }  finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
//AUTH [PENDENT]
async function login(Nom, Contrasenya) {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Seleccionar la base de datos y la colección
        const database = client.db("Estetica");
        const collection = database.collection("Usuaris");

        Contrasenya = encriptarConSHA256(Contrasenya);

        //Verificar si l'usuari existeix en la BDD o el correu [PENDENT]
        const existingUser = await collection.findOne({ name: Nom });
        if(existingUser){
            if (existingUser.passwd === Contrasenya) {
                // La contraseña es correcta, el usuario puede iniciar sesión
                console.log("¡Contraseña correcta! Usuario autenticado.");
                //Token V1
                /*const token = jwt.sign({ userId: existingUser._id }, 'secret_key', { expiresIn: '1h' });
                return token;*/
                //-------------------------
                //Token V2
                const token = generateAccessToken();
                //setAccessToken(token);
                accessToken = token;
                return token;

            } else {
                // La contraseña es incorrecta
                console.log("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
                return "Contraseña incorrecta";
            }
        }else {
            // El usuario no existe en la base de datos
            console.log("El usuario no existe.");
            return "El usuario no existe.";
        }


    } catch (error) { 
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }  finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
//---------------------------------------------------------------
//Funció per encriptar contraseña:
function encriptarConSHA256(contraseña) {
    const hash = crypto.createHash('sha256');
    hash.update(contraseña);
    return hash.digest('hex');
  }
//---------------------------------------------------------------
//Funciones AccesToken:
// Función para generar un Access Token
function generateAccessToken() {
    // Generar un token aleatorio
    const token = Math.random().toString(36).substr(2); // Esto es solo un ejemplo, deberías usar un método más seguro en producción
    return token;
}
// Función para verificar si un Access Token está en uso (aquí suponemos que lo comparamos con el almacenado)
function isAccessTokenInUse() {
    console.log(accessToken);
    if(accessToken != null){
        return accessToken;
    }else{
        return "Invalid";
    }
}
//Eliminar Token Actual basicament LOGOUT:
function removeAccesToken(){
    accessToken = null;
    return "Bye Bye B)";
}
//---------------------------------------------------------------
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Crear un nou usuari:
app.get("/POST/:nombre/:email/:contrasenya", async (req, res) => {
    try {
        const nombre = req.params.nombre; // Obtener el valor del parámetro nombre de la URL
        const contrasenya = req.params.contrasenya;
        const email = req.params.email;

        const data = await POSTuser(nombre, email, contrasenya); // Espera a que se resuelva la promesa
        console.log("Proceso completado");
        res.json(data); // Enviar una respuesta JSON con los datos obtenidos
    } catch (error) {
        // Manejar cualquier error que ocurra durante la conexión o la consulta
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
//Autentificació usuari login:
app.get("/login/:nombre/:contrasenya", async (req, res) => {
    try {
        const nombre = req.params.nombre; // Obtener el valor del parámetro nombre de la URL
        const contrasenya = req.params.contrasenya;

        const data = await login(nombre, contrasenya); // Espera a que se resuelva la promesa
        console.log("Proceso completado");
        res.json(data); // Enviar una respuesta JSON con los datos obtenidos
    } catch (error) {
        // Manejar cualquier error que ocurra durante la conexión o la consulta
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
//Autentificació usuari login en altres menus: (ACCESTOKEN)
app.get("/accesToken", async (req, res) => {
    try {
        const data = await isAccessTokenInUse(); // Espera a que se resuelva la promesa
        res.json(data); // Enviar una respuesta JSON con los datos obtenidos
    } catch (error) {
        // Manejar cualquier error que ocurra durante la conexión o la consulta
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
//Autentificació usuari login en altres menus: (ACCESTOKEN)
app.get("/accesTokenLogOut", async (req, res) => {
    try {
        console.log("Anem a fer un logout siii");
        const data = await removeAccesToken(); // Espera a que se resuelva la promesa
        console.log("Fucking Nightmare...");
        res.json(data); // Enviar una respuesta JSON con los datos obtenidos
    } catch (error) {
        // Manejar cualquier error que ocurra durante la conexión o la consulta
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
app.listen(8000, () => {
    console.log("Server started on port 8000");
});

module.exports = { login };