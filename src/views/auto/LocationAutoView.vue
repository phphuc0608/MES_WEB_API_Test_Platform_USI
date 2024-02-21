<template>
    <div class="home p-3 mt-3 scrollspy" id="content">
      <div class="router py-2">AUTO TEST | GET_ORT_SN_INFO_BY_LOCATION</div>
      <form class="col-md-12">
        <button type="button" class="btn btn-primary my-3 px-3">
          <i class="bi bi-file-code-fill"></i> TEST
        </button>
        <button type="button" class="btn btn-success mx-3 my-3 px-3">
          <i class="bi bi-file-earmark-spreadsheet-fill"></i> EXPORT REPORT
        </button>
        <div v-for="test_case in test_cases" :key="test_case.id" class="mb-2 test_case_container">
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
                <span :style="{ color: test_case.result_expect === 'OK' ? 'green' : 'red' }">
                  {{ test_case.result_expect }}
                </span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="output my-3 text-left">RESULT:
                <span :style="{ color: test_case.result === 'OK' ? 'green' : 'red' }">
                  {{ test_case.result }}
                </span>
              </div>
            </div>
          </div>
          <div class="result d-flex align-items-center">
            <div class="col-md-6">
              <div class="output">MESSAGE EXPECTED:
                <span class="msg">{{ test_case.msg_expect }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="output">MESSAGE:
                <span class="msg">{{ test_case.msg }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12 res_data_container">
            <div class="title">RES DATA:</div>
            <pre class="res_data_text scrollspy mb-0" style="height: 200px!important;">{{ JSON.stringify(test_case.RES_DATA, null, 2) }}</pre>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import '@/assets/css/auto_style.css'
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
            msg_expect:'',
            msg:'',				
          },
          {
            id: 2,
            title: 'TEST CASE 2',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: 'HMH22730HAJ17PK5Z,HMH22730HAM17PK5W,HMH22730HAK17PK5Y',
            location_list: '',
            result_expect:'OK',
            result:'OK',
            msg_expect:'',
            msg:'',
          },
          {
            id: 3,
            title: 'TEST CASE 3',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: 'HMH403403KC1W49AU;HMH403403HG1W49AW;HMH403403K91W49AX',
            location_list: 'R2110,X2339S',
            result_expect:'OK',
            result:'OK',
            msg_expect:'',
            msg:'',
          },
          {
            id: 4,
            title: 'TEST CASE 4',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'',
            location_list: '',
            result_expect:'OK',
            result:'OK',
            msg_expect:'',
            msg:'',
          },  
          {
            id: 5,
            title: 'TEST CASE 5',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'HMH22730HAJ17PK5Z,HMH22730HAM17PK5W,HMH22730HAK17PK5Y',
            location_list: 'R2110,PCB',
            result_expect:'NG',
            result:'NG',
            msg_expect:'Can not found Function ST, please contact IT SFIS to check!',
            msg:'Can not found Function ST, please contact IT SFIS to check!',
          },  
          {
            id: 6,
            title: 'TEST CASE 6',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'HMH403403KC1W49AU',
            location_list: 'R2110,X2339S',
            result_expect:'OK',
            result:'OK',
            msg_expect:'',
            msg:'',
            RES_DATA:					
            {
              "NO":"1",
              "PANEL_SN":"SA483B26C0000P",
              "SERIAL_NUMBER":"HMH403403KC1W49AU",
              "MO_NUMBER":"1002991-VYJ105",
              "CONFIG":"VYJ1","SN_SEQ":"19",
              "LOCATION":"R2110",
              "REEL_ID":"TC-0240109-0374",
              "COMP_PART_NO":"118S00212-02",
              "LOT_NO":"38M4816071",
              "DATE_CODE":"2350",
              "VENDOR":"YAGEO",
              "APN":"118S00212"
            }						
          }  
        ]
      }
    },
  }
  </script>