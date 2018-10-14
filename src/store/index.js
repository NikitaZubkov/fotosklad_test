    // Подключение базовых модулей
import Vue from 'vue';
import Vuex from 'vuex';

    // Подключение компонентов хранилища
import __main__ from './modules/__main__';
import productCatModule from './modules/product_cat';

Vue.use(Vuex);

const store = new Vuex.Store({
        // Импортирование state, getters и пр. в главный объект
    modules: {
        __main__,
        product_cat: productCatModule,
    }
});

export default store;
