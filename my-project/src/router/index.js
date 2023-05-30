import CervezaView from '@/views/CervezaView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import HomeLogin from '@/views/HomeLogin.vue'
import UserProfile from '@/views/UserProfile.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/homeLogin',
    name: 'homeLogin',
    component: HomeLogin,
    meta: { requiresAuth: true } // Agrega la propiedad meta para indicar que se requiere autenticación
  },
  {
    path: '/userProfile',
    component: UserProfile
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

// Verificar la autenticación antes de cada navegación
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // Verificar si el usuario está autenticado
    const isAuth = localStorage.getItem('token') // Suponiendo que el token se guarda en el LocalStorage

    if (isAuth) {
      // El usuario está autenticado, permitir la navegación
      next()
    } else {
      // El usuario no está autenticado, redirigir al inicio de sesión
      next('/login')
    }
  } else {
    // La ruta no requiere autenticación, permitir la navegación
    next()
  }
})

export default router