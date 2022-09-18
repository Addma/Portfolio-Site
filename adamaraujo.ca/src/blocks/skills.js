import Resume from '../Resources/adam_araujo_resume.pdf';
const Skills = ({className}) => {
    return (
        <div className={className}><p>I am proficient in Javascript and Java, and familiar with HTML, CSS, Python and C. Currently, I'm interning at ZHY interactive, a start-up that is
        building web platforms. I am building apps with React Native, MongoDB and NodeJS. I'm also on a team currently developing a web platform connecting community food growers and community kitchens. You can view the progress <a href='http://www.foodreuseproject.com/' target='_blank' rel=' noopener noreferrer'>here</a>.
            </p>
            <p>You can view my resume <a href={Resume} target='_blank' >here.</a></p>
            </div>
    )
}
export default Skills