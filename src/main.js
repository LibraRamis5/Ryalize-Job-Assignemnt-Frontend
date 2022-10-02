import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

// Vue.http.interceptors.push(function(request,next){

//     // modifying request headers
//     request.headers.set('X-CSRF-TOKEN', 'TOKEN');
//     request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  
//     next();
//   });

// Vue.http.interceptors.push(function(request,next){

//     // modifying request headers
//     localStorage.getItem('token') ?  request.headers.set('X-CSRF-TOKEN', 'TOKEN') : '';
//     localStorage.getItem('token') ?  request.headers.set('Authorization', `Bearer${localStorage.getItem('token')}`) : '';
  
//     next();
//   });


  function guardMyroute(to, from, next)
  {
   var isAuthenticated= false;
  if(localStorage.getItem('token'))
    isAuthenticated = true;
   else
    isAuthenticated= false;
   if(isAuthenticated) 
   {
    next(); // allow to enter route
   } 
   else
   {
    next('/'); // go to '/login';
   }
  }

import App from './App.vue'

const AllUsers = require('./assets/js/components/all-users.vue');
const CreateUser = require('./assets/js/components/create-users.vue');
const EditUser = require('./assets/js/components/edit-user.vue');
const DeleteUser = require('./assets/js/components/delete-user.vue');
const TransactionList = require('./assets/js/components/all-transactions.vue');
const Login = require('./assets/js/components/login.vue');

const routes = [
    {
        name:'login',
        path:'/',
        component:Login

    },
    {
        name: 'all_users',
        path: '/all_users',
        beforeEnter : guardMyroute,
        component: AllUsers
    },
    {
        name: 'create_users',
        path: '/users/create',
        beforeEnter : guardMyroute,
        component: CreateUser
    },
    {
        name: 'edit_user',
        path: '/users/edit/:id',
        beforeEnter : guardMyroute,
        component: EditUser
    },
    {
        name: 'delete_user',
        path: '/users/delete/:id',
        beforeEnter : guardMyroute,
        component: DeleteUser
    },
    {
        name: 'transaction_list',
        path: '/transactions',
        beforeEnter : guardMyroute,
        component: TransactionList
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');