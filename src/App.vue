<template>
    <div class="container">
        <div id="page">
            <a class="btn btn-danger" v-on:click="logout" v-if="verify">Logout</a>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

<script>

    export default{
        data(){
            return{
                verify: localStorage.getItem('token') ? true : false
            }
        },
        methods: {
            logout: function(){
                localStorage.removeItem('token');
                this.verify = false;
                this.$router.push({
                    path : "/"
                })
            }
        }
    }
</script>
