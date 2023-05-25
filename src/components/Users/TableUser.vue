<template>
  <div>
    <!-- <b-table 
    bordered hover 
    :items="items"
    :fields="fields"
    @row-clicked="myRowClickHandler(data)">
   
  </b-table> -->
    <b-table bordered striped hover 
          :items="items"
          @row-clicked="myRowClickHandler"
  >
    <template slot="actions" scope="item">
      <b-btn size="sm" @click="log(item)">Details</b-btn>
    </template>
  </b-table>
  </div>
</template>
<script>
import axios from 'axios'
const apiUrl = 'http://127.0.0.1:8000/api/'
  export default {
    data() {
      return {
        items: [],
        // items: [
        //   { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        //   { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        //   { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        //   { age: 38, first_name: 'Jami', last_name: 'Carney' }
        // ]
      }
    },
    created(){
      this.getAllData()
    },
    methods: {
      getAllData(){
        console.log('getting all');
        axios.get(apiUrl+'get_all_users').then(response=>{
          console.log('response', response);
          if (response.data?.results) {
            this.items = response.data?.results
          }
        })
      },
      myRowClickHandler(data){
        console.log('this is clicked',data);
      }
    }
  }
</script>