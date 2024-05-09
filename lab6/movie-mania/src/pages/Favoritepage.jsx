import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

function Favoritepage() {

    const { favorites, loader, getFavorites } = useContext(Contextpage);

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <>
          <Helmet>
            <title>Movie Mania | Favorite Movies</title>
          </Helmet>
            
            <div className='w-full bg-bg-color md:p-10 mb-20 md:mb-0'>
                <Header title="Favorites" />
                <motion.div
                    layout
                    className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    {
                                        favorites.length == 0
                                            ?
                                            <p className="text-xl text-page-text-color">No Favorites Yet, Bookmark Some Movies.</p>
                                            :
                                            favorites.map((favorite, index) => <Moviecard key={index} movie={Object.values(favorite)[0]} />)
                                    }
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    )
}

export default Favoritepage