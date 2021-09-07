import React, {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link as Nv } from '@material-ui/core'
import { Link, NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import AuthDataService from "./services/auth.service";

const Login=()=>{
 
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const btnStyle={margin:'8px 0'}
     
    const [msg,setMsg] = useState('');
 
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
 
    const [user, setUser] = useState({
        email: "",
        password:""
      });
 
      let history = useHistory(); 
 
      const {email,password} = user;
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
 
    const signIn = () =>
    { 
    //   const users = { username };  // To Store Email in Localstore and send to Home Page 
 
       if(user.email === '')
       {
         alert('Email Field is empty')
       }
       else if(user.password === '')
       {
         alert('Pass Field is empty')
       }
 
       AuthDataService.login(user)
       .then(response => {

            if(response.status === 200){
                setMsg("Your logged In");
                localStorage.setItem("users", response.data.user);
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("accessToken", response.data.user.access_token);
                history.push("/users");
            }

            console.log(response.data.user);
      })
      .catch(e => {
        console.log(e);
      });
    }
 
    
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign In</h2>
                    <h4 style={{color:"green"}}>{msg}</h4>
                </Grid>
                <TextField label='Email'  name="email" value={email}  onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required/>
                <TextField label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='password' fullWidth required/>
              
                <Button type='submit' onClick={signIn} color='primary' variant="contained" style={btnStyle} fullWidth>Sign in</Button>
              
                <Typography > Don't Have Account ?
                  <NavLink to="Signup">
                   <span style={{marginLeft:"4px"}}>Singup</span>
                  </NavLink>
                </Typography>
            </Paper>
        </Grid>
    )
}
 
export default Login