import { Walk } from './animations/mario'
import { useState } from 'react'
export default function GamePad({left, callBack, out}){
    const [timer, setTimer] = useState(null)
    function mouseDown(e) {
        if (e.type === 'mousedown')
            e.preventDefault()
        if (timer) {
            clearInterval(timer)
        }
        setTimer(setInterval(() => {
            callBack(e)
        }, 100))
}
    function mouseUp(e) {
        clearInterval(timer)
        setTimer(null)
    }
    if (out) {
        clearInterval(timer)
    }
    return (
        <Walk left={left} className='gamepad' onMouseUp={mouseUp}>
                <div className="left" onMouseDown={mouseDown} onMouseUp={mouseUp} onTouchStart={mouseDown} onTouchEnd={mouseUp}>&lt;</div>
                <div className="up" onClick={e => callBack(e)}>^</div>
                <div className="right" onMouseDown={mouseDown} onMouseUp={mouseUp} onTouchStart={mouseDown} onTouchEnd={mouseUp}>&gt;</div>
            </Walk>
    )

}