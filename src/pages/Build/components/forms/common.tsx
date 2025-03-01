import { useState } from 'react'

export function Input({ type, label, placeholder, icon, required, full, value, onChange }: any) {
  return (
    <>
      <div className={icon ? "input icon" : "input"} style={full && { width: "100%" }}>
        <label>{label}{required && '*'}</label>
        {icon && <i className={icon}></i>}
        <input value={value} onChange={onChange} type={type} placeholder={placeholder} style={full && { width: "calc(100% - 1.6rem)" }} />
      </div>
    </>
  )
}

export function Button({ text, del, icon, onClick }: any) {
  return (
    <>
      {/* <button className={del ? "primary delete" : "primary"} onClick={onClick}> */}
      <button type='button' className={del ? "primary" : "primary"} onClick={onClick}>
        {icon && <i className={icon}></i>}
        {text}
      </button>
    </>
  )
}

export function Description({ initialValue, onInput }: { initialValue: string[], onInput: Function }) {
  const [prevl, setPrevl] = useState(-1);

  function parseInitialValue() {
    if (initialValue.length > 0) {
      return "\u2022 " + initialValue.join(`\n\u2022`);
    }
    return "";
  }

  function handleInput(event: any) {
    const bullet = "\u2022";
    const newl = event.target.value.length;
    const char = event.target.value.substr(-1).charCodeAt(0);

    if (newl > prevl) {
      if (char === 10) {
        event.target.value = `${event.target.value}${bullet}`;
      } else if (newl === 1) {
        event.target.value = `${bullet} ${event.target.value}`;
      }
    }

    const strs = (event.target.value as string).split(`${bullet}`);

    const input = strs.filter(s => s).map(s => s.trim());

    setPrevl(newl);
    onInput(input);
  }

  return (
    <>
      <div className="input">
        <label>Description</label>
        {prevl == -1 ?
          <textarea defaultValue={parseInitialValue()} onInput={e => handleInput(e)}></textarea> :
          <textarea onInput={e => handleInput(e)}></textarea>
        }
      </div>
    </>
  )
}