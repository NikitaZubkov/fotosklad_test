	// Непосредственное хранилище данных
const state = {
    CountPay: ''
};

	// Мутации для изменения переменных в хранилище
const mutations = {
  	set(state, { type, items }) {
  	  	state[type] = items;
  	}
};

    // Получение доступа к тем или иным переменным
const getters = {
 	CountPay: (state, getters) => state.CountPay
};

export default {
    state,
    getters,
    mutations
};