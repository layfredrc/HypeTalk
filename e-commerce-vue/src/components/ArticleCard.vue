<template>
  <div class="event-card">
    <div class="card">
      <div class="card-image">
          <figure class="image is-5by3">
            <img :src="`${article.imageurl}`" :alt="`${article.name}`"/>
          </figure>
      </div>
      <div class="card-content has-background-light">
        <div class="media"> 
          <div class="media-left">
              <h1 class="title is-1">🔥</h1>
          </div>
          <div class="media-content">
            <p class="subtitle is-5">{{article.name}}</p>
            <p class="title is-6 has-text-weight-bold">{{article.price}} €</p>
          </div>
        </div>
    </div>
      
    </div>
  </div>
</template>
<script>
export default {
  props: ["article"]
};
</script>
<style lang="scss" scoped>
.card{
  border-radius: 30px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
   
}

.card:hover{
  cursor:pointer;
  
}


.card-image{
transition: transform 2s cubic-bezier(0.25, 0.45, 0.45, 0.95);
}

.card:hover .card-image{
  transform: scale(1.1) rotate(2deg);
}



</style>