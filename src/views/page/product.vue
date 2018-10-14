<template>
	<div class="product">
		<div class="product__container">
			<div class="product__content-left">
				<div class="product__image" v-bind:style="'background-image: url('+ Product.src_image+ ');'"></div>
				<div class="product__stars">
					<span class="product__stars-text">Оцените пожалуйста наш товар:</span>
                	<star-rating
                		:increment="Stars.Increment"
                		:star-size="Stars.Size" 
                		:show-rating="Stars.ShowRating" 
                		:read-only="Stars.ReadOnly"
                		v-model="StarsRating">
                	</star-rating>
				</div>
				<div class="product__return" v-on:click="_Go_Back">Вернуться назад</div>
			</div>

			<div class="product__content-right">
				<div class="product__text">Наименование: {{ Product.name }}</div>
				<div class="product__text">Цена: {{ Product.price }} {{ Currency }}</div>
				<div class="product__text">Описание:</div>

				<div class="product__button">
					<ButtonAddProduct
						ref="ButtonAddProduct"
						v-bind:AddProductStatus="Product.AddProductStatus">
					</ButtonAddProduct>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
		// Подключение компонентов
	import ButtonAddProduct from "../component/little-component/button-add-product.vue";
	import StarRating from 'vue-star-rating';

        // Подключение миксинов
    import mixinAddProductBasket from '../../mixin/mixin-add-product-basket.js';

        // Подключение миксинов
    import mixinNotification from '../../mixin/mixin-notification.js';

	export default {
		name: "product",
		props: [],
		components: { 
            "star-rating": StarRating,
            ButtonAddProduct
		},
		mixins: [
			mixinAddProductBasket,
			mixinNotification
		],
		data () {
			return {
				Product: '',
				idProduct: this.$route.params.id,
				TypeProduct: this.$route.params.typeProduct,
                Stars: {
                    Size: 20,
                    ShowRating: false,
                    Increment: "0.5",
                    ReadOnly: false
                },

                StarsRatingFirst: 1,
                StarsRating: 1,

                Currency: ''
			}
		},
        mounted () {
                // Watch на добавление товара в корзину
            this.$on("click-add-product", inf => {
                this.$_mixinAddProductBasket_SaveData(this.Product);
            }); 

        	this._AJAX_GetData();
        },
		methods: {
				// Переход назад
			_Go_Back () {
				this.$router.go(-1);
			},

				// Проверяем, добавлен ли товар уже в корзину
			_Check_Data (data) {
                var ProductID = this.$ls.get("ProductBasketID", {}),
                    CurrentGroupID = ProductID[this.TypeProduct];

                if(CurrentGroupID) {
	                data = this._Check_DataFor(CurrentGroupID, data);
                }

                return data;
			},
			_Check_DataFor (CurrentGroupID, data) {
                for (let value of CurrentGroupID) {
                    if(data.id === value) {
                        data.AddProductStatus = true;
                    }
                }

                return data;
			},

			_Check_RaitingInit () {
	            var Rating = this.$ls.get("Rating", {}),
	            	RatingType = Rating[this.TypeProduct];

	                // Организовываем данные для текущей категории товаров для корзины
	            if(RatingType) {
	                this._Check_RaitingFor(RatingType)
	            }
			},
			_Check_RaitingFor (RatingType) {
                for (let value of RatingType) {
                	var key = Object.keys( value )[0];

                    if(key === this.idProduct) {
            			this.Stars.ReadOnly = true;
            			this.StarsRating = value[key];
                    }
                }
			},

				// Инициализация базовых данных на странице
			_Init_Data (data) {
				this.Product = data;

				this.StarsRatingFirst = data.stars;
				this.StarsRating = data.stars;

				if(data.currency === "RUR") {
					this.Currency = "р."
				}

				this._Check_RaitingInit();
			},

				/**
				 * Метод при выборе рейтинга для товара пользователем
				 * В данном методе предусматривается:
				 *	- Блокирование блока с рейтингом от повторного нажатия
				 *	- Сохранение рейтинга в LocalStorage
				 *	- Вызов уведомления об изменении рейтинга
				 *	- Запрос к серверу с сохранением голоса
				 */
			_Choose_StarsRating (newVal) {
					// Блокируем повторное голосование
				this.Stars.ReadOnly = true;

				this._Change_RatingLocal(newVal);

				this.$_mixinNotification_ChangeRating();

				this._AJAX_ChangeRating();
			},

				// Сохраняем рейтинг для текущей категории товаров для текущего товара
			_Change_RatingLocal (newVal) {
	            var Rating = this.$ls.get("Rating", {}),
	            	obj = {};

	            obj[this.idProduct] = newVal

	                // Организовываем данные для текущей категории товаров для корзины
	            if(Rating[this.TypeProduct]) {
	                Rating[this.TypeProduct].push(obj);
	            } else {
	                Rating[this.TypeProduct] = [obj];
	            }

	            this.$ls.set("Rating", Rating);
			},

			_AJAX_GetData () {
				/**
				 * В данном методе предполагается AJAX запрос
				 * с базовыми данными для получения полных данных по продукту
				 * Альтернативой является сохранение данных по кликнотому товару 
				 * Однако в при этом надо сразу же получать все данные по товару (или большую часть информации)
				 * В данном случае мы просто обращаемся к Vuex и получаем инофрмацию по Camera по определённому id
				 * который мы получили из роутера
				 */

				this.$store.dispatch("product_cat/getCameraID", {
					typeProduct: this.TypeProduct,
					id: this.idProduct
				}).then((data) => { 
		            if(data) {
		            	data = this._Check_Data(data);
		            	this._Init_Data(data)
		            }
		        });
			},

			_AJAX_ChangeRating () {
				/**
				 * В данном методе предполагается запрос к серверу для сохранения рейтинга в БД
				 */
			}
		},
		watch: {
			StarsRating: function(newVal) {
				if(newVal !== this.StarsRatingFirst) {
					this._Choose_StarsRating(newVal);
				}
			}
		}
	};
</script>