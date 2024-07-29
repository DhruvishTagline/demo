import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DropDown = ({ dropDownOptions, name, updateData }) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.user.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ name, value }));
  };

  return (
    <div className="w-full px-2.5 mt-5 gap-[10px]">
      <FormControl fullWidth>
        <InputLabel id={`${name}-select-label`}>{name.charAt(0).toUpperCase() + name.slice(1)}</InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={name}
          name={name}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          onChange={handleChange}
        >
          {dropDownOptions.map((option, i) => (
            <MenuItem value={option} key={i}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {error?.role && <span className="text-red-500 text-sm">{error.role}</span>}
    </div>
  );
};

export default DropDown;
