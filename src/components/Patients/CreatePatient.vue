<template>
  <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Fistname:" label-for="firstname">
              <b-form-input
                v-model="form.firstname"
                id="firstname"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Lastname:" label-for="lastname">
              <b-form-input
                v-model="form.lastname"
                id="lastname"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Civil Status:" label-for="civil_status">
              <b-form-input
                v-model="form.civil_status"
                id="civil_status"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" sm="12">
            <label for="birthdate">Birth Date</label>
            <b-form-datepicker 
              id="birthdate" 
              v-model="form.birthdate" 
              class="mb-2">
            </b-form-datepicker>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Religion:" label-for="religion">
              <b-form-input
              v-model="form.religion"
                id="religion"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Gender">
              <b-form-radio-group id="gender" v-model="form.gender">
                <b-form-radio value="1">Male</b-form-radio>
                <b-form-radio value="2">Female</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="12">
            <b-form-group label="Age">
              <b-form-input
              v-model="form.age"
                id="age"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <p>Address Information</p> 
        <b-row>
          <b-col md="8" sm="12">
            <b-form-group label="Street:" label-for="street">
              <b-form-input
              v-model="form.street"
                id="street"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Barangay:" label-for="barangay">
              <b-form-select v-model="form.brgy" :options="brgy_options"></b-form-select>
            </b-form-group>
          </b-col>
          
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="City:" label-for="city">
              <b-form-input
              v-model="form.city"
                id="city"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Province:" label-for="province">
              <b-form-input
              v-model="form.province"
                id="province"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Country:" label-for="country">
              <b-form-input
              v-model="form.country"
                id="country"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Father:" label-for="father_name">
              <b-form-input
                id="father_name"
                v-model="form.father_name"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Mother:" label-for="mother_name">
              <b-form-input
                id="mother_name"
                v-model="form.mother_name"
              ></b-form-input>
            </b-form-group>
          </b-col>
          
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Contact Number:" label-for="contact_number">
              <b-form-input
                id="contact_number"
                v-model="form.contact_number"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="PHIC #:" label-for="phic_no">
              <b-form-input
                id="phic_no"
                v-model="form.phic_no"
              ></b-form-input>
            </b-form-group>
          </b-col>
          
        </b-row>
      <div class="mt-3">
        <b-button variant="warning" class="mr-3" @click="close()">Cancel</b-button>
        <b-button v-if="createUser" type="submit" variant="primary">Create</b-button>
        <b-button type="submit" variant="primary" v-else>Save Changes</b-button>
        
      </div>
      </b-form>
  </div>
</template>

<script>
import axios from 'axios'
const apiUrl = 'http://127.0.0.1:8000/api/'
export default {
  name: 'CreatePatient',
  components: {
  },
  props: ['postTitle', 'createUser', 'patient', 'address', 'info'],
  data() {
      return {
        patient_id: '',
        showDetails: false,
        show: true,
        showMedForm: false,
        brgy_options:[{ value: null, text: 'Please select brgy option' },
          { value: 'Busaon', text: 'Busaon' },
          { value: 'Carugmanan', text: 'Carugmanan' },
          { value: 'Gastav', text: 'Gastav' },
          { value: 'Kalawaig', text: 'Kalawaig' },
          { value: 'Kiaring', text: 'Kiaring' },
          { value: 'Malagap', text: 'Malagap' },
          { value: 'Malinao', text: 'Malinao' },
          { value: 'Miguel Macasarte', text: 'Miguel Macasarte' },
          { value: 'Paradise', text: 'Paradise' },
          { value: 'Pinamulaan', text: 'Pinamulaan' },
          { value: 'Poblacion I', text: 'Poblacion I' },
          { value: 'Poblacion II', text: 'Poblacion II' },
          { value: 'Puting-bato', text: 'Puting-bato' },
          { value: 'Kiaring', text: 'Kiaring' },
          { value: 'Salama', text: 'Salama' },
          { value: 'Thailand', text: 'Thailand' },
          { value: 'Tinimbacan', text: 'Tinimbacan' },
          { value: 'Tumbao-Camalig', text: 'Tumbao-Camalig' },
          { value: 'Wadya', text: 'Wadya' }],
        form: {
          age: '',
          firstname: '',
          lastname: '',
          gender: '',
          birthdate: '',
          contact_number: '',
          phic_no: '',
          civil_status: '',
          religion: '',
          father_name: '',
          mother_name: '',
          street: '',
          brgy: null,
          city: '',
          province: '',
          country: '',
          phic_no: '',
        },
        med_form: {
          patient_id: '',
          age: '',
          bp: '',
          temp: '',
          rr: '',
          pr: '',
          phic_no: '',
          weight: '',
          height: '',
          bmi: '',
          waist: '',
          is_pedia: '',
          abd_circ: '',
          head_circ: '',
          cc: '',
          hpi: '',
          on_going_meds: '',
          pe: '',
          assessment: ''
        }
        
      }
    },
    created(){
      if (!this.createUser) {
        this.getPatientData()
      }
      
    },
    methods: {
      getPatientData(){
        console.log(this.info);
        this.form.information_id = this.info.id,
        this.form.age = this.info.age,
        this.form.firstname = this.info.firstname,
        this.form.lastname = this.info.lastname,
        this.form.gender = this.info.gender,
        this.form.birthdate = this.info.birthdate,
        this.form.contact_number = this.info.contact_number,
        this.form.phic_no = this.info.phic_no,
        this.form.civil_status = this.info.civil_status,
        this.form.religion = this.info.religion,
        this.form.patient_id = this.info.id,
        this.form.father_name = this.patient.father_name,
        this.form.mother_name = this.patient.mother_name,
        this.form.address_id = this.address.id,
        this.form.street = this.address.street,
        this.form.brgy = this.address.brgy,
        this.form.city = this.address.city,
        this.form.province = this.address.province,
        this.form.country = this.address.country
      },
      // onSave(event){
      //   event.preventDefault()
      //   alert(JSON.stringify(this.med_form))
        
      //   axios.post(apiUrl+'create_med_record', this.med_form).then(response=>{
      //     console.log('response', response);
      //     if (response.data?.result) {
      //       this.show = false
      //       this.showMedForm = false
      //       close()
      //     }
      //   })
      // },
      onSubmit(event) {
        event.preventDefault()
        console.log('domain_urlss', apiUrl);
        if (this.createUser) {
          var endPoint = 'create_patient'
        }else{
          var endPoint = 'update_patient'
        }
        axios.post(apiUrl+endPoint, this.form).then(response=>{
          console.log('response', response);
          if (response.data?.result) {
            this.patient_id = response.data?.result.id
            this.clearData()
            this.show = false
            this.$emit("refresh-data");
            this.$emit("is-show-modal-create", this.patient_id);
          }
        })
      },

      clearData(){
        this.firstname = ''
        this.lastname = ''
        this.gender = ''
        this.birthdate = ''
        this.age = ''
        this.contact_number = ''
        this.civil_status = ''
        this.religion = ''
        this.father_name = ''
        this.mother_name = ''
        this.street = ''
        this.brgy = ''
        this.city = ''
        this.province = ''
        this.country = ''
        this.is_pedia = ''
      },

      onReset(event) {
        this.$emit("is-show-modal-create");
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.showDetails = true
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
};
</script>