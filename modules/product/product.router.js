import { Router } from "express";
import { addProduct, allProducts, deleteProduct, getProductById, productInRange1000_2000, productLessThan3000, searshTitle, updateProduct} from "./controller/product.js";
const router = Router()
router.get('/',allProducts)
router.get('/searshlessprice',productLessThan3000) // - Get products with price less than 3000
router.get('/searshrangprice',productInRange1000_2000) // - Get product with price in range 1000-2000
router.get('/searshtitle',searshTitle) // - Get all products which their title contain a substring like ( pho) 
router.get('/:id',getProductById)
router.post('/',addProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)
export default router