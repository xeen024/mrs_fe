<template>
  <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-row>
          <b-col md="4" sm="12">
            <b-form-group label="Select Type of user:" label-for="user_type">
              <b-form-select v-model="form.user_type" class="mb-3">
              <b-form-select-option :value="null">Please select an option</b-form-select-option>
              <b-form-select-option value="admin">Admin</b-form-select-option>
              <b-form-select-option value="doctor">Doctor</b-form-select-option>
              <b-form-select-option value="record_keeper">Record Keeper</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <!-- <div class="mt-2">Selected: <strong>{{ selected }}</strong></div> -->
          </b-col>
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
          
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <label for="password">Password</label>
            <b-form-input 
            type="password"
             id="password" 
             v-model="form.password"
             aria-describedby="password-help-block">
            </b-form-input>
            <b-form-text id="password-help-block">
              Your password must be 8-20 characters long, contain letters and numbers, and must not
              contain spaces, special characters, or emoji.
            </b-form-text>
          </b-col>
        </b-row>
      <div class="mt-3">
        <b-button type="reset" variant="warning" class="mr-3">Reset</b-button>
        <b-button type="submit" variant="primary">Create</b-button>
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
  props: ['postTitle'],
  data() {
      return {
        show: true,
        form: {
          user_type: null,
          firstname: '',
          lastname: '',
          password: '',
          email: ''
        }
        
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
        console.log('domain_urlss', apiUrl);
        axios.post(apiUrl+'create_user', this.form).then(response=>{
          console.log('response', response);
          if (response.data?.success) {
            this.clearData()
            this.show = false
          }
        })
      },

      clearData(){
        this.form.firstname = ''
        this.form.lastname = ''
        this.form.password = ''
        this.form.email = ''
        this.form.user_type = null
      },

      onReset(event) {
        // this.$emit("isShowModalCreate", event);
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