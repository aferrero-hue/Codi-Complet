const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://aferrerodaw:s8oQ66vsvKS0NeaC@cluster0.nxj9ol6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error");
    })

