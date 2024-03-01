<template>
<nav class="p-3 d-flex align-items-center navbar navbar-expand-lg fixed-top" id="navbar_container">
    <img :src="require('@/assets/logo.png')" class="navbar-brand" alt="Logo">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <div class="nav-item dropdown">
          <div to="/" class="nav-link nav-item mx-1 dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Manual Test
          </div> 
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-for="sub_menu in sub_menu_manual" :key="sub_menu.name">
                <router-link :to="sub_menu.link" class="dropdown-item" >{{ sub_menu.name }}</router-link>
              </li>
            </ul>
        </div>
        <div class="nav-item dropdown">
          <div to="/" class="nav-link nav-item mx-1 dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Auto Test
          </div> 
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li v-for="sub_menu in sub_menu_auto" :key="sub_menu.name">
              <router-link :to="sub_menu.link" class="dropdown-item" >{{ sub_menu.name }}</router-link>
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <router-link to="/flexible_manual" class="nav-link nav-item mx-1">Flexible manual test</router-link>
        </div>
      </div>
    </div>
</nav>
  <router-view/>
</template>

<script>
export default{
  data(){
    return{
      sub_menu_manual: [
        {name: 'GET_ORT_SN_INFO_BY_LOCATION', link: '/'},
        {name: 'GET_ORT_SN_INFO_BY_APN', link: '/apn_manual'},
        {name: 'GET_ORT_SN_EQID_BY_GROUP', link: '/group_manual'},
      ],
      sub_menu_auto: [
        {name: 'GET_ORT_SN_INFO_BY_LOCATION', link: '/location_auto'},
        {name: 'GET_ORT_SN_INFO_BY_APN', link: '/apn_auto'},
        {name: 'GET_ORT_SN_EQID_BY_GROUP', link: '/group_auto'},
      ]
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  background-image: url('@/assets/bg.jpg');
  overflow: hidden;
  padding: 100px 50px;
}

#navbar_container{
  box-shadow: 0 4px 8px 0 rgba(77, 76, 76, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
}
#navbar_container .nav-link{
    text-decoration: none;
    font-size: 20px!important;
    color: #1C3096!important;  
    font-weight: bold; 
    text-transform: uppercase;
 }
 #navbar_container .nav-link:hover{
    color: #122459!important;
    background-color: #DDDDDD;
    border-radius: 10px;
 }
.navbar-nav a.router-link-exact-active{
  color: #122459!important;
  background-color: #DDDDDD;
  border-radius: 10px;
}
@media (max-width: 991px) {
  .nav-link {
    padding: 10px !important;
    margin-bottom: 5px;
  }
}
</style>
