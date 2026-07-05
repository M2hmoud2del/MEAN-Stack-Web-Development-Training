const express = require('express');
const courseRoutes = require('./routes/course-routes');

const connectDB = require('./config/db-connect');

require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/v1/courses', courseRoutes);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
