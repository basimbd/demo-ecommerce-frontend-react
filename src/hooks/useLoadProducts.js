import axios from "axios"
import {useEffect, useState} from "react";

function _imageEncode (arrayBuffer) {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(u8,function(p,c){return p+String.fromCharCode(c)},''))
    let mimetype="image/jpeg"
    return "data:"+mimetype+";base64,"+b64encoded
}

function getBase64(url) {
    return axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => {
            return _imageEncode(response.data)
        })
}

function getProductsFromLocalStorage(localKey) {
    const products = localStorage.getItem(localKey)

    if (products){
        return JSON.parse(products)
    } else{
        return []
    }
}


export default function useLoadProducts(url, localKey, setIsLoading, setProducts){
    const [productState, setProductState] = useState(getProductsFromLocalStorage(localKey))
    useEffect(() => {
        if(productState.length){
            setProducts(productState)
            setIsLoading(false)
        }
    }, [productState])

    async function fetchProducts(url){
        try {
            const response = await fetch(url)
            if(response.ok){
                const results = await response.json()

                Promise.all(
                    results.map(async (element) => {
                        const base64Image = await getBase64(element.image)
                        return {...element, image:base64Image}
                    })
                ).then(dataArray => {
                    localStorage.setItem(localKey, JSON.stringify(dataArray))
                    setProductState(dataArray)
                })
            }else{
                return Promise.reject(response)
            }
        } catch (err) {
            return []
        }
    }

    if(!productState.length){
        fetchProducts(url).then(data => data)
    }
}