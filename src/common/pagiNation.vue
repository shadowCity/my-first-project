<template>
    <div class="page-content">
        <div class="totalNum" v-if="1!=all" :class="{'keepCenter':all==1,'keepLeft':all!=1}">
            <!-- <span>总计<i>{{total}}</i>条</span> --><span>第<i>{{cur}}</i>页</span></div>
        <div class="page-bar">
            <ul v-if="1!=all">
                <li><a v-on:click="cut" v-if='cutShow'>&lt;上一页</a></li>
                <li v-for="index in indexs" v-bind:class="{ active: cur == index}"><a v-on:click="btnClick(index)">{{ index }}</a></li>
                <li><a v-on:click="add">下一页&gt;</a></li>
                <!--  <li><a>共<i>{{all}}</i>页</a></li>-->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['cur', 'all', 'total'],
    compiled: function() {
        if (this.all == 0 || this.all == 1) {
            this.all = 1;
        }
    },
    data: function() {
        return {
            cutShow: false
        }
    },
    watch: {
        'cur': function(val) {
            if (val >= 2) {
                this.cutShow = true;
            } else {
                this.cutShow = false;
            }
        }
    },
    computed: {
        indexs: function() {
            var left = 1
            var right = this.all
            var ar = []
            if (this.all >= 11) {
                if (this.cur > 5 && this.cur < this.all - 4) {
                    left = this.cur - 5
                    right = this.cur + 4
                } else {
                    if (this.cur <= 5) {
                        left = 1
                        right = 10
                    } else {
                        right = this.all
                        left = this.all - 9
                    }
                }
            }
            while (left <= right) {
                ar.push(left)
                left++
            }
            return ar
        }
    },
    methods: {
        cut: function() {
            if (this.cur != 1) {
                this.cur--
                    $('.baselib-Container').animate({
                        scrollTop: 0
                    }, 500);
                $('.plantform-Container').animate({
                    scrollTop: 0
                }, 500);
            }

        },
        add: function() {
            if (this.cur != this.all) {
                this.cur++
                    $('.baselib-Container').animate({
                        scrollTop: 0
                    }, 500);
                $('.plantform-Container').animate({
                    scrollTop: 0
                }, 500);
            }

        },
        btnClick: function(data) {
            if (data != this.cur) {
                this.cur = data
                this.$dispatch('btn-click', data)
                $('.baselib-Container').animate({
                    scrollTop: 0
                }, 500);
                $('.plantform-Container').animate({
                    scrollTop: 0
                }, 500);
            }
        }
    }
}
</script>
<style scoped>
.keepCenter {
    margin-left: 50%;
}

.keepLeft {
    float: left;
}
</style>
