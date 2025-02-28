const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require ('dotenv').config();
const path = require('path');

// routes
const userRoutes = require('./routes/UserRoutes');
const categoriesRoutes = require('./routes/CategoriesRoutes')
const postRoutes = require('./routes/PostRoutes')
const galeryRoutes = require('./routes/GaleryRoutes')
const positionRoutes = require('./routes/PositionRoutes')
const teamRoutes = require('./routes/TeamRoutes')

// middlewares
const app = express()
app.use(bodyParser.json());
app.use(cors())

app.use('/public', express.static(path.join(__dirname, 'public')));
// use routes
app.use('/api/auth', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/post', postRoutes);
app.use('/api/galery', galeryRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/team', teamRoutes);


// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})