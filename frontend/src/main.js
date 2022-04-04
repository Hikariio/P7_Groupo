import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'
import { library, dom } from "@fortawesome/fontawesome-svg-core";

library.add(fas, far, fab)
dom.watch();

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(router)

app.mount('#app')
