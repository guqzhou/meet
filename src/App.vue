<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
#app  {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: linear-gradient(180deg, #187af7 0%, #6573ee 18%, #645de9 100%);
  .van-dialog {
    width: 210px !important;
  }
}
</style>
