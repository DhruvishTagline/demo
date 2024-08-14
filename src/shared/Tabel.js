import * as React from 'react';

import { capitalizeFirstChar } from '../utils/functions';
import { NavLink } from 'react-router-dom';

export default function BasicTable(props) {
  const { data: list2, path ,btn,studentBtn} = props;

  const keys = Object.keys(list2[0] || {});

  return (
    <div className=" w-full">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="w-full bg-gray-100">
            <th className="text-center py-3 px-4 border-b">Sr No</th>
            {
              
              keys?.map((item, index) => {
                if (item !== '_id' && item !== '__v' && item !=='studentAnswer' && item !== 'studentId' )
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
                    keys?.map((item, idx) => { 
                      
                      if (item !== '_id' && item !== '__v'  && item !=='studentAnswer' && item !== 'studentId' && item !== 'Result'  )
                        return <td className="text-center py-3 px-4 border-b" key={idx}>{row[item]}</td>
                    })
                  }
                  {
                    path !== '/teacher/view-student-detail' ? '' :
                      <td className="text-center py-3 px-4 border-b text-blue-500">
                        <NavLink to={`${path}?id=${row._id}`}>
                          View
                        </NavLink>
                      </td>
                  }
                  {
                    btn && <td className="text-center py-3 px-4 border-b text-blue-500">
                      <NavLink to={`/teacher/edit-exam?id=${row._id}&subjectName=${row.subjectName}`} replace style={{marginRight:'10px'}}>Edit</NavLink>
                    </td>
                  }   
                  {
                    studentBtn  && <td className='className="text-center py-3 px-4 border-b text-blue-500"'>
                      <NavLink to={`/student/give-exam?id=${row._id}&subjectName=${row.subjectName}`} style={{marginRight:'10px'}}>GiveExam</NavLink>
                      {/* <NavLink to={`/teacher/dashboard`}>Show</NavLink> */}
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

