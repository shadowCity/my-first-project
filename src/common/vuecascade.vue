<template>
    <div id="vuecascade">
        <i-select :model.sync="prov" size="small" v-on:on-change="JSprovCheck" label-in-value placeholder="请选择拍摄省份" name="require">
            <i-option v-for="item in provList" :value="item.value">{{ item.label}}</i-option>
        </i-select>
        <i-select :model.sync="city" size="small" :disabled="cityDisabled" placeholder="请选择拍摄城市" v-on:on-change="JScityCheck">
            <i-option v-for="item in cityList" :value="item.value" data-fatherId="cityFatherId">{{ item.label }}</i-option>
        </i-select>
        <i-select :model.sync="country" size="small" :disabled="countryDisabled" placeholder="请选择拍摄区/县">
            <i-option v-for="item in countryList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
        <input id="detail" placeholder="详细地址" class="detail detailinput" transition="opacityfadeindown" maxlength="60" v-model="street">
        <i class="icon-req icon-req-select">*</i>
    </div>
</template>
<script>
var data = require('../libs/cascade/city.min').data;
var provListData = [];
var cityListData = [];
var countryListData = [];
import {
    iSelect,
    iOption
} from 'iview';
module.exports = {
    //父组件数据的属性
    props: ['cascadeopt'],
    //数据对象
    data: function() {
        return {
            prov: '',
            city: '',
            country: '',
            street: '',
            provList: "",
            cityList: "",
            countryList: "",
            cityDisabled: true,
            countryDisabled: true,
            cityClearable: false,
            countryClearable: false,
            cityFatherId: "",
        };
    },
    components: {
        iSelect,
        iOption
    },
    methods: {},
    compiled: function() {

    },
    watch: {
        'city': function(val) {

        }
    },
    ready: function() {
        // 填充省
        var provListItem, cityListItem, countryListItem;
        for (var i = 0; i < data.citylist.length; i++) {
            provListItem = {
                "value": i,
                "label": data.citylist[i].p
            };
            provListData.push(provListItem);
        }
        this.provList = provListData;
    },
    methods: {
        // 填充城市
        JSprovCheck: function(provData) {
            var cityListItem = {};
            var num = provData.value;
            cityListData = []; //清空城市数据
            this.cityList = []; //清空城市数据
            this.countryList = []; //清空县区数据
            this.city = '';
            // this.country = '';
            if (typeof data.citylist[num].c == "undefined") {
                this.countryDisabled = true; //如果没有城市则禁掉市区
                this.cityDisabled = true; //如果没有城市则禁掉城市
                return;
            };
            var arrayData = data.citylist[num].c; //城市数组
            this.cityFatherId = num;
            // 构造数组
            for (var i = 0; i < arrayData.length; i++) {
                cityListItem = {
                    "value": i,
                    "label": arrayData[i].n
                };
                cityListData.push(cityListItem);
            }
            //填充数据
            this.cityList = cityListData;
            this.cityDisabled = false; //有数据则放开城市选择按钮
        },
        // 填充市区
        JScityCheck: function(cityData) {
            var countryListItem = {};
            var num = cityData;
            countryListData = []; //清空市区数据
            this.countryList = []; //清空市区数据
            this.country = '';
            if (cityData == "" || typeof data.citylist[this.cityFatherId].c[num].a == "undefined") {
                this.countryDisabled = true;
                return;
            };
            // 构造数组
            var arrayData = data.citylist[this.cityFatherId].c[num].a;
            for (var i = 0; i < arrayData.length; i++) {
                countryListItem = {
                    "value": i,
                    "label": arrayData[i].s
                };
                countryListData.push(countryListItem);
            }
            //填充数据
            this.countryList = countryListData;
            this.countryDisabled = false;
        }
    }
}
</script>
<style scoped>
#vuecascade {
    position: relative;
    margin: 0px 10px;
}

label {
    margin-right: 2px;
}

#vuecascade .ivu-select  {
    width: 100%;
    height: 22px;
    margin-bottom: 10px;
    margin-left: 2px;
    margin-right: 2px;
    /*border: solid 1px #ccc;*/
    text-align: left;
}

#vuecascade .detailinput {
    width: 100%;
    height: 22px;
    margin-left: 2px;
    margin-right: 2px;
    border: solid 1px #ccc;
    text-align: left;
}
</style>
