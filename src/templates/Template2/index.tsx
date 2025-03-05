import { Language, parseDate, IconText, IconLink } from '../common';

import './t2.scss'

export default function Template2({ mref, scale, data }: { mref: any, scale: number, data: ResumeData }) {
  return (
    <div ref={mref} id='t2' className="a4 pdf resume" style={{transform: `scale(${scale})`}}>
      <div className="container">


        {/* header */}
        <div className="header">
          <h1 className="name">{data.basics.firstname + " " + data.basics.lastname}</h1>
          {data.basics.jobtitle && <h3 className='title'>{data.basics.jobtitle}</h3>}
        </div>

        <div className="main">

          <div className="col left" style={{width: '35%'}}>
            
            {/* contact */}
            <div className="section inline">
              <h4>Contact</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {data.basics.phone && <IconText icon='fa-solid fa-phone' text={data.basics.phone} />}
                {data.basics.email && <IconText icon='fa-solid fa-envelope' text={data.basics.email} />}
                {data.basics.github && <IconLink icon='fa-brands fa-github' text={data.basics.github} link={"https://" + data.basics.github} />}
                {data.basics.linkedin && <IconLink icon='fa-brands fa-linkedin' text={data.basics.linkedin} link={"https://" + data.basics.linkedin} />}
                {data.basics.website && <IconLink icon='fa-solid fa-link' text={data.basics.website} link={"https://" + data.basics.website} />}
                {data.basics.location && <IconText icon='fa-solid fa-location-dot' text={data.basics.location} />}
              </ul>
            </div>
            

            {/* skills */}
            {data.skills.length > 0 && data.skills[0].skills.length > 0 &&
              <>
                <span className="line"/>
                <div className="section inline">
                  <h4>Skills</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {data.skills.map(s => (
                      <li>
                        <span>{s.skills}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            } 


            {/* education  */}
            {data.education.length > 0 && data.education[0].institution &&
              <>
                <span className="line"/>
                <div className="section inline">
                  <h4>Education</h4>
                  <ul className='spaced' style={{ listStyle: "none", padding: 0 }}>
                    {data.education.map((education: Education) => (
                      <li>
                        <div className='education list'>
                          <span className='top'>{education.degree}</span>
                          <span className='middle'>{education.institution}</span>
                          <span className='bottom'>{education.start && parseDate(education.start) + " - " + parseDate(education.end)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            }
            
            {/* certifications  */}
            {data.certifications.length > 0 && data.certifications[0].issuer &&
              <>
                <span className="line"/>
                <div className="section inline">
                  <h4>Certifications</h4>
                  <ul className='spaced' style={{ listStyle: "none", padding: 0 }}>
                    {data.certifications.map((certification: Certification) => (
                      <li>
                        <div className='education list'>
                          <span className='top'>{certification.name}</span>
                          <span className='middle'>{certification.issuer}</span>
                          <span className='bottom'>{parseDate(certification.date)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            }
          </div>

          <div className="col right" style={{width: '65%'}}>

            {/* projects  */}
            {data.projects.length > 0 && data.projects[0].name &&
              <div className="section inline">
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
              </div>
            }


            {/* experience  */}
            {data.work.length > 0 && data.work[0].position &&
              <div className="section inline">
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
              </div>
            }

          </div>
        </div>
      </div>
    </div>
  )
}
