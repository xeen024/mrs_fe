<template>
  <div>
    <div v-if="displayChart">
      <Pie :data="chart_data" :options="options"/>
    </div>
    <div class="count--data-wrapper">
      <div class="count--data-content">
        <div class="count--data-box">
          <div class="count--data-title">
            PATIENTS
          </div>
          <div class="count--data-number">
            {{ no_of_patients }}
          </div>
        </div>
      </div>
      <div class="count--data-content">
        <div class="count--data-box">
          <div class="count--data-title">
            MEDICAL RECORDS
          </div>
          <div class="count--data-number">
            {{ no_of_medical_records }}
          </div>
        </div>
      </div>
      <div class="count--data-content">
        <div class="count--data-box">
          <div class="count--data-title">
            USERS
          </div>
          <div class="count--data-number">
            {{ no_of_users }}
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
const apiUrl = 'http://127.0.0.1:8000/api/'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
// import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DashboardView',
  mounted(){
      this.countPatientsPerBrgy()
    },
  components: {
    Pie
  },
  data() {
    return {
      displayChart: false,
      no_of_medical_records : 0,
      no_of_patients : 0,
      no_of_users : 0,
      chart_data: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#800000', '#9A6324', '#808000', '#469990', '#000075','#000000','#e6194B','#f58231','#ffe119','#bfef45',
            '#3cb44b','#42d4f4','#4363d8','#911eb4','#f032e6','#fabed4','#ffd8b1','#fffac8','#ffffff'],
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
      
    }
  },
  
  methods: {
    countPatientsPerBrgy(){
      console.log('chart_data_return', this.chart_data);
      axios.get(apiUrl+'count_patients_per_brgy').then(response=>{
          console.log('response', response);
          if (response.data?.result) {
            this.chart_data.labels = response.data?.result.labels
            this.chart_data.datasets[0].data = response.data?.result.count_of_brgys

            this.no_of_medical_records = response.data?.result.no_of_medical_records
            this.no_of_patients = response.data?.result.no_of_patients
            this.no_of_users = response.data?.result.no_of_users
          }
          console.log('chart_data', this.chart_data);
          this.displayChart = true
        })
    }
  }
};
</script>

<style lang="scss">
.count--data-wrapper{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.count--data-content{
  display: flex;
  justify-content: center;
  // border: 1px solid;
  width: 100%;
}

.count--data-box{
  // border: 1px solid;
  padding-left: 10px;
  padding-right: 10px;
}

.count--data-title{
  padding: 10px;
 text-align: left;
 background: #dc3545 ;
 color:  #ffff;
 border-radius: 5px;
}

.count--data-number{
  font-size: 40px;
  padding: 20px 40px;
}
</style>