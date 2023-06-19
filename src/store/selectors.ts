import {createSelector} from '@reduxjs/toolkit'
import { useAppSelector } from '.'
import { Estimate } from './types';


export const useAllBoxeSelector = ()=>
useAppSelector((state)=>{
    let newArr : Estimate[] = [];
    state.clients.clients.forEach((client)=>{
        client.estimates.forEach((estimate)=> newArr.push(estimate))
    })
    return newArr
})

export const useSelectClientByName = (client_name : string)=>
useAppSelector((state)=>{
  return  state.clients.clients.filter((client)=>{
        return client.client_name === client_name
    })[0]
})