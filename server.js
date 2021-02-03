// Importing dependencies
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const expressSession = require("express-session")


// AdminBro
const { default: AdminBro } = require('admin-bro')
const options = require("./admin.options")

// Importing Routers
const adminRouter = require("./routes/adminRouter")
const indexRouter = require("./routes/indexRouter")


// Initializing app
const app = express()
app.set('view engine', 'ejs');
app.use(cors())

// Connecting Mongoose
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log(`Database connected`))

const db = mongoose.connection
db.on("error", (e)=>console.error(e))

// Adding middleware
app.use(express.json())

app.use("/public",express.static("public"))

app.use(expressSession({
    secret:"secret",
    saveUninitialized:false,
    resave:false
}))

// Admin Bro
const admin = new AdminBro(options)
const router = adminRouter(admin)
app.use(admin.options.rootPath, router)

app.use("/uploads", express.static("uploads"))

app.use(express.urlencoded({extended:true}))
  

// Adding Routers
app.use("/", indexRouter)

// Defining Port
const PORT = process.env.PORT || 3000

// Running server
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))