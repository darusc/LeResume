import { useState } from 'react';
import { Button, Input, Description } from './common'

function WorkInput({ index, value, setValue, del }: { index: number, value: Work, setValue: Function, del: Function }) {
  return (
    <>
      <div className="form2">
        <div className="row">
          <Input type="text"
            label="Position"
            placeholder="React developer"
            icon="fa-solid fa-briefcase"
            value={value.position}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.work[index].position = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Input type="text"
            label="Company"
            placeholder="Facebook"
            value={value.company}
            icon="fa-solid fa-building"
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.work[index].company = e.target.value })}
          />
          <Input type="text"
            label="Location"
            placeholder="Menlo Park, CA"
            value={value.location}
            icon="fa-solid fa-location-dot"
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.work[index].location = e.target.value })}
          />
        </div>
        <div className="row">
          <Input
            type="month"
            label="Start"
            value={value.start}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.work[index].start = e.target.value })}
            required
          />
          <Input
            type="month"
            label="End"
            value={value.end}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.work[index].end = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Description initialValue={value.description} onInput={(input: string[]) => setValue((draft: Resume) => { draft.data.work[index].description = input })} />
        </div>
        <div className="row">
          <Button text="Delete" del onClick={del} />
        </div>
      </div>
    </>
  )
}

export default function Work({ value, setValue }: { value: Resume, setValue: Function }) {
  const [id, setId] = useState(value.data.work.slice(-1)[0].id + 1);

  function removeWork(id: number) {
    setValue((draft: Resume) => { draft.data.work = draft.data.work.filter(el => el.id != id) });
  }

  function addWork() {
    setValue((draft: Resume) => { draft.data.work.push({ id: id, position: '', company: '', description: [], start: '', end: '', location: '' }) });
    setId(id + 1);
  }

  return (
    <>
      <form>
        <div className="row notcolumn">
          <h2><i className="fa-solid fa-briefcase"></i> Work Experience</h2>
          <Button icon="fa-solid fa-plus" onClick={addWork} />
        </div>
        <div className="column">
          {value.data.work.map((e, i) => <WorkInput key={i} value={e} index={i} setValue={setValue} del={() => removeWork(e.id)} />)}
        </div>
      </form>
    </>
  )
}