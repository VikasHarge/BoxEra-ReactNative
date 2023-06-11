import { Store } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { createStore } from "../../store"





const useCachedResources = ()=>{
    const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false)
    const [store, setStore] = useState<Store>()

    useEffect(()=>{
        const loadResourcedAndDataAsync = async ()=>{
            try{
                const temp = await createStore();
                setStore(temp)
            }catch(e){
                console.warn(e)
            }finally{
                setLoadingComplete(true)
            }
        }
        loadResourcedAndDataAsync()
    },[])

    return {isLoadingComplete, store}
}


export default useCachedResources