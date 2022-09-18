import { Walk } from './animations/mario'
import React, { useState, forwardRef } from 'react'
const GamePad = ({gamepadRef, left, out, callBack }) => {
    const [timer, setTimer] = useState(null)
    function mouseDown(e) {
        if (e.type === 'mousedown')
            e.preventDefault()
        if (timer) {
            clearInterval(timer)
        }
        setTimer(setInterval(() => {
            callBack(e)
        }, 120))
}
    function mouseUp(e) {
        clearInterval(timer)
        setTimer(null)
    }
    /**
     * when the mouse moves out of the gamepad, stop the running interval.
     */
    if (out) {
        clearInterval(timer)
    }
    return (
        <Walk left={left} className='gamepad' onMouseUp={mouseUp} ref={gamepadRef}>
                <div></div>
                <div className="up" onClick={e => callBack(e)}><div className="triangle"></div></div>
                <div></div>
                <div className="left" onMouseDown={mouseDown} onMouseUp={mouseUp} onTouchStart={mouseDown} onTouchEnd={mouseUp}><div className="triangle"></div></div>
                <div></div>
                <div className="right" onMouseDown={mouseDown} onMouseUp={mouseUp} onTouchStart={mouseDown} onTouchEnd={mouseUp}><div className="triangle"></div></div>
            </Walk>
    )

}
export default GamePad;