const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

app.get("/students", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("varalaxmi84868");
        const collection = db.collection("students");

        const students = await collection.find({age: {$exists: true}}).toArray();

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/students", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("varalaxmi84868");
        const collection = db.collection("students");

        await collection.insertOne({
            id: Number(req.body.id),
            name: req.body.name,
            age: Number(req.body.age)
        });

        res.send("Student added successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/update-student", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("varalaxmi84868");
        const collection = db.collection("students");

        await collection.updateOne(
            { id: Number(req.body.id) },
            {
                $set: {
                    name: req.body.name,
                    age: Number(req.body.age)
                }
            }
        );

        res.send("Student updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/delete-student", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("varalaxmi84868");
        const collection = db.collection("students");

        await collection.deleteOne({
            id: Number(req.body.id)
        });

        res.send("Student deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});