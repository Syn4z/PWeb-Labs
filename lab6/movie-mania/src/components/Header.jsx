import React, { useContext } from 'react'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";

function Header() {

  const context = useContext(Contextpage);

  return (
    <>
      <header className={`flex  items-center ${context.backgenre ? 'justify-center gap-10 md:justify-between' : 'justify-center'} text-3xl md:text-4xl font-bold text-page-text-color py-3 px-5 md:px-10`}>

        {context.backgenre ?
          <a href='/' className='bg-gray-600 text-white p-2 rounded-full text-xl md:text-2xl'>
            <HiChevronLeft />
          </a>
          : null}

        {context.header}
      </header>

    </>
  )
}

export default Header