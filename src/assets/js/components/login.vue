<template>
    <div id="Login">
        <h1>Login</h1>


        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="loginBtn">
           
            <div class="form-group">
                <label name="Email">Email</label>
                <input type="email" class="form-control" v-model="user.email" id="Email" required>
            </div>

            <div class="form-group">
                <label name="Password">Password</label>
                <input type="password" class="form-control" v-model="user.password" id="Password" required>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Login</button>
            </div>

        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                user:{},
                notifications:[]
            }
        },

        methods: {
            loginBtn: function()
            {
            
                this.$http.post('http://localhost:8080/user-login', this.user, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    const info = response.data;
                    if(info.token){
                    localStorage.setItem('token', info.token);
                    this.$router.push({ path: '/all_users',})
                    this.notifications.push({
                        type: 'success',
                        message: 'Login  successfully'
                    });
                    }else{
                         this.notifications.push({
                        type: 'fail',
                        message: 'Login  fail'
                    });}
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Error'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
