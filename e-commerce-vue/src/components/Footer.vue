 <template>
  <!-- Footer -->
  <footer class="bg-white text-white">
    <div class="container py-5">
      <div class="row py-4">
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h1 class="title text-white">🔥HYPETALK</h1>  
          <p class="font-italic  text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          <ul class="list-inline mt-4 text-white">
            <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fab fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fab fa-facebook"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fab fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fab fa-pinterest"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fab fa-vimeo"></i></a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="text-uppercase font-weight-bold mb-4">Shop</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><a href="#" class="text-white">For Women</a></li>
            <li class="mb-2"><a href="#" class="text-white">For Men</a></li>
            <li class="mb-2"><a href="#" class="text-white">Stores</a></li>
            <li class="mb-2"><a href="#" class="text-white">Our Blog</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="text-uppercase font-weight-bold mb-4">Company</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><a href="#" class="text-white">Login</a></li>
            <li class="mb-2"><a href="#" class="text-white">Register</a></li>
            <li class="mb-2"><a href="#" class="text-white">Wishlist</a></li>
            <li class="mb-2"><a href="#" class="text-white">Our Products</a></li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-6 mb-lg-0">
          <h6 class="text-uppercase font-weight-bold mb-4">Newsletter</h6>
          <p class="text-white mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</p>
          <div class="p-1 rounded border">
            <div class="input-group">
              <input type="email" placeholder="Enter your email address" aria-describedby="button-addon1" class="form-control border-0 shadow-0">
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link"><i class="fa fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyrights -->
    <div class="bg-dark py-4">
      <div class="container text-center">
        <p class="text-white mb-0 py-2">©🔥HYPETALK All rights reserved.</p>
      </div>
    </div>
  </footer>
  <!-- End -->


    
</template>
<script>
export default {
    name:'Footer'
}
</script>

<style scoped>
  *{
    font-family: 'Montserrat', sans-serif;
    color: white;
   }
  footer{
    background: #de6161;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2657eb, #de6161);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2657eb, #de6161); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    margin-top: 50px;
  }
</style>