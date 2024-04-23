const MongoClient = require('mongodb').MongoClient;

async function connectToMongoDB(connectionString) {
    try {
        const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// Ejemplo de uso:
const connectionString = "mongodb+srv://aferrerodaw:VFRHUPWzcCvclNax@cluster0.nxj9ol6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
connectToMongoDB(connectionString)
    .then(client => {
        // Aquí puedes realizar operaciones en la base de datos utilizando 'client'
        // Por ejemplo:
        // const db = client.db("nombre_de_tu_base_de_datos");
        // const collection = db.collection("nombre_de_tu_coleccion");
        // Ahora puedes realizar operaciones en la colección
    })
    .catch(error => {
        // Manejar el error si la conexión falla
    });