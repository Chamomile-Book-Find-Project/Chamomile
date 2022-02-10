import React, { useState } from 'react';

const Container = () => {

    const [mount, setMount] = useState(false);
    const [effect, setEffect] = useState('mount1');

    const onClickBtn = () => {
        
        if(mount){
            setEffect('unmount');
            setTimeout(()=>{     
                setMount(v=> !v);    
            }, 400) 
        }else{
            setEffect('mount1');
            setMount(v=> !v);
        }
    };

    return(
        <>
            <div className="container">
                <div className="container-wrap">

                    <button type="button" onClick={onClickBtn}>Mount</button>  

                    {mount ? 
                        <div className= "mount2">
                        <div className={`box-wrap ${effect}`}>
                        <div className= "box2">
                            <h2>둥</h2><br/>
                            <p>두둥</p>
                        </div>
                        </div>
                        </div>

                        :

                        <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Container;