import { parseDate } from '../common'
import './t3.scss'

export default function Template3({ mref, scale, data }: { mref: any, scale: number, data: ResumeData }) {
  console.log(data);
  return (
    <div ref={mref} id='t3' className="a4 pdf resume" style={{transform: `scale(${scale})`}}>
      
      <header>
        <div>
          <h1>{data.basics.firstname + " " + data.basics.lastname}</h1>
          <h2>{data.basics.jobtitle}</h2>
        </div>
        <div>
          <span>{data.basics.phone}</span>
          <span>{data.basics.email}</span>
          <span>{data.basics.location}</span>
          <span><a href={"https://" + data.basics.github}>{data.basics.github}</a></span>
          <span><a href={"https://" + data.basics.linkedin}>{data.basics.linkedin}</a></span>
          <span><a href={"https://" + data.basics.website}>{data.basics.website}</a></span>
        </div>
      </header>

      <main>

        <section style={{width: '30%'}}>
          
          {data.skills.length > 0 && data.skills[0].skills.length > 0 &&
            <section id='skills'>
              <div className='name'>SKILLS</div>
              <div className="content">
                <ul>
                  {data.skills.map(skill => (
                    <li><span>{skill.skills}</span></li>
                  ))}
                </ul>
              </div>
            </section>
          }

          {data.education.length > 0 && data.education[0].institution &&
            <section id='education'>
              <div className='name'>EDUCATION</div>
              <div className="content">
                {data.education.map(education => (
                  <div className="education">
                    <span>{education.degree}</span>
                    <span>{education.institution}</span>
                    <span>{parseDate(education.start) + " - " + parseDate(education.end)}</span>
                  </div>
                ))}
              </div>
            </section>
          }

          {data.certifications.length > 0 && data.certifications[0].issuer &&
            <section id='education'>
              <div className='name'>CERTIFICATIONS</div>
              <div className="content">
                {data.certifications.map(certification => (
                  <div className="education">
                    <span>{certification.name}</span>
                    <span>{certification.issuer}</span>
                    <span>{parseDate(certification.date)}</span>
                  </div>
                ))}
              </div>
            </section>
          }
        
        </section>

        <section style={{width: '70%'}}>
          
          {data.projects.length > 0 && data.projects[0].name &&
            <section id="projects">
              <div className="name">PROJECTS</div>
              <div className="content">
                {data.projects.map(project => (
                  <div className="project">
                    <span className='name'>{project.name}</span>
                    <div>
                      {project.github && <a href={"https://" + project.github}>{project.github}</a>}
                      {project.website && <a href={"https://" + project.website}>{project.website}</a>}
                      <div className="languages">
                        {[...project.languages].map((lang: string) => <span>{lang}</span>)}
                      </div>
                    </div>
                    {project.description.length > 0 &&
                      <ul>
                        {project.description.map((dsc: string, i) => <li key={i}><span>{dsc}</span></li>)}
                      </ul>
                    }
                  </div>
                ))}
              </div>
            </section>
          }

          {data.work.length > 0 && data.work[0].position &&
            <section id="experience">
              <div className="name">EXPERIENCE</div>
              <div className="content">
                {data.work.map(work => (
                  <div className="work">
                    <span>{work.position}, {work.company}, {work.location}</span>
                    <span>{parseDate(work.start) + " - " + parseDate(work.end)}</span>
                    {work.description.length > 0 &&
                      <ul>
                        {work.description.map((dsc: string, i) => <li key={i}><span>{dsc}</span></li>)}
                      </ul>
                    }
                  </div>
                ))}
              </div>
            </section>
          }

        </section>

      </main>

    </div>
  )
}