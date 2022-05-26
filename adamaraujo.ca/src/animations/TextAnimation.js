import React from 'react'
import styled, { keyframes } from 'styled-components'
//Text animation using styled components package
export default function TextAnimation() {
    const text = "Double click or press space to jump and scroll or use the left/right arrow keys to move. Alternatively, use the gamepad under Mario.".split("")
    return(
        <Wrapper className='welcome' >{text.map((letter, ind) => <span key={ind}>{letter}</span>)}</Wrapper>
    )
}
const animation = keyframes`
 0% { opacity: 0; transform: translateY(-800vh); }
 25% { opacity: 0.25; transform: translateY(-50vh);}
 50% { opacity: 0.5; }
 75% { opacity: 0.75; }
 100% { opacity: 1; }
`
const Wrapper = styled.span`
 span {
 display: inline-block;
 opacity: 0;
 
 animation-name: ${animation};
 animation-duration: 1s;
 animation-fill-mode: forwards;
 animation-iteration-count: repeat;
 transition-timing-function: ease-out;
 font-size: 20px;
 }
 span:nth-child(6), span:nth-child(12), span:nth-child(15), span:nth-child(21), span:nth-child(27), span:nth-child(30), span:nth-child(35), span:nth-child(39), span:nth-child(46),
  span:nth-child(49), span:nth-child(53), span:nth-child(57), span:nth-child(68), span:nth-child(74), span:nth-child(79), span:nth-child(82), span:nth-child(88), span:nth-child(103),
  span:nth-child(107), span:nth-child(111), span:nth-child(119), span:nth-child(125)
 {
    margin-right: 1rem;
 }
`