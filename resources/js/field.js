Nova.booting((Vue, router, store) => {
    Vue.component('index-br-datetime-field', require('./components/IndexField'))
    Vue.component('detail-br-datetime-field', require('./components/DetailField'))
    Vue.component('form-br-datetime-field', require('./components/FormField'))
})
