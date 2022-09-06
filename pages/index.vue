<template>
  <div>
    <h1 class="text-center">DDL Tool</h1>
    <div class="container">
      <section class="sidebar-left">
        <div class="history-table">
          <h2 class="title-table">HISTORY TABLE</h2>
          <div class="table">
            <table id="customers">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Ver.</th>
                  <th>Date</th>
                  <th>Table Name</th>
                  <th>Table Define Name</th>
                  <th>History</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1.0</td>
                  <td>30/08/2022</td>
                  <td>Acount</td>
                  <td>Acount</td>
                  <td>&#9744;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="space"></div>
        <div class="detail-table">
          <h2 class="title-table">DETAIL TABLE</h2>
          <div class="table">
            <div class="detail-information align-center mb-5">
              <p class="mb-0">
                <strong>Table:</strong> Account
                <span><strong>Version:</strong> 1.0</span>
              </p>
              <div class="button-table d-flex">
                <div class="button w-16"><span>Save</span></div>
                <div class="icon-enabled d-flex align-center">
                  <p class="mb-0 ml-2 mr-2"><strong>Edit</strong></p>
                  <v-switch v-model="switch1" class="py-0 my-0"></v-switch>
                </div>
              </div>
            </div>
            <table id="customers">
              <thead>
                <tr>
                  <th>COLUMN NAME</th>
                  <th>DATA TYPE</th>
                  <th>SIZE</th>
                  <th>KEY</th>
                  <th>ALLOW NULL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Account</td>
                  <td>varchar</td>
                  <td>50</td>
                  <td>&#9744;</td>
                  <td>&#9744;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="sidebar-right">
        <div class="upload-file">
          <h2 class="title-upload">Upload File</h2>
          <div class="border-upload">
            <input
              id="input"
              type="file"
              name="excel"
              class="display-none"
              @change="readFile"
            />
            <label for="input">
              <div class="img-upload">
                <img src="/images/upload-icon.png" alt="Upload" />
              </div>
              <p>Drop or Drap file here</p>
              <small>File format: xlsx, xls</small>
              <div class="button mx-auto mt-20 w-200">BROWSE</div>
              <P>Maximun size: 10MB</P>
            </label>
          </div>
        </div>
        <div class="save-table">
          <div class="block-input">
            <v-text-field
              label="SCHEMA名"
              hide-details="auto"
              class="mb-6"
            ></v-text-field>
            <div class="row">
              <div class="col-md-6">
                <h2>共通項目</h2>
                <v-radio-group v-model="radioGroup">
                  <v-radio :label="`使用`" value="1"></v-radio>
                  <v-radio :label="`未使用`" value="0"></v-radio>
                </v-radio-group>
              </div>
              <div class="col-md-6">
                <h2>TBL存在チェック</h2>
                <v-radio-group v-model="radioGroup">
                  <v-radio :label="`必要`" value="1"></v-radio>
                  <v-radio :label="`不要`" value="0"></v-radio>
                </v-radio-group>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { readSheetNames } from 'read-excel-file/index.js'
import readXlsxFile from 'read-excel-file'
export default {
  layout: 'default',
  //
  data() {
    return {
      switch1: false,
      sheetNames: [],
    }
  },
  methods: {
    async readFile() {
      const input = document.getElementById('input')

      await readSheetNames(input.files[0]).then((sheetNames) => {
        this.sheetNames = sheetNames
      })
      this.sheetNames.forEach((element) => {
        readXlsxFile(input.files[0], { sheet: element }).then((rows) => {
          console.log(rows)
        })
      })
    },
  },
}
</script>

<style lang="scss">
.container {
  justify-content: space-between;
}

.space {
  height: 20px;
}

.w-200 {
  width: 200px;
}

.table {
  border: 1px solid #8ea8bf;
  border-radius: 20px;
  padding: 20px 10px;
  padding-right: 0;
}

.border-upload {
  text-align: center;
  border: 1px dashed #8ea8bf;
  border-radius: 20px;
  padding: 20px 10px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #8ea8bf;
  color: black;
}

.container {
  display: flex;
}
.sidebar-left {
  width: 60%;
}
.sidebar-right {
  width: 30%;
}
.title-table {
  text-align: left;
}

.display-none {
  display: none;
}

.sidebar-right .upload-file .img-upload img {
  width: 50px;
}

.button {
  background-color: #13aa52;
  border: 1px solid #13aa52;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: 'Akzidenz Grotesk BQ Medium', -apple-system, BlinkMacSystemFont,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-37:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .button-37 {
    padding: 10px 30px;
  }
}

.mt-20 {
  margin-top: 20px;
}

.detail-table {
  .table {
    .detail-information {
      display: flex;
      justify-content: space-between;
      .v-input__slot {
        margin: 0;
      }
      .v-messages {
        display: none;
      }
    }
  }
}
</style>
