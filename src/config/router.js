import VueRouter from 'vue-router';

    // Подключение компонентов страниц
import ProductCat from '../views/page/product-cat.vue';
import Product from '../views/page/product.vue';

    // Роутинг
const router = new VueRouter({
/*          // removes # (hashtag) from url
        mode: 'history', 
        base: '/',
        fallback: true,
*/
        routes: [
            { name: 'product-cat'   , path: '/'                                 , component: ProductCat     },
            { name: 'Product'       , path: '/products/:typeProduct/:name&:id'  , component: Product        },
            { name: 'all'           , path: '*'                                 , redirect: '/'             }
        ]
});

export default router