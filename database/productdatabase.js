const fs=require('fs/promises')
const path=require('path')
const filePath=path.join(__dirname,'db.json')


async function getproduct(){
    const data =await fs.readFile(filePath,'utf-8')
    return JSON.parse(data)
}

async function getProudctById(id) {
    const data=await getproduct()
    return data.find((x)=>x.id==id)
}
async function createProduct(product) {

    const data = await getproduct()
    const newProduct = {
        id: data.length === 0?1:data[data.length-1].id+1,
        ...product
    }
    console.log(newProduct)
    data.push(newProduct)

    await fs.writeFile(filePath,JSON.stringify(data, null, 2))
    return newProduct
}

async function updateProduct(id, product){

    const data = await getproduct()
    const indx = data.findIndex((x)=>x.id == id)
    if (indx === -1) {
        return null
    }
    data[indx] = {
        id: Number(id),
        ...product
    }

    console.log(data[indx])

    await fs.writeFile(filePath,JSON.stringify(data, null, 2))
    return data[indx]
}
async function patchProduct(id, product){

    const data = await getproduct()
    const indx = data.findIndex((x)=>x.id == id)
    if (indx === -1) {
        return null
    }
    data[indx] = {
        ...data[indx],
        ...product
    }

    console.log(data[indx])

    await fs.writeFile(filePath,JSON.stringify(data, null, 2))
    return data[indx]
}
async function deleteProduct(id) {

    const data = await getproduct()
    const indx = data.findIndex((x) => x.id == id)


    if (indx === -1) {
        return null
    }
    const deletedProduct = data[indx]
    data.splice(indx, 1)

    console.log(data)
    await fs.writeFile(filePath,JSON.stringify(data, null, 2))

    return deletedProduct
}


module.exports = {getproduct,getProudctById,createProduct,updateProduct,patchProduct,deleteProduct}