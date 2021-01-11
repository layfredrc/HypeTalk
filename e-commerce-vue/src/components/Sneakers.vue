<template>
  <div>
      <div class="hero is-danger">
        <div class="hero-body">
            <div class="container">
            <h1 class="title is-size-1">🔥Sneakers</h1>          
            </div>
        </div>
      </div> 
      <div class="articles container">
        <h2 class="title is-3">Les paires de Sneakers vendues par HYPETALK</h2>
            <div class="columns is-multiline">
                <div v-for="article in articles" :article="article" :key="article.id" class="column is-one-quarter">
                    <router-link :to="`/article/${article.id}`">
                        <ArticleCard :article="article" />
                    </router-link>
                </div>
            </div>
      </div>
    
  </div>
</template>

<script>
import ArticleCard from './ArticleCard'
import UserServices from '../../services/UserService'
export default {
    name:"Streetwear",
    components:{
        ArticleCard
    },
     props: {
    panier: { type: Object }
  },
  data() {
    return {
      article: {},
      articles: []
    };
  },
  created() {
    this.getSneakersData(); // call getEventData() when the instance is created
  },
  methods: {
    async getSneakersData() {
      // Use the articleservice to call the getarticles() method
      UserServices.getSneakers()
      .then(
        (articles => {
          this.$set(this, "articles", articles);
        }).bind(this)
      );
    }
  }

}
</script>

<style>
*{
    font-family: 'Montserrat', sans-serif;
}
.articles {
    margin-top: 20px;
    text-align: center;
}
</style>