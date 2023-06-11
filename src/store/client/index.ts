import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialClientValues } from '../../navigation/Screens/HomeTab/SelectClient';
import { AppState } from '..';
import { AddBoxToCllientPaylod, ClientObject, Estimate } from '../types';


export type ClientInitialState = {
    clients : ClientObject[]
}


const clientInitialState: ClientInitialState = {
    clients : []
}

export const saveClientsToLocalStorage = async (newClient: ClientObject[])=>{

    try {
        const jsonValue = JSON.stringify(newClient);
        await AsyncStorage.setItem('clients', jsonValue);
        
    } catch (err) {
        console.log(err);
    }
}

export const loadClientsFromLocalStorage : ()=> Promise<ClientObject[]> = ()=>{

    return new Promise<ClientObject[]>((resolve, reject) =>{
        AsyncStorage.getItem('clients').then((res)=>{ 
            console.log('====================================');
            console.log(res);
            console.log('====================================');         
            return resolve(JSON.parse(res || "[]" ) as ClientObject[] ||[] as ClientObject[]) 
        })
        .catch(() => resolve([] as ClientObject[]));
    })
}




const clientsSlice = createSlice({
    name : "Clients",
    initialState : clientInitialState,
    reducers : {
        setClients : (state,action: PayloadAction<ClientObject[]> )=>{
            state.clients = action.payload

        },
        addClient: (state, action: PayloadAction<InitialClientValues>) => {
            state.clients.push(action.payload);
        },
        addBoxToClient: (state, action: PayloadAction<AddBoxToCllientPaylod>) => {
            const selectedClient = state.clients.filter((client)=> client.client_name === action.payload.client_name)

            if(selectedClient){
                selectedClient[0].estimates?.push(action.payload.estimate)
            }
        },
    }
})


export const {addClient, setClients, addBoxToClient} = clientsSlice.actions


export const loadClients =()=>async (dispatch : Dispatch)=>{
    try {
        const clients = await loadClientsFromLocalStorage();
        dispatch(setClients(clients))
    } catch (err){
        console.log(err);
    }
}

export const addClientDetailsAsync = (values : InitialClientValues) => async (dispatch : Dispatch, getState : ()=>AppState)=>{
    try {

        dispatch(addClient(values));

        const newClients = getState().clients.clients
        await saveClientsToLocalStorage(newClients)
        
    } catch (error) {
        console.log(error)
    }
}

export const addBoxToClientDetailsAsync = (values : AddBoxToCllientPaylod) => async (dispatch : Dispatch, getState : ()=>AppState)=>{

    try {
        dispatch(addBoxToClient(values));
        const newClients = getState().clients.clients
        await saveClientsToLocalStorage(newClients)
        
    } catch (error) {
        console.log(error)
    }
}

export default  clientsSlice.reducer

