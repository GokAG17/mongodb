const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const subjectRoutes = require('./routes/Subject');
const studentRoutes = require('./routes/Student');
const batchRoutes = require('./routes/Batch');

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api', subjectRoutes); 
app.use('/api', studentRoutes); 
app.use('/api', batchRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
