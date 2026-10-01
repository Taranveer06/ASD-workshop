const cache = {}
const TTL = 60000

function middleware(req, res, next) {
    const key=req.url
    const cached=cache[key]
    console.log(cached)
    if (cached){
        const age=Date.now()-cached.time
        if (age<TTL){
            res.set('X-Cache','HIT')

            console.log(cached.data)
            return res.json(cached.data)
        }
        delete cache[key]
    }
    console.log(cache)
    res.set('X-Cache','MISS')

    next()
}

function setCache(key, data) {
    cache[key] = {
        data:data,
        time:Date.now()
    }
}
function clearCache() {

    Object.keys(cache).forEach((key) => {
        delete cache[key]
    })
}

module.exports={middleware,setCache,clearCache}