<template>
    <div>
        <div v-for="supply in APIData" :key="supply.id">
            <h2>{{ supply.name }}</h2>
        </div>
    </div>
</template>

<script>
import { getAPI } from '../axios-api'

export default {
  name: "Supplies",
  data () {
      return {
          APIData: []
      }
  },
  created () {
      getAPI.get('/supplies/',).then(response=> {
          console.log("Puxei, galado!")
          this.APIData = response.data
      }).catch(err => {
          alert(err)
      })
  },
  components: {
  }
}
</script>

<style>

</style>