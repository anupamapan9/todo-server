const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
// middle wares ------------------- 
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://toDoAdmin:QmqoFXRuJY75wOo1@cluster0.f4xqs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        await client.connect();
        const toDoCollections = client.db("toDoApp").collection("toDoTask");

        // insert a task 
        app.post('/task', async (req, res) => {
            const toDo = req.body;
            const result = await toDoCollections.insertOne(toDo)
            res.send(result)
        })

        // get task by email 

        app.get('/task/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const result = await toDoCollections.find(query).toArray()
            res.send(result)
        })


    } finally {

    }

}


run().catch(console.dir)








app.get('/', (req, res) => {
    res.send('inside World!')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// toDoAdmin

// QmqoFXRuJY75wOo1