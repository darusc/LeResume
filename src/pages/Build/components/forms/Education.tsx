import { useState } from 'react'

import { Button, Input } from './common'

function EducationInput({ index, value, setValue, del }: { index: number, value: Education, setValue: Function, del: Function }) {
  return (
    <>
      <div className={`form2 ${index}`}>
        <div className="row">
          <Input type="text"
            label="Institution"
            placeholder="University of X"
            icon="fa-solid fa-building-columns"
            value={value.institution}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.education[index].institution = e.target.value })}
            required
          />
          <Input type="text"
            label="Degree"
            placeholder="Bachelor in Computer Science"
            icon="fa-solid fa-certificate"
            value={value.degree}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.education[index].degree = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Input
            type="month"
            label="Start"
            value={value.start}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.education[index].start = e.target.value })}
            required
          />
          <Input
            type="month"
            label="End"
            value={value.end}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.education[index].end = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Button text="Delete" del onClick={del} />
        </div>
      </div>
    </>
  )
}

export default function Education({ value, setValue }: { value: Resume, setValue: Function }) {
  const [id, setId] = useState(value.data.education.slice(-1)[0].id + 1);

  function removeEducation(id: number) {
    setValue((draft: Resume) => { draft.data.education = draft.data.education.filter(el => el.id != id) });
  }

  function addEducation() {
    setId(id + 1);
    setValue((draft: Resume) => { draft.data.education.push({ id: id, institution: "", degree: "", start: "", end: "" }) });
  }

  console.log(value);

  return (
    <>
      <form>
        <div className="row notcolumn">
          <h2><i className="fa-solid fa-graduation-cap"></i> Education</h2>
          <Button icon="fa-solid fa-plus" onClick={addEducation} />
        </div>
        <div className="column">
          {value.data.education.map((e, i) => <EducationInput key={i} index={i} value={e} setValue={setValue} del={() => removeEducation(e.id)} />)}
        </div>
      </form>
    </>
  )
}