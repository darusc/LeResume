import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

import usePrint from '@hooks/usePrint';
import useScale from '@hooks/useScale';

import * as Templates from '../../../templates/index.tsx';

export default function Resume({resume, initialScale, ratio}: {resume: Resume, initialScale: number, ratio: number}) {
  const [searchParams] = useSearchParams();
  const tid = searchParams.get("template")!;

  const scale = useScale(initialScale, ratio);
  const [zoom, setZoom] = useState(1);

  const ref = useRef(null);
  const handlePrint = usePrint(ref);

  return (
    // <div className={window.innerWidth < 680 ? "resume-holder collapsed" : "resume-holder"}>
    <div className="resume-holder">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 
              21cm = 793.7px
              29.7cm = 1122.52px
        */}
        <div className='resume-preview' style={{ width: 793.7 * scale * zoom, height: 1122.52 * scale * zoom }}>
          {
            {
              "1": <Templates.Template1 mref={ref} scale={scale * zoom} data={resume.data} />,
              "2": <Templates.Template2 mref={ref} scale={scale * zoom} data={resume.data} />,
              "3": <Templates.Template3 mref={ref} scale={scale * zoom} data={resume.data} />,
              "4": <Templates.Template4 mref={ref} scale={scale * zoom} data={resume.data} />
            }[tid]
          }
        </div>
        <div className="buttons">
          <button className="secondary" style={{ float: 'right' }} onClick={() => { handlePrint(); }}><i className="fa-solid fa-download"></i> Download</button>
          <div>
            <button className="secondary" onClick={() => { setZoom(zoom * 1.1) }}><i className="fa-solid fa-magnifying-glass-plus"></i></button>
            <button className="secondary" onClick={() => { setZoom(zoom / 1.1) }}><i className="fa-solid fa-magnifying-glass-minus"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}