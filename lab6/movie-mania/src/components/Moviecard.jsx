import React, { useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import noimage from '../assets/images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AiFillStar, AiOutlineStar} from 'react-icons/ai';
import Contextpage from '../Contextpage';
import Popup from './Popup';

function Moviecard({ movie }) {
    const { favorites, addFavorite, deleteFavorite } = useContext(Contextpage);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const isBookmarked = favorites.some(favorite => favorite.hasOwnProperty(movie.id));

    const BookmarkMovie = async () => {
        if (isBookmarked) {
            try {
                await deleteFavorite(movie.id);
            } catch (error) {
                if (error.message === 'HTTP error! status: 401' || error.message === 'HTTP error! status: 403') {
                    setPopupMessage('Failed to remove favorite, Please Login First');
                    setShowPopup(true);
                }
            }
        } else {
            try {
                await addFavorite(movie);
            } catch (error) {
                if (error.message === 'HTTP error! status: 401' || error.message === 'HTTP error! status: 403') {
                    setPopupMessage('Failed to add favorite, Please Login First');
                    setShowPopup(true);
                }
            }
        }
    }

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden">
            
            {showPopup && 
                <Popup 
                    message={popupMessage} 
                    onClose={() => setShowPopup(false)}
                />
            }
            {/* bookmark buttons */}
            <button className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl" onClick={BookmarkMovie}> {isBookmarked ? <AiFillStar /> : <AiOutlineStar/>}</button>

            
            <div className='absolute bottom-0 w-full flex justify-between items-end p-3 z-20'>
                <h1 className='text-white text-xl font-semibold  break-normal break-words'>{movie.title || movie.name}</h1>

                {(movie.vote_average||0) > 7 ? <h1 className='font-bold text-green-500 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1> : (movie.vote_average||0) > 5.5 ? <h1 className='font-bold text-orange-400 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1> : <h1 className='font-bold text-red-600 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1>}
            </div>

            <Link to={`/moviedetail/${movie.id}`} className='h-full w-full shadow absolute z-10'></Link>

            <div>
                {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
                    <LazyLoadImage effect='blur' className='img object-cover' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
            </div>
        </motion.div>
    )
}

export default Moviecard
