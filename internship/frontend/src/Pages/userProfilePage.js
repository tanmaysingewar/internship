import React,{useState,useEffect} from 'react'
import { getUser, isAuthincated } from '../helper/auth'

function UserProfilePage() {
    const [user, setuser] = useState({
        firstName : '',
        lastName : '',
        email : '',
        phone : '',
        address : ''
    })

    const {firstName,lastName ,email,phone,address} = user

    useEffect(() => {
        const {token} = isAuthincated()
        getUser(token)
        .then(data => {
            const {firstName,lastName ,email,phone,address} = data.user
            setuser({
                firstName ,
                lastName,
                email,
                phone,
                address
            })
        })
    }, [])
    function userForm(){
        return(
          <div style={{
            display: 'inline-block',
            position: 'fixed',
            top: 0,
            bottom: 400,
            left: 0,
            right: 0,
            width: '500px',
            height: '200px',
            margin: 'auto',
            backgroundColor : "#3AAFA9" 
          }}>
              <div style={{textAlign : "center"}}>
              <h2 style={{textAlign : 'center' ,fontFamily :'Poppins, sans-serif', fontWeight : 1000 , fontSize : 32}}>User info</h2>
                <table style={{margin : "auto", textAlign : "left"}}>
                    <tr>
                        <td>
                            <p>Name</p>
                        </td>
                        <td>
                            <p>{`${firstName} ${lastName}`}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Email</p>
                        </td>
                        <td>
                            <p>{email}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Phone</p>
                        </td>
                        <td>
                            <p>{phone}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Address</p>
                        </td>
                        <td>
                            <p>{address}</p>
                        </td>
                    </tr>
                </table>
              </div>
           
          </div>
        )
      }
    return (
        <div style={{backgroundColor : "#3AAFA9" , bottom : 0 , height : "100vh", margin : 0}}>
            {userForm()}
        </div>
    )
}

export default UserProfilePage
