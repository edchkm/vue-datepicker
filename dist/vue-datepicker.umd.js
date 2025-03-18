var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("vue")) : typeof define === "function" && define.amd ? define(["vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Datepicker = factory(global.Vue));
})(this, function(vue) {
  "use strict";
  class Language {
    constructor(language, months, monthsAbbr, days, rtl = false, ymd = false, yearSuffix = "") {
      this.language = language;
      this.months = months;
      this.monthsAbbr = monthsAbbr;
      this.days = days;
      this.rtl = rtl;
      this.ymd = ymd;
      this.yearSuffix = yearSuffix;
    }
    get language() {
      return this._language;
    }
    set language(language) {
      if (typeof language !== "string") {
        throw new TypeError("Language must be a string");
      }
      this._language = language;
    }
    get months() {
      return this._months;
    }
    set months(months) {
      if (months.length !== 12) {
        throw new RangeError(
          `There must be 12 months for ${this.language} language`
        );
      }
      this._months = months;
    }
    get monthsAbbr() {
      return this._monthsAbbr;
    }
    set monthsAbbr(monthsAbbr) {
      if (monthsAbbr.length !== 12) {
        throw new RangeError(
          `There must be 12 abbreviated months for ${this.language} language`
        );
      }
      this._monthsAbbr = monthsAbbr;
    }
    get days() {
      return this._days;
    }
    set days(days) {
      if (days.length !== 7) {
        throw new RangeError(`There must be 7 days for ${this.language} language`);
      }
      this._days = days;
    }
    getDaysStartingOn(firstDayOfWeek) {
      const firstDays = this._days.slice(firstDayOfWeek);
      const lastDays = this._days.slice(0, firstDayOfWeek);
      return firstDays.concat(lastDays);
    }
    getMonthByAbbrName(name) {
      const monthValue = this._monthsAbbr.findIndex((month) => month === name) + 1;
      return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
    }
    getMonthByName(name) {
      const monthValue = this._months.findIndex((month) => month === name) + 1;
      return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
    }
  }
  const en = new Language(
    "English",
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  );
  const calendarSlots = [
    "beforeCalendarHeaderDay",
    "calendarFooterDay",
    "beforeCalendarHeaderMonth",
    "calendarFooterMonth",
    "beforeCalendarHeaderYear",
    "calendarFooterYear",
    "nextIntervalBtn",
    "prevIntervalBtn"
  ];
  const getParsableDate = ({
    dateStr,
    formatStr,
    translation,
    currentYear,
    time
  }) => {
    const splitter = formatStr.match(/-|\/|\s|\./) || ["-"];
    const df = formatStr.split(splitter[0]);
    const ds = dateStr.split(splitter[0]);
    const ymd = [currentYear.toString(), "01", "01"];
    for (let i = 0; i < df.length; i += 1) {
      if (/yyyy/i.test(df[i])) {
        ymd[0] = ds[i];
      } else if (/mmmm/i.test(df[i])) {
        ymd[1] = translation.getMonthByName(ds[i]);
      } else if (/mmm/i.test(df[i])) {
        ymd[1] = translation.getMonthByAbbrName(ds[i]);
      } else if (/mm/i.test(df[i])) {
        ymd[1] = ds[i];
      } else if (/m/i.test(df[i])) {
        ymd[1] = ds[i];
      } else if (/dd/i.test(df[i])) {
        ymd[2] = ds[i];
      } else if (/d/i.test(df[i])) {
        const tmp = ds[i].replace(/st|rd|nd|th/g, "");
        ymd[2] = tmp < 10 ? `0${tmp}` : `${tmp}`;
      }
    }
    return `${ymd.join("-")}${time}`;
  };
  function parseDateWithLibrary(dateStr, format, parser) {
    if (typeof parser !== "function") {
      throw new Error("Parser needs to be a function");
    }
    if (typeof format !== "function") {
      throw new Error("Format needs to be a function when using a custom parser");
    }
    return parser(dateStr);
  }
  const utils = {
    useUtc: false,
    getFullYear(date) {
      return this.useUtc ? date.getUTCFullYear() : date.getFullYear();
    },
    getMonth(date) {
      return this.useUtc ? date.getUTCMonth() : date.getMonth();
    },
    getDaysInMonth(date) {
      return this.daysInMonth(this.getFullYear(date), this.getMonth(date));
    },
    getDate(date) {
      return this.useUtc ? date.getUTCDate() : date.getDate();
    },
    getDay(date) {
      return this.useUtc ? date.getUTCDay() : date.getDay();
    },
    getHours(date) {
      return this.useUtc ? date.getUTCHours() : date.getHours();
    },
    getMinutes(date) {
      return this.useUtc ? date.getUTCMinutes() : date.getMinutes();
    },
    setFullYear(date, value) {
      return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value);
    },
    setMonth(date, value) {
      return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value);
    },
    setDate(date, value) {
      return this.useUtc ? date.setUTCDate(value) : date.setDate(value);
    },
    compareDates(date1, date2) {
      if (date1 === null && date2 === null) {
        return true;
      }
      if (date1 !== null && date2 === null || date2 !== null && date1 === null) {
        return false;
      }
      const d1 = new Date(date1.valueOf());
      const d2 = new Date(date2.valueOf());
      this.resetDateTime(d1);
      this.resetDateTime(d2);
      return d1.valueOf() === d2.valueOf();
    },
    isValidDate(date) {
      if (Object.prototype.toString.call(date) !== "[object Date]") {
        return false;
      }
      return !Number.isNaN(date.valueOf());
    },
    getDayNameAbbr(date, days) {
      if (typeof date !== "object") {
        throw TypeError("Invalid Type");
      }
      return days[this.getDay(date)];
    },
    getDayFromAbbr(abbr) {
      for (let i = 0; i < en.days.length; i += 1) {
        if (abbr.toLowerCase() === en.days[i].toLowerCase()) {
          return i;
        }
      }
      throw TypeError("Invalid week day");
    },
    getMonthName(month, months) {
      if (!months) {
        throw Error("missing 2nd parameter Months array");
      }
      if (typeof month === "object") {
        return months[this.getMonth(month)];
      }
      if (typeof month === "number") {
        return months[month];
      }
      throw TypeError("Invalid type");
    },
    getMonthNameAbbr(month, monthsAbbr) {
      if (!monthsAbbr) {
        throw Error("missing 2nd parameter Months array");
      }
      if (typeof month === "object") {
        return monthsAbbr[this.getMonth(month)];
      }
      if (typeof month === "number") {
        return monthsAbbr[month];
      }
      throw TypeError("Invalid type");
    },
    daysInMonth(year, month) {
      if (/8|3|5|10/.test(month.toString())) {
        return 30;
      }
      if (month === 1) {
        return !(year % 4) && year % 100 || !(year % 400) ? 29 : 28;
      }
      return 31;
    },
    getNthSuffix(day) {
      switch (day) {
        case 1:
        case 21:
        case 31:
          return "st";
        case 2:
        case 22:
          return "nd";
        case 3:
        case 23:
          return "rd";
        default:
          return "th";
      }
    },
    formatDate(date, formatStr, translation = en) {
      const year = this.getFullYear(date);
      const month = this.getMonth(date) + 1;
      const day = this.getDate(date);
      const matches = {
        d: day,
        dd: `0${day}`.slice(-2),
        E: this.getDayNameAbbr(date, translation.days),
        o: this.getNthSuffix(this.getDate(date)),
        M: month,
        MM: `0${month}`.slice(-2),
        MMM: this.getMonthNameAbbr(this.getMonth(date), translation.monthsAbbr),
        MMMM: this.getMonthName(this.getMonth(date), translation.months),
        yy: String(year).slice(2),
        yyyy: year
      };
      const REGEX_FORMAT = /y{4}|y{2}|M{1,4}|d{1,2}|o|E/g;
      return formatStr.replace(REGEX_FORMAT, (match) => matches[match]);
    },
    parseDate(dateStr, format, translation = en, parser = null) {
      if (!(dateStr && format)) {
        return dateStr;
      }
      if (parser) {
        return parseDateWithLibrary(dateStr, format, parser);
      }
      const parseableDate = getParsableDate({
        dateStr,
        formatStr: format,
        translation,
        currentYear: this.getFullYear(new Date()),
        time: this.getTime()
      });
      const parsedDate = Date.parse(parseableDate);
      if (Number.isNaN(parsedDate)) {
        return dateStr;
      }
      return new Date(parsedDate);
    },
    getTime() {
      const time = "T00:00:00";
      return this.useUtc ? `${time}Z` : time;
    },
    resetDateTime(date) {
      return new Date(
        this.useUtc ? date.setUTCHours(0, 0, 0, 0) : date.setHours(0, 0, 0, 0)
      );
    },
    monthYearDate(year, monthIndex) {
      return this.useUtc ? new Date(Date.UTC(year, monthIndex, 1)) : new Date(year, monthIndex, 1);
    },
    getNewDateObject(date) {
      return date ? this.resetDateTime(new Date(date)) : this.resetDateTime(new Date());
    }
  };
  const makeDateUtils = (useUtc) => __spreadProps(__spreadValues({}, utils), {
    useUtc
  });
  const _sfc_main$a = {
    props: {
      autofocus: {
        type: Boolean,
        default: false
      },
      bootstrapStyling: {
        type: Boolean,
        default: false
      },
      clearButton: {
        type: Boolean,
        default: null
      },
      calendarButton: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      format: {
        type: [String, Function],
        default: "dd MMM yyyy"
      },
      id: {
        type: String,
        default: null
      },
      inline: {
        type: Boolean,
        default: false
      },
      inputClass: {
        type: [String, Object, Array],
        default: null
      },
      maxlength: {
        type: [Number, String],
        default: null
      },
      name: {
        type: String,
        default: null
      },
      openDate: {
        type: [String, Date, Number],
        default: null
      },
      parser: {
        type: Function,
        default: null
      },
      pattern: {
        type: String,
        default: null
      },
      placeholder: {
        type: String,
        default: null
      },
      refName: {
        type: String,
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      showCalendarOnButtonClick: {
        type: Boolean,
        default: false
      },
      showCalendarOnFocus: {
        type: Boolean,
        default: false
      },
      tabindex: {
        type: [Number, String],
        default: null
      },
      typeable: {
        type: Boolean,
        default: false
      },
      useUtc: {
        type: Boolean,
        default: false
      }
    }
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$9 = {
    name: "DateInput",
    mixins: [_sfc_main$a],
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      selectedDate: {
        type: Date,
        default: null
      },
      translation: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    emits: {
      blur: null,
      clearDate: null,
      close: null,
      focus: null,
      open: null,
      selectTypedDate: (date) => {
        return date === null || date instanceof Date;
      },
      setFocus: (refArray) => {
        return refArray.every((ref) => {
          return [
            "calendarButton",
            "input",
            "prev",
            "up",
            "next",
            "tabbableCell"
          ].includes(ref);
        });
      },
      tab: null,
      typedDate: (date) => {
        return date === null || date instanceof Date;
      }
    },
    data() {
      return {
        input: null,
        isInputFocused: false,
        shouldToggleOnFocus: false,
        shouldToggleOnClick: true,
        typedDate: "",
        utils: makeDateUtils(this.useUtc)
      };
    },
    computed: {
      computedInputClass() {
        if (this.bootstrapStyling) {
          if (typeof this.inputClass === "string") {
            return [this.inputClass, "form-control"].join(" ");
          }
          return __spreadValues({ "form-control": true }, this.inputClass);
        }
        return this.inputClass;
      },
      formattedValue() {
        if (this.typeable) {
          return this.typedDate;
        }
        return this.formatDate(this.selectedDate);
      }
    },
    watch: {
      showCalendarOnFocus: {
        immediate: true,
        handler(showCalendarOnFocus) {
          if (showCalendarOnFocus) {
            this.shouldToggleOnFocus = !this.isOpen;
          }
        }
      },
      isOpen(isOpen, wasOpen) {
        this.$nextTick(() => {
          if (isOpen && this.showCalendarOnFocus) {
            if (wasOpen && !this.isInputFocused) {
              this.shouldToggleOnFocus = true;
              return;
            }
            this.shouldToggleOnFocus = false;
          }
        });
      },
      selectedDate: {
        immediate: true,
        handler(selectedDate) {
          if (this.typeable) {
            this.typedDate = this.formatDate(selectedDate);
          }
        }
      }
    },
    mounted() {
      this.input = this.$el.querySelector("input");
    },
    methods: {
      clearDate() {
        this.input.value = "";
        this.$emit("clearDate");
      },
      formatDate(date) {
        if (!date) {
          return "";
        }
        return typeof this.format === "function" ? this.format(new Date(date)) : this.utils.formatDate(new Date(date), this.format, this.translation);
      },
      formatTypedDate() {
        const parsedDate = this.parseInput();
        if (this.utils.isValidDate(parsedDate)) {
          this.typedDate = this.formatDate(parsedDate);
        } else {
          this.input.value = "";
          this.typedDate = "";
        }
      },
      handleInputBlur() {
        if (this.showCalendarOnFocus && !this.isOpen) {
          this.shouldToggleOnFocus = true;
        }
        if (this.typeable) {
          this.formatTypedDate();
        }
        this.isInputFocused = false;
      },
      handleButtonFocus() {
        if (this.showCalendarOnFocus) {
          this.shouldToggleOnFocus = true;
        }
      },
      handleDelete() {
        if (!this.typeable && this.selectedDate) {
          this.clearDate();
        }
      },
      handleInputClick() {
        if (this.showCalendarOnButtonClick)
          return;
        if (this.shouldToggleOnClick) {
          this.toggle();
        }
      },
      handleInputFocus() {
        this.isInputFocused = true;
        if (!this.isOpen && this.shouldToggleOnFocus) {
          this.shouldToggleOnClick = false;
        }
        if (this.shouldToggleOnFocus && !this.isOpen) {
          this.$emit("open");
          setTimeout(() => {
            this.shouldToggleOnClick = true;
          }, 300);
        }
      },
      handleKeydownDown() {
        if (!this.isOpen) {
          this.$emit("open");
        }
        if (!this.typeable) {
          return;
        }
        this.$emit("setFocus", ["prev", "up", "next", "tabbableCell"]);
      },
      handleKeydownEnter() {
        if (!this.typeable) {
          return;
        }
        if (!this.input.value) {
          this.$emit("selectTypedDate", null);
          return;
        }
        const parsedDate = this.parseInput();
        if (this.utils.isValidDate(parsedDate)) {
          this.$emit("selectTypedDate", parsedDate);
        }
      },
      handleKeydownEscape() {
        if (this.isOpen) {
          this.$emit("close");
        }
      },
      handleKeydownSpace(event) {
        if (!this.typeable) {
          event.preventDefault();
        }
      },
      handleKeyup(event) {
        if (!this.typeable || [
          "Control",
          "Escape",
          "Shift",
          "Tab",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight"
        ].includes(event.key)) {
          return;
        }
        this.typedDate = this.input.value;
        if (!this.input.value) {
          this.$emit("typedDate", null);
          return;
        }
        const parsedDate = this.parseInput();
        if (this.utils.isValidDate(parsedDate)) {
          this.$emit("typedDate", parsedDate);
        }
      },
      handleKeyupSpace(event) {
        if (this.typeable) {
          if (this.input.value === "") {
            this.toggle();
          }
          return;
        }
        event.preventDefault();
        if (!this.showCalendarOnButtonClick) {
          this.toggle();
        }
      },
      parseInput() {
        return new Date(
          this.utils.parseDate(
            this.input.value.trim(),
            this.format,
            this.translation,
            this.parser
          )
        );
      },
      toggle(calendarButton) {
        if (this.isOpen) {
          this.$emit("setFocus", [calendarButton || "input"]);
        }
        this.$emit(this.isOpen ? "close" : "open");
      }
    }
  };
  const _hoisted_1$6 = ["disabled"];
  const _hoisted_2$6 = ["id", "autofocus", "clear-button", "disabled", "maxlength", "name", "pattern", "placeholder", "readonly", "required", "tabindex", "type", "value"];
  const _hoisted_3$5 = ["disabled"];
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass({ "input-group": _ctx.bootstrapStyling })
    }, [
      vue.renderSlot(_ctx.$slots, "beforeDateInput"),
      _ctx.calendarButton ? (vue.openBlock(), vue.createElementBlock("button", {
        key: 0,
        ref: "calendarButton",
        class: vue.normalizeClass(["vdp-datepicker__calendar-button", { "btn input-group-prepend": _ctx.bootstrapStyling }]),
        "data-test-calendar-button": "",
        disabled: _ctx.disabled,
        type: "button",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.toggle("calendarButton")),
        onFocus: _cache[1] || (_cache[1] = (...args) => $options.handleButtonFocus && $options.handleButtonFocus(...args))
      }, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass({ "input-group-text": _ctx.bootstrapStyling })
        }, [
          vue.renderSlot(_ctx.$slots, "calendarBtn", {}, () => [
            vue.createTextVNode("\u2026")
          ])
        ], 2)
      ], 42, _hoisted_1$6)) : vue.createCommentVNode("", true),
      vue.createElementVNode("input", {
        id: _ctx.id,
        ref: _ctx.refName,
        autocomplete: "off",
        autofocus: _ctx.autofocus,
        class: vue.normalizeClass($options.computedInputClass),
        "clear-button": _ctx.clearButton,
        "data-test-input": "",
        disabled: _ctx.disabled,
        maxlength: _ctx.maxlength,
        name: _ctx.name,
        pattern: _ctx.pattern,
        placeholder: _ctx.placeholder,
        readonly: !_ctx.typeable,
        required: _ctx.required,
        tabindex: _ctx.tabindex,
        type: _ctx.inline ? "hidden" : null,
        value: $options.formattedValue,
        onBlur: _cache[2] || (_cache[2] = (...args) => $options.handleInputBlur && $options.handleInputBlur(...args)),
        onClick: _cache[3] || (_cache[3] = (...args) => $options.handleInputClick && $options.handleInputClick(...args)),
        onFocus: _cache[4] || (_cache[4] = (...args) => $options.handleInputFocus && $options.handleInputFocus(...args)),
        onKeydown: [
          _cache[5] || (_cache[5] = vue.withKeys((...args) => $options.handleDelete && $options.handleDelete(...args), ["delete"])),
          _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers((...args) => $options.handleKeydownDown && $options.handleKeydownDown(...args), ["prevent"]), ["down"])),
          _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => $options.handleKeydownEnter && $options.handleKeydownEnter(...args), ["prevent"]), ["enter"])),
          _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers((...args) => $options.handleKeydownEscape && $options.handleKeydownEscape(...args), ["prevent"]), ["esc"])),
          _cache[9] || (_cache[9] = vue.withKeys(($event) => $options.handleKeydownSpace($event), ["space"])),
          _cache[10] || (_cache[10] = vue.withKeys(($event) => _ctx.$emit("tab", $event), ["tab"]))
        ],
        onKeyup: [
          _cache[11] || (_cache[11] = ($event) => $options.handleKeyup($event)),
          _cache[12] || (_cache[12] = vue.withKeys(($event) => $options.handleKeyupSpace($event), ["space"]))
        ]
      }, null, 42, _hoisted_2$6),
      _ctx.clearButton && $props.selectedDate ? (vue.openBlock(), vue.createElementBlock("button", {
        key: 1,
        class: vue.normalizeClass(["vdp-datepicker__clear-button", { "btn input-group-append": _ctx.bootstrapStyling }]),
        "data-test-clear-button": "",
        disabled: _ctx.disabled,
        type: "button",
        onClick: _cache[13] || (_cache[13] = (...args) => $options.clearDate && $options.clearDate(...args))
      }, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass({ "input-group-text": _ctx.bootstrapStyling })
        }, [
          vue.renderSlot(_ctx.$slots, "clearBtn", {}, () => [
            vue.createTextVNode("\xD7")
          ])
        ], 2)
      ], 10, _hoisted_3$5)) : vue.createCommentVNode("", true),
      vue.renderSlot(_ctx.$slots, "afterDateInput")
    ], 2);
  }
  const DateInput = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$6]]);
  const cellUtils = {
    isDefined(obj, prop) {
      return obj && typeof obj[prop] !== "undefined";
    },
    hasArray(obj, prop) {
      return obj && Array.isArray(obj[prop]);
    },
    hasDate(obj, prop) {
      return this.isDefined(obj, prop) && this.utils.isValidDate(obj[prop]);
    },
    dayMonthYear(obj, prop) {
      const { utils: utils2 } = this;
      const hasDate = this.hasDate(obj, prop);
      if (!hasDate) {
        return {
          day: void 0,
          month: void 0,
          year: void 0
        };
      }
      const d = obj[prop];
      return {
        day: utils2.getDate(d),
        month: utils2.getMonth(d),
        year: utils2.getFullYear(d)
      };
    }
  };
  const makeCellUtils = (utils2) => __spreadProps(__spreadValues({}, cellUtils), {
    utils: utils2
  });
  class DisabledDate {
    constructor(utils2, disabledDates) {
      this._utils = utils2;
      this._disabledDates = disabledDates;
    }
    get config() {
      const disabledDates = this._disabledDates;
      const utils2 = makeCellUtils(this._utils);
      const has = {
        customPredictor: utils2.isDefined(disabledDates, "customPredictor"),
        daysOfMonth: utils2.hasArray(disabledDates, "daysOfMonth"),
        daysOfWeek: utils2.hasArray(disabledDates, "days"),
        from: utils2.hasDate(disabledDates, "from"),
        ranges: utils2.hasArray(disabledDates, "ranges"),
        specificDates: utils2.hasArray(disabledDates, "dates"),
        to: utils2.hasDate(disabledDates, "to")
      };
      return {
        to: utils2.dayMonthYear(disabledDates, "to"),
        from: utils2.dayMonthYear(disabledDates, "from"),
        has
      };
    }
    daysInMonth(date) {
      const utils2 = this._utils;
      const month = utils2.getMonth(date);
      const year = utils2.getFullYear(date);
      return utils2.daysInMonth(year, month);
    }
    isDateDisabledVia(date) {
      const disabledDates = this._disabledDates;
      const { has } = this.config;
      return {
        to: () => {
          return has.to && date < disabledDates.to;
        },
        from: () => {
          return has.from && date > disabledDates.from;
        },
        range: () => {
          if (!has.ranges)
            return false;
          const { ranges } = disabledDates;
          const u = makeCellUtils(this._utils);
          return ranges.some((thisRange) => {
            const hasFrom = u.isDefined(thisRange, "from");
            const hasTo = u.isDefined(thisRange, "to");
            return hasFrom && hasTo && date < thisRange.to && date > thisRange.from;
          });
        },
        customPredictor: () => {
          return has.customPredictor && disabledDates.customPredictor(date);
        },
        specificDate: () => {
          if (!has.specificDates)
            return false;
          return disabledDates.dates.some((d) => {
            return this._utils.compareDates(date, d);
          });
        },
        daysOfWeek: () => {
          if (!has.daysOfWeek)
            return false;
          return disabledDates.days.indexOf(this._utils.getDay(date)) !== -1;
        },
        daysOfMonth: () => {
          if (!has.daysOfMonth)
            return false;
          return disabledDates.daysOfMonth.indexOf(this._utils.getDate(date)) !== -1;
        }
      };
    }
    isMonthDisabledVia(date) {
      const { from, has, to } = this.config;
      const month = this._utils.getMonth(date);
      const year = this._utils.getFullYear(date);
      return {
        to: () => {
          const isYearInPast = has.to && year < to.year;
          if (isYearInPast) {
            return true;
          }
          return has.to && month < to.month && year <= to.year;
        },
        from: () => {
          const isYearInFuture = has.from && year > from.year;
          if (isYearInFuture) {
            return true;
          }
          return has.from && month > from.month && year >= from.year;
        }
      };
    }
    isYearDisabledVia(date) {
      const { from, has, to } = this.config;
      const year = this._utils.getFullYear(date);
      return {
        to: () => {
          return has.to && year < to.year;
        },
        from: () => {
          return has.from && year > from.year;
        }
      };
    }
    isDateDisabled(date) {
      const isDisabledVia = this.isDateDisabledVia(date);
      return isDisabledVia.to() || isDisabledVia.from() || isDisabledVia.range() || isDisabledVia.specificDate() || isDisabledVia.daysOfWeek() || isDisabledVia.daysOfMonth() || isDisabledVia.customPredictor();
    }
    isMonthDisabled(date) {
      const isDisabledVia = this.isMonthDisabledVia(date);
      if (isDisabledVia.to() || isDisabledVia.from()) {
        return true;
      }
      for (let i = 1; i <= this.daysInMonth(date); i += 1) {
        const dayDate = new Date(date);
        dayDate.setDate(i);
        if (!this.isDateDisabled(dayDate)) {
          return false;
        }
      }
      return true;
    }
    isYearDisabled(date) {
      const isDisabledVia = this.isYearDisabledVia(date);
      if (isDisabledVia.to() || isDisabledVia.from()) {
        return true;
      }
      for (let i = 0; i < 12; i += 1) {
        const monthDate = new Date(date);
        monthDate.setMonth(i);
        if (!this.isMonthDisabled(monthDate)) {
          return false;
        }
      }
      return true;
    }
    getEarliestPossibleDate(date) {
      if (!date) {
        return null;
      }
      const utils2 = this._utils;
      if (this.isDateDisabled(date)) {
        const nextDate = new Date(
          utils2.getFullYear(date),
          utils2.getMonth(date),
          utils2.getDate(date) + 1
        );
        return this.getEarliestPossibleDate(nextDate);
      }
      return date;
    }
    getLatestPossibleDate(date) {
      if (!date) {
        return null;
      }
      const utils2 = this._utils;
      if (this.isDateDisabled(date)) {
        const nextDate = new Date(
          utils2.getFullYear(date),
          utils2.getMonth(date),
          utils2.getDate(date) - 1
        );
        return this.getLatestPossibleDate(nextDate);
      }
      return date;
    }
  }
  const _sfc_main$8 = {
    data() {
      return {
        focus: {
          delay: 0,
          refs: []
        },
        inlineTabbableCell: null,
        isActive: false,
        isRevertingToOpenDate: false,
        navElements: [],
        navElementsFocusedIndex: 0,
        resetTabbableCell: false,
        skipReviewFocus: false,
        tabbableCell: null,
        transitionName: ""
      };
    },
    computed: {
      fallbackElementsToFocus() {
        const elements = ["tabbableCell", "prev", "next"];
        if (this.typeable) {
          elements.unshift("input");
        }
        return elements;
      },
      focusedDateTimestamp() {
        const pageDate = new Date(this.pageTimestamp);
        if (this.hasClass(this.tabbableCell, "day")) {
          return this.utils.setDate(pageDate, this.tabbableCell.innerHTML.trim());
        }
        if (this.hasClass(this.tabbableCell, "month")) {
          return this.utils.setMonth(pageDate, this.tabbableCellId);
        }
        const fullYear = this.utils.getFullYear(pageDate) - 1;
        return this.utils.setFullYear(pageDate, fullYear + this.tabbableCellId);
      },
      tabbableCellId() {
        return this.tabbableCell && Number(this.tabbableCell.getAttribute("data-id"));
      }
    },
    methods: {
      getCellDate(date) {
        switch (this.view) {
          case "month":
            return new Date(this.utils.setDate(date, 1));
          case "year":
            return new Date(
              this.utils.setMonth(new Date(this.utils.setDate(date, 1)), 0)
            );
          default:
            return date;
        }
      },
      allowNormalTabbing(event) {
        if (!this.isOpen) {
          return true;
        }
        return this.isTabbingAwayFromInlineDatepicker(event);
      },
      applyFocus() {
        const focusRefs = [...this.focus.refs, ...this.fallbackElementsToFocus];
        for (let i = 0; i < focusRefs.length; i += 1) {
          const element = this.getElementByRef(focusRefs[i]);
          if (element && element.getAttribute("disabled") === null) {
            element.focus();
            this.setNavElementsFocusedIndex();
            break;
          }
        }
      },
      focusInlineTabbableCell() {
        if (this.inlineTabbableCell) {
          this.inlineTabbableCell.focus();
          return;
        }
        this.resetTabbableCell = true;
        this.setTabbableCell();
        this.tabbableCell.focus();
        this.resetTabbableCell = false;
      },
      getActiveCell() {
        const activeElement = this.getActiveElement();
        const isActiveElementACell = this.hasClass(activeElement, "cell");
        const isOnSameView = this.hasClass(activeElement, this.view);
        if (isActiveElementACell && isOnSameView && !this.resetTabbableCell) {
          return activeElement;
        }
        return null;
      },
      getActiveElement() {
        return document.activeElement.shadowRoot ? document.activeElement.shadowRoot.activeElement : document.activeElement;
      },
      getCellId(date) {
        if (!date || !this.$refs.picker.$refs.cells) {
          return null;
        }
        const cellDate = this.getCellDate(date);
        const { cells } = this.$refs.picker.$refs.cells;
        for (let i = 0; i < cells.length; i += 1) {
          if (cells[i].timestamp === cellDate.valueOf()) {
            return i;
          }
        }
        return null;
      },
      getElementByRef(ref) {
        if (ref === "tabbableCell") {
          return this.tabbableCell;
        }
        if (ref === "input") {
          return this.$refs.dateInput && this.$refs.dateInput.$refs[this.refName];
        }
        if (ref === "calendarButton") {
          return this.$refs.dateInput && this.$refs.dateInput.$refs.calendarButton;
        }
        if (ref === "openDate") {
          return this.$refs.picker.$refs.cells.$refs.openDate[0];
        }
        if (this.showHeader) {
          return this.$refs.picker && this.$refs.picker.$refs.pickerHeader && this.$refs.picker.$refs.pickerHeader.$refs[ref];
        }
        return null;
      },
      getElementsFromCalendarFooter() {
        const footerSlotIndex = this.hasSlot("beforeCalendarHeader") ? 2 : 1;
        return this.getFocusableElements(
          this.$refs.view.children[footerSlotIndex]
        );
      },
      getElementsFromSlot(slotName) {
        if (!this.hasSlot(slotName)) {
          return [];
        }
        if (slotName === "beforeCalendarHeader") {
          return this.getFocusableElements(this.$refs.view.children[0]);
        }
        if (slotName === "calendarFooter") {
          return this.getElementsFromCalendarFooter();
        }
        const isBeforeHeader = slotName.indexOf("beforeCalendarHeader") > -1;
        const picker = this.$refs.picker.$el;
        const index = isBeforeHeader ? 0 : picker.children.length - 1;
        return this.getFocusableElements(picker.children[index]);
      },
      getElementsFromHeader() {
        if (!this.$refs.picker.$refs.pickerHeader) {
          return [];
        }
        const header = this.$refs.picker.$refs.pickerHeader.$el;
        const navNodeList = header.querySelectorAll("button:enabled");
        return [...Array.prototype.slice.call(navNodeList)];
      },
      getFocusableElements(fragment) {
        if (!fragment) {
          return [];
        }
        const navNodeList = fragment.querySelectorAll(
          'button:enabled:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([tabindex="-1"]):not([type=hidden]), select:enabled:not([tabindex="-1"]), textarea:enabled:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
        );
        return [...Array.prototype.slice.call(navNodeList)];
      },
      getFirstInlineFocusableElement() {
        const popupElements = this.getFocusableElements(this.$refs.popup.$el);
        return popupElements[0];
      },
      getLastInlineFocusableElement() {
        const popupElements = this.getFocusableElements(this.$refs.popup.$el);
        return popupElements[popupElements.length - 1];
      },
      getInputField() {
        if (!this.typeable || this.inline) {
          return null;
        }
        return this.$refs.dateInput.$refs[this.refName];
      },
      getTypedCell() {
        if (!this.typeable) {
          return null;
        }
        const cellId = this.getCellId(this.latestValidTypedDate);
        return cellId ? this.$refs.picker.$refs.cells.$el.children[cellId] : null;
      },
      handleFocusIn() {
        document.datepickerId = this.datepickerId;
        this.globalDatepickerId = this.datepickerId;
        this.isActive = true;
        this.setInlineTabbableCell();
        this.setNavElements();
      },
      handleFocusOut() {
        this.isActive = false;
        this.globalDatepickerId = "";
      },
      hasSlot(slotName) {
        return !!this.$slots[slotName];
      },
      isTabbingAwayFromInlineDatepicker(event) {
        if (!this.inline) {
          return false;
        }
        if (this.isTabbingAwayFromFirstNavElement(event)) {
          this.tabAwayFromFirstElement();
          return true;
        }
        if (this.isTabbingAwayFromLastNavElement(event)) {
          this.tabAwayFromLastElement();
          return true;
        }
        return false;
      },
      isTabbingAwayFromFirstNavElement(event) {
        if (!event.shiftKey) {
          return false;
        }
        const activeElement = this.getActiveElement();
        const firstNavElement = this.navElements[0];
        return activeElement === firstNavElement;
      },
      isTabbingAwayFromLastNavElement(event) {
        if (event.shiftKey) {
          return false;
        }
        const activeElement = this.getActiveElement();
        const lastNavElement = this.navElements[this.navElements.length - 1];
        return activeElement === lastNavElement;
      },
      resetFocusToOpenDate() {
        this.focus.refs = ["openDate"];
        this.setTransitionAndFocusDelay(
          this.focusedDateTimestamp,
          this.computedOpenDate
        );
        if (!this.isMinimumView) {
          this.isRevertingToOpenDate = true;
          this.view = this.minimumView;
        }
        this.setPageDate(this.computedOpenDate);
        this.reviewFocus();
      },
      reviewFocus() {
        if (this.skipReviewFocus) {
          return;
        }
        this.tabbableCell = null;
        this.resetTabbableCell = true;
        this.$nextTick(() => {
          this.setNavElements();
          setTimeout(() => {
            this.applyFocus();
          }, this.focus.delay);
          this.resetTabbableCell = false;
        });
      },
      setInlineTabbableCell() {
        if (!this.inline) {
          return;
        }
        this.inlineTabbableCell = this.tabbableCell;
      },
      setTransitionAndFocusDelay(startDate, endDate) {
        const startPageDate = this.utils.setDate(new Date(startDate), 1);
        const endPageDate = this.utils.setDate(new Date(endDate), 1);
        const isInTheFuture = startPageDate < endPageDate;
        if (this.isMinimumView) {
          this.focus.delay = isInTheFuture ? this.slideDuration : 0;
        } else {
          this.focus.delay = 0;
        }
        this.setTransitionName(endDate - startDate);
      },
      setFocus(refs) {
        this.focus.refs = refs;
        this.applyFocus();
      },
      setNavElements() {
        if (!this.view)
          return;
        this.updateTabbableCell();
        const view = this.ucFirst(this.view);
        this.navElements = [
          this.getInputField(),
          this.getElementsFromSlot("beforeCalendarHeader"),
          this.getElementsFromSlot(`beforeCalendarHeader${view}`),
          this.getElementsFromHeader(),
          this.tabbableCell,
          this.getElementsFromSlot(`calendarFooter${view}`),
          this.getElementsFromSlot("calendarFooter")
        ].filter((item) => !!item).reduce((acc, val) => acc.concat(val), []);
      },
      setNavElementsFocusedIndex() {
        const activeElement = this.getActiveElement();
        for (let i = 0; i < this.navElements.length; i += 1) {
          if (activeElement === this.navElements[i]) {
            this.navElementsFocusedIndex = i;
            return;
          }
        }
        this.navElementsFocusedIndex = 0;
      },
      setTabbableCell() {
        if (!this.$refs.picker || !this.$refs.picker.$refs.cells) {
          return;
        }
        const pickerCells = this.$refs.picker.$refs.cells.$el;
        this.tabbableCell = this.getActiveCell() || this.getTypedCell() || pickerCells.querySelector("button.selected:not(.muted):enabled") || pickerCells.querySelector("button.open:not(.muted):enabled") || pickerCells.querySelector("button.today:not(.muted):enabled") || pickerCells.querySelector("button.cell:not(.muted):enabled");
      },
      setTransitionName(plusOrMinus) {
        const isInTheFuture = plusOrMinus > 0;
        if (this.isRtl) {
          this.transitionName = isInTheFuture ? "slide-left" : "slide-right";
        } else {
          this.transitionName = isInTheFuture ? "slide-right" : "slide-left";
        }
      },
      tabAwayFromFirstElement() {
        const firstElement = this.getFirstInlineFocusableElement();
        this.setInlineTabbableCell();
        firstElement.focus();
        this.tabbableCell = this.inlineTabbableCell;
      },
      tabAwayFromLastElement() {
        const lastElement = this.getLastInlineFocusableElement();
        this.setInlineTabbableCell();
        lastElement.focus();
        this.tabbableCell = this.inlineTabbableCell;
      },
      tabBackwards() {
        this.navElementsFocusedIndex -= 1;
        if (this.navElementsFocusedIndex < 0) {
          this.navElementsFocusedIndex = this.navElements.length - 1;
        }
        this.navElements[this.navElementsFocusedIndex].focus();
      },
      tabForwards() {
        this.navElementsFocusedIndex += 1;
        if (this.navElementsFocusedIndex >= this.navElements.length) {
          this.navElementsFocusedIndex = 0;
        }
        this.navElements[this.navElementsFocusedIndex].focus();
      },
      tabThroughNavigation(event) {
        if (this.allowNormalTabbing(event)) {
          return;
        }
        event.preventDefault();
        if (event.shiftKey) {
          this.tabBackwards();
        } else {
          this.tabForwards();
        }
      },
      tabToCorrectInlineCell() {
        const lastElement = this.getLastInlineFocusableElement();
        const isACell = this.hasClass(lastElement, "cell");
        const activeElement = this.getActiveElement();
        const isLastElementFocused = activeElement === lastElement;
        if (isACell && isLastElementFocused) {
          this.focusInlineTabbableCell();
          return;
        }
        this.$nextTick(() => {
          const isFirstCell = activeElement.getAttribute("data-id") === "0";
          if (isFirstCell) {
            this.focusInlineTabbableCell();
          }
        });
      },
      updateTabbableCell() {
        const activeElement = this.getActiveElement();
        const isActiveElementACell = this.hasClass(activeElement, "cell");
        const needToUpdate = !this.tabbableCell || isActiveElementACell;
        if (needToUpdate) {
          this.setTabbableCell();
        }
      }
    }
  };
  const _sfc_main$7 = {
    name: "PickerHeader",
    props: {
      bootstrapStyling: {
        type: Boolean,
        default: false
      },
      isNextDisabled: {
        type: Boolean,
        required: true
      },
      isPreviousDisabled: {
        type: Boolean,
        required: true
      },
      isRtl: {
        type: Boolean,
        required: true
      },
      isUpDisabled: {
        type: Boolean,
        default: false
      },
      nextViewUp: {
        type: String,
        default: null
      }
    },
    emits: {
      focusInput: null,
      pageChange: (page) => {
        return typeof page === "object";
      },
      setFocus: (refArray) => {
        return refArray.every((ref) => {
          return ["input", "prev", "up", "next", "tabbableCell"].includes(ref);
        });
      },
      setView: (view) => {
        return ["day", "month", "year"].includes(view);
      }
    },
    data() {
      return {
        previousPage: { incrementBy: -1, focusRefs: ["prev"] },
        nextPage: { incrementBy: 1, focusRefs: ["next"] }
      };
    },
    computed: {
      leftButton() {
        return [this.isRtl ? "next" : "prev"];
      },
      rightButton() {
        return [this.isRtl ? "prev" : "next"];
      }
    },
    methods: {
      arrowLeftPrev() {
        if (this.isRtl) {
          this.$emit("setFocus", ["up", "next", "tabbableCell"]);
          return;
        }
        this.goToPreviousPage();
      },
      arrowRightPrev() {
        if (this.isRtl) {
          this.goToPreviousPage();
          return;
        }
        this.$emit("setFocus", ["up", "next", "tabbableCell"]);
      },
      arrowLeftNext() {
        if (this.isRtl) {
          this.goToNextPage();
          return;
        }
        this.$emit("setFocus", ["up", "prev", "tabbableCell"]);
      },
      arrowRightNext() {
        if (this.isRtl) {
          this.$emit("setFocus", ["up", "prev", "tabbableCell"]);
          return;
        }
        this.goToNextPage();
      },
      focusInput() {
        this.$emit("focusInput");
      },
      focusTabbableCell() {
        this.$emit("setFocus", ["tabbableCell"]);
      },
      focusLeftButton() {
        this.$emit("setFocus", this.leftButton);
      },
      focusRightButton() {
        this.$emit("setFocus", this.rightButton);
      },
      goToNextPage() {
        this.$emit("pageChange", { incrementBy: 1, focusRefs: ["next"] });
      },
      goToPreviousPage() {
        this.$emit("pageChange", { incrementBy: -1, focusRefs: ["prev"] });
      },
      selectUpButton() {
        if (!this.isUpDisabled) {
          this.$emit("setView", this.nextViewUp);
        }
      }
    }
  };
  const _hoisted_1$5 = ["disabled"];
  const _hoisted_2$5 = /* @__PURE__ */ vue.createElementVNode("span", { class: "default" }, "<", -1);
  const _hoisted_3$4 = ["disabled"];
  const _hoisted_4$1 = ["disabled"];
  const _hoisted_5 = /* @__PURE__ */ vue.createElementVNode("span", { class: "default" }, ">", -1);
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("header", null, [
      vue.createElementVNode("button", {
        ref: "prev",
        class: vue.normalizeClass(["prev", { btn: $props.bootstrapStyling, rtl: $props.isRtl }]),
        "data-test-previous-button": "",
        disabled: $props.isPreviousDisabled,
        type: "button",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.goToPreviousPage && $options.goToPreviousPage(...args), ["stop"])),
        onKeydown: [
          _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers((...args) => $options.focusTabbableCell && $options.focusTabbableCell(...args), ["prevent"]), ["down"])),
          _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers((...args) => $options.focusInput && $options.focusInput(...args), ["prevent"]), ["up"])),
          _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers((...args) => $options.arrowLeftPrev && $options.arrowLeftPrev(...args), ["prevent"]), ["left"])),
          _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => $options.arrowRightPrev && $options.arrowRightPrev(...args), ["prevent"]), ["right"]))
        ]
      }, [
        vue.renderSlot(_ctx.$slots, "prevIntervalBtn", {}, () => [
          _hoisted_2$5
        ])
      ], 42, _hoisted_1$5),
      vue.createElementVNode("button", {
        ref: "up",
        class: vue.normalizeClass(["vdp-datepicker__up", { btn: $props.bootstrapStyling }]),
        "data-test-up-button": "",
        disabled: $props.isUpDisabled,
        type: "button",
        onClick: _cache[5] || (_cache[5] = (...args) => $options.selectUpButton && $options.selectUpButton(...args)),
        onKeydown: [
          _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers((...args) => $options.focusTabbableCell && $options.focusTabbableCell(...args), ["prevent"]), ["down"])),
          _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => $options.focusInput && $options.focusInput(...args), ["prevent"]), ["up"])),
          _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers((...args) => $options.focusLeftButton && $options.focusLeftButton(...args), ["prevent"]), ["left"])),
          _cache[9] || (_cache[9] = vue.withKeys(vue.withModifiers((...args) => $options.focusRightButton && $options.focusRightButton(...args), ["prevent"]), ["right"]))
        ]
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 42, _hoisted_3$4),
      vue.createElementVNode("button", {
        ref: "next",
        class: vue.normalizeClass(["next", { btn: $props.bootstrapStyling, rtl: $props.isRtl }]),
        "data-test-next-button": "",
        disabled: $props.isNextDisabled,
        type: "button",
        onClick: _cache[10] || (_cache[10] = vue.withModifiers((...args) => $options.goToNextPage && $options.goToNextPage(...args), ["stop"])),
        onKeydown: [
          _cache[11] || (_cache[11] = vue.withKeys(vue.withModifiers((...args) => $options.focusTabbableCell && $options.focusTabbableCell(...args), ["prevent"]), ["down"])),
          _cache[12] || (_cache[12] = vue.withKeys(vue.withModifiers((...args) => $options.focusInput && $options.focusInput(...args), ["prevent"]), ["up"])),
          _cache[13] || (_cache[13] = vue.withKeys(vue.withModifiers((...args) => $options.arrowLeftNext && $options.arrowLeftNext(...args), ["prevent"]), ["left"])),
          _cache[14] || (_cache[14] = vue.withKeys(vue.withModifiers((...args) => $options.arrowRightNext && $options.arrowRightNext(...args), ["prevent"]), ["right"]))
        ]
      }, [
        vue.renderSlot(_ctx.$slots, "nextIntervalBtn", {}, () => [
          _hoisted_5
        ])
      ], 42, _hoisted_4$1)
    ]);
  }
  const PickerHeader = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$5]]);
  const _sfc_main$6 = {
    components: { PickerHeader },
    props: {
      bootstrapStyling: {
        type: Boolean,
        default: false
      },
      disabledDates: {
        type: Object,
        default: null
      },
      isRtl: {
        type: Boolean,
        default: false
      },
      isTypeable: {
        type: Boolean,
        default: false
      },
      isUpDisabled: {
        type: Boolean,
        default: false
      },
      isMinimumView: {
        type: Boolean,
        default: true
      },
      openDate: {
        type: [String, Date, Number],
        default: null
      },
      pageDate: {
        type: Date,
        default: null
      },
      selectedDate: {
        type: Date,
        default: null
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      slideDuration: {
        type: Number,
        default: 250
      },
      tabbableCellId: {
        type: Number,
        default: null
      },
      transitionName: {
        type: String,
        default: ""
      },
      translation: {
        type: Object,
        default() {
          return {};
        }
      },
      useUtc: {
        type: Boolean,
        default: false
      },
      view: {
        type: String,
        default: "day"
      }
    },
    emits: {
      pageChange: (config) => {
        return typeof config === "object";
      },
      select: (cell) => {
        return typeof cell === "object";
      },
      setFocus: (refArray) => {
        return refArray === ["input"];
      },
      setSkipReviewFocus: (value) => {
        return typeof value === "boolean";
      },
      setTransitionName: (incrementBy) => {
        return incrementBy === -1 || incrementBy === 1;
      }
    },
    data() {
      return {
        utils: makeDateUtils(this.useUtc)
      };
    },
    computed: {
      disabledConfig() {
        if (!this.disabledDates) {
          return {
            has: {
              from: false,
              to: false
            }
          };
        }
        return new DisabledDate(this.utils, this.disabledDates).config;
      },
      earliestPossibleDate() {
        if (!this.disabledDates)
          return null;
        return new DisabledDate(
          this.utils,
          this.disabledDates
        ).getEarliestPossibleDate(this.disabledDates.to);
      },
      latestPossibleDate() {
        if (!this.disabledDates)
          return null;
        return new DisabledDate(
          this.utils,
          this.disabledDates
        ).getLatestPossibleDate(this.disabledDates.from);
      },
      pageYear() {
        return this.utils.getFullYear(this.pageDate);
      }
    },
    methods: {
      addMoreSteps(options) {
        if (options.stepsRemaining <= 0 && Math.abs(options.delta) > 1) {
          return Math.abs(options.delta);
        }
        return options.stepsRemaining;
      },
      changePage({ incrementBy, focusRefs }) {
        const { pageDate, utils: utils2 } = this;
        const units = this.view === "year" ? incrementBy * this.yearRange : incrementBy;
        this.$emit("setTransitionName", incrementBy);
        if (this.view === "day") {
          utils2.setMonth(pageDate, utils2.getMonth(pageDate) + units);
        } else {
          utils2.setFullYear(pageDate, utils2.getFullYear(pageDate) + units);
        }
        this.$emit("pageChange", { focusRefs, pageDate });
      },
      changePageAndSetFocus(options) {
        const { delta } = options;
        const isPageDisabled = delta > 0 && this.isNextDisabled || delta < 0 && this.isPreviousDisabled;
        if (isPageDisabled) {
          return;
        }
        this.$emit("setSkipReviewFocus", true);
        this.changePage({
          incrementBy: Math.sign(delta),
          focusRefs: ["arrow-to-cell"]
        });
        this.$nextTick(() => {
          this.setFocusOnNewPage(options);
          this.$emit("setSkipReviewFocus", false);
        });
      },
      focusInput() {
        if (this.isTypeable) {
          this.$emit("setFocus", ["input"]);
        }
      },
      getElement({ currentElement, delta, stepsRemaining }) {
        const element = this.getElementSibling(currentElement, delta);
        const options = {
          currentElement: element,
          delta,
          stepsRemaining: stepsRemaining - 1
        };
        if (!element) {
          return this.changePageAndSetFocus(options);
        }
        if (this.isBeyondPossibleDate(options)) {
          return this.firstOrLastPossibleDate(options);
        }
        if (this.isMutedOrDisabled(element)) {
          options.stepsRemaining = this.addMoreSteps(options);
          return this.getElement(options);
        }
        if (stepsRemaining > 1 && options.currentElement) {
          return this.getElement(options);
        }
        return element;
      },
      getElementSibling(currentElement, delta) {
        const isNext = delta > 0;
        return isNext ? currentElement.nextElementSibling : currentElement.previousElementSibling;
      },
      getFirstOrLastElement(delta) {
        const isNext = delta > 0;
        const elements = this.$refs.cells.$el.children;
        return isNext ? elements[0] : elements[elements.length - 1];
      },
      firstOrLastPossibleDate({ currentElement, delta }) {
        if (delta > 0) {
          return this.getElementSibling(currentElement, -1);
        }
        return this.getElementSibling(currentElement, 1);
      },
      handleArrow({ delta }) {
        const activeElement = document.activeElement.shadowRoot ? document.activeElement.shadowRoot.activeElement : document.activeElement;
        const stepsRemaining = Math.abs(delta);
        const options = {
          currentElement: activeElement,
          delta,
          stepsRemaining
        };
        this.setFocusToAvailableCell(options);
      },
      select(cell) {
        if (cell.isPreviousMonth) {
          this.$emit("setTransitionName", -1);
        }
        if (cell.isNextMonth) {
          this.$emit("setTransitionName", 1);
        }
        this.$emit("select", cell);
      },
      isBeyondPossibleDate({ currentElement, delta }) {
        if (delta > 0 && this.latestPossibleDate) {
          return this.isDatePossible(currentElement, delta);
        }
        if (delta < 0 && this.earliestPossibleDate) {
          return this.isDatePossible(currentElement, delta);
        }
        return false;
      },
      isDatePossible(element, delta) {
        const cellId = element.getAttribute("data-id");
        const cellDate = new Date(this.cells[cellId].timestamp);
        if (delta > 0) {
          return cellDate > this.latestPossibleDate;
        }
        return cellDate < this.earliestPossibleDate;
      },
      isMutedOrDisabled(element) {
        const isMuted = element.classList.value.split(" ").includes("muted");
        const isDisabled = element.disabled;
        return isMuted || isDisabled;
      },
      setFocusOnNewPage({ delta, stepsRemaining }) {
        const currentElement = this.getFirstOrLastElement(delta);
        const options = {
          currentElement,
          delta,
          stepsRemaining
        };
        const delay = this.slideDuration || 250;
        if (stepsRemaining <= 0) {
          if (this.isMutedOrDisabled(currentElement)) {
            options.stepsRemaining = Math.abs(options.delta);
            setTimeout(() => {
              this.setFocusToAvailableCell(options);
            }, delay);
            return;
          }
          setTimeout(() => {
            currentElement.focus();
          }, delay);
          return;
        }
        setTimeout(() => {
          this.setFocusToAvailableCell(options);
        }, delay);
      },
      setFocusToAvailableCell(options) {
        const element = this.getElement(options);
        if (element) {
          element.focus();
        }
      }
    }
  };
  class HighlightedDate {
    constructor(utils2, disabledDates, highlighted) {
      this._utils = utils2;
      this._disabledDates = disabledDates;
      this._highlighted = highlighted;
    }
    get config() {
      const highlightedDates = this._highlighted;
      const utils2 = makeCellUtils(this._utils);
      const has = {
        customPredictor: utils2.isDefined(highlightedDates, "customPredictor"),
        daysOfMonth: utils2.hasArray(highlightedDates, "daysOfMonth"),
        daysOfWeek: utils2.hasArray(highlightedDates, "days"),
        from: utils2.hasDate(highlightedDates, "from"),
        ranges: utils2.hasArray(highlightedDates, "ranges"),
        specificDates: utils2.hasArray(highlightedDates, "dates"),
        to: utils2.hasDate(highlightedDates, "to"),
        includeDisabled: utils2.isDefined(highlightedDates, "includeDisabled") && highlightedDates.includeDisabled
      };
      return {
        to: utils2.dayMonthYear(highlightedDates, "to"),
        from: utils2.dayMonthYear(highlightedDates, "from"),
        has
      };
    }
    isDateDisabled(date) {
      const utils2 = this._utils;
      const disabledDates = this._disabledDates;
      return new DisabledDate(utils2, disabledDates).isDateDisabled(date);
    }
    isHighlightingNotPossible(date) {
      return !this.config.has.includeDisabled && this.isDateDisabled(date);
    }
    isDateHighlightedVia(date) {
      const highlightedDates = this._highlighted;
      const { has } = this.config;
      return {
        to: () => {
          return has.to && date < highlightedDates.to;
        },
        from: () => {
          return has.from && date > highlightedDates.from;
        },
        range: () => {
          if (!has.ranges)
            return false;
          const { ranges } = highlightedDates;
          const u = makeCellUtils(this._utils);
          return ranges.some((thisRange) => {
            const hasFrom = u.isDefined(thisRange, "from");
            const hasTo = u.isDefined(thisRange, "to");
            return hasFrom && hasTo && date <= thisRange.to && date >= thisRange.from;
          });
        },
        customPredictor: () => {
          return has.customPredictor && highlightedDates.customPredictor(date);
        },
        specificDate: () => {
          if (!has.specificDates)
            return false;
          return highlightedDates.dates.some((d) => {
            return this._utils.compareDates(date, d);
          });
        },
        daysOfWeek: () => {
          if (!has.daysOfWeek)
            return false;
          return highlightedDates.days.indexOf(this._utils.getDay(date)) !== -1;
        },
        daysOfMonth: () => {
          if (!has.daysOfMonth)
            return false;
          return highlightedDates.daysOfMonth.indexOf(this._utils.getDate(date)) !== -1;
        }
      };
    }
    isDateHighlighted(date) {
      if (this.isHighlightingNotPossible(date))
        return false;
      const isHighlightedVia = this.isDateHighlightedVia(date);
      return isHighlightedVia.to() || isHighlightedVia.from() || isHighlightedVia.range() || isHighlightedVia.specificDate() || isHighlightedVia.daysOfWeek() || isHighlightedVia.daysOfMonth() || isHighlightedVia.customPredictor();
    }
    isHighlightStart(date) {
      if (!this.config.has.ranges || !this.isDateHighlighted(date)) {
        return false;
      }
      for (let i = 0; i < this._highlighted.ranges.length; i += 1) {
        const range = this._highlighted.ranges[i];
        if (range.from.valueOf() === date.valueOf()) {
          return true;
        }
      }
      return false;
    }
    isHighlightEnd(date) {
      if (!this.config.has.ranges || !this.isDateHighlighted(date)) {
        return false;
      }
      for (let i = 0; i < this._highlighted.ranges.length; i += 1) {
        const range = this._highlighted.ranges[i];
        if (range.to.valueOf() === date.valueOf()) {
          return true;
        }
      }
      return false;
    }
  }
  const _sfc_main$5 = {
    name: "PickerCells",
    props: {
      bootstrapStyling: {
        type: Boolean,
        default: false
      },
      cells: {
        type: Array,
        required: true
      },
      isRtl: {
        type: Boolean,
        default: false
      },
      showEdgeDates: {
        type: Boolean,
        default: true
      },
      tabbableCellId: {
        type: Number,
        default: null
      },
      view: {
        type: String,
        validator: (val) => ["day", "month", "year"].includes(val),
        required: true
      }
    },
    emits: {
      arrow(config) {
        return typeof config === "object";
      },
      select(cell) {
        return typeof cell === "object";
      }
    },
    computed: {
      columns() {
        return this.view === "day" ? 7 : 3;
      }
    },
    methods: {
      cellClasses(cell) {
        return [
          "cell",
          this.view,
          {
            "btn": this.bootstrapStyling,
            "disabled": cell.isDisabled,
            "highlight-start": cell.isHighlightStart,
            "highlight-end": cell.isHighlightEnd,
            "highlighted": cell.isHighlighted,
            "muted": cell.isPreviousMonth || cell.isNextMonth,
            "open": cell.isOpenDate,
            "sat": cell.isSaturday,
            "sun": cell.isSunday,
            "selected": this.showEdgeDates ? cell.isSelected : cell.isSelected && !cell.isPreviousMonth && !cell.isNextMonth,
            "today": this.showEdgeDates ? cell.isToday : cell.isToday && !cell.isPreviousMonth && !cell.isNextMonth,
            "weekend": cell.isWeekend
          }
        ];
      },
      handleArrow(cellId, delta) {
        this.$emit("arrow", { cellId, delta });
      },
      isTabbableCell(cell, id) {
        if (!this.tabbableCellId) {
          return cell.isOpenDate || null;
        }
        return id === this.tabbableCellId || null;
      }
    }
  };
  const _hoisted_1$4 = {
    class: "picker-cells",
    "data-test-picker-cells": ""
  };
  const _hoisted_2$4 = ["data-id", "data-test-tabbable-cell", "data-test-open-date", "data-test-today-cell", "disabled", "onClick", "onKeydown"];
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.cells, (cell, id) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          key: cell.timestamp,
          ref_for: true,
          ref: cell.isOpenDate ? "openDate" : null,
          class: vue.normalizeClass($options.cellClasses(cell)),
          "data-id": id,
          "data-test-tabbable-cell": $options.isTabbableCell(cell, id),
          "data-test-open-date": cell.isOpenDate || null,
          "data-test-today-cell": cell.isToday || null,
          disabled: cell.isDisabled,
          type: "button",
          onClick: ($event) => _ctx.$emit("select", cell),
          onKeydown: [
            vue.withKeys(vue.withModifiers(($event) => $options.handleArrow(id, -$options.columns), ["prevent"]), ["up"]),
            vue.withKeys(vue.withModifiers(($event) => $options.handleArrow(id, $options.columns), ["prevent"]), ["down"]),
            vue.withKeys(vue.withModifiers(($event) => $options.handleArrow(id, $props.isRtl ? 1 : -1), ["prevent"]), ["left"]),
            vue.withKeys(vue.withModifiers(($event) => $options.handleArrow(id, $props.isRtl ? -1 : 1), ["prevent"]), ["right"])
          ]
        }, [
          vue.renderSlot(_ctx.$slots, "default", { cell })
        ], 42, _hoisted_2$4);
      }), 128))
    ]);
  }
  const PickerCells = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4]]);
  const _sfc_main$4 = {
    name: "PickerDay",
    components: { PickerCells },
    mixins: [_sfc_main$6],
    props: {
      dayCellContent: {
        type: Function,
        default: (day) => day.date
      },
      firstDayOfWeek: {
        type: String,
        default: "sun"
      },
      highlighted: {
        type: Object,
        default() {
          return {};
        }
      },
      showFullMonthName: {
        type: Boolean,
        default: false
      },
      showEdgeDates: {
        type: Boolean,
        default: true
      }
    },
    emits: {
      setFocus: (refArray) => {
        return refArray.every((ref) => {
          return ["input", "prev", "up", "next", "tabbableCell"].includes(ref);
        });
      },
      setView: (view) => {
        return view === "month";
      }
    },
    computed: {
      cells() {
        const days = [];
        const daysInCalendar = this.daysFromPrevMonth + this.daysInMonth + this.daysFromNextMonth;
        const dObj = this.firstDayCellDate();
        for (let i = 0; i < daysInCalendar; i += 1) {
          days.push(this.makeDay(dObj));
          this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
        }
        return days;
      },
      currMonthName() {
        const monthName = this.showFullMonthName ? this.translation.months : this.translation.monthsAbbr;
        return this.utils.getMonthNameAbbr(this.pageMonth, monthName);
      },
      currYearName() {
        const { yearSuffix } = this.translation;
        return `${this.pageYear}${yearSuffix}`;
      },
      daysOfWeek() {
        return this.translation.getDaysStartingOn(this.firstDayOfWeekNumber);
      },
      daysInMonth() {
        return this.utils.getDaysInMonth(this.pageDate);
      },
      daysFromPrevMonth() {
        const firstOfMonthDayNumber = this.utils.getDay(this.pageDate);
        return (7 - this.firstDayOfWeekNumber + firstOfMonthDayNumber) % 7;
      },
      daysFromNextMonth() {
        const daysThisAndPrevMonth = this.daysFromPrevMonth + this.daysInMonth;
        return Math.ceil(daysThisAndPrevMonth / 7) * 7 - daysThisAndPrevMonth;
      },
      firstDayOfWeekNumber() {
        return this.utils.getDayFromAbbr(this.firstDayOfWeek);
      },
      firstOfNextMonth() {
        const d = new Date(this.pageDate);
        return new Date(this.utils.setMonth(d, this.utils.getMonth(d) + 1));
      },
      isNextDisabled() {
        if (!this.disabledConfig.has.from) {
          return false;
        }
        const { from } = this.disabledConfig;
        const disabledFromMonth = this.utils.monthYearDate(from.year, from.month);
        const pageMonth = this.utils.monthYearDate(this.pageYear, this.pageMonth);
        return disabledFromMonth <= pageMonth;
      },
      isPreviousDisabled() {
        if (!this.disabledConfig.has.to) {
          return false;
        }
        const { to } = this.disabledConfig;
        const disabledToMonth = this.utils.monthYearDate(to.year, to.month);
        const pageMonth = this.utils.monthYearDate(this.pageYear, this.pageMonth);
        return disabledToMonth >= pageMonth;
      },
      pageMonth() {
        return this.utils.getMonth(this.pageDate);
      },
      pageTitleDay() {
        return this.translation.ymd ? `${this.currYearName} ${this.currMonthName}` : `${this.currMonthName} ${this.currYearName}`;
      }
    },
    methods: {
      firstDayCellDate() {
        const pageDate = new Date(this.pageDate);
        return new Date(this.utils.setDate(pageDate, 1 - this.daysFromPrevMonth));
      },
      isDisabledDate(date) {
        if (!this.disabledDates)
          return false;
        return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(
          date
        );
      },
      isHighlightedDate(date) {
        if (!this.highlighted)
          return false;
        return new HighlightedDate(
          this.utils,
          this.disabledDates,
          this.highlighted
        ).isDateHighlighted(date);
      },
      isHighlightEnd(date) {
        if (!this.highlighted)
          return false;
        return new HighlightedDate(
          this.utils,
          this.disabledDates,
          this.highlighted
        ).isHighlightEnd(date);
      },
      isHighlightStart(date) {
        if (!this.highlighted)
          return false;
        return new HighlightedDate(
          this.utils,
          this.disabledDates,
          this.highlighted
        ).isHighlightStart(date);
      },
      isSelectedDate(dObj) {
        if (!this.selectedDate)
          return false;
        return this.utils.compareDates(this.selectedDate, dObj);
      },
      makeDay(dObj) {
        const { utils: utils2 } = this;
        const dayOfWeek = utils2.getDay(dObj);
        const isNextMonth = dObj >= this.firstOfNextMonth;
        const isPreviousMonth = dObj < this.pageDate;
        const isSaturday = dayOfWeek === 6;
        const isSunday = dayOfWeek === 0;
        const showDate = this.showEdgeDates || !(isPreviousMonth || isNextMonth);
        return {
          date: showDate ? utils2.getDate(dObj) : "",
          timestamp: dObj.valueOf(),
          isSelected: this.isSelectedDate(dObj),
          isDisabled: showDate ? this.isDisabledDate(dObj) : true,
          isHighlighted: this.isHighlightedDate(dObj),
          isHighlightStart: this.isHighlightStart(dObj),
          isHighlightEnd: this.isHighlightEnd(dObj),
          isOpenDate: utils2.compareDates(dObj, this.openDate),
          isToday: utils2.compareDates(dObj, utils2.getNewDateObject()),
          isWeekend: isSaturday || isSunday,
          isSaturday,
          isSunday,
          isPreviousMonth,
          isNextMonth
        };
      }
    }
  };
  const _hoisted_1$3 = { key: 0 };
  const _hoisted_2$3 = { class: "day-header" };
  const _hoisted_3$3 = { class: "cells-wrapper" };
  const _hoisted_4 = { key: 2 };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PickerHeader = vue.resolveComponent("PickerHeader");
    const _component_PickerCells = vue.resolveComponent("PickerCells");
    return vue.openBlock(), vue.createElementBlock("div", null, [
      _ctx.$slots.beforeCalendarHeaderDay ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
        vue.renderSlot(_ctx.$slots, "beforeCalendarHeaderDay")
      ])) : vue.createCommentVNode("", true),
      _ctx.showHeader ? (vue.openBlock(), vue.createBlock(_component_PickerHeader, {
        key: 1,
        ref: "pickerHeader",
        "bootstrap-styling": _ctx.bootstrapStyling,
        "is-next-disabled": $options.isNextDisabled,
        "is-previous-disabled": $options.isPreviousDisabled,
        "is-rtl": _ctx.isRtl,
        "is-up-disabled": _ctx.isUpDisabled,
        "next-view-up": "month",
        onFocusInput: _ctx.focusInput,
        onPageChange: _cache[0] || (_cache[0] = ($event) => _ctx.changePage($event)),
        onSetFocus: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("setFocus", $event)),
        onSetView: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("setView", $event))
      }, {
        prevIntervalBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "prevIntervalBtn")
        ]),
        nextIntervalBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "nextIntervalBtn")
        ]),
        default: vue.withCtx(() => [
          vue.createTextVNode(" " + vue.toDisplayString($options.pageTitleDay) + " ", 1)
        ]),
        _: 3
      }, 8, ["bootstrap-styling", "is-next-disabled", "is-previous-disabled", "is-rtl", "is-up-disabled", "onFocusInput"])) : vue.createCommentVNode("", true),
      vue.createElementVNode("div", null, [
        vue.createElementVNode("div", _hoisted_2$3, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.daysOfWeek, (day) => {
            return vue.openBlock(), vue.createElementBlock("span", { key: day }, vue.toDisplayString(day), 1);
          }), 128))
        ]),
        vue.createElementVNode("div", _hoisted_3$3, [
          vue.createVNode(vue.Transition, { name: _ctx.transitionName }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createBlock(_component_PickerCells, {
                ref: "cells",
                key: $options.pageTitleDay,
                "bootstrap-styling": _ctx.bootstrapStyling,
                cells: $options.cells,
                "is-rtl": _ctx.isRtl,
                "show-edge-dates": $props.showEdgeDates,
                "tabbable-cell-id": _ctx.tabbableCellId,
                view: "day",
                onArrow: _cache[3] || (_cache[3] = ($event) => _ctx.handleArrow($event)),
                onSelect: _cache[4] || (_cache[4] = ($event) => _ctx.select($event))
              }, {
                default: vue.withCtx(({ cell }) => [
                  vue.renderSlot(_ctx.$slots, "dayCellContent", { cell }, () => [
                    vue.createTextVNode(vue.toDisplayString($props.dayCellContent(cell)), 1)
                  ])
                ]),
                _: 3
              }, 8, ["bootstrap-styling", "cells", "is-rtl", "show-edge-dates", "tabbable-cell-id"]))
            ]),
            _: 3
          }, 8, ["name"])
        ])
      ]),
      _ctx.$slots.calendarFooterDay ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [
        vue.renderSlot(_ctx.$slots, "calendarFooterDay")
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const PickerDay = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3]]);
  const _sfc_main$3 = {
    name: "PickerMonth",
    components: { PickerCells },
    mixins: [_sfc_main$6],
    emits: {
      setFocus: (refArray) => {
        return refArray.every((ref) => {
          return ["input", "prev", "up", "next", "tabbableCell"].includes(ref);
        });
      },
      setView: (view) => {
        return view === "year";
      }
    },
    computed: {
      cells() {
        const { utils: utils2 } = this;
        const months = [];
        const dObj = this.firstMonthCellDate();
        for (let i = 0; i < 12; i += 1) {
          months.push({
            month: utils2.getMonthName(i, this.translation.months),
            timestamp: dObj.valueOf(),
            isDisabled: this.isDisabledMonth(dObj),
            isOpenDate: this.isOpenMonth(dObj),
            isSelected: this.isSelectedMonth(dObj),
            isToday: this.isTodayMonth(dObj)
          });
          utils2.setMonth(dObj, utils2.getMonth(dObj) + 1);
        }
        return months;
      },
      isNextDisabled() {
        if (!this.disabledConfig.has.from) {
          return false;
        }
        return this.disabledConfig.from.year <= this.pageYear;
      },
      isPreviousDisabled() {
        if (!this.disabledConfig.has.to) {
          return false;
        }
        return this.disabledConfig.to.year >= this.pageYear;
      },
      pageTitleMonth() {
        const { yearSuffix } = this.translation;
        return `${this.pageYear}${yearSuffix}`;
      }
    },
    methods: {
      firstMonthCellDate() {
        const pageDate = new Date(this.pageDate);
        return new Date(this.utils.setMonth(pageDate, 0));
      },
      isDisabledMonth(date) {
        if (!this.disabledDates)
          return false;
        return new DisabledDate(this.utils, this.disabledDates).isMonthDisabled(
          date
        );
      },
      isOpenMonth(date) {
        if (!this.openDate)
          return false;
        const openDateMonth = this.utils.getMonth(this.openDate);
        const openDateYear = this.utils.getFullYear(this.openDate);
        const thisDateMonth = this.utils.getMonth(date);
        const thisDateYear = this.utils.getFullYear(date);
        return openDateMonth === thisDateMonth && openDateYear === thisDateYear;
      },
      isSelectedMonth(date) {
        if (!this.selectedDate)
          return false;
        const month = this.utils.getMonth(date);
        const year = this.utils.getFullYear(date);
        return this.selectedDate && year === this.utils.getFullYear(this.selectedDate) && month === this.utils.getMonth(this.selectedDate);
      },
      isTodayMonth(date) {
        const { utils: utils2 } = this;
        const todayMonth = new Date(utils2.setDate(utils2.getNewDateObject(), 1));
        return utils2.compareDates(date, todayMonth);
      }
    }
  };
  const _hoisted_1$2 = { key: 0 };
  const _hoisted_2$2 = { class: "cells-wrapper" };
  const _hoisted_3$2 = { key: 2 };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PickerHeader = vue.resolveComponent("PickerHeader");
    const _component_PickerCells = vue.resolveComponent("PickerCells");
    return vue.openBlock(), vue.createElementBlock("div", null, [
      _ctx.$slots.beforeCalendarHeaderMonth ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
        vue.renderSlot(_ctx.$slots, "beforeCalendarHeaderMonth")
      ])) : vue.createCommentVNode("", true),
      _ctx.showHeader ? (vue.openBlock(), vue.createBlock(_component_PickerHeader, {
        key: 1,
        ref: "pickerHeader",
        "bootstrap-styling": _ctx.bootstrapStyling,
        "is-next-disabled": $options.isNextDisabled,
        "is-previous-disabled": $options.isPreviousDisabled,
        "is-rtl": _ctx.isRtl,
        "is-up-disabled": _ctx.isUpDisabled,
        "next-view-up": "year",
        onFocusInput: _ctx.focusInput,
        onPageChange: _cache[0] || (_cache[0] = ($event) => _ctx.changePage($event)),
        onSetFocus: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("setFocus", $event)),
        onSetView: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("setView", $event))
      }, {
        prevIntervalBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "prevIntervalBtn")
        ]),
        nextIntervalBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "nextIntervalBtn")
        ]),
        default: vue.withCtx(() => [
          vue.createTextVNode(" " + vue.toDisplayString($options.pageTitleMonth) + " ", 1)
        ]),
        _: 3
      }, 8, ["bootstrap-styling", "is-next-disabled", "is-previous-disabled", "is-rtl", "is-up-disabled", "onFocusInput"])) : vue.createCommentVNode("", true),
      vue.createElementVNode("div", _hoisted_2$2, [
        vue.createVNode(vue.Transition, { name: _ctx.transitionName }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(_component_PickerCells, {
              ref: "cells",
              key: $options.pageTitleMonth,
              "bootstrap-styling": _ctx.bootstrapStyling,
              cells: $options.cells,
              "is-rtl": _ctx.isRtl,
              "tabbable-cell-id": _ctx.tabbableCellId,
              view: "month",
              onArrow: _cache[3] || (_cache[3] = ($event) => _ctx.handleArrow($event)),
              onSelect: _cache[4] || (_cache[4] = ($event) => _ctx.select($event))
            }, {
              default: vue.withCtx(({ cell }) => [
                vue.createTextVNode(vue.toDisplayString(cell.month), 1)
              ]),
              _: 1
            }, 8, ["bootstrap-styling", "cells", "is-rtl", "tabbable-cell-id"]))
          ]),
          _: 1
        }, 8, ["name"])
      ]),
      _ctx.$slots.calendarFooterMonth ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$2, [
        vue.renderSlot(_ctx.$slots, "calendarFooterMonth")
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const PickerMonth = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);
  const _sfc_main$2 = {
    name: "PickerYear",
    components: { PickerCells },
    mixins: [_sfc_main$6],
    props: {
      yearRange: {
        type: Number,
        default: 10
      }
    },
    emits: {
      setFocus: (refArray) => {
        return refArray.every((ref) => {
          return ["input", "prev", "up", "next", "tabbableCell"].includes(ref);
        });
      }
    },
    computed: {
      cells() {
        const { utils: utils2 } = this;
        const years = [];
        const dObj = this.firstYearCellDate();
        for (let i = 0; i < this.yearRange; i += 1) {
          years.push({
            year: utils2.getFullYear(dObj),
            timestamp: dObj.valueOf(),
            isDisabled: this.isDisabledYear(dObj),
            isOpenDate: this.isOpenYear(dObj),
            isSelected: this.isSelectedYear(dObj),
            isToday: this.isTodayYear(dObj)
          });
          utils2.setFullYear(dObj, utils2.getFullYear(dObj) + 1);
        }
        const cellsInGrid = Math.ceil(this.yearRange / 3) * 3;
        for (let i = years.length; i < cellsInGrid; i += 1) {
          years.push({
            id: i,
            isDisabled: true
          });
        }
        return years;
      },
      isNextDisabled() {
        if (!this.disabledConfig.has.from) {
          return false;
        }
        return this.disabledConfig.from.year <= this.pageDecadeEnd;
      },
      isPreviousDisabled() {
        if (!this.disabledConfig.has.to) {
          return false;
        }
        return this.disabledConfig.to.year >= this.pageDecadeStart;
      },
      pageDecadeStart() {
        return Math.floor(this.pageYear / this.yearRange) * this.yearRange;
      },
      pageDecadeEnd() {
        return this.pageDecadeStart + this.yearRange - 1;
      },
      pageTitleYear() {
        const { yearSuffix } = this.translation;
        return `${this.pageDecadeStart} - ${this.pageDecadeEnd}${yearSuffix}`;
      }
    },
    methods: {
      firstYearCellDate() {
        const { utils: utils2 } = this;
        const pageDate = new Date(this.pageDate);
        const firstYear = Math.floor(utils2.getFullYear(pageDate) / this.yearRange) * this.yearRange;
        return new Date(utils2.setFullYear(pageDate, firstYear));
      },
      isDisabledYear(date) {
        if (!this.disabledDates)
          return false;
        return new DisabledDate(this.utils, this.disabledDates).isYearDisabled(
          date
        );
      },
      isOpenYear(date) {
        if (!this.openDate)
          return false;
        const openDateYear = this.utils.getFullYear(this.openDate);
        const thisDateYear = this.utils.getFullYear(date);
        return openDateYear === thisDateYear;
      },
      isSelectedYear(date) {
        if (!this.selectedDate)
          return false;
        const year = this.utils.getFullYear(date);
        return this.selectedDate && year === this.utils.getFullYear(this.selectedDate);
      },
      isTodayYear(date) {
        const { utils: utils2 } = this;
        const todayYear = utils2.getFullYear(utils2.getNewDateObject());
        return utils2.getFullYear(date) === todayYear;
      }
    }
  };
  const _hoisted_1$1 = { key: 0 };
  const _hoisted_2$1 = { class: "cells-wrapper" };
  const _hoisted_3$1 = { key: 2 };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PickerHeader = vue.resolveComponent("PickerHeader");
    const _component_PickerCells = vue.resolveComponent("PickerCells");
    return vue.openBlock(), vue.createElementBlock("div", null, [
      _ctx.$slots.beforeCalendarHeaderYear ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
        vue.renderSlot(_ctx.$slots, "beforeCalendarHeaderYear")
      ])) : vue.createCommentVNode("", true),
      _ctx.showHeader ? (vue.openBlock(), vue.createBlock(_component_PickerHeader, {
        key: 1,
        ref: "pickerHeader",
        "bootstrap-styling": _ctx.bootstrapStyling,
        "is-next-disabled": $options.isNextDisabled,
        "is-previous-disabled": $options.isPreviousDisabled,
        "is-rtl": _ctx.isRtl,
        "is-up-disabled": true,
        onFocusInput: _ctx.focusInput,
        onPageChange: _cache[0] || (_cache[0] = ($event) => _ctx.changePage($event)),
        onSetFocus: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("setFocus", $event))
      }, {
        prevIntervalBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "prevIntervalBtn")
        ]),
        nextIntervalBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "nextIntervalBtn")
        ]),
        default: vue.withCtx(() => [
          vue.createTextVNode(" " + vue.toDisplayString($options.pageTitleYear) + " ", 1)
        ]),
        _: 3
      }, 8, ["bootstrap-styling", "is-next-disabled", "is-previous-disabled", "is-rtl", "onFocusInput"])) : vue.createCommentVNode("", true),
      vue.createElementVNode("div", _hoisted_2$1, [
        vue.createVNode(vue.Transition, { name: _ctx.transitionName }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(_component_PickerCells, {
              ref: "cells",
              key: $options.pageTitleYear,
              "bootstrap-styling": _ctx.bootstrapStyling,
              cells: $options.cells,
              "is-rtl": _ctx.isRtl,
              "tabbable-cell-id": _ctx.tabbableCellId,
              view: "year",
              onArrow: _cache[2] || (_cache[2] = ($event) => _ctx.handleArrow($event)),
              onSelect: _cache[3] || (_cache[3] = ($event) => _ctx.select($event))
            }, {
              default: vue.withCtx(({ cell }) => [
                vue.createTextVNode(vue.toDisplayString(cell.year), 1)
              ]),
              _: 1
            }, 8, ["bootstrap-styling", "cells", "is-rtl", "tabbable-cell-id"]))
          ]),
          _: 1
        }, 8, ["name"])
      ]),
      _ctx.$slots.calendarFooterYear ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$1, [
        vue.renderSlot(_ctx.$slots, "calendarFooterYear")
      ])) : vue.createCommentVNode("", true)
    ]);
  }
  const PickerYear = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
  function getPopupElementSize(element) {
    const originalDisplay = element.style.display;
    const originalVisibility = element.style.visibility;
    element.style.display = "block";
    element.style.visibility = "hidden";
    const styles = window.getComputedStyle(element);
    const width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
    const height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    return {
      width,
      height
    };
  }
  function getRelativePosition({
    el,
    elRelative,
    targetWidth,
    targetHeight,
    appendToBody,
    fixedPosition,
    rtl
  }) {
    let left = 0;
    let top = 0;
    let offsetX = 0;
    let offsetY = 0;
    const relativeRect = elRelative.getBoundingClientRect();
    const documentWidth = document.documentElement.clientWidth;
    const documentHeight = document.documentElement.clientHeight;
    if (appendToBody) {
      offsetX = window.pageXOffset + relativeRect.left;
      offsetY = window.pageYOffset + relativeRect.top;
    }
    const calendarBounding = el.getBoundingClientRect();
    const outOfBoundsRight = calendarBounding.right > window.innerWidth;
    const outOfBoundsBottom = calendarBounding.bottom > window.innerHeight;
    const fixedPositionRight = fixedPosition && fixedPosition.indexOf("right") !== -1;
    const fixedPositionTop = fixedPosition && fixedPosition.indexOf("top") !== -1;
    const setLeft = () => {
      left = offsetX;
    };
    const setRight = () => {
      left = offsetX + relativeRect.width - targetWidth;
    };
    const setBottom = () => {
      top = offsetY + relativeRect.height;
    };
    const setTop = () => {
      top = offsetY - targetHeight;
    };
    if (fixedPosition === "") {
      if (outOfBoundsRight || rtl) {
        setRight();
      } else {
        setLeft();
      }
      if (outOfBoundsBottom) {
        setTop();
      } else {
        setBottom();
      }
      const hasRelativeWidth = documentWidth - relativeRect.left < targetWidth && relativeRect.right < targetWidth;
      const hasRelativeHeight = relativeRect.top <= targetHeight && documentHeight - relativeRect.bottom <= targetHeight;
      if (hasRelativeWidth) {
        left = offsetX - relativeRect.left + 1;
      }
      if (hasRelativeHeight) {
        top = offsetY + documentHeight - relativeRect.top - targetHeight;
      }
    } else {
      if (fixedPositionRight) {
        setRight();
      } else {
        setLeft();
      }
      if (fixedPositionTop) {
        setTop();
      } else {
        setBottom();
      }
    }
    return {
      left: `${left}px`,
      top: `${top}px`
    };
  }
  const _sfc_main$1 = {
    name: "Popup",
    props: {
      appendToBody: {
        type: Boolean,
        default: true
      },
      fixedPosition: {
        type: String,
        default: ""
      },
      inline: {
        type: Boolean,
        default: false
      },
      rtl: {
        type: Boolean,
        default: false
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        popupRect: null
      };
    },
    watch: {
      visible: {
        immediate: true,
        handler(val) {
          if (val) {
            this.displayPopup();
          }
        }
      }
    },
    mounted() {
      if (this.inline) {
        return;
      }
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    },
    beforeUnmount() {
      if (this.inline) {
        return;
      }
      if (this.appendToBody && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    methods: {
      setTopStyle() {
        if (this.appendToBody) {
          const relativeRect = this.$parent.$el.getBoundingClientRect();
          this.$el.style.top = `${relativeRect.bottom + window.scrollY}px`;
        }
      },
      displayPopup() {
        if (this.inline || !this.visible)
          return;
        this.setTopStyle();
        const popup = this.$el.children[0];
        const relativeElement = this.$parent.$el;
        if (!this.popupRect) {
          this.popupRect = getPopupElementSize(popup);
        }
        const { width, height } = this.popupRect;
        const { left, top } = getRelativePosition({
          el: popup,
          elRelative: relativeElement,
          targetWidth: width,
          targetHeight: height,
          appendToBody: this.appendToBody,
          fixedPosition: this.fixedPosition,
          rtl: this.rtl
        });
        popup.style.left = left;
        popup.style.top = top;
      }
    },
    render() {
      return vue.h("div", this.$slots.default()[0].children.default());
    }
  };
  const Datepicker_vue_vue_type_style_index_0_lang = "";
  const _sfc_main = {
    name: "Datepicker",
    components: {
      DateInput,
      PickerDay,
      PickerMonth,
      PickerYear,
      Popup: _sfc_main$1
    },
    mixins: [_sfc_main$a, _sfc_main$8],
    props: {
      appendToBody: {
        type: Boolean,
        default: false
      },
      calendarClass: {
        type: [String, Object, Array],
        default: ""
      },
      dayCellContent: {
        type: Function,
        default: (day) => day.date
      },
      disabledDates: {
        type: Object,
        default: null
      },
      firstDayOfWeek: {
        type: String,
        default: "sun"
      },
      fixedPosition: {
        type: String,
        default: "",
        validator: (val) => {
          const possibleValues = [
            "",
            "bottom",
            "bottom-left",
            "bottom-right",
            "top",
            "top-left",
            "top-right"
          ];
          return possibleValues.includes(val);
        }
      },
      fullMonthName: {
        type: Boolean,
        default: null
      },
      highlighted: {
        type: Object,
        default: null
      },
      initialView: {
        type: String,
        default: ""
      },
      language: {
        type: Object,
        default: () => en
      },
      maximumView: {
        type: String,
        default: "year"
      },
      minimumView: {
        type: String,
        default: "day"
      },
      modelValue: {
        type: [String, Date, Number],
        default: null
      },
      showEdgeDates: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      wrapperClass: {
        type: [String, Object, Array],
        default: ""
      },
      yearPickerRange: {
        type: Number,
        default: 10
      }
    },
    emits: {
      "blur": null,
      "changed": null,
      "cleared": null,
      "closed": null,
      "focus": null,
      "opened": null,
      "changedMonth": (date) => {
        return typeof date === "object";
      },
      "changedYear": (date) => {
        return typeof date === "object";
      },
      "changedDecade": (date) => {
        return typeof date === "object";
      },
      "selected": (date) => {
        return date instanceof Date || date === null;
      },
      "update:modelValue": (date) => {
        return date instanceof Date || date === null;
      }
    },
    data() {
      const utils2 = makeDateUtils(this.useUtc);
      const startDate = utils2.getNewDateObject(this.openDate || null);
      const pageTimestamp = utils2.setDate(startDate, 1);
      return {
        calendarHeight: 0,
        isClickOutside: false,
        globalDatepickerId: "",
        latestValidTypedDate: null,
        pageTimestamp,
        selectedDate: null,
        slideDuration: 250,
        utils: utils2,
        view: ""
      };
    },
    computed: {
      computedInitialView() {
        return this.initialView || this.minimumView;
      },
      computedOpenDate() {
        const parsedOpenDate = this.parseValue(this.openDate);
        const openDateOrToday = this.utils.getNewDateObject(parsedOpenDate);
        const openDate = this.selectedDate || openDateOrToday;
        return this.minimumView === "day" ? openDate : new Date(this.utils.setDate(openDate, 1));
      },
      datepickerId() {
        return `vdp-${Math.random().toString(36).slice(-10)}`;
      },
      isInline() {
        return !!this.inline;
      },
      isOpen() {
        return this.view !== "";
      },
      isMinimumView() {
        return this.view === this.minimumView;
      },
      isRtl() {
        return this.translation.rtl;
      },
      isUpDisabled() {
        return !this.allowedToShowView(this.nextView.up);
      },
      nextView() {
        const views = ["day", "month", "year"];
        const isCurrentView = (view) => view === this.view;
        const viewIndex = views.findIndex(isCurrentView);
        const nextViewDown = (index) => {
          return index <= 0 ? void 0 : views[index - 1];
        };
        const nextViewUp = (index) => {
          if (index < 0) {
            return void 0;
          }
          if (index === views.length - 1) {
            return "decade";
          }
          return views[index + 1];
        };
        return {
          up: nextViewUp(viewIndex),
          down: nextViewDown(viewIndex)
        };
      },
      pageDate() {
        return new Date(this.pageTimestamp);
      },
      picker() {
        const view = this.view || this.computedInitialView;
        return `Picker${this.ucFirst(view)}`;
      },
      pickerClasses() {
        return [
          this.calendarClass,
          this.isInline && "vdp-datepicker__calendar--inline",
          this.isRtl && this.appendToBody && "rtl"
        ];
      },
      translation() {
        return this.language;
      },
      usedCalendarSlots() {
        return calendarSlots.filter((slot) => this.hasSlot(slot));
      }
    },
    watch: {
      disabledDates: {
        handler() {
          const selectedDate = this.selectedDate || this.parseValue(this.modelValue);
          if (!selectedDate) {
            return;
          }
          if (this.isDateDisabled(selectedDate) && selectedDate) {
            this.selectDate(null);
            return;
          }
          if (this.dateHasChanged(selectedDate)) {
            this.selectDate(selectedDate);
          }
        },
        deep: true
      },
      initialView() {
        if (this.isOpen) {
          this.setInitialView();
        }
      },
      isActive(hasJustBecomeActive, isNoLongerActive) {
        if (hasJustBecomeActive) {
          this.datepickerIsActive();
        }
        if (isNoLongerActive) {
          this.datepickerIsInactive();
        }
      },
      latestValidTypedDate(date) {
        this.setPageDate(date);
      },
      modelValue: {
        handler(newValue, oldValue) {
          let parsedValue = this.parseValue(newValue);
          const oldParsedValue = this.parseValue(oldValue);
          if (!this.utils.compareDates(parsedValue, oldParsedValue)) {
            const isDateDisabled = parsedValue && this.isDateDisabled(parsedValue);
            if (isDateDisabled) {
              parsedValue = null;
            }
            this.setValue(parsedValue);
          }
        },
        immediate: true
      },
      openDate() {
        this.setPageDate();
      },
      view(newView, oldView) {
        this.handleViewChange(newView, oldView);
      }
    },
    mounted() {
      this.init();
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
      allowedToShowView(view) {
        const views = ["day", "month", "year"];
        const minimumViewIndex = views.indexOf(this.minimumView);
        const maximumViewIndex = views.indexOf(this.maximumView);
        const viewIndex = views.indexOf(view);
        return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
      },
      clearDate() {
        if (!this.selectedDate) {
          return;
        }
        this.selectDate(null);
        this.focus.refs = ["input"];
        this.close();
        this.$emit("cleared");
      },
      close() {
        if (this.isInline) {
          return;
        }
        this.view = "";
        if (this.showCalendarOnFocus) {
          this.$refs.dateInput.shouldToggleOnClick = true;
        }
        if (this.isClickOutside) {
          this.isClickOutside = false;
        } else {
          this.reviewFocus();
        }
        this.$emit("closed");
      },
      dateHasChanged(date) {
        return !this.utils.compareDates(date, this.selectedDate);
      },
      datepickerIsActive() {
        this.$emit("focus");
        if (this.inline) {
          this.setNavElementsFocusedIndex();
          this.tabToCorrectInlineCell();
        }
      },
      datepickerIsInactive() {
        this.$emit("blur");
        if (this.typeable) {
          this.skipReviewFocus = true;
          this.selectTypedDateOnLosingFocus();
          this.$nextTick(() => {
            this.skipReviewFocus = false;
          });
        }
      },
      handleClickOutside() {
        if (!this.isOpen) {
          return;
        }
        const closeByClickOutside = () => {
          this.isClickOutside = true;
          this.close();
        };
        if (!this.globalDatepickerId) {
          closeByClickOutside();
          return;
        }
        if (document.datepickerId.toString() === this.datepickerId) {
          this.$nextTick(() => {
            if (!this.isActive) {
              closeByClickOutside();
            }
          });
        }
      },
      handlePageChange({ focusRefs, pageDate }) {
        this.setPageDate(pageDate);
        this.focus.refs = focusRefs;
        this.focus.delay = this.slideDuration || 250;
        this.reviewFocus();
        this.$emit(`changed${this.ucFirst(this.nextView.up)}`, pageDate);
      },
      handleSelect(cell) {
        if (this.allowedToShowView(this.nextView.down)) {
          this.showNextViewDown(cell);
          return;
        }
        this.$refs.dateInput.typedDate = "";
        this.selectDate(new Date(cell.timestamp));
        this.focus.delay = cell.isNextMonth ? this.slideDuration : 0;
        this.focus.refs = this.isInline ? ["tabbableCell"] : ["input"];
        this.close();
        if (this.showCalendarOnFocus && !this.inline) {
          this.$refs.dateInput.shouldToggleOnClick = true;
        } else {
          this.reviewFocus();
        }
      },
      handleTypedDate(date) {
        const originalTypedDate = new Date(this.latestValidTypedDate);
        const originalPageDate = new Date(this.pageDate);
        this.latestValidTypedDate = date || this.computedOpenDate;
        this.setTransitionAndFocusDelay(
          originalTypedDate,
          this.latestValidTypedDate
        );
        this.setPageDate(date);
        if (this.isPageChange(originalPageDate)) {
          this.handlePageChange({
            focusRefs: [],
            pageDate: this.pageDate
          });
          return;
        }
        this.setTabbableCell();
      },
      handleViewChange(newView, oldView) {
        const isClosing = newView === "";
        const isOpeningInline = oldView === "" && this.isInline;
        if (isClosing || isOpeningInline) {
          return;
        }
        if (!this.isRevertingToOpenDate) {
          this.setViewChangeFocusRefs(newView, oldView);
          this.reviewFocus();
        }
        this.isRevertingToOpenDate = false;
      },
      hasClass(element, className) {
        return element && element.className.split(" ").includes(className);
      },
      isPageChange(originalPageDate) {
        if (!this.isOpen) {
          return false;
        }
        return originalPageDate.valueOf() !== this.pageDate.valueOf();
      },
      init() {
        if (this.typeable) {
          this.latestValidTypedDate = this.selectedDate || this.computedOpenDate;
        }
        if (this.isInline) {
          this.setInitialView();
        }
        this.setSlideDuration();
      },
      isDateDisabled(date) {
        if (!this.disabledDates)
          return false;
        return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(
          date
        );
      },
      isResetFocus() {
        if (!this.isOpen) {
          return false;
        }
        const activeElement = this.getActiveElement();
        const isOpenCellFocused = this.hasClass(activeElement, "cell") && !this.hasClass(activeElement, "open");
        return !this.isMinimumView || isOpenCellFocused;
      },
      open() {
        if (this.disabled || this.isInline) {
          return;
        }
        this.setInitialView();
        this.reviewFocus();
        this.$emit("opened");
      },
      parseValue(date) {
        if (typeof date === "string" || typeof date === "number") {
          const parsed = new Date(date);
          return this.utils.isValidDate(parsed) ? parsed : null;
        }
        return this.utils.isValidDate(date) ? date : null;
      },
      resetOrClose() {
        if (this.isResetFocus()) {
          this.resetFocusToOpenDate();
          return;
        }
        if (this.isOpen) {
          this.focus.refs = ["input"];
          this.close();
        }
      },
      selectDate(date) {
        if (this.dateHasChanged(date)) {
          this.$emit("changed", date);
        }
        this.setValue(date);
        this.$emit("selected", date);
        this.$emit("update:modelValue", date);
      },
      selectTypedDate(date) {
        this.selectDate(date);
        this.reviewFocus();
        if (this.isOpen) {
          this.close();
        }
      },
      selectTypedDateOnLosingFocus() {
        const parsedDate = this.$refs.dateInput.parseInput();
        const date = this.utils.isValidDate(parsedDate) ? parsedDate : null;
        if (this.dateHasChanged(date)) {
          this.selectDate(date);
        }
      },
      setInitialView() {
        const initialView = this.computedInitialView;
        if (!this.allowedToShowView(initialView)) {
          throw new Error(
            `initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`
          );
        }
        this.setView(initialView);
      },
      setPageDate(date) {
        const dateTemp = new Date(date || this.computedOpenDate);
        let pageTimestamp = this.utils.setDate(dateTemp, 1);
        if (this.view === "year") {
          pageTimestamp = this.utils.setMonth(new Date(pageTimestamp), 0);
        }
        this.pageTimestamp = pageTimestamp;
      },
      setSlideDuration() {
        if (!this.$refs.picker || !this.$refs.picker.$refs.cells) {
          return;
        }
        const cells = this.$refs.picker.$refs.cells.$el;
        const durationInSecs = window.getComputedStyle(cells).transitionDuration;
        this.slideDuration = parseFloat(durationInSecs) * 1e3;
      },
      setValue(date) {
        this.selectedDate = date || null;
        this.setPageDate(date);
        if (this.typeable) {
          this.latestValidTypedDate = date || this.computedOpenDate;
        }
      },
      setView(view) {
        if (this.allowedToShowView(view)) {
          this.view = view;
        }
      },
      setViewChangeFocusRefs(newView, oldView) {
        if (oldView === "") {
          this.focus.refs = [];
          return;
        }
        const views = ["day", "month", "year"];
        const isNewView = (view) => view === newView;
        const isOldView = (view) => view === oldView;
        const newViewIndex = views.findIndex(isNewView);
        const oldViewIndex = views.findIndex(isOldView);
        const isViewChangeUp = newViewIndex - oldViewIndex > 0;
        this.focus.refs = isViewChangeUp ? ["up", "tabbableCell"] : ["tabbableCell", "up"];
      },
      showNextViewDown(cell) {
        this.setPageDate(new Date(cell.timestamp));
        this.$emit(`changed${this.ucFirst(this.view)}`, cell);
        this.setView(this.nextView.down);
      },
      ucFirst(str) {
        return str[0].toUpperCase() + str.substring(1);
      }
    }
  };
  const _hoisted_1 = ["id"];
  const _hoisted_2 = { key: 0 };
  const _hoisted_3 = { key: 1 };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_DateInput = vue.resolveComponent("DateInput");
    const _component_Popup = vue.resolveComponent("Popup");
    return vue.openBlock(), vue.createElementBlock("div", {
      id: $options.datepickerId,
      ref: "datepicker",
      class: vue.normalizeClass(["vdp-datepicker", [$props.wrapperClass, { rtl: $options.isRtl }]]),
      onFocusin: _cache[9] || (_cache[9] = ($event) => _ctx.handleFocusIn($event)),
      onFocusout: _cache[10] || (_cache[10] = ($event) => _ctx.handleFocusOut($event)),
      onKeydown: _cache[11] || (_cache[11] = vue.withKeys((...args) => $options.resetOrClose && $options.resetOrClose(...args), ["esc"]))
    }, [
      vue.createVNode(_component_DateInput, {
        id: _ctx.id,
        ref: "dateInput",
        autofocus: _ctx.autofocus,
        "bootstrap-styling": _ctx.bootstrapStyling,
        "calendar-button": _ctx.calendarButton,
        "clear-button": _ctx.clearButton,
        disabled: _ctx.disabled,
        format: _ctx.format,
        inline: _ctx.inline,
        "input-class": _ctx.inputClass,
        "is-open": $options.isOpen,
        maxlength: _ctx.maxlength,
        name: _ctx.name,
        parser: _ctx.parser,
        pattern: _ctx.pattern,
        placeholder: _ctx.placeholder,
        "ref-name": _ctx.refName,
        required: _ctx.required,
        "selected-date": $data.selectedDate,
        "show-calendar-on-button-click": _ctx.showCalendarOnButtonClick,
        "show-calendar-on-focus": _ctx.showCalendarOnFocus,
        tabindex: _ctx.tabindex,
        translation: $options.translation,
        typeable: _ctx.typeable,
        "use-utc": _ctx.useUtc,
        onClearDate: $options.clearDate,
        onClose: $options.close,
        onOpen: $options.open,
        onSelectTypedDate: $options.selectTypedDate,
        onSetFocus: _cache[0] || (_cache[0] = ($event) => _ctx.setFocus($event)),
        onTab: _ctx.tabThroughNavigation,
        onTypedDate: $options.handleTypedDate
      }, {
        beforeDateInput: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "beforeDateInput")
        ]),
        afterDateInput: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "afterDateInput")
        ]),
        clearBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "clearBtn")
        ]),
        calendarBtn: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "calendarBtn")
        ]),
        _: 3
      }, 8, ["id", "autofocus", "bootstrap-styling", "calendar-button", "clear-button", "disabled", "format", "inline", "input-class", "is-open", "maxlength", "name", "parser", "pattern", "placeholder", "ref-name", "required", "selected-date", "show-calendar-on-button-click", "show-calendar-on-focus", "tabindex", "translation", "typeable", "use-utc", "onClearDate", "onClose", "onOpen", "onSelectTypedDate", "onTab", "onTypedDate"]),
      vue.createVNode(_component_Popup, {
        ref: "popup",
        "append-to-body": $props.appendToBody,
        "fixed-position": $props.fixedPosition,
        inline: _ctx.inline,
        rtl: $options.isRtl,
        visible: $options.isOpen
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.Transition, { name: "toggle" }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createElementVNode("div", {
                class: vue.normalizeClass(["vdp-datepicker__calendar", $options.pickerClasses]),
                "data-test-calendar": "",
                onMousedown: _cache[4] || (_cache[4] = vue.withModifiers(() => {
                }, ["prevent"])),
                onFocusin: _cache[5] || (_cache[5] = vue.withModifiers(($event) => _ctx.handleFocusIn($event), ["stop"])),
                onFocusout: _cache[6] || (_cache[6] = vue.withModifiers(($event) => _ctx.handleFocusOut($event), ["stop"])),
                onKeydown: [
                  _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => $options.resetOrClose && $options.resetOrClose(...args), ["stop"]), ["esc"])),
                  _cache[8] || (_cache[8] = vue.withKeys(vue.withModifiers(($event) => _ctx.tabThroughNavigation($event), ["stop"]), ["tab"]))
                ]
              }, [
                vue.createVNode(vue.Transition, { name: "view" }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createElementBlock("div", {
                      ref: "view",
                      key: $data.view
                    }, [
                      _ctx.$slots.beforeCalendarHeader ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                        vue.renderSlot(_ctx.$slots, "beforeCalendarHeader")
                      ])) : vue.createCommentVNode("", true),
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.picker), {
                        ref: "picker",
                        "bootstrap-styling": _ctx.bootstrapStyling,
                        class: "picker-view",
                        "day-cell-content": $props.dayCellContent,
                        "disabled-dates": $props.disabledDates,
                        "first-day-of-week": $props.firstDayOfWeek,
                        highlighted: $props.highlighted,
                        "is-rtl": $options.isRtl,
                        "is-typeable": _ctx.typeable,
                        "is-up-disabled": $options.isUpDisabled,
                        "is-minimum-view": $options.isMinimumView,
                        "open-date": $options.computedOpenDate,
                        "page-date": $options.pageDate,
                        "selected-date": $data.selectedDate,
                        "show-edge-dates": $props.showEdgeDates,
                        "show-full-month-name": $props.fullMonthName,
                        "show-header": $props.showHeader,
                        "slide-duration": $data.slideDuration,
                        "tabbable-cell-id": _ctx.tabbableCellId,
                        "transition-name": _ctx.transitionName,
                        translation: $options.translation,
                        "use-utc": _ctx.useUtc,
                        view: $data.view || $options.computedInitialView,
                        "year-range": $props.yearPickerRange,
                        onPageChange: $options.handlePageChange,
                        onSelect: $options.handleSelect,
                        onSetFocus: _cache[1] || (_cache[1] = ($event) => _ctx.setFocus($event)),
                        onSetSkipReviewFocus: _cache[2] || (_cache[2] = ($event) => _ctx.skipReviewFocus = $event),
                        onSetTransitionName: _cache[3] || (_cache[3] = ($event) => _ctx.setTransitionName($event)),
                        onSetView: $options.setView
                      }, vue.createSlots({
                        dayCellContent: vue.withCtx(({ cell }) => [
                          cell ? vue.renderSlot(_ctx.$slots, "dayCellContent", {
                            key: 0,
                            cell
                          }) : vue.createCommentVNode("", true)
                        ]),
                        _: 2
                      }, [
                        vue.renderList($options.usedCalendarSlots, (slotKey) => {
                          return {
                            name: slotKey,
                            fn: vue.withCtx(() => [
                              vue.renderSlot(_ctx.$slots, slotKey)
                            ])
                          };
                        })
                      ]), 1064, ["bootstrap-styling", "day-cell-content", "disabled-dates", "first-day-of-week", "highlighted", "is-rtl", "is-typeable", "is-up-disabled", "is-minimum-view", "open-date", "page-date", "selected-date", "show-edge-dates", "show-full-month-name", "show-header", "slide-duration", "tabbable-cell-id", "transition-name", "translation", "use-utc", "view", "year-range", "onPageChange", "onSelect", "onSetView"])),
                      _ctx.$slots.calendarFooter ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                        vue.renderSlot(_ctx.$slots, "calendarFooter")
                      ])) : vue.createCommentVNode("", true)
                    ]))
                  ]),
                  _: 3
                })
              ], 34), [
                [vue.vShow, $options.isOpen]
              ])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["append-to-body", "fixed-position", "inline", "rtl", "visible"])
    ], 42, _hoisted_1);
  }
  const Datepicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  return Datepicker;
});
//# sourceMappingURL=vue-datepicker.umd.js.map
