import {
    CONTEXT_MENU_SHOW,
    CONTEXT_MENU_HIDE} from './types'




export const showMenu = (type,x,y,getType,args) => dispatch => {
    dispatch({
        type: CONTEXT_MENU_SHOW,
        payload: {
            type,
            x,
            y,
            getType,
            args,
        }
    })
}

export const hideMenu = () => dispatch => {
    dispatch({
        type: CONTEXT_MENU_HIDE
    })
}