
import express from 'express';
import cors from 'cors';
import router from './routes/routes'
const app = express();
const PORT = 4000;
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use(router)



app.listen(PORT, () =>{
    console.log(`listening on ${PORT}`)
})


