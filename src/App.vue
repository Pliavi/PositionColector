<template lang="pug">
#app
  header Coletor de Posições

  button.position-button(v-for="(index, part) in  bodyparts") {{ part }}

  section.image-container
    img(src='#placeholder')

  footer Tente posicionar o ponto o mais próximo do centro da parte do corpo selecionada.
  pre {{ $data }}
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      bodyparts:{
        head: [0,0],
        lHand: [0,0],
        rHand: [0,0],
        lShoulder: [0,0],
        rShoulder: [0,0]
      }
    }
  },
  mounted(){
    console.log(this.$data.bodyparts)
  }
}
</script>

<style lang="sass">
</style>
