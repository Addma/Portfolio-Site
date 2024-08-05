import { useState } from 'react'
// Form to send me an e-mail :D
const Form = ({className}) => {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [failed, setFailed] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        let msg = {
            name: name,
            email: mail,
            subject: subject,
            message: message
        }
        fetch('/email', {
      method: 'POST',
      body: JSON.stringify({ msg }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        console.log(res);
        if (!res.ok) {
            alert("Error occurred, please try again.");
            setFailed(true);
        }   
        else
            alert("Thank you for your e-mail. I'll get back to you ASAP :D")
        res.json()
    }).catch(err => {
        alert("Error occurred, please try again.");
    })
    setName('')
    setMail('')
    setSubject('')
    setMessage('')

}
    return (
        <div>
        <form className={className} id="form" onSubmit={handleSubmit}>
        <fieldset>
        <legend>Send me an E-mail 😏</legend>
        <label htmlFor="name">Name: <input id="name" value={name} onChange={(e) => setName(e.target.value)} ></input></label>
        <label htmlFor="mail">Your E-mail: <input value={mail} onChange={e => setMail(e.target.value)} type="email" id="mail"></input></label>
        <label htmlFor="subject">Title: <input value={subject} onChange={e => setSubject(e.target.value)} id="subject"></input></label>
        <label htmlFor="message" className='message-label'><textarea value={message} onChange={e => setMessage(e.target.value)} id="message" rows={20} cols={40}></textarea></label>
        <button type="submit">Send</button>
        <a style={{display: failed ? 'block' : 'none', fontSize: "30px" }} href="mailto:adam.araujo7@hotmail.com">E-mail me!</a>
        </fieldset>
        </form>
        </div>
    )
}

export default Form