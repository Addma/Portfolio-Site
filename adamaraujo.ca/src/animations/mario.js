import styled, {keyframes} from 'styled-components'
import { css } from 'styled-components'
import { useRef } from 'react'
//Styled component changing "left" style value pushing mario forward or backward
const Mario = ({ className, left, isJumping, forward, callBack, blockHeight, stopJump, marioRef}) => {
    if (isJumping){
        if (forward) {
            return <Jump className="mario-jump mario" ref={marioRef} left={left} onAnimationStart={callBack} onAnimationEnd={stopJump} y={blockHeight}></Jump>
        } else {
            return <Jump className="mario-jumpback mario" ref={marioRef} left={left} onAnimationStart={callBack} onAnimationEnd={stopJump} y={blockHeight}></Jump>
        }
    } else {
        return <Walk ref={marioRef} className={className} left={left}></Walk>
    }
}
    const jumpAnimation = (y) => keyframes`
     0% { transform: translate(0%, 0%)}
     60% { transform: translate(0%, -${Math.abs(y) + 10}px)}
    `;
        const animation = props =>
    css`
    ${jumpAnimation(props.y)} 1s ease-out;
    `
    const Jump = styled.div.attrs(props => ({
        style: {
            left: props.left + 'px'
        }
    }))`
            animation: ${animation}
    `
    const Walk = styled.div.attrs(({ left }) => ({
        style: {
            left: left + 'px'
        }
    }))``


export default Mario
export {Walk};