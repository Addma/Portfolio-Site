import TextAnimation from "./animations/TextAnimation"
import Mario from './animations/mario'
import { useEffect, useRef, useState, useLayoutEffect} from "react";
import Block from './blocks/block'
import Coin from './coin'
import Gamepad from './gamepad'
import {marioForward, marioBack, stand, standBack } from './marioRes';
import { useCallback } from "react";

const App = () => {

    const [prev, setPrev] = useState(0)//Keeps track of index of mario's class name image
    const [left, setLeft] = useState(window.screen.width < 550 ? 100 : 300)//Value of mario's distance from beginning
    const [marioFacing, setMarioFacing] = useState(marioForward)//Tracks state of mario
    const [mario, setMario] = useState(stand)
    const [jumping, setJump] = useState(false)
    const [touched, setTouched] = useState([false, false, false])
    const [gamepad, setGamepad] = useState(false)
    const [blockHeight, setBlockHeight] = useState(0)
    const [marioHeight, setMarioHeight] = useState(0)
    const [lastScroll, setScroll] = useState(0);
    const [screen, setScreen] = useState(window.screen.width);
    const marioRef = useRef(null);
    const wrapperRef = useRef(null);
    const gamepadRef = useRef(null);
    const blockWrapper = useRef(null);
    const [moveRight, setMoveRight] = useState(null);
    const [moveLeft, setMoveLeft] = useState(null);
    const selectBlocks = document.querySelectorAll('#info-block')
    const handleKeys = useCallback((e) => {
        if (document.activeElement.id === 'message' || document.activeElement.tagName.toLowerCase() === 'input' || jumping){
            return
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const key = e.key
        if (key === 'ArrowRight' && !moveRight){
            setMarioFacing(marioForward)
            setMoveRight(setInterval(() => wrapperRef.current.scrollBy(0, 30), 50));            
        } else if (key === 'ArrowLeft' && !moveLeft){
            setMarioFacing(marioBack)
            setMoveLeft(setInterval(() => wrapperRef.current.scrollBy(0, -30), 50));
        } else if (key === ' '){
           /* if (moveRight){
                setTimeout(() => clearInterval(moveRight), 1200);
                setMoveRight(null);
            } else if (moveLeft){
                setTimeout(() => clearInterval(moveLeft), 1200)
                setMoveLeft(null);
            }*/
            marioJump();
        }
    })
    const handleKeysUp = useCallback((e) => {
        if (document.activeElement.id === 'message' || document.activeElement.tagName.toLowerCase() === 'input' || jumping){
            return
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const key = e.key
        if (key === 'ArrowRight'){
            clearInterval(moveRight);
            setMoveRight(null);
        } else if (key === 'ArrowLeft'){
            clearInterval(moveLeft);
            setMoveLeft(null);
        } else {
            if (moveRight){
                clearInterval(moveRight);
                setMoveRight(null);
            } else if (moveLeft){
                clearInterval(moveLeft);
                setMoveLeft(null);
            }
                
                
        }
    })
    useLayoutEffect(() => {
        setMarioHeight(marioRef.current.getBoundingClientRect().top)
        setBlockHeight(blockWrapper.current.getBoundingClientRect().bottom)
        function updateScreen() {
            setScreen(window.screen.width);
          }
          window.addEventListener('resize',  updateScreen);
            updateScreen();
            return () => window.removeEventListener('resize', updateScreen);
        }, [screen, marioHeight])
     useEffect(() => {
        for (const element of wrapperRef.current.children){
            element.blur();
        }
        //If mario isn't already standing, make him stand after not moving for 0.7s
        let notMoving = setInterval(() => {
            if (marioForward === marioFacing){
                setMario(stand);
            } else {
                setMario(standBack);
            }
        }, 600)
        document.body.addEventListener('keydown', handleKeys);
        document.body.addEventListener('keyup', handleKeysUp)

        return ( () => {
            clearInterval(notMoving)
            document.body.removeEventListener('keydown', handleKeys);
            document.body.removeEventListener('keyup', handleKeysUp)

        })
    }
        ,[mario, marioFacing, handleKeys, handleKeysUp])

    //Scrolls mario, activated by the wrapper div which is the element being scrolled
    const scrollMario = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        if (lastScroll > 0) {
            wrapperRef.current.scrollLeft = 0;
        }
        if (wrapperRef.current.scrollTop < left - 300 || (screen < 550 && wrapperRef.current.scrollTop + 100 < left))
        //If current scroll's less than previous, means mario's going back, otherwise he's going forward
            setMarioFacing(marioBack)
        else 
            setMarioFacing(marioForward)
        
        if (screen < 550)
            setLeft(wrapperRef.current.scrollTop + 100)
        else
            setLeft(wrapperRef.current.scrollTop + 300)
        setTimeout(updateMario, 50);  
        setScroll(wrapperRef.current.scrollLeft);
    }
    //Checks the prev index, if image animation complete, set image back to first frame, otherwise continue frames
    function updateMario() {

        if (marioFacing === marioForward || marioFacing === stand){
            if (prev + 1 > marioForward.length - 1){
                setPrev(0);
            } else {
                setPrev(prev+1)
            }
            setMario(marioFacing[prev]);
        } else if (marioFacing === marioBack || marioFacing === standBack){
            if (prev + 1 > marioBack.length - 1){
                setPrev(0);
            } else {
                setPrev(prev+1)
            }
            setMario(marioFacing[prev]);
        }
    } 
    const marioJump = () => {
        if (jumping){
            return
        }
        else {
            setJump(true)
        }
        setMario(marioForward === marioFacing ? stand : standBack);
    }
    const handleGamepad = (e) => {
        let direction = e.target.className
        if (direction === 'up'){
            marioJump()
        } else if (direction === 'right') {
            wrapperRef.current.scrollBy(0, 50)
        } else {
            wrapperRef.current.scrollBy(0, -50)
        }
    }
    const checkGamepad = (e) => {
        const gamepadRect = gamepadRef.current.getBoundingClientRect()
        if ((e.pageX < gamepadRect.x || e.pageX > gamepadRect.right) || (e.pageY < gamepadRect.top || e.pageY > (gamepadRect.top + gamepadRef.current.clientHeight)))
            setGamepad(true)
        else
            setGamepad(false)
    }
    const handleJump = (e) => {
        setTimeout(() => {
            selectBlocks.forEach((block, i) => {
                let blockRect = block.getBoundingClientRect()
// If mario hits block i, then set the block as touched in the touched array
                if (Math.abs(blockRect.x - marioRef.current.getBoundingClientRect().x) < 60 && Math.abs(blockRect.bottom - marioRef.current.getBoundingClientRect().top) < 50){
                    setTouched([...touched.slice(0, i), true, ...touched.slice(i+1)])
                }
            })
        }, 600)
    }
    return(
        <div className="wrapper" onScroll={scrollMario} onMouseMove={checkGamepad} ref={wrapperRef}>
        <div className="flex">
        <div className="home" >
            <Gamepad left={left} callBack={handleGamepad} out={gamepad} gamepadRef={gamepadRef} />
            <TextAnimation/>
            <div className="coins">
            <Coin touched={true}/>
            </div>
            <Block broken={touched[0]} type='about' blockRef={blockWrapper}/>
            <Block broken={touched[1]} type='skills' />
            <Block broken={touched[2]} type="form"/>
                <Mario marioRef={marioRef} className={mario + ' mario'} stopJump={() => setJump(false)} left={left} isJumping={jumping} forward={marioFacing === marioForward} callBack={handleJump} blockHeight={blockHeight - marioHeight}/>
            <h1>More features to be added soon! Find code for this project <a href="https://github.com/Addma/Portfolio-Site" target="_blank" rel='noreferrer'>here</a></h1>
            </div>
        </div>
        </div>
    )
}

export default App