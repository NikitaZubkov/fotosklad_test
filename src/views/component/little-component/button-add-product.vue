<template>
    <div class="form__block-button m--inside" v-on:click="_Click_AddProduct">
        <button class="form__button-yellow" v-bind:class="{'m--active': Status}">
        	<template v-if="Status">
        		В корзине
        	</template>
        	<template v-else="Status">
        		Купить
        	</template>
        </button>
    </div>
</template>

<script>    
	export default {
		name: "product-item",
		props: ['AddProductStatus'],
		data () {
			return {
				Status: false,
			}
		},
		updated () {
			this._Init_TextButton();
		},
		mounted () {
			this._Init_TextButton();
		},
		methods: {
			_Click_AddProduct () {
				this._Init_TextButtonAdd();
				this.$parent.$emit("click-add-product", true);
			},

			_Init_TextButton () {
				if(this.AddProductStatus) {
					this._Init_TextButtonAdd();
				}
			},

			_Init_TextButtonAdd () {
				this.Status = true;
			}
		},
		watch: {
			AddProductStatus: function(newVal) {
				this.AddProductStatus = newVal;

				this._Init_TextButton();
			}
		}
	};
</script>