import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';


function Searchbar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
      if (typingTimeout) {
          clearTimeout(typingTimeout);
      }

      const newTimeout = setTimeout(() => {
          onKeyUp(value);
      }, 500); 

      setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    if (query !== "") {
        query = query.trim();

      if (query === "") {
        navigate("/");
      } else {
        navigate(`/search/${slugify(query)}`)
      }
    }
  };

  return (
    <>
    <Helmet>
        <title>Movie Mania</title>
    </Helmet>

    <div className="w-full bg-gradient-to-r from-search-bar-bg1 to-search-bar-bg2 h-[10rem] md:h-[12rem]">
      <div className='h-full w-full  flex justify-center items-center'>
        <input
          type="search"
          name="searchpanel"
          id="searchpanel"
          placeholder='Search Movie'
          className='p-3 w-full mx-10 md:w-[40rem]  rounded-xl outline-none'
          onKeyUp={(e) => handleSearch()}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ backgroundColor: '#F2F1EB' }}
        />
      </div>
      </div>
      </>
  )
}

export default Searchbar