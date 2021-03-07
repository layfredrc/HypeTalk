<!-- App.vue est le point d'entrée de notre application Vue
	Il contient les données que nous allons "propager" à travers toute les pages qui sont :
	articles: le tableau des articles provenant de la tables "articles" de notre BDD,
	panier: objet contenant la date de création, la date de la dernière maj et le tableau d'articles ajoutés au la panier
	user: objet contenant les informations de l'utilisateur tel que sont ID ainsi que son adresse email,
	isConnected: booléen indiquant si l'utilisateur est connecté,
	
	- Contient le Header ainsi que le Footer ce qui permet de les afficher pour chaque page.
	contient la router-view permettant d'afficher le contenu des components Vue qui seront appellés
	contient les "écouteurs d'évènements" afin de pouvoir réaliser les opérations lors des actions de l'utilisateurs
	tel que la récupération de données vers les différentes requêtes d'API et des opérations sur les données de l'application.

-->
<template>
  <div id="app">
    
    <Header :panier="panier" :is-connected='isConnected'/>
	<router-view 
		:articles="articles"
		:panier="panier"
		:user="user"
		:is-connected="isConnected"
		@add-article="addArticle"		
		@add-to-panier="addToPanier"
		@connexion="connexion"
		@change-quantity="changeQuantity"
		@remove-from-panier="removeFromPanier"
		@delete-article="deleteArticle"
		@pay="pay"
		@deconnexion="deconnexion">
	</router-view>
	<Footer/>
    
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios'
export default{
	name:'App',
	components:{
		Header,
		Footer
	},
	// données de notre application Vue
	data() {
		return{
			articles: [],
			panier: {
				createdAt: null,
				updatedAt: null,
				articles: []
			},
			user: {},
			isConnected: false,
		}
	},
	// requêtes à effectuer vers l'API pour récupérer nos données 
	// s'effectuent dès le montage du component
	async mounted(){
		let res = await axios.get("/api/articles");
		this.articles = res.data;
		let res2 = await axios.get("/api/panier");
			this.panier = res2.data;
		try{
			const res3 = await axios.get('/api/me')
			this.user = res3.data
			this.isConnected = true
		}catch(err){
			if(err.response?.status === 401){
				this.isConnected = false
			}else{
				console.log('error', err)
			}
		}
	},

	// méthode executées lorsque les écouteurs détectent l'évènement correspondant
	methods:{
		
		async connexion(user){
			const res =  await axios.post('/api/connexion',user)
			this.user = res.data
			this.isConnected = true
			this.$router.push('/')
		},
		async addToPanier(articleId,selectedSize) {
			if(this.panier.articles === undefined){
				this.panier.articles = new Array()
			}
			const newArticle = { id: articleId, quantity: 1 ,size: selectedSize}
			const res = await axios.post('/api/panier',newArticle)
			console.log(res)
			this.panier.articles.push(newArticle)
		},

		async changeQuantity({ articleId, quantity }) {
			const res = await axios.put('/api/panier/' + articleId, { quantity })
			const article = this.panier.articles.find(a => a.id === articleId)
			console.log(res)
			console.log(article)
			article.quantity = quantity
		},

		async removeFromPanier(articleId) {
			await axios.delete('/api/panier/' + articleId)
			const index = this.panier.articles.findIndex(a => a.id === articleId)
			this.panier.articles.splice(index, 1)
		},
		async pay() {
			await axios.post('/api/panier/pay')
			this.panier.articles = []
			this.$router.push('/')	
    },
		async deleteArticle(articleId) {
			await axios.delete('http://localhost:5000/api/article/' + articleId)
			console.log(this.articles.length)
			const index = this.articles.findIndex(a => a.id === articleId)
			console.log(index)
			this.articles.splice(this.articles.length-index, 1)
		},

		async addArticle(article){
			const res = await axios.post('http://localhost:5000/api/article', article)
			this.articles.push(res.data)
		},

		async deconnexion(){
			await axios.delete('http://localhost:5000/api/deconnexion')
			this.isConnected = false
		}
	}
}
</script>

<style>
   * {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			
		}

		body {
			margin: 20px 20px;
			font-family: "Montserrat", sans-serif;
			background-color: #f7f7f7;
		}

    
		a,
		a:visited,
		a:link {
			color: black;
			font-weight: bold;
			text-decoration: none;
		}

		a:hover {
			transform: scale(1.2);
    }
    
     

</style>