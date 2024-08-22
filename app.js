require('dotenv').config()
const connectDB=require('./db/connect')
const productRouter=require('./routes/products')


const express = require('express')
const app=express()

const notFoundMiddleware=require('./middleware/not-found')
const errorMiddleware=require('./middleware/error-handler')

app.use('/api/v1/products',productRouter)

app.use(express.json())

app.get('/',(req,res)=>{
    res.send(`<h1>STORE API</h1>
        <a href="/api/v1/products"
        >products route</a>`)
})

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port =process.env.PORT||5000
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server is listening ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}
start()