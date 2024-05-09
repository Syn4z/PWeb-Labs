import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from './Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Genre from './Genre';
import Header from './Header';
import InfiniteScroll from 'react-infinite-scroll-component';


function Movies() {

    const { movies, loader, page, setPage, totalPage, setMovies, activegenre, filteredGenre } = useContext(Contextpage);
    
    useEffect(() => {
        setMovies([]) 
        setPage(0)
    }, [activegenre]);

    useEffect(() => {
        if (page > 0) {
            filteredGenre();
        }
    }, [page])

    return (

        <div className='w-full bg-bg-color md:p-10 mb-20 md:mb-0'>
            <Genre />
            <Header />
            <motion.div
                layout
                className="flex flex-wrap relative justify-evenly md:justify-around">
                <AnimatePresence>
                    {
                        loader ? <span className="loader m-10"></span> :
                            <>
                                <InfiniteScroll
                                    className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                                    dataLength={movies.length}
                                    next={() => setPage(page + 1)}
                                    hasMore={page < totalPage}
                                    loader={<span className="loader m-10"></span>}
                                    scrollThreshol={0.9}
                                    style={{ overflow: 'hidden' }}
                                >
                                    {movies.map((movie) => (
                                        <Moviecard key={movie.id} movie={movie} />
                                    ))}

                                </InfiniteScroll>

                            </>
                    }
                </AnimatePresence>
            </motion.div>

        </div>
    )
}

export default Movies
