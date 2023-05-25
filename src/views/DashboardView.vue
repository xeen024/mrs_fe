<template>
  <div>
    <Doughnut :data="chart_data" :options="options"/>
  </div>
  
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
// import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DashboardView',
  components: {
    Doughnut
  },
  data() {
    return {
      chart_data: {
        labels: ['Busaon','Carugmanan', 'Gastav', 'Kalawaig', 'Kiaring','Malagap','Malinao','Miguel Macasarte','Pantar',
              'Paradise','Pinamulaan','Poblacion I','Poblacion II','Puting-bato','Salama','Thailand','Tinimbacan','Tumbao-Camalig','Wadya'],
        datasets: [
          {
            backgroundColor: ['#800000', '#9A6324', '#808000', '#469990', '#000075','#000000','#e6194B','#f58231','#ffe119','#bfef45',
            '#3cb44b','#42d4f4','#4363d8','#911eb4','#f032e6','#fabed4','#ffd8b1','#fffac8','#aaffc3', '#dcbeff','#ffffff'],
            data: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
      
    }
  }
};
</script>

<style lang="scss">
</style>