<template>
    <div class="home p-3 mt-3 scrollspy" id="content">
      <div class="router py-2">AUTO TEST | GET_ORT_SN_INFO_BY_LOCATION</div>
      <form class="col-md-12">
        <button type="button" class="btn btn-primary my-3 px-3">TEST</button>
        <button type="button" class="btn btn-success mx-3 my-3 px-3">EXPORT REPORT</button>
        <div v-for="test_case in test_cases" :key="test_case.id" class="mb-2">
          <div class="title py-2">{{ test_case.title }}</div>
          <div class="d-flex justify-content-center p-0">
            <div class="col-md-6">
              <div class="mb-2">
                <label for="" class="form-label">FUNCTION:</label>
                <input type="text" name="" class="form-control" :value="test_case.function" readonly>
              </div>
              <div >
                <label for="" class="form-label">SN_LIST:</label>
                <input type="text" name="" class="form-control" :value="test_case.sn_list" readonly>
              </div>
            </div>
            <div class="col-md-6 ms-2">
              <div class="mb-2">
                <label for="" class="form-label">LOCATION_LIST:</label>
                <input type="text" name="" class="form-control" :value="test_case.location_list" readonly>
              </div>
            </div>
          </div>
          <div class="result d-flex align-items-center">
            <div class="col-md-6">
              <div class="output my-3">RESULT EXPECTED: 
                <span :style="{ color: test_case.result_expect === 'OK' ? 'green' : 'red' }">{{ test_case.result_expect }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="output my-3 text-left">RESULT:
                <span :style="{ color: test_case.result === 'OK' ? 'green' : 'red' }">{{ test_case.result }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12 res_data_container">
            <div class="title">RES DATA:</div>
            <pre class="res_data_text">{{ JSON.stringify(test_case.RES_DATA, null, 2) }}</pre>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  export default {
    name: 'HomeView', 
    data(){
      return {
        test_cases: [
          {
            id: 1,
            title: 'TEST CASE 1',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: 'HMH22730HAJ17PK5Z,HMH22730HAM17PK5W,HMH22730HAK17PK5Y',
            location_list: 'R2110,PCB',
            result_expect:'OK',
            result:'OK',
            RES_DATA:[						
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
          },
          {
            id: 2,
            title: 'TEST CASE 2',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: 'HMH22730HAJ17PK5Z,HMH22730HAM17PK5W,HMH22730HAK17PK5Y',
            location_list: '',
            result_expect:'OK',
            result:'OK'
          },
          {
            id: 3,
            title: 'TEST CASE 3',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: 'HMH403403KC1W49AU;HMH403403HG1W49AW;HMH403403K91W49AX',
            location_list: 'R2110,X2339S',
            result_expect:'OK',
            result:'OK'
          },
          {
            id: 4,
            title: 'TEST CASE 4',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'',
            location_list: '',
            result_expect:'OK',
            result:'OK'
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
  .output{
    font-size: 20px;
    font-weight: bold;
    color: #272e53;
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
  