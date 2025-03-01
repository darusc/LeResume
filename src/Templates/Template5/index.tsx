import { Language, parseDate, IconText, IconLink } from '../common';

import './t3.scss'

export default function Template3({ mref, scale, data }: { mref: any, scale: number, data: ResumeData }) {
  return (
    <div ref={mref} id='t3' className="a4 pdf resume" style={{transform: `scale(${scale})`}}>

        <header>
          <h1>{data.basics.firstname + " " + data.basics.lastname}</h1>
          <h2>{data.basics.jobtitle}</h2>
        </header>

        <main>
          
          <section className='left'>

            <section id='contact' className='element'>
              <h4>CONTACT</h4>
              {data.basics.phone && <IconText icon='fa-solid fa-phone' text={data.basics.phone} />}
              {data.basics.email && <IconText icon='fa-solid fa-envelope' text={data.basics.email} />}
              {data.basics.github && <IconLink icon='fa-brands fa-github' text='Github' link={"https://" + data.basics.github} />}
              {data.basics.linkedin && <IconLink icon='fa-brands fa-linkedin' text='LinkedIn' link={"https://" + data.basics.linkedin} />}
              {data.basics.location && <IconText icon='fa-solid fa-location-dot' text={data.basics.location} />}
            </section>

            <section id='skills' className='element'>
              <h4>SKILLS</h4>
              <ul>
                {data.skills.map(group => <li><span>{group.skills}</span></li>)}
              </ul>
            </section>

            <section id='education' className='element'>
              <h4>EDUCATION</h4>
              {data.education.map(education => (
                <div className="education">
                  <span className='degree'>{education.degree}</span>
                  <span className='insitution'>{education.institution}</span>
                  <span className='date'>{parseDate(education.start) + ' - ' + parseDate(education.end)}</span>
                </div>
              ))}
            </section>

            <section id='certifications' className='element'>
              <h4>CERTIFICATIONS</h4>
              {data.certifications.map(certification => (
                <div className="education">
                  <span className='degree'>{certification.name}</span>
                  <span className='insitution'>{certification.issuer}</span>
                  <span className='date'>{parseDate(certification.date)}</span>
                </div>
              ))}
            </section>

          </section>


          <section className='right'>
              
            <section id='projects' className='element'>
              <h4>PROJECTS</h4>
              {data.projects.map(project => (
                <div className="project">
                  <span className="name">{project.name}</span>
                  <div>
                    {project.github && <IconLink icon='fa-brands fa-github' text='Github' link={project.github}/>}
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
            </section>

            <section id='experience' className='element'>
              <h4>EXPERIENCE</h4>
              {data.work.map(work => (
                <div className="work">
                  <div>
                    <span>{work.company}</span>
                    <span style={{float: 'right'}}>{parseDate(work.start) + "-" + parseDate(work.end)}</span>
                  </div>
                  <span className='position'>{work.position}</span>
                  {work.description.length > 0 &&
                    <ul>
                      {work.description.map((dsc: string, i) => <li key={i}><span>{dsc}</span></li>)}
                    </ul>
                  }
                </div>
              ))}
            </section>

          </section>

        </main>

    </div>
  )
}
