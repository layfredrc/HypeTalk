 <template>
 <div class="wrapper">
    <h1 class="title ml-6 mt-6">Panier</h1>
    <div class="flex-col">
      <ul class="cart-list">
        <li
          v-for="article in this.linkArticle"
          :key="article.id"
          class="flex-col cart-list__item">
          <img :src="`${article.imageurl}`" class="thumbnail" alt="">
          <div class="flex-col cart-list__item__details">
            <div>
              <p class="title is-5">{{ article.name }}</p>
              <p class="subtitle">Taille: EU {{article.size}}</p>
              <p class="subtitle">Quantité: {{ article.quantity }}</p>
            
            </div>
            <p class="has-text-weight-bold">{{ article.price }}€</p>
             <input type="number" :value="article.quantity" min="1" @change="changeQuantity(article.id, $event)" name="quantity" class="inputQte">
            <button
              @click="removeFromPanier(article.id)"
              class="btn cart-list__btn-remove">
              Supprimer
            </button>
          </div>
        </li>
      </ul>
      <section class="total-section">
        <ul class="total-section-list">
          <li class="total-section__item">
            <p class="total-section__item__label">{{ panierCount }} Articles : </p>
            <p class="has-text-weight-bold">{{ itemsSubtotal }}€</p>
            </li>
          <li class="total-section__item">
            <p class="total-section__item__label">Livraison :</p>
            <select v-model="selectedShippingOption">
              <option disabled value="">Mode de Livraison</option>
              <option
                v-for="option in shippingOptionsArray"
                :key="option.text"
                :value="option.rate">
                {{ option.text }} ({{ option.rate }}€)
              </option>
            </select>
          </li>
          <li class="total-section__item">
            <p class="total-section__item__label">TVA : ({{ salesTaxPercentage }})</p>
            <p>{{ salesTaxApplied }}</p>
          </li>
          <li class="total-section__item">
            <p class="total-section__item__label">Total :</p>
            <p>{{ total }}</p>
          </li>
        </ul>
        <button
          :disabled="!this.selectedShippingOption"
          class="btn btn--grey total-section__checkout-button"
          v-if="isConnected"
          @click="pay">
            Payer
        </button>
        <router-link to="/connexion" v-else>
        <button 
          class="btn btn--grey total-section__checkout-button">Se connecter pour payer</button>
        </router-link>

      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Panier',
  props: {
    articles: { type: Array ,default: () => []},
    panier: { type: Object },
    isConnected:{type:Boolean},
    user:{type: Object}
  },
  data(){
    return {
      salesTax: 0.06,
      selectedShippingOption: '',
      shippingOptionsArray: [
        {
          text: 'Livraison express 1 jour',
          rate: 20,
        },
        {
          text: '2 jours',
          rate: 15,
        },
        {
          text: '3-5 jours',
          rate: 10,
        },
        {
          text: '7-15 jours',
          rate: 5,
        },
      ],
    
    };
  },
  
  methods:{
    // permet de lancer l'evenement "change-quantity" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
    changeQuantity (articleId, { target: { value } }) {
      value = parseInt(value)
      this.$emit('change-quantity', { articleId, quantity: value })
    },
    // permet de lancer l'evenement "remove-from-panier" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
    removeFromPanier(articleId){
      this.$emit('remove-from-panier',articleId)
    },
    // permet de lancer l'evenement "pay" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
    pay () {
      if(this.panier.articles !== undefined){
        alert(`Merci pour votre achat !`)
        this.$emit('pay')
      }
      
     
    }
  },
  computed:{
    // récupérer les données des articles du panier en les liant à ceux du tableau "articles" avec l'ID
    // afin de savoir à quoi les articles dans le panier correspondent
    linkArticle(){
      var newPanier = []
      if(this.panier.articles !== undefined){
        this.panier.articles.forEach(element => {
        var article = this.articles.find(a => a.id === element.id)
        article.quantity = element.quantity
        article.size = element.size
        newPanier.push(article)
      });
      }
      
      return newPanier
    },
      // retourne le nombre d'article dans le panier
      panierCount() {
        if(this.panier.articles === undefined){
          return 0
        }else{
          return this.panier.articles.length;
        }
    }, 
    // retourne le coût sans la livraison et les taxes
    itemsSubtotal() {
      var articlesInPanier = this.linkArticle;
      console.log(articlesInPanier)
      var subTotal = 0
      articlesInPanier.forEach(article =>{
         subTotal = subTotal + Number(article.price * article.quantity)
      
      })
      console.log(subTotal)
       return subTotal;
    },
    // application des frais de livraison
    subtotal() {
      if (this.selectedShippingOption && this.panierCount > 0) {
        return Number(this.itemsSubtotal) + Number(this.selectedShippingOption);
      }
      return '---';
    },
    // pourcentage des taxes
    salesTaxPercentage() {
      return `${this.salesTax * 100}%`;
    },
    // application du pourcentage de taxes
    salesTaxApplied() {
      if (this.selectedShippingOption && this.panierCount > 0) {
        return (this.subtotal * this.salesTax).toFixed(2);
      }
      return '---';
    },
    // prix total contenant le prix des articles, la livraisons et les taxes
    total() {
      if (this.selectedShippingOption && this.panierCount > 0) {
        return Number(this.subtotal) + Number(this.salesTaxApplied);
      }
      return '---';
    }
  }
};
</script>

<style lang="scss" scoped>

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

.cart-list {
  width: 70%;
  margin-right: 1rem;
  @media only screen and (max-width: 832px) {
    width: 100%;
  }
}
.cart-list__item {
  width: 100%;
  border-bottom: 1px solid #2c3e50;
}
.cart-list__item__details {
  flex: 2;
  justify-content: space-between;
  margin-left: 2rem;
}
.cart-list__btn-remove {
  margin-top: .5rem;
  &:hover {
    color: red;
  }
}
.thumbnail {
  max-width: 300px;
  margin-top: .5rem;
}
.total-section {
  background: #FAFAFA;
  padding: 0 1rem 1rem;
}
.total-section-list {
  margin: 0;
}
.total-section__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total-section__item__label {
  font-weight: bold;
  margin-right: 1rem;
}
.total-section__checkout-button {
  width: 100%;
}

.inputQte{
  width: 50px;
}
</style>