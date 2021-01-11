 <!--
  Ce component contient la Navbar permettant de naviguer à travers les différentes routes.
 -->
 <template>
    <header>
      <nav class="navbar is-transparent is-spaced has-text-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand mt-4">
          <router-link :to="{name:'root'}" class="logo">🔥HYPETALK</router-link>

          <a role="button" class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-start ml-6 mb-3">
            <router-link :to="{name:'sneakers'}" class="navbar-item">
              Sneakers
            </router-link>

            <router-link :to="{name:'streetwear'}" class="navbar-item">
              StreetWear
            </router-link>

            <router-link :to="{name:'articles'}" class="navbar-item">
              Articles
            </router-link>

            <router-link :to="{name:'vendre'}" class="navbar-item">
              Vendre
            </router-link>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <router-link :to="{name:'about'}" class="navbar-item">
                  A propos
                </router-link>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <router-link :to="{name:'inscription'}" class="button is-danger mr-5">
                  <strong>Inscription</strong>
                </router-link>
                <router-link :to="{name:'connexion'}" class="button is-link" v-if="!isConnected">
                  Connexion
                </router-link>
                <a href=""  v-else class="button is-link" @click="deconnexion()">Deconnexion</a>
              </div>
              <router-link :to="{name:'panier'}" class="item ml-6"><div class="cart-icon"><img src="../assets/shopping-bag.svg" alt="panier" class="shopping-icon"><span class='item-count'>{{count}}</span></div> </router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>
    
</template>
<script>

export default {
    name:'Header',
    props:{
       panier: { type: Object },
       isConnected:{type:Boolean}
    },
    data(){
      return{
        showNav: false
      }
    },
    methods:{
      
    // permet de lancer l'evenement "deconnexion" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
     async deconnexion(){
        this.$emit('deconnexion')
      }
    },
    computed:{
      count(){
        if(this.panier === undefined){
          return 0
        }else{
       
          return this.panier.articles.length
        }
      }
    }
}
</script>

<style scoped>
  *{
    font-family: 'Montserrat', sans-serif;
  }
    nav {
			display: flex;
      justify-content: space-between;
      padding: 30px;
      font-size: 18px;
      background-color: white;
      color: black;
		}

    .logo{
      margin-right: auto;
    }
  
    .nav-item{
      margin-right: 120px;
    }

	.cart-icon {
	width: 45px;
	height: 45px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
  transform: translateY(-10px);
}

.shopping-icon {
		width: 30px;
		height: 30px;
  }
  
  .item-count {
		position: absolute;
		font-size: 10px;
		font-weight: bold;
		bottom: 12px;
	}
</style>