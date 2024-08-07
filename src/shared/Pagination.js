import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { handlePrevVisitedPage } from '../redux-toolkit/slices/user';
import BasicTable from './Tabel';

const Pagination = ({ data, viewPath, lastVisitedPage,btn ,studentBtn}) => {
  console.log("Pagination data",data);
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState(lastVisitedPage || 1);

  useEffect(() => {}, [])

  let recordsPerPage = 10;
  let totalPage = Math.ceil(data?.length / recordsPerPage);

  const indexOfLastItem = currPage * recordsPerPage;
  const indexOfFirstItem = indexOfLastItem - recordsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem - 1);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    setCurrPage(Number(e.target.id))
  }

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const renderPageNumbers = pages.map((number, index) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={index}
          id={number}
          onClick={handleClick}
          className={`cursor-pointer p-2 ${number === currPage ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-lg mx-1`}
        >
          {number}
        </li>
      );
    }
  });

  const handlePrevPage = () => {
    dispatch(handlePrevVisitedPage(currPage - 1))
    setCurrPage(currPage - 1);
    if ((currPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  const handleNextPage = () => {
    dispatch(handlePrevVisitedPage(currPage + 1));
    setCurrPage(currPage + 1);
    if (currPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">

    {
      data.length === 0 ?
      <div className='spinner mt-20 mx-auto'></div>:
      <div>
        <BasicTable data={currentItems} btn={btn} path={viewPath} studentBtn={studentBtn}/>
        <div className='flex justify-between items-center mt-4'>
          <span className='text-gray-700'>{currPage} page of {totalPage} </span>
          {
            data.length > recordsPerPage &&
            <ul className='flex items-center'>
              <button 
                disabled={currPage === 1}
                onClick={handlePrevPage}
                className={`bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-lg mr-2 ${currPage === 1 && 'cursor-not-allowed'}`}
              >
                Prev
              </button>
              {renderPageNumbers}
              <button 
                disabled={currPage === totalPage}
                onClick={handleNextPage}
                className={`bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-lg ml-2 ${currPage === totalPage && 'cursor-not-allowed'}`}
              >
                Next
              </button>
            </ul>
          }
        </div>
      </div>
      }
    </div>
  )
}

export default Pagination
