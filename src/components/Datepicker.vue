<template>
  <div class="vdp-datepicker" :class="[wrapperClass, { rtl: isRtl }]">
    <DateInput
      :id="id"
      :autofocus="autofocus"
      :bootstrap-styling="bootstrapStyling"
      :calendar-button="calendarButton"
      :calendar-button-icon="calendarButtonIcon"
      :calendar-button-icon-content="calendarButtonIconContent"
      :clear-button="clearButton"
      :clear-button-icon="clearButtonIcon"
      :disabled="disabled"
      :format="format"
      :inline="isInline"
      :is-open="isOpen"
      :input-class="inputClass"
      :maxlength="maxlength"
      :name="name"
      :parser="parser"
      :pattern="pattern"
      :placeholder="placeholder"
      :ref-name="refName"
      :required="required"
      :reset-typed-date="resetTypedDate"
      :selected-date="selectedDate"
      :show-calendar-on-button-click="showCalendarOnButtonClick"
      :show-calendar-on-focus="showCalendarOnFocus"
      :tabindex="tabindex"
      :translation="translation"
      :typeable="typeable"
      :use-utc="useUtc"
      @blur="handleInputBlur"
      @clear-date="clearDate"
      @close="close"
      @focus="handleInputFocus"
      @open="open"
      @typed-date="handleTypedDate"
    >
      <slot slot="beforeDateInput" name="beforeDateInput" />
      <slot slot="afterDateInput" name="afterDateInput" />
      <slot slot="clearBtn" name="clearBtn" />
      <slot slot="calendarBtn" name="calendarBtn" />
    </DateInput>

    <Popup
      ref="popup"
      :append-to-body="appendToBody"
      :fixed-position="fixedPosition"
      :inline="isInline"
      :rtl="isRtl"
      :visible="isOpen"
    >
      <div
        v-show="isOpen"
        ref="datepicker"
        class="vdp-datepicker__calendar"
        :class="pickerClasses"
        @mousedown.prevent
      >
        <slot name="beforeCalendarHeader" />
        <Component
          :is="picker"
          :day-cell-content="dayCellContent"
          :disabled-dates="disabledDates"
          :first-day-of-week="firstDayOfWeek"
          :highlighted="highlightedDate"
          :use-date-range="useDateRange"
          :is-rtl="isRtl"
          :is-up-disabled="isUpDisabled"
          :page-date="pageDate"
          :selected-date="selectedDate"
          :show-edge-dates="showEdgeDates"
          :show-full-month-name="fullMonthName"
          :show-header="showHeader"
          :translation="translation"
          :use-utc="useUtc"
          :year-range="yearPickerRange"
          @page-change="handlePageChange"
          @select="handleSelect"
          @select-disabled="handleSelectDisabled"
          @set-view="setView"
          @set-highlighted-date="setMouseoverHighlight"
          @remove-highlighted-date="removeMouseoverHighlight"
        >
          <template v-for="slotKey of calendarSlots">
            <slot :slot="slotKey" :name="slotKey" />
          </template>
        </Component>
        <slot name="calendarFooter" />
      </div>
    </Popup>
  </div>
</template>

<script>
import en from '~/locale/translations/en'
import calendarSlots from '~/utils/calendarSlots'
import DateInput from '~/components/DateInput.vue'
import DisabledDate from '~/utils/DisabledDate'
import inputProps from '~/mixins/inputProps.vue'
import makeDateUtils from '~/utils/DateUtils'
import PickerDay from '~/components/PickerDay.vue'
import PickerMonth from '~/components/PickerMonth.vue'
import PickerYear from '~/components/PickerYear.vue'
import Popup from '~/components/Popup.vue'

