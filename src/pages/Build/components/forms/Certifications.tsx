import { useState } from 'react'

import { Button, Input } from './common'

function CertificationInput({ index, value, setValue, del }: { index: number, value: Certification, setValue: Function, del: Function }) {
  return (
    <>
      <div className="form2">
        <div className="row">
          <Input type="text"
            label="Issuer"
            placeholder="Cisco Certifications"
            value={value.issuer}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.certifications[index].issuer = e.target.value })}
            required
          />
          <Input type="text"
            label="Name"
            placeholder="CCNA Security"
            value={value.name}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.certifications[index].name = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <Input
            type="month"
            label="Date"
            value={value.date}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.certifications[index].date = e.target.value })}
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

export default function Certifications({ value, setValue }: { value: Resume, setValue: Function }) {
  const [id, setId] = useState(value.data.certifications.slice(-1)[0].id + 1);

  function removeCertification(id: number) {
    setValue((draft: Resume) => { draft.data.certifications = draft.data.certifications.filter(el => el.id != id) });
  }

  function addCertification() {
    setValue((draft: Resume) => { draft.data.certifications.push({ id: id, issuer: "", name: "", date: "" }) });
    setId(id + 1);
  }

  return (
    <>
      <form>
        <div className="row">
          <h2><i className="fa-solid fa-file-circle-check"></i> Certifications</h2>
          <Button icon="fa-solid fa-plus" onClick={addCertification} />
        </div>
        <div className="column">
          {value.data.certifications.map((e, i) => <CertificationInput key={i} value={e} index={i} setValue={setValue} del={() => removeCertification(e.id)} />)}
        </div>
      </form>
    </>
  )
}