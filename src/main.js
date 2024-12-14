import { createApp, reactive } from 'vue';
import App from './App.vue';

export const taskState = reactive({
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
});

createApp(App).mount('#app');
