<template>
  <div class="home p-3 mt-3" id="content">
    <div class="router py-3">MANUAL TEST | GET_ORT_SN_INFO_BY_LOCATION</div>
    <div class="col-md-12 d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="title">INPUT</div>
        <textarea type="text" cols="30" rows="10" class="input_test"></textarea>
      </div>
      <div class="col-md-6">
        <div class="title">OUTPUT</div>
        <textarea cols="30" rows="10" class="input_test"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView', 
  components: {
    
  }
}
</script>

<style scoped>
#content{
  background-color: white;
  border-radius: 20px;
}
.router{
  font-size: 15px;
  font-weight: bold;
  color: #1C3096;
}
.title{
  font-size: 20px;
  font-weight: bold;
  color: #1C3096;
}
.input_test{
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}
</style>
