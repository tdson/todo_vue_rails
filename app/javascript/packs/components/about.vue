<template>
  <div>
    <h1>About</h1>
    <p>This is a sample of TODO application with Vue.js and Ruby on Rails.</p>
    <div id="map"></div>
  </div>
</template>

<script>
  export default {
    mounted() {
      // this.initMap()
    },
    methods: {
      initMap() {
        Materialize.toast('I am a toast!', 3000)
        let map = L.map('map').setView([35.641441, 139.75034250000002], 16)
        L.tileLayer('https://cm01.mapion.co.jp/m2/tile/{z}/{x}/{y}.png?usr=atlas_org&v=1.1',
          {
            maxZoom: 18,
            attribution: 'test',
          }
        ).addTo(map)
      }
    }
  }
</script>

<style scoped>
  #map {
    height: 400px;
  }
</style>
