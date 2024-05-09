import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import {Helmet} from "react-helmet";

function Genre() {
    const context = useContext(Contextpage);    

    useEffect(() => {
        context.fetchGenre();
    }, [])

    return (
        <>
        <Helmet>
            <title>Movie Mania | Genres</title>
        </Helmet>
        <div className='flex flex-wrap justify-center px-2'>
            {
                context.genres.map((genre) => (
                    <button
                        onClick={() => context.setActiveGenre(genre.id)}
                        className={context.activegenre === genre.id ? 'active px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl' : 'px-4 py-2 m-2 text-[15px] bg-genre-bg-color text-white font-semibold rounded-3xl'} key={genre.id}>
                        {genre.name}
                    </button>
                ))
            }
            </div>
            </>
    )
}

export default Genre
