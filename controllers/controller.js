const {fetchproduct,fetchProductById,addProduct,updateProduct:editProduct,patchProduct:modifyProduct,removeProduct} =require('../service/productservice')
const {setCache,clearCache}=require('../middleware/cache')

async function getproduct(req, res){
    const products = await fetchproduct()
    setCache(req.url, products)
    res.json(products)
}


async function getProductById(req, res) {

    const product = await fetchProductById(req.params.id)
    if (!product){
        return res.status(404).json({ message:'Product not found'})
    }
    setCache(req.url, product)
    res.json(product)
}
async function createProduct(req, res) {

    const product = await addProduct(req.body)
    clearCache()
    res.status(201).json(product)
}
async function updateProduct(req, res) {
    const product = await editProduct(req.params.id,req.body)
    if (!product) {

        return res.status(404).json({ message:'Product not found'})
    }
    clearCache()

    res.json(product)
}
async function patchProduct(req, res) {
    const product = await modifyProduct(req.params.id,req.body)
    if (!product) {

        return res.status(404).json({ message:'Product not found'})
    }
    clearCache()
    res.json(product)
}
async function deleteProduct(req, res) {

    const product = await removeProduct(req.params.id)
    if (!product) {

        return res.status(404).json({ message:'Product not found'})
    }
    clearCache()

    res.json({
        message: 'Product deleted',
        product: product
    })
}

module.exports = {getproduct,getProductById,createProduct,updateProduct,patchProduct,deleteProduct}