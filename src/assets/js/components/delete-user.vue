<template>
    <div id="delete-user">
        <h1>Delete User {{ user.email }}</h1>

        <p><router-link :to="{ name: 'all_users' }">Return to User</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="deleteUser">
            <p><button class="btn btn-danger">Delete User</button></p>
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

            deleteUser: function()
            {
                this.$http.delete('http://localhost:8080/user-delete/' + this.$route.params.id, this.user, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.$router.push({name: 'all_users'})
                }, (response) => {
                    this.notifications.push({
                        type: 'danger',
                        message: 'User could not deleted'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
