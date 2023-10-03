const express = require('express')
const app = express();
const port = 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({extended:false}));
app.use(bodyPs.json());

const genreRoutes = require('./routes/genre')
app.use('/api/genre', genreRoutes)

const usersRoutes = require('./routes/users')
app.use('/api/user', usersRoutes)

const studioRoutes = require('./routes/studio')
app.use('/api/studio', studioRoutes)

const mangaRoutes = require('./routes/manga')
app.use('/api/manga', mangaRoutes)

const animeRoutes = require('./routes/anime')
app.use('/api/anime', animeRoutes)

const SeiyuRoutes = require('./routes/seiyu')
app.use('/api/seiyu', SeiyuRoutes)

const riviewRoutes = require('./routes/riview')
app.use('/api/riview', riviewRoutes)

app.listen(port,()=>{
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})