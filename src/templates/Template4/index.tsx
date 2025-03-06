import { IconLink, Language, parseDate } from '../common';
import './t4.scss';

export default function Template4({ mref, scale, data }: { mref: any, scale: number, data: ResumeData }) {
  return (
    <div ref={mref} id='t4' className="a4 pdf resume" style={{transform: `scale(${scale})`}}>
      
      <header>
        <h1>{data.basics.firstname + " " + data.basics.lastname}</h1>
        <h2>{data.basics.jobtitle}</h2>
      </header>

      <main>

        <section id='contact'>
          <div className='name'>CONTACT</div>
          <div className="content columns">
            {data.basics.phone &&
              <div className="detail">
                <span>Phone: </span>
                <span>{data.basics.phone}</span>
              </div>
            }
            {data.basics.github &&
              <div className="detail">
                <span>Github: </span>
                <span><a href={"https://" + data.basics.github}>{data.basics.github}</a></span>
              </div>
            }
            {data.basics.email &&
              <div className="detail">
                <span>Email: </span>
                <span>{data.basics.email}</span>
              </div>
            }
            {data.basics.linkedin &&
              <div className="detail">
                <span>Linkedin: </span>
                <span><a href={"https://" + data.basics.linkedin}>{data.basics.linkedin}</a></span>
              </div>
            }
            {data.basics.location &&
              <div className="detail">
                <span>Location: </span>
                <span>{data.basics.location}</span>
              </div>
            }
            {data.basics.website && 
              <div className="detail">
                <span>Website: </span>
                <span><a href={"https://" + data.basics.website}>{data.basics.website}</a></span>
              </div>
            }
          </div>
        </section>

        {data.skills.length > 0 && data.skills[0].skills.length > 0 &&
          <section id='skills'>
            <div className='name'>SKILLS</div>
            <div className="content">
              {data.skills.map(skill => (
                <div className='detail'>
                  <span>{skill.type}: </span>
                  <span>{skill.skills}</span>
                </div>
              ))}
            </div>
          </section>
        }

        {data.projects.length > 0 && data.projects[0].name &&
          <section id='projects'>
            <div className='name'>PROJECTS</div>
            <div className="content">
              {data.projects.map(project => (
                <div className="project">
                  <span className='name'>{project.name}</span>
                  <div>
                    {project.github && <IconLink icon='fa-brands fa-github' text='Github' link={"https://" + project.github}/>}
                    {project.website && <IconLink text={project.website} icon='fa-solid fa-globe' link={"https://" + project.website} />}
                    <div className="languages">
                      {[...project.languages].map((lang: string) => <Language key={lang} lang={lang} />)}
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
            <div className='name'>PROFFESIONAL EXPERIENCE</div>
            <div className="content">
              {data.work.map(work => (
                <div className="work">
                  <div className='job'>{work.position} | {parseDate(work.start) + "-" + parseDate(work.end)}</div>
                  <div>
                    <span>{work.company}</span>
                    <span style={{float: 'right'}}>{work.location}</span>
                  </div>
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

        {data.education.length > 0 && data.education[0].institution &&
          <section id="education">
            <div className='name'>EDUCATION</div>
            <div className="content columns">
              {data.education.map(education => (
                <div className="education">
                  <span>{education.degree} | {education.start.split('-')[0] + " - " + education.end.split('-')[0]}</span>
                  <span>{education.institution}</span>
                </div>
              ))}
            </div>
          </section>
        }

        {data.certifications.length > 0 && data.certifications[0].issuer &&
          <section id="CERTIFICATIONS">
            <div className='name'>CERTIFICATIONS</div>
            <div className="content">
              {data.certifications.map(certification => (
                <div className="education">
                  <span>{certification.name} | {parseDate(certification.date)}</span>
                  <span>{certification.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        }

      </main>

    </div>
  )
}