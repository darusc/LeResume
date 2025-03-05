import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { AppContext } from "@context/ProviderContext";

import Resume from "@pages/Build/components/Resume";

import './shared.scss';

export default function Shared() {

  const { user, rid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const services = useContext(AppContext);

  const [resume, setResume] = useState<Resume | null | undefined>(undefined);

  useEffect(() => {
    services.db.getSharedResume(user!, rid!).then(res => {
      setResume(res);
      if(searchParams.get('template') == null) {
        setSearchParams(prev => { 
          prev.set('template', `${res?.template}`);
          return prev;
        });
      }
    });
  }, []);

  if(resume === undefined) {
    return <></>
  }

  if(resume === null) {
    return <h1>Resume unavailable</h1>
  }

  return (
    <div className="shared">
      <Resume resume={resume} initialScale={1} ratio={3.2}/>
    </div>
  )
}