<template>
    <div id="all-users">
        <h1>All Transactions</h1>

        <div class="form-group">
            <input type="text" name="search" v-model="transactionSearch" placeholder="Search Transaction" class="form-control" v-on:keyup="searchTransactions">
        </div>

        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <td>ID</td>
                <td>Medium</td>
                <td>Amount</td>
                <td>City</td>
                <td>Address</td>
                <td>State</td>
                <td>Zip</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="transaction in transactions">
                    <td>{{ transaction.transaction_id }}</td>
                    <td>{{ transaction.medium }}</td>
                    <td>{{ transaction.amount }}</td>
                     <td>{{ transaction.city }}</td>
                     <td>{{ transaction.address }}</td>
                     <td>{{ transaction.state }}</td>
                     <td>{{ transaction.zip }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                transactions: [],
                originaltransactions: [],
                transactionSearch: ''
            }
        },

        created: function()
        {
            this.fetchUserData();
        },

        methods: {
            fetchUserData: function()
            {
                this.$http.get('http://localhost:8080/user-transaction').then((response) => {
                    this.transactions = response.body.data.data;
                    this.originaltransactions = this.transactions;
                }, (response) => {

                });
            },

            searchTransactions: function()
            {
                if(this.transactionSearch == '')
                {
                    this.transactions = this.originaltransactions;
                    return;
                }

                var searchTrans = [];
                for(var i = 0; i < this.originaltransactions.length; i++)
                {
                    var userName = this.originaltransactions[i]['medium'].toLowerCase();
                    if(userName.indexOf(this.transactionSearch.toLowerCase()) >= 0)
                    {
                        searchTrans.push(this.originaltransactions[i]);
                    }
                }

                this.transactions = searchTrans;
            }
        }
    }
</script>
