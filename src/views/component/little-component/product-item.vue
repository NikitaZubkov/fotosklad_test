<template>
    <div class="product-item">
		<div class="product-item__container">
			<router-link class="product-item__link" v-bind:to="item.href"></router-link>

	        <template v-if="item.promotion">
	            <div class="product-item__promoution-percent">
	                <span>-{{ item.promotion_percent }}%</span>
	            </div>
	        </template>

	        <div class="product-item__action">
	            <div class="product-item__like"></div>
	            <div class="product-item__stat"></div>
	        </div>

	        <div class="product-item__image" v-bind:style="'background-image: url('+ item.src_image+ ');'"></div>
	        <div class="product-item__content">
	            <div class="product-item__heading">
	                <span class="product-item__heading-text">{{ item.name }}</span>
	            </div>
	            <div class="product-item__information">
	            	<div class="product-item__community">
		                <div class="product-item__stars">
		                	<star-rating 
		                		:increment="Stars.Increment"
		                		:inline="Stars.Inline" 
		                		:star-size="Stars.Size" 
		                		:read-only="Stars.Read" 
		                		:show-rating="Stars.ShowRating" 
		                		:rating="Stars.Rating">
		                	</star-rating>
		                </div>
		                <div class="product-item__comment">
		                    <span class="product-item__comment-text">{{ item.comment_count }}</span>
		                </div>
	            	</div>

	                <div class="product-item__presence">
	                    <span class="product-item__presence-icon" v-bind:class="{'m--green': item.presence }"></span>
	                    <span class="product-item__presence-text">
	                        <template v-if="!item.presence">нет </template>
	                        в наличии
	                    </span>
	                </div>
	            </div>
	            <div class="product-item__continuation">
	                <template v-if="item.promotion">
	                    <div class="product-item__promoution-price">
	                        <span class="product-item__promoution-text">{{ item.promotion_price }} {{ Currency }}</span>
	                    </div>
	                </template>
					
					<template v-if="item.presence">
		                <div class="product-item__price">
		                    <span class="product-item__price-text">{{ item.price }} {{ Currency }}</span>
		                </div>

		                <div class="product-item__button">
							<ButtonAddProduct
								ref="ButtonAddProduct"
								v-bind:AddProductStatus="item.AddProductStatus">
							</ButtonAddProduct>
			            </div>
		            </template>
	            </div>
	        </div>
		</div>
    </div>
</template>

<script>    
		// Подключение компонентов
	import ButtonAddProduct from "./button-add-product.vue"
	import StarRating from 'vue-star-rating';

	export default {
		name: "product-item",
		props: ['item', 'index', 'stars'],
		components: { 
            "star-rating": StarRating,
            ButtonAddProduct
		},
		data () {
			return {
				Currency: "",
                Stars: {
                    Inline: true,
                    Size: 10,
                    Read: true,
                    ShowRating: false,
                    Increment: "0.5",
                    Rating: this.stars
                }
			}
		},
		mounted () {
                // Watch на добавление товара в корзину
            this.$on("click-add-product", inf => {
            	this.$parent.$emit("click-add-product", this.item);
            }); 

			if(this.item.currency === "RUR") {
				this.Currency = "р."
			}
		},
	};
</script>