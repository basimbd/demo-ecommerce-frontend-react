import axios from "axios";

export async function fetchData(url){
    const response = await axios.get(url)
    try{
        if(response.status === 200){
            return response.data
        } else{
            //return error
        }
    } catch (err) {
        return err.message
    }
}