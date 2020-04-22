import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        // res.data ==> just the id
        console.log({ res })
        console.log({ movie })
        const newMovies = props.movieList.filter(v => `${v.id}` !== movie.id)
        props.setMovieList(newMovies)
        console.log({ props })
        push('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="button-wrapper">

      <button className="save-button" onClick={saveMovie}>
        Save
      </button>

      <button className="update-button" onClick={() => push(`/update-movie/${movie.id}`)}>
        Update
      </button>

      <button className="delete-button" onClick={deleteMovie}>
        Delete
      </button>
      
      </div>
      
    </div>
  );
}

export default Movie;