import React from 'react'
import './Userlist.css'

function Userlist() {
  return (
    <div className="body d-flex vh-100 justify-content-center align-items-center">
    <div className= "bg-white rounded p-2">
      <h2 className='d-flex justify-content-center align-items-center'>User List</h2>
      
      <table className="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Login Name</th>
            <th>Password</th>
            <th>Mobile</th>
            <th>Tel</th>
            <th>Address</th>
            <th>Email</th>
            <th>Billing Address</th>
            <th>Edit|Delete</th>
          </tr>
        </thead>
        <tbody>
          
            {/* return ( */}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {/* <Link to={`/read/${student.Id}`} className="btn btn-sm btn-info" >Read </Link> */}
                  <button className="btn btn-sm btn-primary"> Edit</button>&nbsp;
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            {/* ); */}

        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Userlist





//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:8000/')
//       .then(res => setData(res.data))
//       .catch(err => console.log(err));
//   }, [])

 
