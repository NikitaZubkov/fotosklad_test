	/**
	 * Миксин для добавления товара в корзину
	 */

    // Подключение миксинов
import mixinNotification from './mixin-notification.js';

export default {
    mixins: [
        mixinNotification
    ],
	methods: {
        $_mixinAddProductBasket_SaveData (inf) {
	        this.$_mixinAddProductBasket_ChangeCountPay();
            this.$_mixinAddProductBasket_ChangeProductBasket(inf);
            this.$_mixinAddProductBasket_OpenNotification();
        },

            // Увеличиваем количество товаром в корзине
        $_mixinAddProductBasket_ChangeCountPay () {
            let CountPay = this.$store.getters.CountPay;
            CountPay++;

            this.$ls.set("CountPay", CountPay);
            this.$store.commit("set", { type: "CountPay", items: CountPay });
        },

            /** 
             * Добавляем новый товар в массив товаров для корзины
             * Формат объектов:
             *      Product: { camera: [{...}, {...}, ...]}
             *      ProductID: { camera: [112312312, 435434255, ...]}
             */
        $_mixinAddProductBasket_ChangeProductBasket (data) {
            let Product = this.$ls.get("ProductBasket", {}),
                ProductID = this.$ls.get("ProductBasketID", {});

                // Организовываем данные для текущей категории товаров для корзины
            if(Product[this.TypeProduct]) {
                Product[this.TypeProduct].push(data);
            } else {
                Product[this.TypeProduct] = [data];
            }

                // Организовываем данные для текущей категории товаров для анализа уже выбранных товаров
            if(ProductID[this.TypeProduct]) {
                ProductID[this.TypeProduct].push(data.id);
            } else {
                ProductID[this.TypeProduct] = [data.id];
            }

            this.$ls.set("ProductBasket", Product);
            this.$ls.set("ProductBasketID", ProductID);
        },

            // Вызов уведомления о добавлении товара в корзину
        $_mixinAddProductBasket_OpenNotification () {
            this.$_mixinNotification_AddBasket()
        },
	}
}