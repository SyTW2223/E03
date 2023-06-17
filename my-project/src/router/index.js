import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import HomeLogin from '@/views/HomeLogin.vue'
import UserProfile from '@/views/UserProfile.vue'
import FindUser from '@/views/FindUser.vue'
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
    path: '/homeLogin/:username',
    name: 'homeLogin',
    component: HomeLogin,
    // Agrega la propiedad meta para indicar que se requiere autenticación
    meta: { requiresAuth: true }
  },
  {
    // Utilizamos un parámetro dinámico ":username"
    path: '/userProfile/:username',
    component: UserProfile,
    // Habilita la pasada de parámetros como props en lugar de ruta query
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/findUser/:username/:userfind',
    component: FindUser,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
]

const router = new VueRouter({
  routes
})

// Verificar la autenticación antes de cada navegación
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // Verificar si el usuario está autenticado
    const isAuth = localStorage.getItem('token')

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
