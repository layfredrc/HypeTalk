<template>
  <div class="article-single">
    <section class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ article.name }}</h1>
          <h2 class="subtitle">
            <strong>Prix:</strong>
            {{ article.price }}€
            <br />
          </h2>
        </div>
      </div>
    </section>
    <section class="event-content">
      <div class="container">
        <div class="flex-col">
          <div class="flex-col--2">
               <div class="flex-col" v-for="image in article.gallerie" :key="image.id">
          <img class="image is-256x256" :src="`${image}`" :alt="`${article.name}`">
        </div>
        
          </div>
          <div class="flex-col--2" >
            <h2 class="title">{{ article.name }}</h2>
            <button class="btn btn--grey" @click="addToPanier(article.id,selectedSize)" >Ajouter au panier</button>
            <button class="btn btn--grey ml-3" @click="deleteArticle(article.id)" v-if="isConnected">Supprimer article</button>
            <p class="subtitle has-text-weight-bold mt-2">Prix: {{ article.price }}€</p>

           

            <div class="select is-rounded is-primary " v-if="this.article.category=='Sneakers'">
                <select class="select is-primary" v-model="selectedSize" @change="getSizeSelected($event)">
                  <option disabled value="">Taille :</option>
                  <option value="40">EU 40</option>
                  <option value="41">EU 41</option>
                  <option value="42">EU 42</option>
                  <option value="43">EU 43</option>
                  <option value="44">EU 44</option>
                  <option value="45">EU 45</option>
                  <option value="46">EU 46</option>
                  <option value="47">EU 47</option>
                 </select>
            </div>

              <div class="select is-rounded is-primary " v-else>
                <select class="select is-primary" v-model="selectedSize" @change="getSizeSelected($event)">
                  <option disabled value="">Taille :</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
          
                 </select>
            </div>
            
            <article class="message is-link mt-6">
                <div class="message-header">
                <p class="has-text-weight-bold">Details:</p>
                </div>
                <div class="message-body">
                  {{article.description}}
                </div>
            </article>
          </div>
        </div>
       
      </div>
    </section>
  </div>
</template>
<script>
// import EventService 
import UserServices from "../../services/UserService"
export default {
  name: 'ArticleSingle',
  data() {
    // initialize the event object
    return {
      article: {},
      selectedSize: 40,
    }
  },
   props: {
    articles: { type: Array, default: () => [] },
    panier: { type: Object },
    isConnected:{type:Boolean},
  },
  created() {
    this.getArticleData();
  },
 
  methods: {
    async getArticleData() {
       // utilisation du userService pour récupérer les données de l'api de la route /api/article/:id
       // recuperation des données de l'article mis en parametre de route 
      UserServices.getArticleSingle(this.$route.params.id)
      .then(article => {
        this.$set(this,"article" , article);
      })
    },
    // permet de lancer l'evenement "add-to-panier" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
    addToPanier(articleId,selectedSize){
      this.$emit('add-to-panier',articleId,selectedSize);
    },
    
    // permet de lancer l'evenement "delete-article" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
    deleteArticle (articleId) {
      this.$emit('delete-article', articleId)
    },
    // recuperation de la valeur de l'element <selected>
    getSizeSelected(event){
      this.selectedSize = event.target.value
    }
  },
 
}
</script>

<style lang="scss" scoped>
  *{
    font-family: 'Montserrat', sans-serif;
  }
.flex-col {
  display: flex;
  align-items: flex-start;
}
.flex-col--2 {
  width: 50%;
  padding: 40px;
}
.flex-col--align-center {
  align-items: center;
}
.btn {
  padding: .5rem .75rem;
  border-radius: 3px;
  border: none;
  background-color: transparent;
  font-size: .9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all .15s ease;
}
.btn--grey {
  margin: 10px 0px;
  background-color: #2c3e50;
  color: #FFF;
  &:hover, &:focus {
    background-color: #42b983;
  }
}

img{
  margin: 20px;
}


</style>
