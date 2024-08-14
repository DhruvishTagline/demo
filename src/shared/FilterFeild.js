import React from 'react'
import { updateSearchQuery } from '../redux-toolkit/slices/teacher'
import { useDispatch } from 'react-redux'

const FilterFeild = ({searchQuery}) => {
    const dispatch = useDispatch()
  return (
    <input
        type="text"
        placeholder="Search here..."
        value={searchQuery}
        onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded mb-6 h-12 text-xl"
    />
  )
}

export default FilterFeild