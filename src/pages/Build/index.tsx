import { useImmer } from 'use-immer';

import { getResumeFromLocalStorage } from '@services/localstorage';

import Form from './components/Form';
import Resume from './components/Resume';

import './build.scss';
import { useState } from 'react';

export default function Build() {

  const [resume, setResume] = useImmer<Resume>(getResumeFromLocalStorage());

  const [collapsed, setCollapsed] = useState(false);

  function collapse() {
    const rh = document.querySelector(".build-container") as HTMLElement
    rh.classList.toggle("collapsed");
    setCollapsed(!collapsed);
  }

  return (
    <>
      <div className='build'>
        <div className='build-container'>
          <Form resume={resume} setResume={setResume}/>
          <Resume resume={resume} initialScale={0.7} ratio={2.5}/>
          <div id="collapse" className={collapsed ? "collapsed" : ""} onClick={collapse}>
            <span>Preview</span>
            { collapsed && <i className="fa-solid fa-eye-slash"></i> }
            { !collapsed && <i className="fa-solid fa-eye"></i> }
          </div>
        </div>
      </div>
    </>
  )
}