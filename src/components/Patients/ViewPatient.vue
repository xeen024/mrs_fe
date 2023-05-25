<template>
  <div>
    <div v-if="!viewRecord">
      <div style="display: flex; justify-content: space-between;">
        <div><h5>Patient Medical Records</h5></div>
        <div style="display: flex; gap: 10px;">
          <b-button variant="outline-primary"  v-b-modal.update-patient>Edit Patient Information</b-button>
          <b-button variant="outline-danger" @click="$emit('show-list-of-patients')">All Patients</b-button>
        </div>
      </div>
      <b-modal id="update-patient" size="lg" title="Patient Information" hide-footer>
        <CreatePatient 
        :createUser = false 
        :patient = "patient"
        :address = "address"
        :info = "info" 
        @refresh-data="refreshData"/>
      </b-modal>
      <div>
        <b>Personal Information:</b> 
        <br>
        <b-row>
          <b-col md="4" sm="12">
            Fistname: {{ info?.firstname }}
          </b-col>
          <b-col md="4" sm="12">
            Lastname: {{ info?.lastname }}
          </b-col>
          <b-col md="4" sm="12">
            Civil Status: {{ info?.civil_status }}
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" sm="12">
            Birth Date: {{ info?.birthdate }}
          </b-col>
          <b-col md="4" sm="12">
            Religion: {{ info?.religion }}
          </b-col>
          <b-col md="2" sm="12">
            Gender: {{ info?.gender == 1 ? 'Male' : 'Female' }}
          </b-col>
          <b-col md="2" sm="12">
            Age: {{ info?.age }}
          </b-col>
        </b-row>
        <br>
        <b>Address Information:</b> 
        <br>
        <b-row>
          <b-col md="12" sm="12">
            {{ address?.street+', '+address?.brgy+', '+address?.city+', '+address?.province+' '+address?.country }}
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col md="6" sm="12">
            Father: {{ patient.father_name }}
          </b-col>
          <b-col md="6" sm="12">
            Mother: {{ patient.mother_name }}
          </b-col>
          
        </b-row>
        
        <b-row>
          <b-col md="6" sm="12">
            Contact Number: {{ info?.contact_number }}
          </b-col>
          <b-col md="6" sm="12">
            PHIC #: {{ info?.phic_no }}
          </b-col>
          
        </b-row>
      </div>
      <br>
      <div>
        <div>
          <b-button variant="outline-primary" v-b-modal.create-record>Add Record</b-button>
        </div>
        <b-modal id="create-record" size="lg" title="Create New Medical Record" hide-footer>
          <CreateRecord 
          :patient_id="patient_id"
          @is-show-modal-create="isShowModalCreate"/>
        </b-modal>
      </div>
      <br>
      <div>
        <b-table bordered striped hover 
            :items="items"
            @row-clicked="viewMedRecordDetail"
        >
          <template slot="actions" scope="item">
            <b-btn size="sm" @click="log(item)">Details</b-btn>
          </template>
        </b-table>
      </div>
    </div>
    <div v-if="viewRecord">
      <ViewRecord 
      :med-record-id="medRecordId"
      @show-list-of-records="showListOfRecords"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
const apiUrl = 'http://127.0.0.1:8000/api/'

import CreateRecord from '@/components/Records/CreateRecord'
import ViewRecord from '@/components/Records/ViewRecord'
import CreatePatient from '@/components/Patients/CreatePatient'
export default {
  components: {
    CreateRecord,
    ViewRecord,
    CreatePatient
    },
  props:['patient_id'],
  data() {
    return {
      medRecordId: '',
      viewRecord: false,
      patient: [],
      address: [],
      info: [],
      items: []
    }
  },
  created(){
      this.getPatientData()
      this.getAllPatienMedRecords()
    },
    methods: {
      getPatientData(){
        axios.get(apiUrl+'get_patient/'+this.patient_id).then(response=>{
          console.log('response', response);
          if (response.data?.result) {
            this.patient = response.data?.result.patient_data
            this.address = response.data?.result.address_data
            this.info = response.data?.result.personal_info_data
          }
        })
      },

      getAllPatienMedRecords(){
        axios.get(apiUrl+'get_all_patient_medical_record/'+this.patient_id).then(response=>{
          console.log('response', response);
          if(response.data?.result){
            this.items = response.data?.result
          }
        })
      },
      viewMedRecordDetail(data){
        console.log('view med record', data);
        this.medRecordId = data.id
        this.viewRecord = true
        this.getAllPatienMedRecords()
      },
      isShowModalCreate(val){
        console.log('this is val id', val)
        this.getAllPatienMedRecords()
        this.medRecordId = data.id
        this.viewRecord = true
      },
      showListOfRecords(){
        this.viewRecord = false
      },
      refreshData(){
        this.getPatientData()
      }
    }
}
</script>
