const express = require('express')
const mongoDbConnect = require('../DbConnect/mongosdb');
const authRoutes = require('../Routers/router');
const app = express()
const port = 4000

app.use(express.json());
mongoDbConnect();

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})