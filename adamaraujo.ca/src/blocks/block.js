
import About from './about'
import Skills from './skills'
import Form from './form'

const Block = ({broken, type, blockRef}) => {
    let display = broken ? 'show' : 'hide';
    console.log("TYPE", type);
    const getType = () => {
        return type === 'about' ? <About className={`${display}-about`}/> : type === 'skills' ? <Skills className={`${display}-skills`}/> : <Form id={`${display}-open`} className={`${display}-form`}/>
    }
    const typeOfBlock = () => {
          return broken ?
        <div id={`${type}-open`}>{getType()}<div className="broken" ref={blockRef}> </div></div>
        :
         <div id={`${type}-open`}><div style={{}} className="block" ref={blockRef}></div>{getType()}</div>      
        }
    return typeOfBlock()
}

export default Block