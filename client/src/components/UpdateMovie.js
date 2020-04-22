import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = props => {
    const initialMovie = {
        title: "",
        director: "",
        metascore: "",
        stars: ["", "", ""]
    }

    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
             .then(res => {
                 console.log({ res })
                 setMovie(res.data)
             })
             .catch(err => {
                 console.log({ err })
             })
    }, [id])

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore') {
          value = parseInt(value, 10);
        }

        setMovie({
          ...movie,
          [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
            // res.data
            console.log({ res })
            const newMovies = props.movieList.filter(v => `${v.id}` !== res.data.id)
            console.log({ newMovies })
            props.setMovieList(newMovies);
            push('/');

            // res.data ==> just updated item object
          })
          .catch(err => console.log({err}));
      };

    return (
        <div className="updateForm">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movie.title}
                />
                <br/>

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movie.director}
                />
                <br/>

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                <br/>
<button className="form-button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;