import React, { useEffect } from 'react';

const DropInComponent = ({
    dropIn: DropIn,
    id: dicId,
    setCloseCondition,
    ...rest
}) => {

    const setCloseConditionWithDelay = (value) => {
        let dic = document.getElementById(dicId)

        if(!value) {
            setTimeout(() => {
                setCloseCondition(value)
            }, 800)
            dic.classList.add('dic-hidden')
        }
    }

    useEffect(() => {
        let dic = null;

        while(!dic) {
            dic = document.getElementById(dicId)
        }

        dic.classList.remove('dic-hidden')

    }, [])


    return (
        <div id={dicId} className="dic dic-hidden">
            <DropIn
                // id="drop-in-component"
                // className="dic dic-hidden"
                setCloseCondition={setCloseConditionWithDelay}
                {...rest}
            />
        </div>
    )

}

export default DropInComponent


        // window.addEventListener('click', e => {
        //     if(e.target.id !== ('auth-container' || 'nb-auth-button') ) {
        //         let authContainer = document.getElementById('auth-container');
        //         if(!authContainer.classList.contains('nb-loginsignup-container-hidden')) {
        //             authContainer.classList.add('nb-loginsignup-container-hidden')
        //         }
        //     }
        // })
