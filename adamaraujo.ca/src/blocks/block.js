
import About from './about'
import Skills from './skills'
import Form from './form'

const Block = ({broken, type, blockRef}) => {


    const typeOfBlock = () => {
        if (type === 'about') {
          return broken ?
        <div id='about-open'><About className='show-about'></About><div id='info-block' className="broken" ref={blockRef}> </div></div>
        :
         <div id='about-open'><div id='info-block' className="block" ref={blockRef}></div><About className='hide-about'/></div>      
        } else if (type === 'skills'){
            return broken ? <div id='skills-open'><div id='info-block' className='broken' ref={blockRef}></div><Skills className='show-skills' /></div> :
            <div id='about-open'><div id='info-block' className='block' ref={blockRef}></div><Skills className='hide-skills' /></div>
        } else {
            return broken ? <div id='form-open'><div id='info-block' className='broken' ref={blockRef}></div><Form className='show-form' /></div> :
            <div id='form-open'><div id='info-block' className='block' ref={blockRef}><Form className='hide-form' /></div></div>
        }
    }
    return typeOfBlock()
}

export default Block