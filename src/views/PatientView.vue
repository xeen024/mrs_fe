<template>
  <div>
   
    <div class="table-content">
      <TableData />
    </div>
    
  </div>
  
</template>

<script>
import TableData from '@/components/Patients/TableData'
export default {

  name: 'PatientView',
  components: {
    TableData,
  },
  
  data() {
      return {
        show: true,
      }
    },
    methods:{
      
    }
};
</script>

<style lang="scss">
.table-content{
  margin-top: 10px;
}
</style>