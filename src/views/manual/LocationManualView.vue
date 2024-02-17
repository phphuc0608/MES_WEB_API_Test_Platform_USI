<template>
  <div class="home p-3 mt-3 scrollspy" id="content">
    <div class="router py-2">MANUAL TEST | GET_ORT_SN_INFO_BY_LOCATION</div>
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
            <label for="" class="form-label">LOCATION_LIST:</label>
            <input type="text" name="" class="form-control">
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary my-3 px-3">TEST</button>
      <button type="button" class="btn btn-success mx-3 my-3 px-3">EXPORT REPORT</button>
    </form>
    <!-- <div class="title py-2">RES DATA:</div>
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
    </div> -->
    <div class="col-md-12">
      <div class="title">RESULT:
        <span :style="{ color: result === 'OK' ? 'green' : 'red' }">{{ result }}</span>
      </div>
    </div>
    <div class="col-md-12 res_data_container">
      <div class="title">RES DATA:</div>
        <pre class="res_data_text">{{ JSON.stringify(res_data, null, 2) }}</pre>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HomeView', 
  data(){
    return {
      result: 'OK',
      res_data: [
        {						
          "NO": "1",						
          "PANEL_SN": "HA5026110207Y6",						
          "SERIAL_NUMBER": "HMH22730HAJ17PK5Z",						
          "MO_NUMBER": "1000112-VZR301",						
          "CONFIG": "VZR3",						
          "SN_SEQ": "1",						
          "LOCATION": "R2110",						
          "REEL_ID": "TC-0220623-2989",						
          "COMP_PART_NO": "107S00328-01",						
          "LOT_NO": "LM2111308",						
          "DATE_CODE": "20220422",						
          "VENDOR": "THIN FILM",						
          "APN": ""						
        },						
        {						
          "NO": "2",						
          "PANEL_SN": "HA5026110207Y6",						
          "SERIAL_NUMBER": "HMH22730HAM17PK5W",						
          "MO_NUMBER": "1000112-VZR301",						
          "CONFIG": "VZR3",						
          "SN_SEQ": "4",						
          "LOCATION": "R2110",						
          "REEL_ID": "TC-0220623-2989",						
          "COMP_PART_NO": "107S00328-01",						
          "LOT_NO": "LM2111308",						
          "DATE_CODE": "20220422",						
          "VENDOR": "THIN FILM",						
          "APN": ""						
        },						
        {						
          "NO": "3",						
          "PANEL_SN": "HA5026110207Y6",						
          "SERIAL_NUMBER": "HMH22730HAK17PK5Y",						
          "MO_NUMBER": "1000112-VZR301",						
          "CONFIG": "VZR3",						
          "SN_SEQ": "2",						
          "LOCATION": "R2110",						
          "REEL_ID": "TC-0220623-2989",						
          "COMP_PART_NO": "107S00328-01",						
          "LOT_NO": "LM2111308",						
          "DATE_CODE": "20220422",						
          "VENDOR": "THIN FILM",						
          "APN": ""						
        }						
      ]
    }
  },
}
</script>

<style scoped>
#content{
  background-color: white;
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
.scrollspy {
    position: relative;
    height: 510px;
    margin-top: .5rem;
    overflow: auto;
}
.res_data_container{
    border: 1px solid #1E1E1E;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
  }
</style>
