import Vue from 'vue';
import VueRouter from 'vue-router';
import Depan from '../views/Depan.vue';
import About from '../views/About.vue';
import FormTodo from '../views/FormTodo.vue';
import Crud from '../views/Crud.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Depan,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/frmtodo',
    name: 'FormTodo',
    component: FormTodo,
  },
  {
    path: '/rencana/:id',
    name: 'UpdateTodo',
    component: FormTodo,
  },
  {
    path: '/crud',
    name: 'Crud',
    component: Crud,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
