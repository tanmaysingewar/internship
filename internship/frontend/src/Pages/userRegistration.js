import React,{useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { createUser } from '../helper/auth'

function UserRegistration() {
    const [values, setValues] = useState({
        firstName : '',
        lastName : '',
        email : '',
        phone : '',
        address : '',
        password : '',
        success : false
    })

    const [warning, setWarning] = useState('')

    const { firstName , lastName ,email, phone,address,password,success} = values

    const handleChange = (name) => event =>{
      setValues({...values,[name]:event.target.value})
    }


    function header() {
        return (
          <div style={{padding : 10}}>
            <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84454/preview.svg" alt={"Logo"} style={{height : 50, width : 50}} />
          </div>
        )
    }

    function bottonRightCorner(){
      return(
        <div>
            <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/38033/preview.svg" alt={"Logo"} style={{height : 30, width : 30, position: 'fixed',bottom: 0,right: 0, padding : 20}} />
          </div>
      )
    }    

      function loginForm(){
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
          }}>
            <h2 style={{textAlign : 'center' ,fontFamily :'Poppins, sans-serif', fontWeight : 1000 , fontSize : 32, color : "#fff"}}>Admin Login</h2>
            <p style={{textAlign : 'center' ,fontFamily :'Poppins, sans-serif', fontWeight : 1000 , fontSize : 15, color : 'red'}}>{warning}</p>
            <div style={{padding : 30}}>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input placeholder='First Name' style={inputStyles} onChange={handleChange('firstName')} value={firstName} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input placeholder='Last Name' style={inputStyles} onChange={handleChange('lastName')} value={lastName} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input type={'email'} placeholder='Emial' style={inputStyles} onChange={handleChange('email')} value={email} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input placeholder='Phone' style={inputStyles} onChange={handleChange('phone')} value={phone} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input placeholder='Address' style={inputStyles} onChange={handleChange('address')} value={address} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input type='password' placeholder='Password' style={inputStyles} onChange={handleChange('password')} value={password} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center'}}>
                <button  type="submit" style={{backgroundColor : 'black', color : '#fff', border  :'none', padding: '8px 30px', borderRadius : 20, outline  : 'none', cursor : 'pointer' }} onClick={onSubmit}>Submit</button>
              </div>
              <div>
                <Link to={'/login'}>
                  <p style={{color : "#fff", textDecoration : "none",textAlign : "center"}}>Login as User</p>
                </Link>
                
              </div>
            </div>
          </div>
        )
      }

      async function onSubmit () {
        if(!firstName ||!lastName ||!email || !phone || !address ||!password ) 
        return setWarning("Enter all details")

        // call to server get success in return
        await createUser({ firstName , lastName ,email, phone,address,password})
        .then((data) => {
          if(!data.success){ 
            setWarning("Server rejected the request")
            return setValues({ firstName : "" , lastName : "" ,email : "", phone : "",address : "",password : "", success:false})
          }
          return setValues({...values, success:true})
        })
        .catch(e => {
          console.log(e)
        })
        
      }
      const performRedirect = ()=>{
        if (success) {
          return <Navigate to='/login' />
        }
    }
    
      return (
          <div style={{backgroundColor : "#3AAFA9" , bottom : 0 , height : "100vh", margin : 0}}>
            {header()}
            {loginForm()}
            {bottonRightCorner()}
            {performRedirect()}
          </div>
      )
    }
    
    const inputStyles ={
      width  : 250,
      paddingLeft : 20,
      paddingRight : 20,
      paddingTop : 8,
      paddingBottom : 8,
      borderRadius : 20,
      outline : 'none',
      borderColor : 'gray',
      border: '1px solid #ccc',
      fontSize : 14
    }

export default UserRegistration

