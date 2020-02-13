import {
    CONTEXT_MENU_SHOW,
    CONTEXT_MENU_HIDE} from './types'




export const showMenu = (x,y,getType,args) => dispatch => {
    dispatch({
        type: CONTEXT_MENU_SHOW,
        payload: {
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