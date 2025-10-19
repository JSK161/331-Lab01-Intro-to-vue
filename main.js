const { createApp, ref, computed, toRefs } = Vue;

const app = createApp({
    setup() {
        const cart = ref([])
        const premium = ref(true)
        function updateCart(id) {
            cart.value.push(id)
        }
        
        function removeFromCart(id) {
            const index = cart.value.indexOf(id)
            if (index !== -1) {
                cart.value.splice(index, 1)
            }
        }
        
        const cartItemCounts = computed(() => {
            const counts = {}
            cart.value.forEach(id => {
                counts[id] = (counts[id] || 0) + 1
            })
            return counts
        })
        
        const cartTotal = computed(() => cart.value.length)
        
        return {
            cart,
            cartItemCounts,
            cartTotal,
            premium,
            updateCart,
            removeFromCart
        }
    }
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.component('review-form', reviewForm)
app.component('review-list',reviewList)
app.mount('#app')