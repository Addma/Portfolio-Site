
import About from './about'
import Skills from './skills'
import Form from './form'

const Block = ({broken, type}) => {
    const typeOfBlock = () => {
        if (type === 'about') {
          return broken ?
        <div id='about-open'><div id='info-block' className="broken"> </div><About className='show-about'><div></div></About></div>
        :
         <div id='about-open'><div id='info-block' className="block"></div><About className='hide-about'/></div>      
        } else if (type === 'skills'){
            return broken ? <div id='skills-open'><div id='info-block' className='broken'></div><Skills className='show-skills' /></div> :
            <div id='about-open'><div id='info-block' className='block'></div><Skills className='hide-skills' /></div>
        } else {
            return broken ? <div id='form-open'><div id='info-block' className='broken'></div><Form className='show-form' /></div> :
            <div id='form-open'><div id='info-block' className='block'><Form className='hide-form' /></div></div>
        }
    }
    return typeOfBlock()
}

export default Block