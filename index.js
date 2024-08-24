require('dotenv').config();
const express=require("express");
const connectDB=require("./db/db");
const cors=require('cors');
const bookroute=require("./routes/booksRoutes")


const app=express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/book',bookroute);

const port = process.env.PORT||5000;
app.listen(port, () => console.log(`Server running on port ${port}`));