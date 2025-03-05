import { languages } from '@hooks/useGithub'

import './common.scss'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function parseDate(input: string) {
  if(input == "") {
    return "Present"
  }

  const result = months[parseInt(input.slice(-2)) - 1] + " " + input.slice(0, 4);
  
  return result;
}

export function IconText({ icon, text }: any) {
  return (
    <>
      <div className='icon-text'>
        <span><i className={icon}></i></span>
        <span>{text}</span>
      </div>
    </>
  )
}

export function IconLink({ icon, text, link }: any) {
  return (
    <>
      <div className='icon-text'>
        <span><i className={icon}></i></span>
        <a href={link} target='_blank'>{text}</a>
      </div>
    </>
  )
}

export function Language({ lang }: any) {
  return (
    <>
      <span className='lang'>
        <span className="language-color" style={{ backgroundColor: languages[lang] }}></span>
        <span className='language-name'>{lang}</span>
      </span>
    </>
  )
}
