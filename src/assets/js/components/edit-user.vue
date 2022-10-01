<template>
    <div id="update-user">
        <h1>Update User</h1>

        <p><router-link :to="{ name: 'all_users' }">Return to Users</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editUser">
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
                <input type="text" class="form-control" v-model="user.phone_no" id="Phone" required>
            </div>
            <div class="form-group">
                <label name="Address">Address</label>
                <input type="text" class="form-control" v-model="user.address" id="Address" required>
            </div>


            <div class="form-group">
                <button class="btn btn-primary">Update</button>
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

        created: function(){
            this.getUser();
        },

        methods: {
            getUser: function()
            {
                this.$http.get('http://localhost:8080/user-single/' + this.$route.params.id).then((response) => {
                    this.user = response.body.data;
                }, (response) => {

                });
            },

            editUser: function()
            {
               

                this.$http.put('http://localhost:8080/user-update', this.user, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                     this.notifications.length = 0;
                    this.notifications.push({
                        type: 'success',
                        message: 'User updated successfully'
                    });
                }, (response) => {
                     this.notifications.length = 0;
                    for(var t in response.body){
                    this.notifications.push({
                        type: 'danger',
                        message: response.body[t]
                    });
                    }
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
