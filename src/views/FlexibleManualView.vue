<template>
<div class="home p-3 mt-3 scrollspy" id="content">
    <div class="router py-2">MANUAL TEST | FLEXIBLE MANUAL TEST</div>
    <form class="col-md-12" :method="selectedMethod">
      <div class="title py-2">INPUT</div>
      <div class="d-flex justify-content-center p-0">
        <div class="col-md-6">
            <div class="mb-2 p-2">
                <label for="APIVal" class="form-label">API:</label>
                <input type="text" id="APIVal" name="APIVal" class="form-control" v-model="APIVal">
            </div>
        </div>
        <div class="col-md-6">
            <div class="mb-2 p-2">
                <label for="methodSelect" class="form-label">METHOD:</label>
                <select id="methodSelect" class="form-select form-control" v-model="selectedMethod">
                    <option v-for="methodListItem in methodList" :key="methodListItem.name" :value="methodListItem.value">{{ methodListItem.name }}</option>
                </select>
            </div>
        </div>
      </div>
      <div class="col-md-12 res_data_container">
        <label for="inputJSON" class="title">INPUT WITH JSON FORMAT:</label>
        <textarea id="inputJSON" name="inputJSON" style="height: 220px;" class="form-control res_data_text scrollspy mb-0" v-model="inputJSON"></textarea>
      </div>
      <div class="col-md-12 res_data_container">
        <label for="outputExpect" class="title">OUTPUT EXPECTED:</label>
        <textarea id="outputExpect" name="outputExpect" style="height: 220px;" class="form-control res_data_text scrollspy mb-0" v-model="outputExpect"></textarea>
      </div>
      <div class="title py-2">OUTPUT</div>
      <div class="col-md-12 res_data_container">
        <pre class="res_data_text scrollspy" >{{ JSON.stringify(outputAPI, null, 2) }}</pre>
      </div>
      <button type="submit" class="btn btn-primary my-3 px-3" @click.prevent="callApi">
          <i class="bi bi-file-code-fill"></i> TEST
        </button>
      <button type="button" class="btn btn-success mx-3 my-3 px-3" @click="exportReport">
        <i class="bi bi-file-earmark-spreadsheet-fill"></i> EXPORT REPORT
      </button>
    </form>
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
import { writeFile, utils } from 'xlsx';
export default {
  data(){
    return{
      APIVal: '',
      methodList: [
        {
            name: 'GET',
            value: 'GET'
        },
        {
            name: 'POST',
            value: 'POST'
        },
        {
            name: 'PUT',
            value: 'PUT'
        },
        {
            name: 'DELETE',
            value: 'DELETE'
        }
      ],
      APIVal: '',
      inputJSON: '',
      outputAPI: null,
      selectedMethod: 'GET',
      outputExpect: '',
      result_compare: ''
    }
  },
  methods: {
    async callApi(){
        fetch(this.APIVal, {
            method: this.selectedMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: this.inputJSON 
        })
        .then(response => response.json())
        .then(data => {
            this.outputAPI = data;
            this.compareResults();
        })
        .catch(error => {
            console.error(error);
            this.result_compare = 'Error';
        });
    },
    compareResults(){
        let parsedOutputExpect;
        try {
            // Only parse outputExpect if it has a value
            if (this.outputExpect) {
                parsedOutputExpect = JSON.parse(this.outputExpect);
            }
        } catch (error) {
            console.error(error);
            this.result_compare = 'Error';
            return;
        }
        if (JSON.stringify(this.outputAPI) === JSON.stringify(parsedOutputExpect)) {
            this.result_compare = 'PASS';
        } else {
            this.result_compare = 'FAIL';
        }
    },
    exportReport() {
        const data = [
            {
                LINKAPI: this.APIVal,
                INPUT: this.inputJSON,
                // Change outputAPI to JSON format because outputAPI is an Object -> xlsx can not convert this object to a format Excel can understand.
                OUTPUT_API: JSON.stringify(this.outputAPI), 
                OUTPUT_EXPECT: this.outputExpect,
                RESULT_COMPARE: this.result_compare
            }
        ];
      if(data.length > 0){
        data.unshift({ 
          LINKAPI: 'Link API',
          INPUT: 'INPUT',
          OUTPUT_API: 'OUTPUT API',
          OUTPUT_EXPECT: 'OUTPUT EXPECT',
          RESULT_COMPARE: 'RESULT COMPARE',
          RESULT_COMPARE: 'Testcase results'
        });
        console.log(data);
        const worksheet = utils.json_to_sheet(data, { skipHeader: true });
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Report");
        writeFile(workbook, "report_API_test.xlsx");
      }else{
        alert("No Data to Export");
      }
    }
  }
}
</script>