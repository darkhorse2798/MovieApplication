import React, { useEffect, useState } from "react";
import axios from "axios";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

function SearchMovies() {
  const [movie, setmovie] = useState([]);
  const [findMovie, setfindMovie] = useState([]);
  const commands=[
    {
      command:'*',
      callback:()=>{setfindMovie(transcript)},
    }
  ]
  const {transcript}=useSpeechRecognition({commands})

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?s=${findMovie}&apikey=f056e2f7`)
      .then((response) => {
        setmovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [findMovie]);

  return (
    <div>
      <form className="row g-3">
        <div className="col-auto"></div>
        <div className="col-auto">
          <input
            type="text"
            onChange={(e) => {
              setfindMovie(e.target.value);
            }}
            className="form-control"
            id="inputPassword2"
            placeholder="SearchMovies"
            value={findMovie}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary mb-3" onClick={(e)=>{e.preventDefault();
          SpeechRecognition.startListening()
          }}>
           <i className="fa-solid fa-microphone"></i>
          </button>
        </div>
      </form>
      <div  style={{display:"flex",justifyContent:"space-evenly", flexWrap:"wrap"}}>
        {movie.Search
          ? movie.Search.map((e, index) => {
              return (
                <div key={index} class="card" style={{width: "20rem",marginTop:"3%"}}>
                  <img src={e.Poster} class="card-img-top" height="200px" alt="Movies" ></img>
                  <div class="card-body">
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default SearchMovies;
