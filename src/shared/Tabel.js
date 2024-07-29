import * as React from 'react';

import { capitalizeFirstChar, objectKeys } from '../utils/functions';
import { NavLink } from 'react-router-dom';

export default function BasicTable(props) {
  const { data: list2, path } = props;
  const keyss = Object.keys(list2[0] || {});
  

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="w-full bg-gray-100">
            <th className="text-center py-3 px-4 border-b">Sr No</th>
            {
              keyss?.map((item, index) => {
                if (item !== '_id' && item !== '__v')
                  return <th className="text-center py-3 px-4 border-b" key={index}>{capitalizeFirstChar(item)}</th>
              })
            }
            {
              path === undefined ? '' :
                <th className="text-center py-3 px-4 border-b">Action</th>
            }
          </tr>
        </thead>
        <tbody>
          {
            list2?.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="text-center py-3 px-4 border-b">{index + 1}</td>
                {
                  keyss?.map((item, idx) => {
                    if (item !== '_id' && item !== '__v')
                      return <td className="text-center py-3 px-4 border-b" key={idx}>{row[item]}</td>
                  })
                }
                {
                  path === undefined ? '' :
                    <td className="text-center py-3 px-4 border-b text-blue-500">
                      <NavLink to={`${path}?id=${row._id}`}>
                        View
                      </NavLink>
                    </td>
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
