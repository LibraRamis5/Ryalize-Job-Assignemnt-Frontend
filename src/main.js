import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

const AllUsers = require('./assets/js/components/all-users.vue');
const CreateUser = require('./assets/js/components/create-users.vue');
const EditUser = require('./assets/js/components/edit-user.vue');
const DeleteUser = require('./assets/js/components/delete-user.vue');
const TransactionList = require('./assets/js/components/all-transactions.vue');

const routes = [
    {
        name: 'all_users',
        path: '/',
        component: AllUsers
    },
    {
        name: 'create_users',
        path: '/users/create',
        component: CreateUser
    },
    {
        name: 'edit_user',
        path: '/users/edit/:id',
        component: EditUser
    },
    {
        name: 'delete_user',
        path: '/users/delete/:id',
        component: DeleteUser
    },
    {
        name: 'transaction_list',
        path: '/transactions',
        component: TransactionList
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');