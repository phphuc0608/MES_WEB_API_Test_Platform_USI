<template>
    <div class="home p-3 mt-3 scrollspy" id="content">
      <div class="router py-2">AUTO TEST | GET_ORT_SN_INFO_BY_LOCATION</div>
      <form class="col-md-12" method="post">
        <button type="submit" class="btn btn-primary my-3 px-3" @click.prevent="callApi">
          <i class="bi bi-file-code-fill"></i> TEST
        </button>
        <button type="button" class="btn btn-success mx-3 my-3 px-3" @click="exportReport">
          <i class="bi bi-file-earmark-spreadsheet-fill"></i> EXPORT REPORT
        </button>
        <div v-for="test_case in test_cases" :key="test_case.id" class="mb-2 test_case_container">
          <div class="title py-2">{{ test_case.title }} - {{ test_case.description }}</div>
          <div class="d-flex justify-content-center p-0">
            <div class="col-md-6">
              <div class="mb-2">
                <label for="" class="form-label">FUNCTION:</label>
                <input type="text" name="" class="form-control function_input" v-model="test_case.function" readonly>
              </div>
              <div >
                <label for="" class="form-label">SN_LIST:</label>
                <input type="text" name="" class="form-control sn_input" v-model="test_case.sn_list" readonly>
              </div>
            </div>
            <div class="col-md-6 ms-2">
              <div class="mb-2">
                <label for="" class="form-label">LOCATION_LIST:</label>
                <input type="text" name="" class="form-control location_input" v-model="test_case.location_list" readonly>
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
              <div class="output my-3 text-left">RESULT CONNECTION:
                <span :style="{ color: test_case.result_result === 'OK' ? 'green' : 'red' }">
                  {{ test_case.result_result }}
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
              <div class="output">MESSAGE CONNECTION:
                <span class="msg">{{ test_case.message_result }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12 res_data_container">
            <div class="title">RES DATA EXPECTED:</div>
            <pre class="res_data_text scrollspy mb-0" style="height: 200px!important;">{{ JSON.stringify(test_case.resData_expect, null, 2) }}</pre>
          </div>
          <div class="col-md-12 res_data_container">
            <div class="title">RES DATA CONNECTION:</div>
            <pre class="res_data_text scrollspy mb-0" style="height: 200px!important;">{{ JSON.stringify(test_case.resData_result, null, 2) }}</pre>
          </div>
          <div class="col-md-12 py-2">
            <div class="title">
              TEST CASE RESULT: 
              <span class="title_compare title" :style="{ color: test_case.result_compare === 'PASS' ? 'green' : 'red'}">
                {{ test_case.result_compare }}
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import '@/assets/css/auto_style.css';
  import { writeFile, utils } from 'xlsx';

  export default {
    name: 'HomeView', 
    data(){
      return {
        test_cases: [
          {
            id: 1,
            title: 'TEST CASE 1',
            description:'LOCATION_LIST is empty',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: 'HMH403403KC1W49AU,HMH403403HG1W49AW,HMH403403K91W49AX',
            location_list: '',
            result_expect:'NG',
            msg_expect:'LOCATION_LIST is null',
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,			
          },
          {
            id: 2,
            title: 'TEST CASE 2',
            description:'SN_LIST is empty',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: '',
            location_list: 'R2110,X2339S',
            result_expect:'NG',
            msg_expect:'SN_LIST is null',
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,
          },
          {
            id: 3,
            title: 'TEST CASE 3',
            description:'SN_LIST is not separated with commas (,) but semicolon (;)',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list: 'HMH403403KC1W49AU;HMH403403HG1W49AW;HMH403403K91W49AX',
            location_list: 'R2110,X2339S',
            result_expect:'NG',
            msg_expect:'Syntax error at SN_LIST',
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,
          },
          {
            id: 4,
            title: 'TEST CASE 4',
            description: 'SN_LIST is not separated with commas (,)',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'HMH403403KC1W49AUHMH403403HG1W49AWHMH403403K91W49AX',
            location_list: 'R2110,X2339S',
            result_expect: 'NG',
            msg_expect: 'Syntax error at SN_LIST',
            message_result:'',
            result_result:'',
            resData_result: null,
          },
          {
            id: 5,
            title: 'TEST CASE 5',
            description:'SN_LIST and LOCATION_LIST are empty',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'',
            location_list: '',
            result_expect:'NG',
            msg_expect:'SN_LIST and LOCATION_LIST is null',
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,
          },  
          {
            id: 6,
            title: 'TEST CASE 6',
            description:'Wrong FUNCTION name',
            function: 'GET_ORT_SN_INFO_BY_LOCATIO',
            sn_list:'HMH22730HAJ17PK5Z,HMH22730HAM17PK5W,HMH22730HAK17PK5Y',
            location_list: 'R2110,PCB',
            result_expect:'NG',
            msg_expect:'Can not found Function ST, please contact IT SFIS to check!',
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,
          },   
          {
            id: 7,
            title: 'TEST CASE 7',
            description: 'LOCATION_LIST and SN_LIST are normal',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'HMH403403KC1W49AU,HMH403403HG1W49AW,HMH403403K91W49AX',
            location_list: 'R2110,X2339S',
            result_expect:'OK',
            msg_expect:'',		
            resData_expect: 
            [
              {
                  "NO": "1",
                  "PANEL_SN": "SA483B26C0000R",
                  "SERIAL_NUMBER": "HMH403403HG1W49AW",
                  "MO_NUMBER": "1002991-VYJ105",
                  "CONFIG": "VYJ1",
                  "SN_SEQ": "3",
                  "LOCATION": "R2110",
                  "REEL_ID": "TC-0240109-0374",
                  "COMP_PART_NO": "118S00212-02",
                  "LOT_NO": "38M4816071",
                  "DATE_CODE": "2350",
                  "VENDOR": "YAGEO",
                  "APN": "118S00212"
              },
              {
                  "NO": "2",
                  "PANEL_SN": "SA483B26C0000P",
                  "SERIAL_NUMBER": "HMH403403K91W49AX",
                  "MO_NUMBER": "1002991-VYJ105",
                  "CONFIG": "VYJ1",
                  "SN_SEQ": "16",
                  "LOCATION": "R2110",
                  "REEL_ID": "TC-0240109-0374",
                  "COMP_PART_NO": "118S00212-02",
                  "LOT_NO": "38M4816071",
                  "DATE_CODE": "2350",
                  "VENDOR": "YAGEO",
                  "APN": "118S00212"
              },
              {
                  "NO": "3",
                  "PANEL_SN": "SA483B26C0000P",
                  "SERIAL_NUMBER": "HMH403403KC1W49AU",
                  "MO_NUMBER": "1002991-VYJ105",
                  "CONFIG": "VYJ1",
                  "SN_SEQ": "19",
                  "LOCATION": "R2110",
                  "REEL_ID": "TC-0240109-0374",
                  "COMP_PART_NO": "118S00212-02",
                  "LOT_NO": "38M4816071",
                  "DATE_CODE": "2350",
                  "VENDOR": "YAGEO",
                  "APN": "118S00212"
              }
            ],
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,			
          },
          {
            id: 8,
            title: 'TEST CASE 8',
            description: 'LOCATION_LIST is not separated with commas (,)',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'HMH403403KC1W49AU,HMH403403HG1W49AW,HMH403403K91W49AX',
            location_list: 'R2110X2339S',
            result_expect:'NG',
            msg_expect:'Syntax error at LOCATION_LIST',
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,
          },
          {
            id: 9,
            title: 'TEST CASE 9',
            description: 'LOCATION_LIST is not separated with commas (,) but semicolon (;)',
            function: 'GET_ORT_SN_INFO_BY_LOCATION',
            sn_list:'HMH403403KC1W49AU,HMH403403HG1W49AW,HMH403403K91W49AX',
            location_list: 'R2110;X2339S',
            result_expect:'NG',
            msg_expect:'Syntax error at LOCATION_LIST',
            result_compare: '',
            message_result: '',
            result_result: '',
            resData_result: null,
          }
        ]
      }
    },
    methods: {
      async callApi() {
        for (let i = 0; i < this.test_cases.length; i++) {
          const testCase = this.test_cases[i];
          let functionValue = testCase.function;
          let sn_list = testCase.sn_list;
          let location_list = testCase.location_list;
          const data = {
            Condition: {
              FUNCTION: functionValue,
              SN_LIST: sn_list,
              LOCATION_LIST: location_list
            },
          };
          console.log(data);
          try {
            const response = await fetch('http://10.5.0.136:54188/MES_WEB_API/api/mesapi', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            const responseData = await response.json();
            let resData_val = responseData.RESULT.RES_DATA;
            let result_val = responseData.RESULT.RESULT;
            let message_val = responseData.RESULT.RESULT_MESSAGE;
            testCase.message_result = message_val;
            testCase.result_result = result_val;
            testCase.resData_result = resData_val;
            console.log(responseData)
          } catch (error) {
            console.error(error);
            testCase.result_result = 'Error';
            testCase.message_result = error.RESULT.RESULT_MESSAGE;
          }
          this.compareResults();
          functionValue = '';
          sn_list = '';
          location_list = '';
        }
      },
      compareResults() {
        this.test_cases.forEach(testCase => {
          if (testCase.message_result === testCase.msg_expect &&
              testCase.result_result === testCase.result_expect &&
              JSON.stringify(testCase.resData_result) === JSON.stringify(testCase.resData_expect)) {
            testCase.result_compare = 'PASS';
          } else {
            testCase.result_compare = 'FAIL';
          }
        });
      },
      exportReport() {
        const data = [];
        this.test_cases.forEach(testCase => {
          data.push({
            ID: testCase.id,
            DESCRIPTION: testCase.description,
            INPUT: JSON.stringify({
              Condition: {
                FUNCTION: testCase.function,
                SN_LIST: testCase.sn_list,
                LOCATION_LIST: testCase.location_list
              }
            }),
            OUTPUT: JSON.stringify({
              RESULT: {
                RESULT: testCase.result_result,
                RESULT_MESSAGE: testCase.message_result,
                RES_DATA: testCase.resData_result
              }
            }),
            RESDATA_EXPECT: testCase.resData_expect,
            RESULT_EXPECT: testCase.result_expect,
            MESSAGE_EXPECT: testCase.msg_expect,
            RESULT_COMPARE: testCase.result_compare
          });
        });

        if (data.length > 0) {
          data.unshift({
            ID: "ID",
            DESCRIPTION: "Description",
            INPUT: "INPUT",
            OUTPUT: "OUTPUT",
            RESDATA_EXPECT:"RESDATA EXPECT", 
            RESULT_EXPECT: "RESULT EXPECT",          
            MESSAGE_EXPECT: "MESSAGE EXPECT",
            RESULT_COMPARE: "Testcase results"
          });

          const worksheet = utils.json_to_sheet(data, { skipHeader: true });
          const workbook = utils.book_new();
          utils.book_append_sheet(workbook, worksheet, "Report");
          writeFile(workbook, "report_auto_location.xlsx");
        } else {
          alert("No Data to Export");
        }
      },
    }
  }
  </script>