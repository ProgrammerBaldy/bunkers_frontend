<template>
    <div>
        <div v-for="supply in APIData" :key="supply.id">
            <h2>{{ supply.name }}</h2>
        </div>
    </div>
</template>

<script>
import { getAPI } from '../axios-api'
import { mapState } from 'vuex'

export default {
  name: "Supplies",
  onIdle () {
      this.$store.dispatch('refreshToken').then( () => {
          console.log("Called the refresh!")
      }).catch( err => {
          alert(err)
      } )
  },
  created () {
      getAPI.get('/supplies/', {
          headers: { Authorization: `Bearer ${this.$store.state.accessToken}`}
      }).then(response=> {
          this.$store.state.APIData = response.data
      }).catch(err => {
          alert(err)
      })
  },
  computed: mapState(['APIData']),
  components: {
  }
}
</script>

<style>

</style>