const express = require('express')
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const router = express.Router()
const articles = require('../data/articles.js')

// Connexion à la base de donnée
// Il faudra renseigner votre mot de passe PgAdmin ainsi que le nom de la BDD 
// ici la BDD s'apellera 'HypeTalk Clothing'
const client = new Client({
    user: 'postgres',
    host: 'hypetalk.netlify.app',
    password: 'test',
    database: 'HypeTalk Clothing'
})

client.connect()


// Création de l'objet Panier
class Panier {
    constructor() {
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.articles = []
    }
}

router.use((req, res, next) => {
    // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
    if (typeof req.session.panier === 'undefined') {
        req.session.panier = new Panier()
    }
    next()
})

// Route nous permettant d'accéder à tout les articles présent dans la Table "articles"
router.get('/articles', async (req, res) => {
    const result = await client.query({
        text: 'SELECT * FROM articles'
    })
    res.json(result.rows)
})

// Route nous permettant d'accéder à tout les articles de la Table "articles" ayant pour catégorie "Sneakers"
router.get('/sneakers', async (req, res) => {
    const result = await client.query({
        text: 'SELECT * FROM articles WHERE category = $1',
        values: ["Sneakers"]
    })
    res.json(result.rows)
})

// Route nous permettant d'accéder à tout les articles de la Table "articles" ayant pour catégorie "StreetWear"
router.get('/streetwear', async (req, res) => {
    const result = await client.query({
        text: 'SELECT * FROM articles WHERE category = $1',
        values: ["StreetWear"]
    })
    res.json(result.rows)
})
// Route nous permettant d'accéder à l'article de la Table article dont l'id est préciser dans 
// les paramètres de l'URL "/api/article/:id"
router.get('/article/:id', async (req, res) => {
    const id = Number(req.params.id);
    // const article = articles.find(e => e.id === id);
    const result = await client.query({
        text: 'SELECT * FROM articles WHERE id = $1',
        values: [id]
    })
    res.send(result.rows[0]);
});

// (inutile)
// router.get('/connexion', (req, res) => {
//     res.sendFile(path.join(__dirname, "../../e-commerce-vue/src/components/Connexion.vue"))
// })

// router.get('/inscription', (req, res) => {
//     res.sendFile(path.join(__dirname, "../../e-commerce-vue/src/components/Inscription.vue"))
// })

// Route permettant l'inscription d'un utilisateur à la BDD
// Utilisation de la Table "users"
// Nous vérifions d'abord si l'email renseigné est déjà présent dans la table
// Si oui, message d'erreur Sinon ajout de l'utilisateur et hashage de son mot de passe avec bcrypt
router.post('/inscription', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email]
    })

    if (result.rows.length > 0) {
        res.status(401).json({
            message: 'Utilisateurs déjà inscrits !'
        })
        return
    }
    // Si l'utilisateur n'est pas déjà inscrit

    const hash = await bcrypt.hash(password, 10)

    await client.query({
        text: `INSERT INTO users(email, password)
      VALUES ($1, $2)
      `,
        values: [email, hash]
    })
    res.send('Inscription réussie !')

    add(email, password)



})

/*
 * Cette route permet à l'utilisateur déjà inscrit de se connecter 
*/
router.post('/connexion', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const result = await client.query({
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email]
    })

    // on vérifie si l'utilisateur n'est pas inscrit dans la bdd
    // si c'est le cas, envoie d'un message d'erreur

    if (result.rows.length === 0) {
        res.status(401).json({
            message: "L'utilisateur n'as pas encore été inscrit."
        })
        return
    }
    // si l'utilisateur existe dans la bdd on compare son mdp avec la méthode bcrypt compare
    // si les mots de passe sont les mêmes on va connecter l'utilisateur et 
    // affilier req.session.userId avec l'id de l'utilisateur
    // sinon, affichage d'un message d'erreur 
    const user = result.rows[0]

    if (await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id
        console.log(req.session.userId)
        res.json({
            id: user.id,
            email: user.email
        })
    } else {
        res.status(401).json({
            message: 'mauvais mot de passe'
        })
        return
    }
})

// Route permettant la déconnexion de l'utilisateur déjà connecté
// destroy() de la session utilisateur
router.delete('/deconnexion', (req, res) => {
    req.session.destroy()


})


/*
 * Cette route retourne les infos de l'utilisateur connecté 
 * Ne marche uniquement lorsque l'utilisateur est connecté
 */

router.get('/me', async (req, res) => {
    if (typeof req.session.userId === 'undefined') {
        res.status(401).json({ message: 'Utilisateur non connecté' })
        return
    }

    const result = await client.query({
        text: 'SELECT id, email FROM users WHERE id=$1',
        values: [req.session.userId]
    })

    res.json(result.rows[0])
})


// Retourne le panier
router.get('/panier', (req, res) => {
    res.json(req.session.panier);

})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité égale à 1
 * On vérifiera que la quantité est positif
 * De plus, on vérifiera si l'article n'a pas déjà été ajouter au panier auparavant
 */
