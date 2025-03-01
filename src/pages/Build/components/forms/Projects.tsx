import { useEffect, useState } from 'react';
import { languages, useGithub } from '@hooks/useGithub';

import { Button, Input, Description } from './common'

function ProjectInput({ value, index, setValue, del }: { value: Project, index: number, setValue: Function, del: Function }) {

  function handleLangClick(lang: string) {
    setValue((draft: Resume) => {
      if (draft.data.projects[index].languages.includes(lang)) {
        draft.data.projects[index].languages.filter(el => el != lang);
      }
      else {
        draft.data.projects[index].languages.push(lang)
      }
    });
  }

  return (
    <>
      <div className="form2">
        <div className="row">
          <Input type="text"
            label="Project Name"
            placeholder="My project"
            value={value.name}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.projects[index].name = e.target.value })}
            required
          />
        </div>
        <div className="row">
          <div className="input">
            <div className="selectbox">
              <input type="checkbox" value="" id={`dropdown-${index}`}></input>
              <label htmlFor={`dropdown-${index}`}>Languages</label>
              <ul className="dropdown-list">
                {
                  Object.keys(languages).map(k => (
                    <li key={k} onClick={() => handleLangClick(k)} className={(value.languages.includes(k) || undefined) && "selected"}>
                      <span className="language-color" style={{ backgroundColor: languages[k] }}></span>{k}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <Input type="text"
            label="Github"
            placeholder="github.com/johndoe/project"
            icon="fa-brands fa-github"
            value={value.github}
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.projects[index].github = e.target.value })}
          />
          <Input type="text"
            label="Website"
            placeholder="project.com"
            value={value.website}
            icon="fa-solid fa-globe"
            onChange={(e: any) => setValue((draft: Resume) => { draft.data.projects[index].website = e.target.value })}
          />
        </div>
        <div className="row">
          <Description initialValue={value.description} onInput={(input: string[]) => setValue((draft: Resume) => { draft.data.projects[index].description = input })} />
        </div>
        <div className="row">
          <Button text="Delete" del onClick={del} />
        </div>
      </div>
    </>
  )
}

export default function Projects({ github, value, setValue }: { github: string, value: Resume, setValue: Function }) {
  const [id, setId] = useState(value.data.projects.slice(-1)[0].id + 1);

  const [repos, setRepos] = useState<GithubRepo[]>();

  useEffect(() => {
    useGithub(github).then(data => setRepos(data));
  }, []);

  function removeProject(id: number) {
    setValue((draft: Resume) => { draft.data.projects = draft.data.projects.filter(el => el.id != id) });
  }

  function addProject() {
    setValue((draft: Resume) => { draft.data.projects.push({ id: id, name: '', languages: [], description: [], github: '', website: '' }) });
    setId(id + 1);
  }

  function addProjectFromGithub(repo: GithubRepo) {
    setValue((draft: Resume) => { draft.data.projects.push({ id: id, name: repo.name, languages: [repo.language], description: [repo.description], github: repo.url, website: '' }) });
    setId(id + 1);
  }

  return (
    <>
      <form>
        <div className="row notcolumn">
          <h2><i className="fa-solid fa-code"></i> Projects</h2>
          {
            repos?.length ? (
              <div className="row">
                <div className="selectbox git" style={{ marginRight: '10%' }}>
                  <input type="checkbox" value="" id="dropdown-git"></input>
                  <label className="noafter" htmlFor="dropdown-git" style={{ color: 'white' }}><i className="fa-brands fa-github"></i></label>
                  <ul className="dropdown-list">
                    {repos?.map(repo => (
                      <li key={repo.name} onClick={() => addProjectFromGithub(repo)}>
                        {repo.name}&nbsp;&nbsp;
                        <span className="language-color" style={{ backgroundColor: languages[repo.language] }}></span>
                        {repo.language}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button icon="fa-solid fa-plus" onClick={addProject} />
              </div>
            ) : <Button icon="fa-solid fa-plus" onClick={addProject} />
          }
        </div>
        <div className="column">
          {value.data.projects.map((e, i) => <ProjectInput key={i} value={e} index={i} setValue={setValue} del={() => removeProject(e.id)} />)}
        </div>
      </form >
    </>
  )
}