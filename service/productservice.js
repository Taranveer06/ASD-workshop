const {getproduct,getProudctById,createProduct,updateProduct:editProduct,patchProduct:patching,deleteProduct}=require('../database/productdatabase')

async function fetchproduct(){
    return await getproduct()
}

async function fetchProductById(id){
    return await getProudctById(id)
}
async function addProduct(product) {
    return await createProduct(product)
}

async function updateProduct(id, product) {
    return await editProduct(id, product)
}
async function patchProduct(id, product) {
    return await patching(id, product)
}
async function removeProduct(id) {
    return await deleteProduct(id)
}

module.exports = {fetchproduct,fetchProductById,addProduct,updateProduct,patchProduct,removeProduct}