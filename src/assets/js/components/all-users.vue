<template>
    <div id="all-users">
        <h1>All Users</h1>

        <p><router-link :to="{ name: 'create_users' }" class="btn btn-primary">Create User</router-link></p>
        <p><router-link :to="{ name: 'transaction_list' }" class="btn btn-primary">Transaction List</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="userSearch" placeholder="Search User" class="form-control" v-on:keyup="searchUsers">
        </div>

        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone No</td>
                <td>Address</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="user in users">
                    <td>{{ user.id }}</td>
                    <td>{{ user.user_name }}</td>
                    <td>{{ user.email }}</td>
                     <td>{{ user.phone_no }}</td>
                     <td>{{ user.address }}</td>
                    <td>
                        <router-link :to="{name: 'edit_user', params: { id: user.id }}" class="btn btn-primary">Edit</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                users: [],
                originalUsers: [],
                userSearch: ''
            }
        },

        created: function()
        {
            this.fetchUserData();
        },

        methods: {
            fetchUserData: function()
            {
                this.$http.get('http://localhost:8080/user').then((response) => {
                    this.users = response.body.data.data;
                    this.originalUsers = this.users;
                }, (response) => {

                });
            },

            searchUsers: function()
            {
                if(this.userSearch == '')
                {
                    this.users = this.originalUsers;
                    return;
                }

                var searchedUsers = [];
                for(var i = 0; i < this.originalUsers.length; i++)
                {
                    var userName = this.originalUsers[i]['user_name'].toLowerCase();
                    if(userName.indexOf(this.userSearch.toLowerCase()) >= 0)
                    {
                        searchedUsers.push(this.originalUsers[i]);
                    }
                }

                this.users = searchedUsers;
            }
        }
    }
</script>
