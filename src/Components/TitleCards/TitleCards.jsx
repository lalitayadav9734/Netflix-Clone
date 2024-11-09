import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {
  const[apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjAzZGJkYTRjOGMxZWY4MWRjODMxZmUzMGE0Nzc1ZCIsIm5iZiI6MTczMTAxMDk4NC4wNjEzMDA4LCJzdWIiOiI2NmUwNGZlMDAwMDAwMDAwMDA5Y2YxY2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3ro9-aT_Jb9DGRB6eupFSoGQkIsub1bkpAIjrmopBqE'
    }
  };
  
  
const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;

}

useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

})

useEffect(() => {
  cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div className='titlecards'>
      <h2>{title? title : "Popular on NetFlix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index) =>{
          return <Link  to= {`/player/${card.id}`} className='card' key={index}>
           <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt=''/>
           <p className='for'>{card.original_title}</p>
            </Link>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
