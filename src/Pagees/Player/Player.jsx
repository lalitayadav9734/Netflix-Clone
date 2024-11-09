import React, { useState ,useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const{id} = useParams();
  const navigate = useNavigate();
  const[apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof: ""
  });
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjAzZGJkYTRjOGMxZWY4MWRjODMxZmUzMGE0Nzc1ZCIsIm5iZiI6MTczMTAxMDk4NC4wNjEzMDA4LCJzdWIiOiI2NmUwNGZlMDAwMDAwMDAwMDA5Y2YxY2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3ro9-aT_Jb9DGRB6eupFSoGQkIsub1bkpAIjrmopBqE'
    }
  };
  
 useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res =>setApiData(res.results[0]))
  .catch(err => console.error(err));

 },[])

 

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={() => {navigate(-2)}}/>
      <iframe width='90%'
       height='90%' 
       src={`https://www.youtube.com/embed/${apiData.key}`}
       title='trailer' frameBorder='0' allowFullScreen>
      </iframe>
      <div className="played-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
          </div>
  )
}

export default Player
