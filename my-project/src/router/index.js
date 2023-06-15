
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import HomeLogin from '@/views/HomeLogin.vue'
import UserProfile from '@/views/UserProfile.vue'
import FindUser from '@/views/FindUser.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Password from '@/views/Password.vue'

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
    meta: { requiresAuth: true } // Agrega la propiedad meta para indicar que se requiere autenticación
  },
  {
    path: '/userProfile/:username', // Utilizamos un parámetro dinámico ":username"
    component: UserProfile,
    props: true, // Habilite la pasada de parámetros como props en lugar de ruta query
    meta: { requiresAuth: true } // Agrega la propiedad meta para indicar que se requiere autenticación
  },
  {
    path: '/findUser/:username/:userfind', // Utilizamos un parámetro dinámico ":username"
    component: FindUser,
    props: true, // Habilite la pasada de parámetros como props en lugar de ruta query
    meta: { requiresAuth: true } // Agrega la propiedad meta para indicar que se requiere autenticación
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/password',
    component: Password
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
