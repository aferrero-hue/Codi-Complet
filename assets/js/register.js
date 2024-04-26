const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors"); // Importa el paquete cors

const uri = "mongodb+srv://aferrero:13PWFW5OpgDQ56fu@cluster0.nxj9ol6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Conecta a la base de datos
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//POST User [PENDENT]
async function POSTuser(Nom, Email, Contrasenya) {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Seleccionar la base de datos y la colección
        const database = client.db("Estetica");
        const collection = database.collection("Usuaris");
        const Status = "Undefined";

        //Encriptar contrasenya [PENDENT]

        // Crear un nuevo documento para insertar en la colección
        const nuevoUsuario = {
            name: Nom,
            email: Email,
            passwd: Contrasenya,
            status: Status
        };

        var isValid = false;
        //Verificar si l'usuari existeix en la BDD o el correu.



        // Insertar el nuevo documento en la colección
        const resultado = await collection.insertOne(nuevoUsuario);
        console.log("Nuevo usuario insertado:", resultado.insertedId);
        //return datos;

    } catch (error) { 
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }  finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

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

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