export default {
  name: 'Datepicker',
  components: {
    DateInput,
    PickerDay,
    PickerMonth,
    PickerYear,
    Popup,
  },
  mixins: [inputProps],
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    calendarClass: {
      type: [String, Object, Array],
      default: '',
    },
    currentDateRangeType: {
      type: String,
      default: 'from',
      validator: (val) => {
        return ['from', 'to'].indexOf(val) >= 0
      },
    },
    dayCellContent: {
      type: Function,
      default: (day) => day.date,
    },
    disabledDates: {
      type: Object,
      default() {
        return {}
      },
    },
    firstDayOfWeek: {
      type: String,
      default: 'sun',
    },
    fixedPosition: {
      type: String,
      default: '',
      validator: (val) => {
        const possibleValues = [
          '',
          'bottom',
          'bottom-left',
          'bottom-right',
          'top',
          'top-left',
          'top-right',
        ]
        return possibleValues.includes(val)
      },
    },
    fullMonthName: {
      type: Boolean,
      default: false,
    },
    highlighted: {
      type: Object,
      default() {
        return {}
      },
    },
    initialView: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    language: {
      type: Object,
      default: () => en,
    },
    maximumView: {
      type: String,
      default: 'year',
    },
    minimumView: {
      type: String,
      default: 'day',
    },
    showEdgeDates: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    useDateRange: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Date, Number],
      default: '',
      validator: (val) =>
        val === null ||
        val instanceof Date ||
        typeof val === 'string' ||
        typeof val === 'number',
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: '',
    },
    yearPickerRange: {
      type: Number,
      default: 10,
    },
  },
  data() {
    const utils = makeDateUtils(this.useUtc)
    const startDate = utils.getNewDateObject(this.openDate || null)
    const pageTimestamp = utils.setDate(startDate, 1)

    return {
      calendarHeight: 0,
      calendarSlots,
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      from: {},
      fromMouseover: null,
      pageTimestamp,
      resetTypedDate: utils.getNewDateObject(),
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      to: {},
      toMouseover: null,
      utils,
      view: '',
    }
  },
  computed: {
    allowedViews() {
      const views = ['day', 'month', 'year']

      return views.filter((view) => this.allowedToShowView(view))
    },
    computedInitialView() {
      return this.initialView || this.minimumView
    },
    getFromTimestamp() {
      return this.from.timestamp || null
    },
    getToTimestamp() {
      return this.to.timestamp || null
    },
    highlightedDate() {
      if (!this.useDateRange) return this.highlighted

      const { value: fromValue = this.fromMouseover } = this.from
      const { value: toValue = this.toMouseover } = this.to

      return {
        from: fromValue,
        to: toValue,
      }
    },
    isEligibleToHighlightCell() {
      if (!this.useDateRange) return false

      const enableFromHighlight =
        this.currentDateRangeType === 'from' && !this.getFromTimestamp

      const enableToHighlight =
        this.currentDateRangeType === 'to' && !this.getToTimestamp

      return enableFromHighlight || enableToHighlight
    },
    isInline() {
      return !!this.inline || this.useDateRange
    },
    isOpen() {
      return this.view !== ''
    },
    isRtl() {
      return this.translation.rtl
    },
    isUpDisabled() {
      return !this.allowedToShowView(this.nextView.up)
    },
    nextView() {
      const isCurrentView = (view) => view === this.view
      const viewIndex = this.allowedViews.findIndex(isCurrentView)
      const nextViewDown = (index) => {
        return index <= 0 ? undefined : this.allowedViews[index - 1]
      }
      const nextViewUp = (index) => {
        if (index < 0) {
          return undefined
        }

        if (index === this.allowedViews.length - 1) {
          return 'decade'
        }

        return this.allowedViews[index + 1]
      }

      return {
        up: nextViewUp(viewIndex),
        down: nextViewDown(viewIndex),
      }
    },
    pageDate() {
      return new Date(this.pageTimestamp)
    },
    picker() {
      const view = this.view || this.computedInitialView
      return `Picker${this.ucFirst(view)}`
    },
    pickerClasses() {
      return [
        this.calendarClass,
        this.isInline && 'inline',
        this.isRtl && this.appendToBody && 'rtl',
      ]
    },
    translation() {
      return this.language
    },
  },
  watch: {
    initialView() {
      this.setInitialView()
    },
    openDate() {
      this.setPageDate()
    },
    value(value) {
      const parsedValue = this.parseValue(value)
      this.setValue(parsedValue)
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
      const views = ['day', 'month', 'year']
      const minimumViewIndex = views.indexOf(this.minimumView)
      const maximumViewIndex = views.indexOf(this.maximumView)
      const viewIndex = views.indexOf(view)

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
    },
    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null
      this.setPageDate()
      this.$emit('selected', null)
      this.$emit('input', null)
      this.$emit('cleared')
    },
    /**
     * Close the calendar views
     */
    close() {
      if (!this.isInline) {
        this.view = ''
        this.$emit('closed')
      }
    },
    getDateRangeValue(cell) {
      const { timestamp } = cell

      return {
        timestamp,
        value: new Date(timestamp),
      }
    },
    handleDateRange(selectedDate) {
      if (this.currentDateRangeType === 'from') {
        this.handleFromDateRange(selectedDate)
      } else {
        this.handleToDateRange(selectedDate)
      }
    },
    handleDateRangeCallback() {
      this.removeMouseoverHighlight()

      if (this.currentDateRangeType === 'from') {
        this.$emit('on-from-date-change')
      } else {
        this.$emit('on-to-date-change')
      }

      this.$emit('on-date-range-change', {
        from: this.getFromTimestamp,
        to: this.getToTimestamp,
      })
    },
    handleDefaultSelect(cell) {
      if (this.allowedToShowView(this.nextView.down)) {
        this.setPageDate(new Date(cell.timestamp))
        this.$emit(`changed-${this.view}`, cell)
        this.setView(this.nextView.down)
        return
      }

      this.resetTypedDate = this.utils.getNewDateObject()
      this.setDate(cell.timestamp)
      this.close()
    },
    handleFromDateRange(selectedDate) {
      const { timestamp } = selectedDate

      if (!this.getToTimestamp) {
        this.setInitialDateRange({ selectedDate, dateType: 'from' })
        return
      }

      this.setValue(null)

      const isDateRangeValid =
        timestamp < this.getToTimestamp || timestamp === this.getToTimestamp

      if (isDateRangeValid) {
        this.setFromDate(selectedDate)
      } else {
        this.handleInvalidDateRange({ selectedDate, dateType: 'from' })
      }

      this.handleDateRangeCallback()
    },
    /**
     * Set the new pageDate and emit `changed-<view>` event
     */
    handlePageChange(pageDate) {
      this.setPageDate(pageDate)
      this.$emit(`changed-${this.nextView.up}`, pageDate)
    },
    /**
     * Emits a 'blur' event
     */
    handleInputBlur() {
      this.$emit('blur')
    },
    /**
     * Emits a 'focus' event
     */
    handleInputFocus() {
      this.$emit('focus')
    },
    handleInvalidDateRange({ selectedDate, dateType }) {
      const { timestamp } = selectedDate

      this.handleResetDateRange()
      this.setTemporaryValue(timestamp)

      if (dateType === 'from') {
        this.setFromDate(selectedDate)
      } else {
        this.setToDate(selectedDate)
      }
    },
    handleResetDateRange() {
      this.from = {}
      this.to = {}
      this.setValue(null)
      this.fromMouseover = null
      this.toMouseover = null
    },
    handleSelect(cell) {
      if (this.useDateRange) {
        this.handleDateRange(cell)
      } else {
        this.handleDefaultSelect(cell)
      }
    },
    /**
     * Emit a 'selected-disabled' event
     */
    handleSelectDisabled(cell) {
      this.$emit('selected-disabled', cell)
    },
    handleToDateRange(selectedDate) {
      const { timestamp } = selectedDate

      if (!this.getFromTimestamp) {
        this.setInitialDateRange({ selectedDate, dateType: 'to' })
        return
      }

      this.setValue(null)

      const isDateRangeValid =
        timestamp > this.getFromTimestamp || timestamp === this.getFromTimestamp

      if (isDateRangeValid) {
        this.setToDate(selectedDate)
      } else {
        this.handleInvalidDateRange({ selectedDate, dateType: 'to' })
      }

      this.handleDateRangeCallback()
    },
    /**
     * Set the date from a 'typed-date' event
     */
    handleTypedDate(date) {
      this.setDate(date.valueOf())
    },
    /**
     * Initiate the component
     */
    /* eslint-disable */
    init() {
      if (this.value && !this.useDateRange) {
        let parsedValue = this.parseValue(this.value)
        const isDateDisabled = parsedValue && this.isDateDisabled(parsedValue)

        if (isDateDisabled) {
          parsedValue = null
          this.$emit('input', parsedValue)
        }
        this.setValue(parsedValue)
      }

      if (this.isInline) {
        this.setInitialView()
      }
    },
    /* eslint-enable */
    /**
     * Returns true if a date is disabled
     * @param {Date} date
     */
    isDateDisabled(date) {
      return new DisabledDate(this.utils, this.disabledDates).isDateDisabled(
        date,
      )
    },
    /**
     * Opens the calendar with the relevant view: 'day', 'month', or 'year'
     */
    open() {
      if (this.disabled || this.isInline) {
        return
      }
      this.setInitialView()
      this.$emit('opened')
    },
    /**
     * Parse a datepicker value from string/number to date
     * @param {Date|String|Number|null} date
     */
    parseValue(date) {
      let dateTemp = date
      if (typeof dateTemp === 'string' || typeof dateTemp === 'number') {
        const parsed = new Date(dateTemp)
        dateTemp = Number.isNaN(parsed.valueOf()) ? null : parsed
      }
      return dateTemp
    },
    removeMouseoverHighlight() {
      this.toMouseover = null
      this.FromMouseover = null
    },
    /**
     * Set the date, or go to the next view down
     */
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate()
        return
      }
      this.setPageDate(this.selectedDate)
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate(timestamp) {
      const date = new Date(timestamp)
      this.selectedDate = date
      this.setPageDate(date)
      this.$emit('selected', date)
      this.$emit('input', date)
    },
    setFromDate(cell) {
      this.from = this.getDateRangeValue(cell)
    },
    setInitialDateRange({ selectedDate, dateType }) {
      const { timestamp } = selectedDate

      this.setTemporaryValue(timestamp)

      if (dateType === 'from') {
        this.setFromDate(selectedDate)
      } else {
        this.setToDate(selectedDate)
      }

      this.handleDateRangeCallback()
    },
    setMouseoverHighlight(cell) {
      if (this.isEligibleToHighlightCell) {
        const { value } = this.getDateRangeValue(cell)

        if (this.currentDateRangeType === 'from') {
          this.fromMouseover = value
        } else {
          this.toMouseover = value
        }
      }
    },
    setTemporaryValue(timestamp) {
      const selectedDate = new Date(timestamp)
      const parsedValue = this.parseValue(selectedDate)

      this.setValue(parsedValue)
    },
    setToDate(cell) {
      this.to = this.getDateRangeValue(cell)
    },
    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView

      if (!this.allowedToShowView(initialView)) {
        throw new Error(
          `initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`,
        )
      }

      this.setView(initialView)
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate(date) {
      let dateTemp = date
      if (!dateTemp) {
        if (this.openDate) {
          dateTemp = new Date(this.openDate)
        } else {
          dateTemp = new Date()
        }
        dateTemp = this.utils.resetDateTime(dateTemp)
      }
      this.pageTimestamp = this.utils.setDate(new Date(dateTemp), 1)
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue(date) {
      if (!date) {
        this.setPageDate()
        this.selectedDate = null
        return
      }
      this.selectedDate = date
      this.setPageDate(date)
    },
    /**
     * Set the picker view
     */
    setView(view) {
      if (this.allowedToShowView(view)) {
        this.view = view
      }
    },
    /**
     * Capitalizes the first letter
     */
    ucFirst(str) {
      return str[0].toUpperCase() + str.substring(1)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/style.scss';
</style>
