import express from 'express';
import cors from 'cors';
import path from 'path'

import Routers from './routes/index';

const app = express();

app.use(cors());

app.options('*', cors({
    //origin: ['http://10.6.129.214:3001', 'http://localhost:3003', 'http://localhost:3001'],
    origin: '*',
    allowedHeaders: 'content-type',
    methods: 'POST',
    preflightContinue: false,
}));

app.use(express.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3002");
//     res.header("Access-Control-Allow-Methods", "POST");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });


app.use("/api", Routers);
app.use(express.static(path.join(__dirname, "..", "..", "dist")))

export default app;