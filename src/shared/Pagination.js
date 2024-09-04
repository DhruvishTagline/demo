
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handlePrevVisitedPage } from '../redux-toolkit/slices/user';
import BasicTable from './Tabel';

const Pagination = ({ data, viewPath, lastVisitedPage, btn, studentBtn }) => {
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState(lastVisitedPage || 1);
  const recordsPerPage = 9;
  const totalPage = Math.ceil(data?.length / recordsPerPage);
  const indexOfLastItem = currPage * recordsPerPage;
  const indexOfFirstItem = indexOfLastItem - recordsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [renderPageNumbers, setRenderPageNumbers] = useState([]);

  useEffect(() => {
    setCurrPage(1);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  },[data]);

  useEffect(() => {
    const pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }

    const renderPageNumbers = pages.map((number) => {
      if (totalPage <= 5 || (number > minPageNumberLimit && number <= maxPageNumberLimit)) {
        return (
          <li
            key={number}
            id={number}
            onClick={() => setCurrPage(number)}
            className={`cursor-pointer p-2 ${number === currPage ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-lg mx-1`}
          >
            {number}
          </li>
        );
      }
      return null;
    });

    const pageNumberList = () => {
      if (totalPage > 5) {
        const pageNumbers = [];

        if (currPage > 3) {
          pageNumbers.push(
            <li
              key={1} 
              className={`cursor-pointer p-2 ${currPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg mx-1`}
            >
              1
            </li>
          );
          pageNumbers.push(<li key="ellipsis1" className="p-2">...</li>);
        }

        pageNumbers.push(...renderPageNumbers);

        if (currPage < totalPage - 2) {
          pageNumbers.push(<li key="ellipsis2" className="p-2">...</li>);
          pageNumbers.push(
            <li
              key={ totalPage }
              className={`cursor-pointer p-2 ${currPage === totalPage ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg mx-1`}
            >
              { totalPage }
            </li>
          );
        }
        return pageNumbers;
      }
      return renderPageNumbers;
    };

    setRenderPageNumbers(pageNumberList());
  }, [currPage, maxPageNumberLimit, minPageNumberLimit, totalPage]);

  const handlePrevPage = () => {
    dispatch(handlePrevVisitedPage(currPage - 1));
    setCurrPage(currPage - 1);
    if ((currPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextPage = () => {
    dispatch(handlePrevVisitedPage(currPage + 1));
    setCurrPage(currPage + 1);
    if (currPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border-solid border-2">
      {data?.length === 0 ? (
        <p className='text-2xl text-red-400'>No data found ...</p>
      ) : (
        <div>
          <BasicTable data={currentItems} btn={btn} path={viewPath} studentBtn={studentBtn} />
          <div className='flex justify-between items-center mt-4'>
            <span className='text-gray-700'>{currPage} page of {totalPage}</span>
            {data?.length > recordsPerPage && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
