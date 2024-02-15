<template>
  <div class="home p-3 mt-3" id="content">
    <div class="router py-2">MANUAL TEST | GET_ORT_SN_EQID_BY_APN</div>
    <form class="col-md-12">
      <div class="title py-2">INPUT</div>
      <div class="d-flex justify-content-center p-0">
        <div class="col-md-6">
          <div class="mb-2">
            <label for="" class="form-label">FUNCTION:</label>
            <input type="text" name="" class="form-control">
          </div>
          <div >
            <label for="" class="form-label">SN_LIST:</label>
            <input type="text" name="" class="form-control">
          </div>
        </div>
        <div class="col-md-6 ms-2">
          <div class="mb-2">
            <label for="" class="form-label">APN_LIST:</label>
            <input type="text" name="" class="form-control">
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary my-3 px-3">TEST</button>
    </form>
    <div class="title py-2">OUTPUT</div>
    <div id="result_table" class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped table-bordered custom-width">
          <thead>
            <tr>
              <th>NO</th>
              <th>PANEL_SN</th>
              <th>SERIAL_NUMBER</th>
              <th>MO_NUMBER</th>
              <th>CONFIG</th>
              <th>SN_SEQ</th>
              <th>LOCATION</th>
              <th>REEL_ID</th>
              <th>COMP_PART_NO</th>
              <th>LOT_NO</th>
              <th>DATE_CODE</th>
              <th>VENDOR</th>
              <th>APN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>HA5026110207Y6</td>
              <td>HMH22730HAJ17PK5Z</td>
              <td>1000112-VZR301</td>
              <td>VZR3</td>
              <td>1</td>
              <td>R2110</td>
              <td>TC-0220623-2989</td>
              <td>107S00328-01</td>
              <td>LM2111308</td>
              <td>20220422</td>
              <td>THIN FILM</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView', 
  data(){
    return {
      input: []
    }
  },
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

.form-control{
border: 1px black solid!important;;
}
</style>
