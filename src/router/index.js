import { createRouter, createWebHistory } from 'vue-router'
import LocationManualView from '../views/manual/LocationManualView.vue'
import ApnManualView from '../views/manual/ApnManualView.vue'
import GroupManualView from '../views/manual/GroupManualView.vue'
import LocationAutoView from '../views/auto/LocationAutoView.vue'
import ApnAutoView from '../views/auto/ApnAutoView.vue'
import GroupAutoView from '../views/auto/GroupAutoView.vue'
const routes = [
  {
    path: '/',
    name: 'location_manual_test',
    component: LocationManualView
  },
  {
    path: '/apn_manual',
    name: 'apn_manual_test',
    component: ApnManualView
  },
  {
    path: '/group_manual',
    name: 'group_manual_test',
    component: GroupManualView
  },
  {
    path:'/location_auto',
    name:'location_auto_test',
    component: LocationAutoView
  }, 
  {
    path:'/apn_auto',
    name:'apn_auto_test',
    component: ApnAutoView
  },
  {
    path:'/group_auto',
    name:'group_auto_test',
    component: GroupAutoView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
