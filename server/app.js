const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const apiRouter = require('./routes/api')
// importation de tout les packages nécessaire
// configuration de notre server express
const app = express()


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: 'grehjznejzkhgjrez', saveUninitialized: false, resave: false, credential: 'same-origin', cookie: { secure: false, maxAge: 9999999 } }))
// on joint le dossier dist lorsque l'on aura mit notre application en mode production
app.use(express.static(path.join(__dirname, '../e-commerce-vue/dist')))
app.use(cors({ credentials: true, origin: true }));
app.use('/api/', apiRouter)
// on lance le serveur sur le port 5000
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    //static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA

    app.get(/.*/, (req, res => res.sendFime(__dirname + '/public/index.html')));
}

app.listen(port, () => console.log(`Server started on port ${port}`))

module.exports = app