router.post('/panier', async (req, res) => {

    const quantity = parseInt(req.body.quantity);
    const id = parseInt(req.body.id);

    if (quantity <= 0 || isNaN(quantity)) {
        res.status(400).json({ message: 'La quantité du produit doit être un entier strictement positif ' })
    }



    // instanciation d'un tableau contenant tout les articles présent dans la BDD
    const articlesInDB = await client.query({
        text: `SELECT * FROM articles `

    })
    // console.log(articlesInDB.rows)
    // console.log(articlesInDB.rows[15])
    // console.log(articlesInDB.rows.length)

    // instanciation de l'article à ajouter au panier 
    const article = {
        id: id,
        name: articlesInDB.rows[id - 1].name,
        description: articlesInDB.rows[id - 1].description,
        imageurl: articlesInDB.rows[id - 1].imageurl,
        price: articlesInDB.rows[id - 1].price,
        quantity: quantity
    }

    // on vérifie si l'article à ajouter n'est pas déjà dans le panier
    req.session.panier["articles"].forEach(element => {
        if (element.name === article.name) {
            res.status(400).json({ message: "L'article à déjà été ajouté au panier" })
        }
    });
    // ajout au panier de l'article instancier 
    req.session.panier["articles"].push(article)
    console.log(req.session.panier.articles)
    // on envoie l'article ajouté à l'utilisateur
    res.json(req.session.panier);
})


/*
 * Cette route doit supprimer un article dans le panier
 * On vérifie si l'article à supprimer du panier est bien présent dans le panier
 * Si non, on retourne une erreur, si oui, on regarde la correspondance des ID avec le tableau articles et le panier avec findIndex
 * Puis à l'aide de splice() on retire cet article. 
 */
router.delete('/panier/:articleId', (req, res) => {
    const id = parseInt(req.params.articleId);
    console.log("idArticle" + id)
    console.log("panier" + req.session.panier)
    console.log("article dans panier" + req.session.panier.articles)

    const isInPanier = req.session.panier.articles.find(element => element.id === id);
    console.log(isInPanier)
    if (isInPanier === undefined) {
        res.status(400).json({ message: "L'article que vous voulez supprimer n'est pas dans le panier" })
    }
    const index = req.session.panier["articles"].findIndex(a => a.id === id)

    req.session.panier["articles"].splice(index, 1) // remove the article from the array
    res.send()

})
/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {

    console.log(req.session)
    console.log("id" + req.session.id)
    if (req.session.userId !== null) {
        res.send('Vous pouvez payer')
        req.session.destroy()
    } else {
        res.status(401).json({ message: 'Vous devez être connecté pour payer' })
    }
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const id = parseInt(req.params.articleId);
    const quantity = parseInt(req.body.quantity)
    console.log(id)
    console.log(quantity)
    if (quantity <= 0 || isNaN(quantity)) {
        res.status(400).json({ message: 'La quantité du produit doit être un entier strictement positif ' })
    }
    console.log("panier : " + req.session.articles)

    const index = req.session.panier["articles"].find(element => element.id === id);
    if (index === undefined) {
        res.status(400).json({ message: "L'article dont vous souhaitez modifier la quantité n'est pas dans le panier" })
    }
    console.log("index" + index)
    req.session.panier.articles[id - 1].quantity = quantity;
    res.send();
})


// Ajout d'un article à la BDD dans la Table "articles"
router.post('/article', async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const imageurl = req.body.imageurl
    const category = req.body.category
    const price = parseInt(req.body.price)
    const gallerie = req.body.gallerie

    // vérification de la validité des données d'entrée
    if (typeof name !== 'string' || name === '' ||
        typeof description !== 'string' || description === '' ||
        typeof imageurl !== 'string' || imageurl === '' ||
        isNaN(price) || price <= 0 || typeof category !== 'string' || category === '' || Array.isArray(gallerie) == false) {
        res.status(400).json({ message: 'bad request' })
        return
    }

    // Requete permettant l'ajout d'une ligne dans la Table "articles"
    const result = await client.query({
        text: `INSERT INTO articles(name, description, imageurl, price, category, gallerie)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
        values: [name, description, imageurl, price, category, gallerie]
    })
    const id = result.rows[0].id

    // on envoie l'article ajouté à l'utilisateur
    res.json({
        id: id,
        name: name,
        description: description,
        imageurl: imageurl,
        price: price,
        category: category,
        gallerie: gallerie
    })
})


// Supression d'un article dans la table "articles"
router.delete('/article/:articleId', async (req, res) => {
    const id = parseInt(req.params.articleId);
    // const index = articles.findIndex(a => a.id === id)
    await client.query({
        text: 'DELETE FROM articles WHERE id=$1',
        values: [id]
    })

    // articles.splice(index, 1) // remove the article from the array
    res.send()
})

module.exports = router