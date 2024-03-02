<template>
  <div class="home p-3 mt-3 scrollspy" id="content">
    <div class="router py-2">MANUAL TEST | GET_ORT_SN_EQID_BY_GROUP</div>
    <form class="col-md-12" method="post">
      <div class="title py-2">INPUT</div>
      <div class="d-flex justify-content-center p-0">
        <div class="col-md-6">
          <div class="mb-2">
            <label for="functionValue" class="form-label">FUNCTION:</label>
            <input type="text" id="functionValue" name="functionValue" class="form-control" v-model="functionValue">
          </div>
          <div class="mb-2">
            <label for="groupName" class="form-label">GROUP_NAME:</label>
            <input type="text" name="groupName" class="form-control" id="groupName" v-model="groupName">
          </div>
          <div class="mb-2">
            <label for="msgExpect" class="form-label">MESSAGE EXPECTED:</label>
            <input type="text" id="msgExpect" name="msgExpect" class="form-control" v-model="msgExpectValue">
          </div>
        </div>
        <div class="col-md-6 ms-2">
          <div class="mb-2">
            <label for="snListValue" class="form-label">SN_LIST:</label>
            <input type="text" name="snListValue" class="form-control" id="snListValue" v-model="snListValue">
          </div>
          <div class="mb-2">
            <label for="resultExpect" class="form-label">RESULT EXPECTED:</label>
            <input type="text" id="resultExpect" name="resultExpect" class="form-control" v-model="resultExpectValue">
          </div>
        </div>
      </div>
      <div class="col-md-12 res_data_container">
        <label for="resDataExpect" class="title">RES DATA EXPECTED:</label>
        <textarea id="resDataExpect" name="resDataExpect" class="form-control res_data_text scrollspy mb-0" v-model="resDataExpect"></textarea>
      </div>
      <button type="submit" class="btn btn-primary my-3 px-3" @click.prevent="callApi">
          <i class="bi bi-file-code-fill"></i> TEST
        </button>
      <button type="button" class="btn btn-success mx-3 my-3 px-3" @click="exportReport">
        <i class="bi bi-file-earmark-spreadsheet-fill"></i> EXPORT REPORT
      </button>
    </form>
    <div class="col-md-12 mt-3">
      <div class="title">RESULT:
        <span :style="{ color: result === 'OK' ? 'green' : 'red' }">{{ result }}</span>
      </div>
    </div>
    <div class="col-md-12 my-4">
      <div class="title">MESSAGE:
        <span class="msg">{{ message }}</span>
      </div>
    </div>
    <div class="col-md-12 res_data_container">
      <div class="title">RES DATA:</div>
      <pre class="res_data_text scrollspy">{{ JSON.stringify(resData, null, 2) }}</pre>
    </div>
    <div class="col-md-12 py-2">
      <div class="title">
        TEST CASE RESULT: 
        <span class="title_compare title" :style="{ color: result_compare === 'PASS' ? 'green' : 'red'}">
          {{ result_compare }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/manual_style.css';
import {writeFile, utils} from 'xlsx';
export default {
  name: 'GroupManualView', 
  data(){
    return {
      functionValue: '',
      snListValue: '',
      groupName: '',
      resultExpectValue: '',
      msgExpectValue: '',
      resDataExpect: null,
      result_compare: '',
      result: '',
      message: '',
      resData: null
    };
  },
  methods: {
    callApi(){
      const data = {
        Condition: {
          FUNCTION: this.functionValue,
          SN_LIST: this.snListValue,
          GROUP_NAME: this.groupName
        },
      };
      fetch('http://10.5.0.136:54188/MES_WEB_API/api/mesapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((respone) => respone.json())
      .then((data) => {
        this.resData = data.RESULT.RES_DATA;
        this.result = data.RESULT.RESULT;
        this.message = data.RESULT.RESULT_MESSAGE;
        this.compareResults();
      })
      .catch((error) => {
        console.log(error)
        this.result = 'Error';
        this.message = error.RESULT.RESULT_MESSAGE;
      });
    },
    compareResults() {
      let parsedResDataExpect;
      try {
        // Only parse resDataExpect if it has a value
        if (this.resDataExpect) {
          parsedResDataExpect = JSON.parse(this.resDataExpect);
        }
      } catch (error) {
        console.error('Invalid JSON input:', error);
        this.result_compare = 'FAIL';
        return;
      }

      if (
          // Compare msgExpectValue to message only if both have a value
          // If only one has a value, return 'FAIL'
          ((this.msgExpectValue && this.message && this.message.trim() === this.msgExpectValue.trim()) ||
          (!this.msgExpectValue && !this.message)) &&
          this.resultExpectValue.trim() === this.result.trim() &&
          // Compare resData to parsedResDataExpect only if both have a value
          // If only one has a value, return 'FAIL'
          ((this.resDataExpect && this.resData && JSON.stringify(this.resData) === JSON.stringify(parsedResDataExpect)) ||
          (!this.resDataExpect && !this.resData))) {
        this.result_compare = 'PASS';
      } else {
        this.result_compare = 'FAIL';
      } 
    },
    exportReport() {
      const data = [
        {
          INPUT: JSON.stringify({
            Condition: {
              FUNCTION: this.functionValue,
              SN_LIST: this.snListValue,
              GROUP_NAME: this.groupName
            }
          }),
          OUTPUT: JSON.stringify({
            RESULT: {
              RESULT: this.result,
              RESULT_MESSAGE: this.message,
              RES_DATA: this.resData
            }
          }),
          RESDATA_EXPECT: this.resDataExpect,
          RESULT_EXPECT: this.resultExpectValue,
          MESSAGE_EXPECT: this.msgExpectValue,
          RESULT_COMPARE: this.result_compare
        }
      ];
      if(data.length > 0){
        data.unshift({ 
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
        writeFile(workbook, "report_manual_group.xlsx");
      }else{
        alert("No Data to Export");
      }
    }
  }
}
</script>
