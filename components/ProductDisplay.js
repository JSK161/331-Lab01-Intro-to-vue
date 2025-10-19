const productDisplay = {
    template: `
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image">
                </div>
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
                <p v-else>Out of Stock</p>
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>
                <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
                    class="color-circle" :style="{backgroundColor: variant.color}">
                </div>
                <button class="button" :disabled='!inStock' @click="addToCart" :class="{disabledButton: !inStock}">
                    Add To Cart
                </button>
                <button class="button" @click="removeFromCart">
                    Remove From Cart
                </button>
                <p>Shipping: {{ shipping }}</p>
            </div>
            <div class="review-section">
              
               <review-list v-if="reviews.length" :reviews="reviews"></review-list>
                <review-form @review-submitted="addReview"></review-form>
            </div>
        </div>
    `,
    props: {
        premium: Boolean
    },
    setup(props, { emit }) {
            const reviews = Vue.ref([])
            
            function addReview(review) {
                reviews.value.push(review)
            }
        const product = Vue.ref('Boots')
        const brand = Vue.ref('SE 331')
        const details = Vue.ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = Vue.ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = Vue.ref(0)
        function updateVariant(index) {
            selectedVariant.value = index;
        }
        const image = Vue.computed(() => variants.value[selectedVariant.value].image)
        const inStock = Vue.computed(() => variants.value[selectedVariant.value].quantity > 0)
        const inventory = Vue.computed(() => variants.value[selectedVariant.value].quantity)
        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }
        
        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }
        const title = Vue.computed(() => brand.value + ' ' + product.value)
        // 新增 shipping 计算属性
        const shipping = Vue.computed(() => {
            if (props.premium) {
                return 'Free'
            } else {
                return 30
            }
        })
        return {
            title,
            image,
            inStock,
            inventory,
            details,
            variants,
            addToCart,
            removeFromCart,
            updateVariant,
            shipping,
            reviews,
            addReview
        }
    }
}

const productDetails = {
    template: `
        <div class="product-details">
            <h2>Details</h2>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
        </div>
    `,
    props: {
        details: Array
    },
    setup(props) {
        return {
            details: props.details
        }
    }
}