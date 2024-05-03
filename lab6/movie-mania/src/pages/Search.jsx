import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom'
import { HiChevronLeft } from "react-icons/hi";


function Search() {

    const { searchedMovies, loader, fetchSearch } = useContext(Contextpage);
    const { query } = useParams()

    useEffect(() => {
        fetchSearch(query);
    }, [query]); 

    return (
        <section>
            <Link to="/" className='fixed z-10 text-4xl text-black bg-amber-50 m-3 md:m-5 rounded-full'><HiChevronLeft /></Link>
            <div className='w-full bg-bg-color md:p-10 mb-20 md:mb-0'>
                <Header />
                <motion.div
                    layout
                    className="flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                        {searchedMovies.map((movie) => (
                                            <Moviecard key={movie.id} movie={movie} />
                                        ))}
                                </>
                        }
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>

    )
}

export default Search
