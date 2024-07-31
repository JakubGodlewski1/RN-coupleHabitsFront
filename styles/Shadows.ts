import {Platform} from "react-native";


export const Shadows = Platform.OS === 'ios' ?
    /*ios*/
    {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,


    } : {
        /*android*/
        elevation: 5
    }

export const ShadowsLight = Platform.OS === 'ios' ?
    /*ios*/
    {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,


    } : {
        /*android*/
        elevation: 5
    }