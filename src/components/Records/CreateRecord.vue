<template>
  <div>
    <!-- {{ patient_id }} -->
    <b-form @submit="onSave" @reset="onReset" v-if="showMedForm">
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Select Type of Consultation" label-for="type">
              <b-form-select v-model="med_form.type" class="mb-3">
                <b-form-select-option :value="null">Please select an option</b-form-select-option>
                <b-form-select-option value="check-up">Check-up</b-form-select-option>
                <b-form-select-option value="follow-up">Follow-up</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="BP:" label-for="bp">
              <b-form-input
                v-model="med_form.bp"
                id="bp"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Temp:" label-for="temp">
              <b-form-input
                v-model="med_form.temp"
                id="temp"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="RR:" label-for="rr">
              <b-form-input
                v-model="med_form.rr"
                id="rr"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="PR:" label-for="pr">
              <b-form-input
                v-model="med_form.pr"
                id="pr"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group label="Weight:" label-for="weight">
              <b-form-input
                v-model="med_form.weight"
                id="weight"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Height:" label-for="height">
              <b-form-input
                v-model="med_form.height"
                id="height"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="BMI:" label-for="bmi">
              <b-form-input
                v-model="med_form.bmi"
                id="bmi"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Waist:" label-for="waist">
              <b-form-input
                v-model="med_form.waist"
                id="waist"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <b-form-checkbox
              id="checkbox-1"
              v-model="med_form.is_pedia"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >
              Pedia Patient
            </b-form-checkbox>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Abd circ:" label-for="abd_circ">
              <b-form-input
                v-model="med_form.abd_circ"
                id="abd_circ"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Head circ:" label-for="head_circ">
              <b-form-input
                v-model="med_form.head_circ"
                id="head_circ"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <div>SUBJECTIVE</div>
        <b-row>
          <b-col md="12" sm="12">
            
            <b-form-group label="Chief Complain:" label-for="cc">
              <b-form-textarea
                id="cc"
                v-model="med_form.cc"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="History of Present Illness:" label-for="hpi">
              <b-form-textarea
                id="hpi"
                v-model="med_form.hpi"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="On Going Meds:" label-for="on_going_meds">
              <b-form-textarea
                id="on_going_meds"
                v-model="med_form.on_going_meds"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <div>OBJECTIVE</div>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Physical Examination:" label-for="pe">
              <b-form-textarea
                id="pe"
                v-model="med_form.pe"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="ASSESSMENT:" label-for="assessment">
              <b-form-textarea
                id="assessment"
                v-model="med_form.assessment"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <div>PLAN/DIAGNOSTICS</div>
        <b-row>
          <b-col md="12" sm="12">
              <b-form-textarea
                v-model="med_form.plan_diagnostics"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Medications:" label-for="medications">
              <b-form-textarea
                id="medications"
                v-model="med_form.medications"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="mt-3">
          <b-button variant="warning" class="mr-3" @click="close()">Cancel</b-button>
          <b-button type="submit" variant="primary">Save</b-button>
        </div>
      </b-form>
  </div>
</template>
<script>
import axios from 'axios'
const apiUrl = 'http://127.0.0.1:8000/api/'

export default {
  name: 'CreateRecord',
  components: {
  },
  props: ['patient_id'],
  data() {
      return {
        showMedForm: true,
        med_form: {
          type: '',
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
          assessment: '',
          plan_diagnostics: '',
          medications: ''
        }
        
      }
    },
    methods: {
      onSave(event){
        event.preventDefault()
        alert(JSON.stringify(this.med_form))
        this.med_form.patient_id = this.patient_id
        axios.post(apiUrl+'create_med_record', this.med_form).then(response=>{
          console.log('response', response);
          if (response.data?.result) {
            this.show = false
            this.showMedForm = false
            this.$emit("is-show-modal-create", response.data?.result);
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
        // this.$emit("is-show-modal-create", id);
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
};
</script>