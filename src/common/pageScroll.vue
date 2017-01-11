<template>
    <div id="page-scroll" @click="pageScroll">
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        components:{

        },
        methods:{
          pageScroll:function () {

          }
        }
    }
</script>
<style scoped>
#page-scroll{
  width: 50px;
  height: 50px;
  background: red;
  position: fixed;
  bottom: 0;
  right: 10px;
}
</style>
