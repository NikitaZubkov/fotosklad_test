	/**
	 * Миксин для вызова уведомлений
	 */

export default {
	methods: {
		$_mixinNotification_AddBasket () {
			this.$notify({
			  	group: 'foo',
			  	title: 'Добавление в корзину',
			  	text: 'Ваш товар добавлен в корзину',
			  	position: 'top right',
			});
		},

		$_mixinNotification_ChangeRating () {
			this.$notify({
			  	group: 'foo',
			  	title: 'Спасибо!',
			  	text: 'Ваш голос учтен',
			  	position: 'top right',
			});
		},
	}
}