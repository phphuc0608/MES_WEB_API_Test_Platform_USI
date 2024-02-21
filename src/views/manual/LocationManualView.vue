<template>
  <div class="home p-3 mt-3 scrollspy" id="content">
    <div class="router py-2">MANUAL TEST | GET_ORT_SN_INFO_BY_LOCATION</div>
    <form class="col-md-12" method="post">
      <div class="title py-2">INPUT</div>
      <div class="d-flex justify-content-center p-0">
        <div class="col-md-6">
          <div class="mb-2">
            <label for="functionValue" class="form-label">FUNCTION:</label>
            <input type="text" id="functionValue" name="functionValue" class="form-control" v-model="functionValue">
          </div>
          <div class="mb-2">
            <label for="locationListValue" class="form-label">LOCATION_LIST:</label>
            <input type="text" id="locationListValue" name="locationListValue" class="form-control" v-model="locationListValue">
          </div>
        </div>
        <div class="col-md-6 ms-2">
          <div class="mb-2">
            <label for="snListValue" class="form-label">SN_LIST:</label>
            <input type="text" id="snListValue" name="snListValue" class="form-control" v-model="snListValue">
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary my-3 px-3" @click.prevent="callApi">
        <i class="bi bi-file-code-fill"></i> TEST
      </button>
      <button type="button" class="btn btn-success mx-3 my-3 px-3" @click="exportReport">
        <i class="bi bi-file-earmark-spreadsheet-fill"></i> EXPORT REPORT
      </button>
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
    <div class="col-md-12 my-4">
      <div class="title">MESSAGE:
        <span class="msg">{{ message }}</span>
      </div>
    </div>
    <div class="col-md-12 res_data_container">
      <div class="title">RES DATA:</div>
        <pre class="res_data_text scrollspy">{{ JSON.stringify(resData, null, 2) }}</pre>
      </div>
    </div>
</template>

<script>
import '@/assets/css/manual_style.css'
import { writeFile, utils } from 'xlsx';

export default {
  name: 'LocationManualView',
  data() {
    return {
      functionValue: '',
      snListValue: '',
      locationListValue: '',
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
          LOCATION_LIST : this.locationListValue
        },
      };
      // console.log(data);
      fetch('http://10.5.0.136:54188/MES_WEB_API/api/mesapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          this.resData = data.RESULT.RES_DATA; // Assign the response data to resData
          this.result = data.RESULT.RESULT; // Assign the result to result
          this.message = data.RESULT.RESULT_MESSAGE; // Assign the message to message
        })
        .catch((error) => {
          console.error(error);
          this.result = 'Error'; // Assign 'Error' to result in case of an error
          this.message = error.RESULT.RESULT_MESSAGE; // Assign the error message to message
        });
    },
    exportReport() {
      // Create an array of objects, each object contains input and output
      const data = [
        {
          INPUT: JSON.stringify({
            Condition: {
              FUNCTION: this.functionValue,
              SN_LIST: this.snListValue,
              LOCATION_LIST: this.locationListValue
            }
          }),
          OUTPUT: JSON.stringify({
            RESULT: {
              RESULT: this.result,
              RESULT_MESSAGE: this.message,
              RES_DATA: this.resData
            }
          })
        }
      ];

      // Add headers to the data array
      data.unshift({ INPUT: "INPUT", OUTPUT: "OUTPUT" });

      // Convert the array of objects to a worksheet
      const worksheet = utils.json_to_sheet(data, { skipHeader: true });

      // Create a new workbook
      const workbook = utils.book_new();
      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Report");
      // Write the workbook to a file
      writeFile(workbook, "report.xlsx");
    }
  }
};
</script>
