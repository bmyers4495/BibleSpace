
import express from 'express';
import cors from 'cors';
import router from './routes/routes'
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const PORT: number =  parseInt(process.env.PORT || "4001",10); 
console.log('port', PORT)
app.use(cors({
  origin: '*',  // Allow all origins, or specify your domain if needed
}));
app.options('*', cors())
app.use(express.urlencoded())
app.use(express.json())
app.use(router)



app.listen(PORT, '0.0.0.0',  () =>{
    console.log(`listening on ${PORT}`)
})


