const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()


// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uq96oiv.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })


async function run() {
    try {
        await client.connect()
        const pencillCollection = client.db("pencil").collection("colorfullPencil")

        app.get('/allitems', async (req, res) => {
            const query = {}
            const cursor = pencillCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // // // Add Items prodects
        app.post('/allitems', async (req, res) => {
            const newItem = req.body
            const result = await pencillCollection.insertOne(newItem)
            res.send(result)
        })

        // // deleted itemms
        app.delete("/allitems/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await pencillCollection.deleteOne(query)
            res.send(result)
        })

        // // my items
        // app.get('/allitems', async (req, res) => {
        //     const email = req.query.email
        //     console.log(email)
        //     const query = { email: email }
        //     const cursor = pencillCollection.find(query)
        //     const result = await cursor.toArray()
        //     res.send(result)
        // })


        // My items
        app.get('/myitems/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const cursor = await pencillCollection.find(query).toArray()
            res.send(cursor)
        })

        // // details item
        // app.get('/inventory/:id', async (req, res) => {
        //     const id = req.params.id
        //     const query = { _id: ObjectId(id) }
        //     const result = await mobileCollection.findOne(query)
        //     res.send(result)
        // })
        // // delevered items
        // app.put("/inventory/:id", async (req, res) => {
        //     const id = req.params.id
        //     const updatedUser = req.body
        //     const filter = { _id: ObjectId(id) }
        //     const options = { upsert: true }
        //     const updateDoc = {
        //         $set: updatedUser
        //     }
        //     const result = await mobileCollection.updateOne(filter, updateDoc, options)
        //     res.send(result)
        // })

        // app.get("/hero", async (req, res) => {
        //     res.send("Herocu connected")
        // })
        // // add Quantity items

        // app.put("/inventory/:id", async (req, res) => {
        //     const id = req.params.id
        //     const filter = { _id: ObjectId(id) }
        //     const updateDoc = {
        //         $set: {
        //             quantity: req.body.updateQuantity
        //         },
        //     }
        //     const result = await mobileCollection.updateOne(filter, updateDoc)
        //     res.send(result)
        // })




        // // My items
        // app.get('/myitems', async (req, res) => {
        //     const email = req.query.email
        //     const query = { email: email }
        //     const cursor = mobileCollection.find(query)
        //     const result = await cursor.toArray()
        //     res.send(result)
        // })


    } finally {

    }
}

run().catch(console.dir)




app.get("/", (req, res) => {
    res.send("Running Genius Server")
})

app.listen(port, () => {
    console.log("Listening to port", port)
})
