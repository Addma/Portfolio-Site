import Resume from '../Resources/adam_araujo_resume.pdf';
const Skills = ({className}) => {
    const clickParrly = (e) => {
        e.preventDefault();
        window.open("https://play.google.com/store/apps/details?id=com.keyptech.parrly");
        window.open("https://parrly.com")
    }
    return (
        <div className={className}><p>I am proficient in Javascript and Java, and familiar with Python and C/C#.</p>
        <p> I interned at SOTI Inc. in 2023 for a year, an EMM software provider where I was able to develop novel features and improved usability of MobiControl Android using C# .NET and Angular. 
            I've also previously interned at ZHY Interactive for 3 months 2022 Sept-Dec, where I was able to build a 
            web and mobile app using MERN and React Native called <a href={""} rel="noreferrer" onClick={clickParrly} target='_blank' >Parrly.</a>.
            </p>
            <p>You can view my resume <a href={Resume} target='_blank' >here.</a></p>
            </div>
    )
}
export default Skills