import React,{useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { authincate, loginUser } from '../helper/auth'

function UserLogin() {
    const [values, setValues] = useState({
      email : '',
      password : '',
      success : false
    })

    const [warning, setWarning] = useState('')

    const { email , password  ,success} = values

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
            bottom: 150,
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
                <input placeholder='Email' style={inputStyles} onChange={handleChange('email')} value={email} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input type='password' placeholder='Password' style={inputStyles} onChange={handleChange('password')} value={password} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center'}}>
                <button  type="submit" style={{backgroundColor : 'black', color : '#fff', border  :'none', padding: '8px 30px', borderRadius : 20, outline  : 'none', cursor : 'pointer' }} onClick={onSubmit}>Submit</button>
              </div>
              <div>
                <Link to={'/create'}>
                  <p style={{color : "#fff", textDecoration : "none",textAlign : "center"}}>Create new account</p>
                </Link>
                
              </div>
            </div>
          </div>
        )
      }

      async function onSubmit () {
        if(password === '' || email === '') return setWarning("Enter email and password")
        await loginUser({email, password})
        .then((data) => {
          if(!data){
            setWarning("Email and user dosent match")
            return setValues({ email : "",password :"", success:false})
          }
          authincate(data)
          return  setValues({...values, success:true}) 
        })  
        .catch(e => {
          console.log(e)
        })
        
      }
      const performRedirect = ()=>{
        if (success) {
          return <Navigate to='/' />
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

export default UserLogin
