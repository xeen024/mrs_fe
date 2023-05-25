<template>
  <div>
    <div>
      <b-button variant="outline-primary" v-b-modal.create-patient>Add User</b-button>
    </div>
    <div class="table-content">
      <TableUser />
    </div>
    <b-modal id="create-patient" size="lg" title="User Information" hide-footer>
      <CreateUser
      @isShowModalCreate="isShowModalCreate(event)"/>
    </b-modal>
  </div>
  
</template>

<script>
import TableUser from '@/components/Users/TableUser'
import CreateUser from '@/components/Users/CreateUser'
export default {

  name: 'PatientView',
  components: {
    TableUser,
    CreateUser
  },
  
  data() {
      return {
        show: true,
      }
    },
    methods:{
      isShowModalCreate(event){
        console.log('show modal working', event);
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
};
</script>

<style lang="scss">
.table-content{
  margin-top: 10px;
}
</style>