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
    const [left, setLeft] = useState(window.innerWidth < 550 ? 100 : 300)//Value of mario's distance from beginning
    const [marioFacing, setMarioFacing] = useState(marioForward)//Tracks state of mario
    const [mario, setMario] = useState(stand)
    const [jumping, setJump] = useState(false)
    const [touched, setTouched] = useState([false, false, false])
    const [gamepad, setGamepad] = useState(false)
    const [blockHeight, setBlockHeight] = useState(0)
    const [marioHeight, setMarioHeight] = useState(0)
    const [lastScroll, setScroll] = useState(0);
    const [screen, setScreen] = useState(window.innerWidth);
    const marioRef = useRef(null);
    const wrapperRef = useRef(null);
    const gamepadRef = useRef(null);
    const blockWrapper = useRef(null);
    const [moveRight, setMoveRight] = useState(null);
    const [moveLeft, setMoveLeft] = useState(null);
    const [logMoves, setLogMoves] = useState([]);
    const [selectBlocks, setSelectBlocks] = useState(document.querySelectorAll('.block'))
    //const [marioObj, setMarioObj] = useState({})
    window.onzoom = function(e) {
        setScreen(window.innerWidth);
    }

    const resize = () =>  {
        var oldresize = window.onresize;
        window.onresize = function(e) {
            var event = window.event || e;
            if(typeof(oldresize) === 'function' && !oldresize.call(window, event)) {
                return false;
            }
            if(typeof(window.onzoom) === 'function') {
                return window.onzoom.call(window, event);
            }
        }};
        resize();
    const [controller, setController] = useState({
        39: {
            pressed: false
        },
        37: {
            pressed: false
        }
    })


    const marioJump = useCallback(() => {
        if (jumping){
            return
        }
        else {
            setJump(true)
        }
        setMario(marioForward === marioFacing ? stand : standBack);
    }, [jumping, marioFacing])
    const handleKeys = useCallback((e) => {
        setLogMoves(logMoves.push(e));
        if (document.activeElement.id === 'message' || document.activeElement.tagName.toLowerCase() === 'input'){
            return
        }
        const key = e.key
        if (key === 'ArrowRight' && !moveRight){
            if (controller[e.keyCode].pressed && e.type === "keyup"){
                setMoveRight(null);
            } else if (!controller[e.keyCode].pressed && e.type === "keydown" && !moveRight) {
                setMarioFacing(marioForward)
                setMoveRight(setInterval(() => wrapperRef.current.scrollBy(0, 30), 50));  
            }
        } else if (key === 'ArrowLeft' && !moveLeft){
            if (controller[e.keyCode].pressed  || e.type === "keyup"){
                setMoveLeft(null);
            } else if (!controller[e.keyCode].pressed && e.type === "keydown" && !moveLeft) {
                setMarioFacing(marioBack)
                setMoveLeft(setInterval(() => wrapperRef.current.scrollBy(0, -30), 50));  
            }
        } else if (key === ' '){
            marioJump();
        }
    }, [controller, marioJump, moveLeft, moveRight, logMoves])

    useEffect(() => {
    }, [blockHeight])
    const handleController = useCallback((e) => {
        
        if (document.activeElement.id === 'message' || document.activeElement.tagName.toLowerCase() === 'input' || jumping){
            return
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.key === " "){
            marioJump();
            return;
        }
        try {
            if (!controller[e.keyCode].pressed && e.type === "keydown"){
                setController({
                    ...controller,
                    [e.keyCode]:
                    {
                        ...controller[e.keyCode],
                        pressed: true
                    }
                })
    
            } else if (e.type === "keyup"){
                setController({
                    ...controller,
                    [e.keyCode]:
                    {
                        ...controller[e.keyCode],
                        pressed: false
                    }
                })
            }
            handleKeys(e);
        }catch(err) {
            console.log(err);
        }

    }, [controller, handleKeys, marioJump, jumping])
    useLayoutEffect(() => {
        setMarioHeight(marioRef.current.getBoundingClientRect().top)
        setBlockHeight(blockWrapper.current.getBoundingClientRect().bottom)
        function updateScreen() {
            setScreen(window.innerWidth);
            setSelectBlocks(document.querySelectorAll('.block'))
          }
          window.addEventListener('resize',  updateScreen);
            updateScreen();
            return () => window.removeEventListener('resize', updateScreen);
        }, [screen, marioHeight])
     useEffect(() => {
        //If mario isn't already standing, make him stand after not moving for 0.7s
        let notMoving = setInterval(() => {
            if (marioForward === marioFacing){
                setMario(stand);
            } else {
                setMario(standBack);
            }
        }, 600)
        for(let key in controller){
            if (!controller[key].pressed){
                if (key === "39"){
                    setMoveRight(null);
                    clearInterval(moveRight);
                } else if(key === "37"){
                    setMoveLeft(null);
                    clearInterval(moveLeft);
                }
            }
        }
        if (logMoves.length){
            handleController(logMoves[logMoves.length-1]);

        }
        document.body.addEventListener('keydown', handleController);
        document.body.addEventListener('keyup', handleController)

        return ( () => {
            clearInterval(notMoving)
            document.body.removeEventListener('keydown', handleController);
            document.body.removeEventListener('keyup', handleController)

        })
    }
        ,[mario, marioFacing, handleController, moveLeft, moveRight, controller])

    //Scrolls mario, activated by the wrapper div which is the element being scrolled
    const scrollMario = (e) => {
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
        setTimeout(updateMario, 30);  
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
        <div className="wrapper" onScroll={scrollMario} onMouseMove={checkGamepad} onDoubleClick={marioJump} ref={wrapperRef}>
        <div className="flex">
        <div className="home" >
            <Gamepad left={left} callBack={handleGamepad} out={gamepad} gamepadRef={gamepadRef} />
            <h3 className="text-animation">Double click or press space to jump and scroll or use the left/right arrow keys to move. Alternatively, use the gamepad under Mario.</h3>
            {/*<TextAnimation/>*/}
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