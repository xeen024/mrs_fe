<template>
  <div>
    <div>
      <Pie :data="chart_data" :options="options"/>
    </div>
    <div class="count--data-wrapper">
      <div class="count--data-content">
        <div class="count--data-box">
          <div class="count--data-title">
            PATIENTS
          </div>
          <div class="count--data-number">
            20
          </div>
        </div>
      </div>
      <div class="count--data-content">
        <div class="count--data-box">
          <div class="count--data-title">
            MEDICAL RECORDS
          </div>
          <div class="count--data-number">
            100
          </div>
        </div>
      </div>
      <div class="count--data-content">
        <div class="count--data-box">
          <div class="count--data-title">
            USERS
          </div>
          <div class="count--data-number">
            100
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
  onBeforeMount(){
      this.countPatientsPerBrgy()
    },
  components: {
    Pie
  },
  data() {
    return {
      chart_data: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#800000', '#9A6324', '#808000', '#469990', '#000075','#000000','#e6194B','#f58231','#ffe119','#bfef45',
            '#3cb44b','#42d4f4','#4363d8','#911eb4','#f032e6','#fabed4','#ffd8b1','#fffac8','#aaffc3','#ffffff'],
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
      axios.get(apiUrl+'count_patients_per_brgy').then(response=>{
          console.log('response', response);
          if (response.data?.result) {
            this.chart_data.labels = response.data?.result.labels
            this.chart_data.datasets[0].data = response.data?.result.count_of_brgys
          }
          console.log('chart_data', this.chart_data);
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
  border: 1px solid;
  width: 100%;
}

.count--data-box{
  border: 1px solid;
  padding-left: 10px;
  padding-right: 10px;
}

.count--data-title{
 text-align: left;
}

.count--data-number{
  font-size: 40px;
  padding: 20px 40px;
}
</style>