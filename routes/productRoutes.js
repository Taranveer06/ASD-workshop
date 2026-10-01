const express=require('express')
const {getproduct,getProductById,createProduct,updateProduct,patchProduct,deleteProduct}=require('../controllers/controller');

const {middleware}=require('../middleware/cache');

const router=express.Router();
router.get('/products',middleware,getproduct)
router.get('/products/:id',middleware,getProductById)
router.post('/products',createProduct)
router.put('/products/:id',updateProduct)
router.patch('/products/:id',patchProduct)
router.delete('/products/:id',deleteProduct)

module.exports=router
