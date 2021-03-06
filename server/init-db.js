const articles = require('./data/articles')
const { Client } = require('pg')
/*
 * Ce fichier est destiné à initialiser la BDD
 * Il faudra créer une BDD du nom de "HypeTalk Clothing" ainsi qu'une table "articles"
 * Remplissage de la table "articles"
 * executer après l'installation avec la commande : node "chemin vers init-db.js"
*/
const client = new Client({
    user: 'postgres',
    host: 'hypetalk.netlify.app',
    password: 'test',
    database: 'HypeTalk Clothing'
})

client.connect()

// pour chaque article dans le tableau d'articles présent dans le fichier articles.js on l'ajoutera dans la BDD
// dans la table "articles"
async function run() {
    for (const article of articles) {
        await client.query({
            text: `INSERT INTO articles(name, imageurl, price , category, description, gallerie)
        VALUES ($1, $2, $3, $4, $5, $6)`,
            values: [article.name, article.imageurl, article.price, article.category, article.description, article.gallerie]
        })
    }
    console.log('importation terminée')
    client.end()
}

run()