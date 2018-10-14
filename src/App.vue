<template>
    <div id="app" class="wrap">
        <header class="header">
            <div class="header__container">
                <nav></nav>
                <div class="header__basket">
                    <div class="header__basket-count">{{ CountPay }}</div>
                    <div class="header__basket-icon"></div>
                </div>
            </div>
        </header>

        <router-view></router-view>

        <notifications group="foo" />
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                CountPay: ''
            }
        },
        mounted () {
            this.CountPay = this.$ls.get('CountPay', 0);
            this.$store.commit("set", { type: "CountPay", items: this.CountPay });

                // Прослушка изменения статусов открытия меню
            this.$store.watch(() => this.$store.getters.CountPay, res => {
                this.CountPay = res;
            }, {
                immediate: true
            });
        }
    }
</script>
