<template>
    <div id="create-Users">
        <h1>Create Users</h1>

        <p><router-link :to="{ name: 'all_users' }">Return to Users</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addUser">
           
            <div class="form-group">
                <label name="user_name">User Name</label>
                <input type="text" class="form-control" v-model="user.user_name" id="user_name" required>
            </div>

            <div class="form-group">
                <label name="email">Email</label>
                <input type="text" class="form-control" v-model="user.email" id="email" required>
            </div>

           <div class="form-group">
                <label name="Phone">Phone</label>
                <input type="number" class="form-control" v-model="user.phone_no" id="Phone" required>
            </div>
            <div class="form-group">
                <label name="Address">Address</label>
                <input type="text" class="form-control" v-model="user.address" id="Address" required>
            </div>
             <div class="form-group">
                <label name="password">password</label>
                <input type="password" class="form-control" v-model="user.password" id="password" required>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Create</button>
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
            addUser: function()
            {
            
                this.$http.post('http://localhost:8080/user-add', this.user, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'User created successfully'
                    });
                    this.user = {};
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'User not created'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
