// Importing dependencies
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const expressSession = require("express-session")
const passport = require("passport");


// AdminBro
const { default: AdminBro } = require('admin-bro')
const options = require("./admin.options")

// Importing Routers
const adminRouter = require("./routes/adminRouter")
const indexRouter = require("./routes/indexRouter")
const userRouter = require("./routes/userRouter")
const houseRouter = require("./routes/houseRouter")


// Initializing app
const app = express()
app.set('view engine', 'ejs');
app.use(cors())

app.use("/uploads", express.static("uploads"))

app.use(express.urlencoded({extended:true}))


// Connecting Mongoose
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser:true, 
            useUnifiedTopology:true, 
            useFindAndModify: false, 
            useCreateIndex: true})
        .then(() => console.log(`Database connected`))
    }catch(e){
        console.log(e)
    }
}

connect()

const db = mongoose.connection
db.on("error", (e)=>console.error(e))

// Admin Bro
const admin = new AdminBro(options)
const router = adminRouter(admin)
app.use(admin.options.rootPath, router)

// Adding middleware
app.use(express.json())

app.use("/public",express.static("public"))

app.use(expressSession({
    secret:"secret",
    saveUninitialized:false,
    resave:false
}))


// Adding passport
require('./passport')(passport);
app.use(passport.initialize()) 
app.use(passport.session()) 

app.get("*", (req,res,next)=>{
    res.locals.user = req.user || null
    next();
})



// Adding Routers
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/house", houseRouter)



// if URL path matches none on our above routes, 
// throw 404 http error message
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})

//sending back error messages.
//all the errors thrown with the next() ifromn the routes will be
//handled here 
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message })
});




// Defining Port
const PORT = process.env.PORT || 3000

// Running server
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))