import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';

function Upcoming() {

  const { loader, setPage, page, fetchUpcoming, upcoming, totalPage } = useContext(Contextpage);

  useEffect(() => {
    if (page > 0) {
      fetchUpcoming();
    }
  }, [page])


  return (
    <>
      <Helmet>
        <title>Movie Mania | Upcoming movies</title>
      </Helmet>

      <div className='w-full bg-bg-color md:p-10 mb-20 md:mb-0'>
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
                    dataLength={upcoming.length}
                    next={() => setPage(page + 1)}
                    hasMore={page < totalPage}
                    loader={<span className="loader m-10"></span>}
                    scrollThreshol={0.9}
                    style={{ overflow: 'hidden' }}
                  >

                    {upcoming.map((upc) => (
                      <Moviecard key={upc.id} movie={upc} />
                    ))}

                  </InfiniteScroll>

                </>
            }
          </AnimatePresence>
        </motion.div>

      </div>
    </>
  )
}

export default Upcoming