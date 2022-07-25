import TextAnimation from "./animations/TextAnimation"
import Mario from './animations/mario'
import { useEffect, useState} from "react";
import Block from './blocks/block'
import Coin from './coin'
import Gamepad from './gamepad'
const marioForward = ['mario1', 'mario2', 'mario3']//Class names of forward background images of mario
const marioBack = ['mario1-back', 'mario2-back', 'mario3-back'];//Class names of backward background images of mario
let first = 0;
const App = () => {
    const stand = 'mariostand'//Class name for mario standing background image
    const standBack = 'mariostandBack'//Class name for mario standing backwards image
    const [prev, setPrev] = useState(0)//Keeps track of index of mario's class name image
    const [left, setLeft] = useState(window.screen.width < 550 ? 100 : 300)//Value of mario's distance from beginning
    const [marios, setMarios] = useState(marioForward)//Tracks state of mario
    const [mario, setMario] = useState(stand)
    const [jumping, setJump] = useState(false)
    const [touched, setTouched] = useState([false, false, false])
    const [gamepad, setGamepad] = useState(false)
    const [blockHeight, setBlockHeight] = useState(0)
    const [marioHeight, setMarioHeight] = useState(0)
    const [lastScroll, setScroll] = useState(0);
     const scroll = () => {
        if (left === 0) return
        return document.querySelector('.wrapper').scrollTop
    } 
    const screen = window.screen.width;
     const coins = () => document.querySelectorAll('#coin-div')
    const selectBlocks = document.querySelectorAll('#info-block')
    const marioPos = () => document.querySelector(`.mario`).getBoundingClientRect()
    const handleKeys = (e) => {
        if (document.activeElement.id === 'message' || document.activeElement.tagName.toLowerCase() === 'input' || jumping){
            return
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const key = e.key
        if (key === 'ArrowRight' && marios.every((val, ind) => val === marioForward[ind])){
            document.querySelector('.wrapper').scrollBy(0, 30)
        } else if (key === 'ArrowLeft'){
            document.querySelector('.wrapper').scrollBy(0, -30)
            setMarios(marioBack)
        } else if (key === ' '){
            marioJump();
        }
    }
     document.body.addEventListener('keydown', handleKeys, {once: true});
     useEffect(() => {
        //If mario isn't already standing, make him stand after not moving for 0.7s
        if (first === 1){
            setBlockHeight(selectBlocks.item(0).getBoundingClientRect().bottom);
            setMarioHeight(marioPos().top)
            first++;
        }
        let notMoving = setInterval(() => {
            if (mario !== stand && mario !== standBack && !jumping){
                if (marios.every((val, ind) => val === marioForward[ind])){
                    setMario(stand)
                } else {
                    setMario(standBack)
                }
            }
        }, 700)
//        setScroll(document.querySelector('.wrapper').scrollLeft);
        first++
        return ( () => {clearInterval(notMoving)})
    }
        ,[mario, marios, selectBlocks, jumping])
    //Scrolls mario, activated by the wrapper div which is the element being scrolled
    const scrollMario = (e) => {
        setScroll(document.querySelector('.wrapper').scrollLeft);
        e.stopPropagation(); 
        e.preventDefault();
        if (lastScroll > 0) {
            document.querySelector('.wrapper').scrollLeft = 0;
        }
        if (scroll() < left - 300 || (screen < 550 && scroll() + 100 < left))
        //If current scroll's less than previous, means mario's going back, otherwise he's going forward
            setMarios(marioBack)
        else 
            setMarios(marioForward)
        
        if (screen < 550)
            setLeft(scroll() + 100)
        else
            setLeft(scroll() + 300)
        setTimeout(updateMario, 50)
    }
    //Checks the prev index, if image animation complete, set image back to first frame, otherwise continue frames
    function updateMario() {
        if (prev < marios.length - 1){
            setPrev(prev+1)
            setMario(marios[prev])
        } else {
            setPrev(0)
            setMario(marios[prev])
        }
            } 
    const marioJump = () => {
        if (jumping){
            return
        }
        else {
            setJump(true)
        }
        setMario(marios.every((e, i)=> e === marioForward[i]) ? stand : standBack);
    }
    const handleGamepad = (e) => {
        let direction = e.target.className
        if (direction === 'up'){
            marioJump()
        } else if (direction === 'left') {
            document.querySelector('.wrapper').scrollBy(0, -50)
        } else {
            document.querySelector('.wrapper').scrollBy(0, 50)
        }
    }
    const checkGamepad = (e) => {
        const gamepad = document.querySelector('.gamepad').getBoundingClientRect()
        const game = document.querySelector('.gamepad')
        if ((e.pageX < gamepad.x || e.pageX > gamepad.right) || (e.pageY < gamepad.top || e.pageY > (gamepad.top + game.clientHeight)))
            setGamepad(true)
        else
            setGamepad(false)
    }
    const handleJump = (e) => {
        setTimeout(() => {
            try {
            selectBlocks.forEach((block, i) => {
                let blockRect = block.getBoundingClientRect()
// If mario hits block i, then set the block as touched in the touched array
                if (Math.abs(blockRect.x - marioPos().x) < 60 && Math.abs(blockRect.bottom - marioPos().top) < 50){
                    setTouched([...touched.slice(0, i), true, ...touched.slice(i+1)])
                }
            })
        }catch(err){
            console.log(err)
        }
        }, 600)
    }
    return(
        <div className="wrapper" onScroll={scrollMario} onDoubleClick={marioJump} onMouseMove={checkGamepad} >
        <div className="flex">
        <div className="home" onScroll={scrollMario} >
            <Gamepad left={left} callBack={handleGamepad} out={gamepad} />
            <TextAnimation/>
            <div className="coins">
            <Coin touched={true}/>
            </div>
            <Block broken={touched[0]} type='about' />
            <Block broken={touched[1]} type='skills' />
            <Block broken={touched[2]} type="form"/>
                <Mario className={mario + ' mario'} stopJump={() => setJump(false)} left={left} isJumping={jumping} forward={marios.every((val, ind) => val === marioForward[ind]) || mario === stand} callBack={handleJump} blockHeight={blockHeight - marioHeight}/>
            <h1>More features to be added soon! Find code for this project <a href="https://github.com/Addma/Portfolio-Site" target="_blank" rel='noreferrer'>here</a></h1>
        </div>
        </div>
        </div>
    )
}

export default App