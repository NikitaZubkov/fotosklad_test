<template>
	<div class="product-cat">
        <div class="product-cat__content">
            <div class="product-cat__list">
                <template v-for="(item, index) of Product">
                    <ProductItem
                        v-bind:item="item"
                        v-bind:index="index"
                        v-bind:stars="item.stars"
                    ></ProductItem>    
                </template>
            </div>
        </div>
	</div>
</template>

<script>
        // Подключение компонентов
    import ProductItem from '../component/little-component/product-item.vue';

        // Подключение миксинов
    import mixinAddProductBasket from '../../mixin/mixin-add-product-basket.js';

        // Подключение методов Vuex
    import { mapGetters } from 'vuex';

	export default {
    	name: "product-cat",
        props: [],
		components: {
            ProductItem
		},
        mixins: [
            mixinAddProductBasket
        ],
		data () {
            return {
            }
        },
        mounted () {
                // Watch на добавление товара в корзину
            this.$on("click-add-product", inf => {
                this.$_mixinAddProductBasket_SaveData(inf);
            }); 

            this._AJAX_GetData();
        },
        methods: {
                /**
                 * Проверяем полученные данные для текущей страницы с LocalStorage на предмет уже выбранных товаров
                 * Сначала из LocalStorage мы получаем данные для выбранной категории товаров
                 * Далее обходим полученные данные на предмет повторяющихся id из LocalStorage
                 * В случае совпадения id, добавляется статус о уже выбранности товара
                 * 
                 * Данный алгоритм может использоваться только в случае ограничения входящих данных до 50-100 товаров разом на странице
                 */
            _Check_DataAJAX () {
                var ProductID = this.$ls.get("ProductBasketID", {}),
                    CurrentGroupID = ProductID[this.TypeProduct];

                if(CurrentGroupID && CurrentGroupID.length) {
                    this._Check_DataLocal(CurrentGroupID);
                }
            },
            _Check_DataLocal (ProductID) {
                for (let value of this.Product) {
                    var id = value.id;

                    if(ProductID.includes(id)) {
                        value.AddProductStatus = true;
                    } else {
                        value.AddProductStatus = false;
                    }
                }
            },

            _AJAX_GetData () {
                /**
                    Данный метод предполагается запускать в начале загрузки страницы
                    Алгоритм следующий:
                        - Если данные (статус получения данных во Vuex) есть, то просто берём из хранилища и вставляем на странице
                        - В противном случае помощью Axios делаем запрос к серверу для получения данных для текущей категории товаров
                        - Сохраняем во Vuex полученный результат
                        - Сохраняем полученный результат в компоненте в Product (в данном случае это всё заменяется получением из Vuex уже готовых данных)
                        - Сохраняем статус получения данных, чтобы при повторном заходе на страницу (при условии, что не было перезагрузки страницы) не делался лишний запрос
                        - Проверяем, какие товары уже добавлены в корзину (соотнося данные из localstorage и полученные)
                */

                this._Check_DataAJAX();
            }
        },
        computed: {
            TypeProduct: function () {
                return "Camera";            // Вместо строки здесь должно быть значение, передаваемое из роутера по типу товара. К примеру phone, tv, audio...
            },
            ...mapGetters({
                Product: 'product_cat/Camera',
            })
        }
	}
</script>