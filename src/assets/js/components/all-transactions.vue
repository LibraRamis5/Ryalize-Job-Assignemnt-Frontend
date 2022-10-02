<template>
  <div id="all-users">
    <h1>All Transactions</h1>
    <form v-on:submit.prevent="filter">
      <div class="form-group">
        <input
          type="text"
          name="search"
          v-model="user_name"
          placeholder="Search Username"
          class="form-control my-2"
        />
        <br />
        <input
          type="date"
          name="date"
          v-model="date"
          placeholder="Search Username"
          class="form-control my-2"
        />

        <br />
        <input
          type="text"
          name="search"
          v-model="location_name"
          placeholder="Search Location"
          class="form-control"
        />
        <br />
        <div class="form-group">
          <button class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
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
          <td>Date</td>
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
          <td>{{ transaction.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"  v-for="(item, index) in links"><a class="page-link" v-on:click="paginate(item)">
         {{ item.label }}

        </a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [],
      originaltransactions: [],
      transactionSearch: "",
      user_name: "",
      location_name: "",
      date: "",
      links: [],
    };
  },

  created: function () {
    this.fetchUserData();
  },

  methods: {
    fetchUserData: function () {
      this.$http.get("http://localhost:8080/user-transaction?page=1").then(
        (response) => {
          this.transactions = response.body.data.data;
          this.links = response.body.data.links;
          this.originaltransactions = this.transactions;
        },
        (response) => {}
      );
    },

    searchTransactions: function () {
      if (this.transactionSearch == "") {
        this.transactions = this.originaltransactions;
        return;
      }

      var searchTrans = [];
      for (var i = 0; i < this.originaltransactions.length; i++) {
        var userName = this.originaltransactions[i]["medium"].toLowerCase();
        if (userName.indexOf(this.transactionSearch.toLowerCase()) >= 0) {
          searchTrans.push(this.originaltransactions[i]);
        }
      }

      this.transactions = searchTrans;
    },

    filter: function () {
      console.log(this.user_name, this.location_name);
      this.$http
        .get("http://localhost:8080/user-transaction", {
          params: {
            user_name: this.user_name,
            location_name: this.location_name,
            date: this.date,
            page: 1,
          },
        })
        .then(
          (response) => {
            this.transactions = response.body.data.data;
            this.links = response.body.data.links;
            this.originaltransactions = this.transactions;
          },
          (response) => {}
        );
    },
    paginate: function(item){
        this.$http.get(`http://localhost:8080/user-transaction?page=${Number(item.label)}`).then(
        (response) => {
          this.transactions = response.body.data.data;
          this.links = response.body.data.links;
          this.originaltransactions = this.transactions;
        },
        (response) => {}
      );
    }
  },
};
</script>
