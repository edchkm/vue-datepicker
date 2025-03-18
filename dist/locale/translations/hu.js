!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).hu=e()}(this,(function(){"use strict";var t=new class{constructor(t,e,n,s){let r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=arguments.length>5&&void 0!==arguments[5]&&arguments[5],h=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"";this.language=t,this.months=e,this.monthsAbbr=n,this.days=s,this.rtl=r,this.ymd=i,this.yearSuffix=h}get language(){return this._language}set language(t){if("string"!=typeof t)throw new TypeError("Language must be a string");this._language=t}get months(){return this._months}set months(t){if(12!==t.length)throw new RangeError(`There must be 12 months for ${this.language} language`);this._months=t}get monthsAbbr(){return this._monthsAbbr}set monthsAbbr(t){if(12!==t.length)throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);this._monthsAbbr=t}get days(){return this._days}set days(t){if(7!==t.length)throw new RangeError(`There must be 7 days for ${this.language} language`);this._days=t}getDaysStartingOn(t){const e=this._days.slice(t),n=this._days.slice(0,t);return e.concat(n)}getMonthByAbbrName(t){const e=this._monthsAbbr.findIndex((e=>e===t))+1;return e<10?`0${e}`:`${e}`}getMonthByName(t){const e=this._months.findIndex((e=>e===t))+1;return e<10?`0${e}`:`${e}`}}("Hungarian",["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],["Jan","Febr","Márc","Ápr","Máj","Jún","Júl","Aug","Szept","Okt","Nov","Dec"],["Vas","Hét","Ke","Sze","Csü","Pén","Szo"]);return t}));
