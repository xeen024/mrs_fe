<template>
  <div>
  <div v-if="!showDetails">
    <div class="table--header-search">
      <div>
        <b-button variant="outline-primary" v-b-modal.create-patient>New Patient</b-button>
      </div>
      <div>
        <b-input-group
        class="mb-3"
        prepend="Search by Firstname or Lastname only"
      >
        <b-form-input v-model="search_item"></b-form-input>
        <b-input-group-append>
          <b-button size="sm" text="Button" variant="success" @click="searchPatient">Search</b-button>
        </b-input-group-append>
      </b-input-group>
      </div>
    </div>
    <b-modal id="create-patient" size="lg" title="Patient Information" hide-footer>
      <CreatePatient 
      :createUser = true
      @is-show-modal-create="showCreateModal"/>
    </b-modal>
    <br>
    <b-table bordered striped hover 
          :items="items"
          @row-clicked="myRowClickHandler"
    >
    <template slot="actions" scope="item">
      <b-btn size="sm" @click="log(item)">Details</b-btn>
    </template>
  </b-table>
  </div>
  <div v-if="showDetails">
    <ViewPatient 
    :patient_id="patient_id"
    @show-list-of-patients="showDetails=false"/>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
const apiUrl = 'http://127.0.0.1:8000/api/'

import ViewPatient from '@/components/Patients/ViewPatient'
import CreatePatient from '@/components/Patients/CreatePatient'
export default {
    components: {
      ViewPatient,
      CreatePatient
    },
    data() {
      return {
        patient_id: '',
        showDetails: false,
        search_item: '',
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
      searchPatient(){
        console.log('this.search_item', this.search_item);
        if (!this.search_item) {
          this.getAllData()
        }else{
          axios.get(apiUrl+'search_patient/'+this.search_item).then(response=>{
            console.log('response', response);
            if (response.data?.results) {
              this.items = response.data?.results
            }
          })
        }
        
      },
      getAllData(){
        console.log('getting all');
        axios.get(apiUrl+'get_all_patients').then(response=>{
          console.log('response', response);
          if (response.data?.results) {
            this.items = response.data?.results
          }
        })
      },
      myRowClickHandler(data){
        console.log('this is clicked',data);
        this.patient_id = data.id
        this.showDetails = true
      },
      showCreateModal(val){
        console.log('this is val', val);
        this.getAllData()
        // this.
        this.patient_id = val
        this.showDetails = true
      }
    }
  }
</script>
<style lang="scss">
.table--header-search{
  display: flex;
  justify-content: space-between;
}
</style>