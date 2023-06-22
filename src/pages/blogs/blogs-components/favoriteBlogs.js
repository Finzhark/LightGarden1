import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FcLike } from "react-icons/fc"
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import '../../../components/ContainForm.scss'

function FavoriteBlogs ({
    index = "",
    title = "",
    author = "",
    total_fav = "",
    likes_length = "",
    title_length = null,
    category = "",    
}) {
  return (
    <div className='w-2/3 sm:w-1/3 md:w-1/5 p-4'>
      <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
        <p className="text-gray-600">
            <div className="badge badge-outline rounded-md">
                {category}
            </div>    
        </p>
        <div className="flex-grow"></div>
        <h1 className="text-lg font-medium mt-2">{title_length > 15 ? `${title.slice(0, 15)}...` : title}</h1>
        <p className="text-gray-600 mt-1">by {author}</p>
        <div className="flex items-baseline gap-2">
          <FcLike className="text-red-500" />
          <p className="text-gray-600 mr-2">{total_fav}</p>
        </div>
        {/* <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Read more
        </button> */}
      </div>
    </div>
  );
};

function RenderFavoriteBlogs({ favorites = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + 5 >= favorites.length;

  return (
    <div className="mt-4 w-full">
      <h2 className="flex justify-center items-center text-2xl font-bold mb-4 ">
        Top 10 Most Favorite Articles
      </h2>
      <div className="flex">
        <div className="flex justify-center items-center mt-4 space-x-2 mx-4">
          <button
            className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full ${
              isPrevDisabled ? 'bg-gray-500 cursor-not-allowed' : ''
            }`}
            onClick={handlePrevSlide}
            disabled={isPrevDisabled}
          >
            <GrLinkPrevious />
          </button>
        </div>
        <div className="backdrop-blur-sm bg-slate-200 shadow-md rounded-lg max-w-screen-2xl mx-auto w-full my-4 ">
          <div className="flex flex-wrap justify-around favorite-blogs-container">
            {favorites
              .filter((favorite, index)=>index<10)
              .slice((currentIndex, currentIndex + 5))
              .map((favorite, index) => (
                <FavoriteBlogs
                  key={favorite.id}
                  index={index}
                  author={favorite.User.username}
                  title={favorite.title}
                  total_fav={favorite.total_fav}
                  likes_length={favorite.Likes.length}
                  category={favorite.Category.name}
                  title_length={favorite.title.length}
                />
              ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 space-x-2 mx-4">
          <button
            className={`flex items-center justify-center ml-auto bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full ${
              isNextDisabled ? 'bg-gray-500 cursor-not-allowed' : ''
            }`}
            onClick={handleNextSlide}
            disabled={isNextDisabled}
          >
            <GrLinkNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenderFavoriteBlogs;


// keterangan: maaf karena tidak mudah dibaca