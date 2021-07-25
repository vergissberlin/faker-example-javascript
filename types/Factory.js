import {product} from './product.js'
import {user} from './user.js'

export const factorizeGenerator = (type) => {
    switch (type) {
        case 'product': return product
        case 'user':
        default:
            return user
    }
}
