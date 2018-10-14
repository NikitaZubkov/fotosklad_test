    // Подключение Vue 
import Vue from 'vue';
	
	// Подключение главного компонента
import App from './App.vue';

    // Объявление переменных под компоненты и плагины
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import AnimatedVue from 'animated-vue';
import Notifications from 'vue-notification';

    // Подключение файлов config
import router from './config/router.js';

    // Подключение локального хранилища данных vuex
import store from './store';

    // Плагин для LocalStorage
import Storage from 'vue-ls';

    // Подключение сторонних скриптов
import addAttr from './common/addDataAttr';

let optionsStorage = {
    namespace: 'vuejs__', 
    name: 'ls', 
    storage: 'local',
};
    
    // Блокируем просмотр внутреннего состояния приложения в Production из Vue.js devtools
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

    // Регистрация плагинов
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(AnimatedVue);
Vue.use(Storage, optionsStorage);
Vue.use(Notifications)

    /** 
     * Создаём главный экземпляр Vue, в котором будет динамически изменяться контент
     * Создаваться и меняться контент будет в #app
     */
new Vue({
  	el: '#app',
    router,
    store,
    mounted () {
            // Добавление базовых data- атрибутов
        addAttr();
    },
  	render: h => h(App)
})
