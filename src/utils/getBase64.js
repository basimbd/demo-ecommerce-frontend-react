import axios from "axios";

function _imageEncode (arrayBuffer) {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(u8,function(p,c){return p+String.fromCharCode(c)},''))
    let mimetype="image/jpeg"
    return "data:"+mimetype+";base64,"+b64encoded
}

export default function getBase64(url) {
    return axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => {
            return _imageEncode(response.data)
        })
}
