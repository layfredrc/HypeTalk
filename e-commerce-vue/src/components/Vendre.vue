<template>
<div>
     <div class="hero is-danger">
        <div class="hero-body">
            <div class="container">
            <h1 class="title is-size-1">🔥 Vendre un article</h1>          
            </div>
        </div>
     </div> 

      <form class="container" @submit.prevent="addArticle">
          <div class="field mt-6 cop">
            <label class="label">Nom de l'article</label>
            <div class="control">
              <input class="input" type="text" v-model="newArticle.name" placeholder="Nom de l'article">
            </div>
          </div>

          <div class="field">
            <label class="label">Lien de l'image pour la couverture</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-success" type="text" v-model="newArticle.imageurl">
              <span class="icon is-small is-left">
                <i class="fas fa-image"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
 
      </div>

          <div class="field">
            <label class="label">Prix de vente</label>
                  <div class="control has-icons-left">
                    <input class="input" type="number" v-model="newArticle.price">
                    <span class="icon is-small is-left">
                     <i class="fas fa-euro-sign"></i>
                    </span>
                  </div>    
          </div>

          <div class="field">
            <label class="label">Categorie</label>
            <div class="control">
              <div class="select">
                <select v-model="newArticle.category" @change="getCategory($event)">
                  <option value="Sneakers">Sneakers</option>
                  <option value="StreetWear">StreetWear</option>
                </select>
              </div>
            </div>
          </div>


      <div class="field">
        <label class="label">Gallerie d'image de l'article</label>
        <div class="control">
          <textarea class="textarea" v-model="newArticle.gallerie" @change="getGallerie($event)" placeholder="Veuillez séparer chaque lien par un espace"></textarea>
        </div>
      </div>  

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Description de l'article" v-model="newArticle.description"></textarea>
        </div>
      </div>  

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit">Mettre en vente</button>
      </div>
    </div>
  </form>

</div>

</template>
 
<script>
module.exports = {
    name:'Vendre',
    props: {
        isConnected:{type:Boolean},
        articles: { type: Array, default: [] },
    },

    data () {
        return {
            newArticle: {
            name: '',
            description: '',
            imageurl: '',
            price: 0,
            category:'',
            gallerie:[]
        },
      
        }
    },
    methods: {
      
    // permet de lancer l'evenement "add-article" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
        addArticle () {
        this.$emit('add-article', this.newArticle)
        },
        // recuperation de la valeur de l'element <select> 
        getCategory(event){
          this.newArticle.category = event.target.value
        },
        // recuperation des liens à ajouter dans la gallerie 
        // necessaire pour l'ajout d'un article a notre BDD
        getGallerie(event){
          console.log(event.target.value)
          var gallerie = []
          gallerie = event.target.value.split(' ')
          console.log(gallerie)
          this.newArticle.gallerie = gallerie
        }
    }
}
</script>
 
<style>
*{
    font-family: 'Montserrat', sans-serif;
}
</style>