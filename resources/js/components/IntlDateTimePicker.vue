<template>
    <input ref="intlDatepickerInput"
           :disabled="disabled"
           :dusk="field.attribute"
           :class="{'!cursor-not-allowed': disabled}"
           :value="value"
           :name="field.name"
           :placeholder="placeholder"
           type="text">
</template>

<script>
    import flatpickr               from 'flatpickr'
    import DateTimeFormatConverter from '../DateTimeFormatConverter'
    import {momentjsLocaleMapping} from '../InternationalMapper'
    import {locale as locales}     from '../Locale'

    export default {
        props: {
            field:          {
                type:     Object,
                required: true,
            },
            value:          {
                type:     String,
                required: false,
                default:  ''
            },
            disabled:       {
                type:    Boolean,
                default: false,
            },
            dateFormat:     {
                type:    String,
                default: ''
            },
            timeFormat:     {
                type:    String,
                default: ''
            },
            twelveHourTime: {
                type:    Boolean,
                default: false,
            },
            enableTime:     {
                type:    Boolean,
                default: false,
            },
            enableSeconds:  {
                type:    Boolean,
                default: false,
            },
            locale:         {
                type:    String,
                default: 'en-gb'
            }
        },

        data() {
            return {
                flatpickr: null
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.flatpickr = flatpickr(this.$refs.intlDatepickerInput, {
                    enableTime:    this.enableTime,
                    enableSeconds: this.enableSeconds,
                    onClose:       this.onChange,
                    dateFormat:    this.dateFormatString,
                    allowInput:    true,
                    time_24hr:     true,
                    locale:        locales.flatpickr[momentjsLocaleMapping[this.locale].translation]
                })
            })
        },

        computed: {
            momentjsFormat() {
                return `${locales.momentjs[this.locale].L} ${this.timeFormat}`.replace(/[^ -~]+/g, '').trim()
            },

            dateFormatString() {
                if (this.dateFormat) {
                    return this.dateFormat
                } else {
                    try {
                        return DateTimeFormatConverter.momentToFlatpickr(this.momentjsFormat)
                    } catch (e) {
                        console.warn(e)
                    }

                    return 'd/m/Y H:i:S'
                }
            },

            placeholder() {
                return moment().format(this.momentjsFormat)
            }
        },

        methods: {
            onChange() {
                this.$emit('change', this.$refs.intlDatepickerInput.value)
            },
        },
    }
</script>

<style scoped>
    .\!cursor-not-allowed {
        cursor: not-allowed !important;
    }
</style>
