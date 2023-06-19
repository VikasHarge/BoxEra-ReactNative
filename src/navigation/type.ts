
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Estimate } from '../store/types';


export type HomeStackParamsList = {
    SelectClient : undefined,
    BoxDetailsInput : {client_name : string},
    PaperDetailsInput : undefined,
    BoxEdit : {box : Estimate},
    CostDetailsInput : undefined,
    FinalDetails : {box : Estimate},
    Home : undefined,
}

export type RootNavigatorParamList = {
    Clients : undefined,
    HomeStack : NavigatorScreenParams<HomeStackParamsList>,
    Users : undefined,
}


export type RootStackScreenProps<T extends keyof RootNavigatorParamList> =
  StackScreenProps<RootNavigatorParamList, T>;


  export type HomeTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamsList>,
  RootStackScreenProps<keyof RootNavigatorParamList>
>;