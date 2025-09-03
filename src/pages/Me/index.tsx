import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Updater, useImmer } from "use-immer";

import { AppContext } from "@context/ProviderContext";
import useAuth from "@hooks/useAuth";

import { saveResumeToLocalStorage } from "@services/localstorage";
import { getDateFromTimestamp } from "@services/time";

import templateImgs from '@assets/templates';

import logod from '@assets/logo.svg';
import logol from '@assets/logolight.svg';

import { Dialog, Title, Body } from "@components/Dialog";
import { Input } from "@pages/Build/components/forms/common";

import './me.scss'

function ResumeCard({resume, setResumes}: {resume: Resume, setResumes: Updater<Resume[]>}) {
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [newName, setNewName] = useState(resume.name);

  const services = useContext(AppContext);
  const navigate = useNavigate();

  function onNameChange() {
    setResumes(draft => { 
      // Find the index of the resume to change name
      const index = draft.findIndex(r => r.name === resume.name)
      
      // Delete from the database, edit and upload the edited one
      services.db.deleteResume(services.auth.getUserId(), draft[index]);
      draft[index].name = newName;
      services.db.uploadResume(services.auth.getUserId(), draft[index]);
    });
  }

  function onDelete() {
    services.db.deleteResume(services.auth.getUserId(), resume);
    setResumes(draft => { draft = draft.filter(r => r.name != resume.name) });
  }

  async function onDuplicate() {
    // Fetch and update the increment metadata used as id for new resume
    const id = await services.db.getMetadata(services.auth.getUserId(), 'increment');
    services.db.setMetadata(services.auth.getUserId(), 'increment', parseInt(id) + 1);

    // Create a deep copy of the resume, update its id and upload it
    const newResume = {...resume};
    newResume.id = id;
    newResume.name = `${resume.name} (copy)`;
    services.db.uploadResume(services.auth.getUserId(), newResume);

    // Add the new resume to the list
    setResumes(draft => { draft.push(newResume) });
  }

  function onClick() {
    saveResumeToLocalStorage(resume);
    navigate(`/build?template=${resume.template}&step=basics`);
  }

  function onShare() {
    if(resume.shared) {
      resume.shared = false;
      services.db.setNonshared(services.auth.getUserId(), resume);
    } else {
      resume.shared = true;
      services.db.setShared(services.auth.getUserId(), resume).then(link => {
        navigator.clipboard.writeText(link);
      });
    }
  }

  function onSharedClick() {
    const user = services.auth.getUserId();
    navigate(`/shared/${user}/${resume.id}?template=${resume.template}`);
  }

  return (
    <>
      <div className="resumeCard" onClick={() => onClick()}>
        <div className="content">
          <div className="preview">
            <img src={templateImgs[resume.template - 1]}/>
          </div>
          <div className="details">
            <div className="details-header">
              <div>
                <span style={{"color": "var(--resume-card-text-primary)"}}>{resume.name}</span>
                <span style={{"fontSize": "0.8rem"}}>{getDateFromTimestamp(resume.created)}</span>
              </div>
            </div>
            <div>
              {resume.shared && <span onClick={e => {
                e.stopPropagation();
                onSharedClick();
              }}><i className="fa-solid fa-eye"></i> {resume.views}</span>}
            </div>
          </div>
          <div className="actions">
            <span 
              onClick={e => {
                e.stopPropagation();
                setMoreOpen(!moreOpen);
              }}>
              <i className="fa-solid fa-ellipsis"></i>
            </span>
            { moreOpen &&
              <div className="more">
                <span 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setEditDialogOpen(true); 
                    setMoreOpen(false);
                  }}>
                  Edit name 
                  <i className="fa-solid fa-pen"></i>
                </span>
                <span 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    saveResumeToLocalStorage(resume);
                    navigate('/templates?change');
                  }}>
                  Change template 
                  <i className="fa-solid fa-file"></i>
                </span>
                <span 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onDuplicate(); 
                    setMoreOpen(false);
                  }}>
                  Duplicate
                  <i className="fa-solid fa-clone"></i>
                </span>
                <span 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onShare(); 
                    setMoreOpen(false);
                  }}>
                  {resume.shared ? 'Stop sharing' : 'Share'}
                  <i className="fa-solid fa-share"></i>
                </span>
                <span 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setDeleteDialogOpen(true); 
                    setMoreOpen(false);
                  }}>Delete 
                  <i className="fa-solid fa-trash"></i>
                </span>
              </div>
            }
          </div>
        </div>
      </div>

      <Dialog 
        open={editDialogOpen} 
        type='edit'
        onClose={() => setEditDialogOpen(false)} 
        onConfirm={() => {
          onNameChange();
          setEditDialogOpen(false);
        }}>
        <Title text="Change name"/>
        <Body>
          <form>
            <Input type='text' label='Resume name' value={newName} onChange={(e: any) => setNewName(e.target.value)} />
          </form>
        </Body>
      </Dialog>
      
      <Dialog 
        open={deleteDialogOpen} 
        type='delete'
        onClose={() => setDeleteDialogOpen(false)} 
        onConfirm={() => {
          onDelete();
          setDeleteDialogOpen(false);
        }}>
        <Title text="Delete resume?" description="This resume will be deleted along with all data and views."/>
      </Dialog>
    </>
  )
}

export default function Me({darkmode}: any) {

  const navigate = useNavigate();
  const services = useContext(AppContext);

  const [resumes, setResumes] = useImmer<Resume[]>([]);

  const isAuthenticated = useAuth(services.auth);

  useEffect(() => {
    if(isAuthenticated == false) {
      navigate('/signin');
      return;
    }

    if(isAuthenticated == true) {
      services.db.getResumes(services.auth.getUserId()).then(data => {
        setResumes(data);
      });
    }
  }, [isAuthenticated]);

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logol : logod}/>
      </div>
      <div className='me'>
        <div className="container">
          <div className="header">
            <h1>Your resumes</h1>
            <div className="userActions">
              <button className="primary" onClick={() => navigate('/templates')}>Create resume</button>
            </div>
          </div>
          <div className="subheader">{services.auth.getUserName()}</div>
          <div className="main">
            <div className="resumes">
              { resumes.map(resume => <ResumeCard resume={resume} setResumes={setResumes}/>) }
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}