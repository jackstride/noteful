import {
    CONTEXT_MENU_SHOW,
    CONTEXT_MENU_HIDE} from './types'




export const showMenu = () => dispatch => {
    dispatch({
        type: CONTEXT_MENU_SHOW
    })
}



export const hideMenu = () => dispatch => {
    dispatch({
        type: CONTEXT_MENU_HIDE
    })
}