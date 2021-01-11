<template>
  <div class="articles container">
    <h2 class="title is-3">Les articles vendus par HYPETALK</h2>
    <div class="columns is-multiline">
      <div v-for="article in articles" :article="article" :key="article.id" class="column is-one-quarter">
        <router-link :to="`/article/${article.id}`">
          <ArticleCard :article="article" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ArticleCard from "./ArticleCard";
import UserServices from '../../services/UserService';
export default {
  name: "ArticlesList",
  components: {
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
    this.getArticlesData(); // call getEventData() when the instance is created
  },
  methods: {
    async getArticlesData() {
      // utilisation du userService pour récupérer les données de l'api de la route /api/articles/
       // recuperation des données de la table "articles"
      UserServices.getArticles()
      .then(
        (articles => {
          this.$set(this, "articles", articles);
        }).bind(this)
      );
    }
  }
};
</script>
<style scoped>
  *{
    font-family: 'Montserrat', sans-serif;
  }
.articles {
  margin-top: 20px;
  text-align: center;
}
</style>