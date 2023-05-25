<template>
  <div>
    <div v-if="isLoggedIn">
      <!-- <h1>login page</h1> -->
      <div class="login-container">
        
        <div class="login-container-wrapper">
          <div class="logo-cms">
            <img src="img/mrs-logo.png" alt="hsfeo logo" width="220" height="210">
          </div>
          <br>
          <div class="login-form-content">
            <div class="login-form-title">
              MRS Login
            </div>
            <form @submit="loginUser" class="login-form-content-data">
              <div class="label">
                Email
              </div>
              <div class="form-data-input">
                <input class="input-form-data" type="email" placeholder="Please enter your email" v-model="form.email" required>
              </div>
              <div class="label">Password</div>
              <div class="form-data-input">
                <input class="input-form-data" type="password" placeholder="Please input your password" v-model="form.password" required>
              </div>
              <div class="error-message" v-for="(item, i) in error_msg" :key="i"> {{item}}</div>
              <div class="form-footer">
                <button class="btn-primary" type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLoggedIn">
    <BootstrapSidebar
      :initial-show="initialShow"
      :links="links"
      :header="header"
      @sidebarChanged="onSidebarChanged"
    >
    
      <template v-slot:navbar>
        <b-navbar
          id="mainNavbar"
          toggleable="lg"
          type="light"
          variant="danger"
          fixed="top"
        >
          <b-navbar-nav style="text-align:right;">
            <b-nav-item class="user-name" @click="logoutUser"> {{ user }} | Logout</b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </template>

      <template v-slot:content>
        <b-container style="margin-top: 40px">
          <router-view />
        </b-container>
      </template>
    </BootstrapSidebar>
    <div>d;slkf;kslk;k</div>
  </div>
  </div>
  
 
</template>

<style lang="scss">
/* @import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss"; */
@import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme";
</style>

<style>
body {
  padding: 1rem;
}
</style>

<script>
import axios from 'axios'
const apiUrl = 'http://127.0.0.1:8000/api/'
import BootstrapSidebar from "vue-bootstrap-sidebar";
import { RouterLink } from 'vue-router';
export default {
  components: {
    BootstrapSidebar,
  },
  mounted() {
    console.log('this is before mount');
    if (localStorage.getItem('user_id')) {
      this.isLoggedIn = false
      this.getCurrentUser(localStorage.getItem('user_id'))
      return;
    }else{
      this.isLoggedIn = true
      // this.$router.push('/')
      return;
    }
  },
  data() {
    return {
      form:{
        email : '',
        password: ''
      },
      user:'',
      error_msg: [],
      isLoggedIn: '',
      initialShow: true,
      header:`<img alt="MRS logo" width="210" src="img/mrs-logo.png">`,
      links: [
        { name: "Dashboard", href: { name: "dashboard" }},
        // {
        //   name: "Dropdown",
        //   faIcon: ["fas", "tint"],
        //   children: [
        //     {
        //       name: "Child Item 1",
        //       href: {
        //         name: "child-item-1",
        //       },
        //       faIcon: ["fas", "child"],
        //     },
        //     {
        //       name: "Child Item 2",
        //       href: {
        //         name: "child-item-2",
        //       },
        //       faIcon: ["fas", "child"],
        //     },
        //   ],
        // },
        { name: "Patients", href: { name: "patients" }, faIcon: "users" },
        { name: "Users", href: { name: "users" }, faIcon: "phone" },
      ],
    };
  },
  methods: {
    onSidebarChanged() {},
    getCurrentUser(id){
      console.log('get current user');
      axios.get(apiUrl+'get_current_user/'+id).then(response=>{
        console.log('response', response);
        this.user = response.data.name
      })
    },
    loginUser(){
      console.log('this is login');
      axios.post(apiUrl+'auth_login', this.form).then(response=>{
        console.log('response', response);
        if (response.data?.success) {
          console.log('success data', );
          this.isLoggedIn = false
          localStorage.setItem("user_id", response.data?.result.user.id)
          if (localStorage.getItem("user_id")) {
            this.getCurrentUser(localStorage.getItem("user_id"))
            this.$router.push('/patients')
          }
          
        }else{
          console.log('not success data', response.data?.result);
          this.error_msg = response.data?.result
        }
      })
    },
    logoutUser(){
      console.log('logout user');
      if (localStorage.getItem('user_id')) {
        localStorage.removeItem('user_id')
        window.location.href = '/?'
      }
    }
  },
};
</script>
<style>
.user-name{
  color: white;
}
.login-container{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.login-container-wrapper{
  width: 35%;
 
}
.login-form-content-data{
  padding: 15px;
}

.login-form-content{
  border-radius: 10px;
  border: 1px solid rgb(210, 186, 186);
  
}

.form-data-input{
  padding: 15px;
  display: flex;
}

.login-form-title{
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 20px;
  text-align: center;
  background: rgb(217, 27, 27);
  color: #fff;
}

.label{
  padding: 15px 15px 0px 15px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
}

.input-form-data{
  margin: 0px auto;
  padding: 10px 45px 10px 10px;
  border: 1px solid;
  border-color: #c1d6e1;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  width: 100%;
}

.form-footer{
  display: flex;
  justify-content: center;
}

.btn-primary{
  cursor: pointer;
  padding: 5px;
  font-size: 20px;
  min-width: 100px;
  background-color: rgba(29, 126, 252, 0.874);
  color: #fff;
  border-radius: 5px;
  border: 1px solid rgb(243, 220, 220);
}

.error-message{
  color: red;
  text-align: left;
  padding: 10px;
}

</style>
