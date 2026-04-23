
import React,{useEffect,useState} from 'react';
function App(){
 const [projects,setProjects]=useState([]);
 useEffect(()=>{
  fetch(process.env.REACT_APP_API+'/api/projects')
   .then(r=>r.json()).then(setProjects);
 },[]);
 return (
  <div>
   <h1>Portfolio</h1>
   {projects.map(p=><div key={p._id}><h3>{p.title}</h3><p>{p.description}</p></div>)}
  </div>
 );
}
export default App;
