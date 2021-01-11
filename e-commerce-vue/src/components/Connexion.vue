<template>
    <div className="sign-in">
        <!-- Background video -->
		<div class="video-background-holder" id="home">
			<div class="video-background-overlay"></div>

			<div class="video-background-content container h-100">
				<div class="d-flex h-100 text-center align-items-center">
					<div class="w-100 text-dark">
					<h1 class="display-3">Le meilleur marketplace pour votre collection.</h1>
					<h3 class="lead mb-1">Veuillez vous authentifier.</h3>
                        <div class="wrapper fadeInDown">
                                <form id="formContent" @submit.prevent="connexion()">
                                    <div class="fadeIn first">
                                        <h1></h1>
                                    </div>

                                    <div>
                                        <h3 style="color:black; ">🔥HYPETALK</h3>
                                        <input
                                            type="email"
                                            id="email"
                                            class="fadeIn second"
                                            name="nom"
                                            placeholder="email"
											v-model="email"
											required
                                        />
                                        <input
                                            type="password"
                                            id="password"
                                            class="fadeIn third"
                                            name="mdp"
                                            placeholder="mot de passe"
											v-model="password"
											required
                                        />
                                        <button
                                            type="submit"
                                            class="fadeIn fourth"
                                            value="Se connecter"
                                            
                                        >Se connecter</button>

                                    
                                    </div>

                                    <div id="formFooter" style="color:black;">
                                        &copy;🔥HYPETALK
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>

module.exports = {
	props:{
		articles:{type: Array,default:[]},
		panier:{type:Object}
	},
    data(){
        return{
            email:"",
            password:"",
        };

    },

    async mounted(){

    },
    methods: {
		// permet de lancer l'evenement "connexion" ce qui va propager l'information à notre application
    // dans App.vue avec les listeners d'evenements qui vont exécuter les methodes pour effectuer les opérations
        async connexion(){
            this.$emit("connexion",{
                email: this.email,
                password: this.password,
			});
		
        },
      
    },
};
</script>

<style scoped>
.video-background-holder {
	position: relative;
	background-image: url("../assets/am.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	height: calc(100vh);
	min-height: 25rem;
	width: 100%;
	overflow: hidden;
}

.video-background-content {
	position: relative;
	z-index: 2;
}

.video-background-overlay {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: transparent;
	opacity: 0.5;
	z-index: 1;
}


/* STRUCTURE */

.wrapper {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	min-height: 100%;
    padding: 20px;
    
}

#formContent {
	-webkit-border-radius: 10px 10px 10px 10px;
	border-radius: 10px 10px 10px 10px;
    background: #fff;
    
	padding: 30px;
	width: 90%;
	max-width: 450px;
	position: relative;
	padding: 0px;
	-webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
	box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
	text-align: center;
}

#formFooter {
	background-color: #f6f6f6;
	border-top: 1px solid #dce8f1;
	padding: 25px;
	text-align: center;
	-webkit-border-radius: 0 0 10px 10px;
	border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
	color: #cccccc;
}

h2.active {
	color: #0d0d0d;
	border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

button {
	background-color: #56baed;
	border: none;
	color: white;
	padding: 15px 80px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	text-transform: uppercase;
	font-size: 13px;
	-webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
	box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
	-webkit-border-radius: 5px 5px 5px 5px;
	border-radius: 5px 5px 5px 5px;
	margin: 5px 20px 5px 20px;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
}

button:hover {
	background-color: #39ace7;
}

button:active {
	-moz-transform: scale(0.95);
	-webkit-transform: scale(0.95);
	-o-transform: scale(0.95);
	-ms-transform: scale(0.95);
	transform: scale(0.95);
}

input[type="email"],
input[type="password"] {
	background-color: #f6f6f6;
	border: none;
	color: #0d0d0d;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 10px;
	width: 85%;
	border: 2px solid #f6f6f6;
	-webkit-transition: all 0.5s ease-in-out;
	-moz-transition: all 0.5s ease-in-out;
	-ms-transition: all 0.5s ease-in-out;
	-o-transition: all 0.5s ease-in-out;
	transition: all 0.5s ease-in-out;
	-webkit-border-radius: 30px;
	border-radius: 30px;
}

input[type="email"]:focus {
	background-color: #fff;
	border-bottom: 2px solid #5fbae9;
}

input[type="email"]:placeholder {
	color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
	-webkit-animation-name: fadeInDown;
	animation-name: fadeInDown;
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
	0% {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
	}
	100% {
		opacity: 1;
		-webkit-transform: none;
		transform: none;
	}
}

@keyframes fadeInDown {
	0% {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
	}
	100% {
		opacity: 1;
		-webkit-transform: none;
		transform: none;
	}
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@-moz-keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.fadeIn {
	opacity: 0;
	-webkit-animation: fadeIn ease-in 1;
	-moz-animation: fadeIn ease-in 1;
	animation: fadeIn ease-in 1;

	-webkit-animation-fill-mode: forwards;
	-moz-animation-fill-mode: forwards;
	animation-fill-mode: forwards;

	-webkit-animation-duration: 1s;
	-moz-animation-duration: 1s;
	animation-duration: 1s;
}

.fadeIn.first {
	-webkit-animation-delay: 0.4s;
	-moz-animation-delay: 0.4s;
	animation-delay: 0.4s;
}

.fadeIn.second {
	-webkit-animation-delay: 0.6s;
	-moz-animation-delay: 0.6s;
	animation-delay: 0.6s;
}

.fadeIn.third {
	-webkit-animation-delay: 0.8s;
	-moz-animation-delay: 0.8s;
	animation-delay: 0.8s;
}

.fadeIn.fourth {
	-webkit-animation-delay: 1s;
	-moz-animation-delay: 1s;
	animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
	display: block;
	left: 0;
	bottom: -10px;
	width: 0;
	height: 2px;
	background-color: #56baed;
	content: "";
	transition: width 0.5s;
}

.underlineHover:hover {
	color: #0d0d0d;
}

.underlineHover:hover:after {
	width: 100%;
}

/* OTHERS */

*:focus {
	outline: none;
}



</style>