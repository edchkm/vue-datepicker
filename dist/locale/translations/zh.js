!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).zh=e()}(this,(function(){"use strict";const t=new class{constructor(t,e,n,s){let h=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=arguments.length>5&&void 0!==arguments[5]&&arguments[5],o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"";this.language=t,this.months=e,this.monthsAbbr=n,this.days=s,this.rtl=h,this.ymd=r,this.yearSuffix=o}get language(){return this._language}set language(t){if("string"!=typeof t)throw new TypeError("Language must be a string");this._language=t}get months(){return this._months}set months(t){if(12!==t.length)throw new RangeError(`There must be 12 months for ${this.language} language`);this._months=t}get monthsAbbr(){return this._monthsAbbr}set monthsAbbr(t){if(12!==t.length)throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);this._monthsAbbr=t}get days(){return this._days}set days(t){if(7!==t.length)throw new RangeError(`There must be 7 days for ${this.language} language`);this._days=t}getDaysStartingOn(t){const e=this._days.slice(t),n=this._days.slice(0,t);return e.concat(n)}getMonthByAbbrName(t){const e=this._monthsAbbr.findIndex((e=>e===t))+1;return e<10?`0${e}`:`${e}`}getMonthByName(t){const e=this._months.findIndex((e=>e===t))+1;return e<10?`0${e}`:`${e}`}}("Chinese",["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],["日","一","二","三","四","五","六"],!1,!1,"年");return t}));
