import React from 'react';

const MenuPosition = (props) => {

    const {children,nodeRef} = props;

    const style = {
        position: 'absolute',
        top: props.top,
        bottom : props.bottom,
        left: props.left,
        right : props.right,
        width: "200px",
        height:"200px",
        backgroundColor: "red",
    };

    console.log(props);

    return (
        <div style={style} className={props.className} ref={nodeRef}>
            {children}
        </div>
    )
}



export default MenuPosition;