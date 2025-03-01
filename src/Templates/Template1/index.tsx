import { Language, parseDate, IconText, IconLink } from '../common';

import './t1.scss';

export default function Template1({ mref, scale, data }: { mref: any, scale: number, data: ResumeData }) {
  return (
    <div ref={mref} id='t1' className="a4 pdf resume" style={{transform: `scale(${scale})`}}>
      <div className="container">
        
        <header>
          <h1 className="name">{data.basics.firstname + " " + data.basics.lastname}</h1>
          {/* {data.basics.jobtitle && <h3 className='title'>{data.basics.jobtitle}</h3>} */}
          <section className='section inline'>
            <div className="content">
              {data.basics.phone && <IconText icon='fa-solid fa-phone' text={data.basics.phone} />}
              {data.basics.email && <IconText icon='fa-solid fa-envelope' text={data.basics.email} />}
              {data.basics.github && <IconLink icon='fa-brands fa-github' text='Github' link={"https://" + data.basics.github} />}
              {data.basics.linkedin && <IconLink icon='fa-brands fa-linkedin' text='LinkedIn' link={"https://" + data.basics.linkedin} />}
              {data.basics.location && <IconText icon='fa-solid fa-location-dot' text={data.basics.location} />}
            </div>
          </section>
        </header>

        <span className="line"/>

        <main>
          <div className="col" style={{width: '100%'}}>

            {/* skills */}
            {data.skills.length > 0 && data.skills[0].skills.length > 0 &&
              <section className="inline">
                <h4>Skills</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {data.skills.map(s => (
                    <li>
                      <span><b>{s.type}:</b> {s.skills}</span>
                    </li>
                  ))}
                </ul>
              </section>
            }

            {/* projects */}
            {data.projects.length > 0 && data.projects[0].name &&
              <section className="inline">
                <h4>Projects</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                {data.projects.map(project => (
                  <li>
                    <div className="project">
                      <div className="row">
                        <span className="name">{project.name}</span>
                      </div>
                      <div className="row">
                        <div style={{display: 'flex'}}>
                          <div style={{paddingRight: '10px'}}>
                            {project.github && <IconLink text='Github' icon='fa-brands fa-github' link={"https://" + project.github} />}
                          </div>
                          <div>
                            {project.website && <IconLink text={project.website} icon='fa-solid fa-globe' link={"https://" + project.website} />}
                          </div>
                        </div>
                        <div>
                          {[...project.languages].map((lang: string) => <Language key={lang} lang={lang} />)}
                        </div>
                      </div>
                      {project.description.length > 0 &&
                        <ul>
                          {project.description.map((dsc: string, i) => <li key={i}><span>{dsc}</span></li>)}
                        </ul>
                      }
                    </div>
                  </li>
                ))}
                </ul>
              </section>
            }


            {/* experience */}
            {data.work.length > 0 && data.work[0].position &&
              <section className="inline">
                <h4>Experience</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {data.work.map(work => (
                    <li>
                      <div className='work'>
                        <div className='row'>
                          <span className='pos'>{work.position}</span>
                          <span>{work.start && parseDate(work.start) + " - " + ((work.end != undefined && work.end != "") ? parseDate(work.end) : "present")}</span>
                        </div>
                        <div className='row'>
                          <span>{work.company}</span>
                          <span>{work.location}</span>
                        </div>
                        <ul>
                          {work.description.map((dsc: string) => <li><span>{dsc}</span></li>)}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            }


            {/* education  */}
            {data.education.length > 0 && data.education[0].institution &&
              <section className="inline spaced">
                <h4>Education</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {data.education.map((education: Education) => (
                    <div className='education list'>
                      <span className='top'>{education.degree}</span>
                      <span className='middle'>{education.institution}</span>
                      <span className='bottom'>{education.start && parseDate(education.start) + " - " + parseDate(education.end)}</span>
                    </div>
                  ))}
                </ul>
              </section>
            }


            {/* certifications */}
            {data.certifications.length > 0 && data.certifications[0].issuer &&
              <section className="inline spaced">
                <h4>Certifications</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {data.certifications.map((certification: Certification) => (
                    <div className='education inline'>
                      <span className='top'>{certification.name}</span>
                      <div className='flex'>
                        <span className='middle'>{certification.issuer}</span>
                        <span className='bottom'>{(certification.date && parseDate(certification.date))}</span>
                      </div>
                    </div>
                  ))}
                </ul>
              </section>
            }
          </div>
        </main>
      </div>
    </div>
  )
}