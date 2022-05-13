import React from 'react';
import '../../src/Home.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class Login extends React.Component{
    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    userlogin =  async () => {
        const { email, password } = this.state;
        const signUpObj = {
            email: email,
            password: password,
            
        };
        axios({
            method: 'POST',
            url: 'http://localhost:8000/userlogin',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
        })
            .then( response => {
                if (response.data.message === 'loggedIn') {
                    const result = response.data.user[0];
                    console.log(result);
                    const plan=result.plan;
                    const user_name = result.user_name;
                    const token = response.data.data;
                    console.log(user_name);
                    window.sessionStorage.setItem("isloggedIn",true);
                    window.sessionStorage.setItem("email",email);
                    window.sessionStorage.setItem("user_name",user_name);
                    window.location.href=`http://localhost:3000/dashboard/?plan=${plan}`;
                    window.localStorage.setItem('token',token);
                }
            })
            .catch(err => console.log(err))
    }
    render(){
        
        return(
            <div>
                <div className="form">
          <div className="form-body">
              <div className="email">
                  <label className="form__label" htmlFor="email">Email </label>
                  <input  type="email" id="email" className="form__input"  onChange={(event) => this.handleChange(event, 'email')} placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" htmlFor="password">Password </label>
                  <input className="form__input" type="password"  id="password"  onChange={(event) => this.handleChange(event, 'password')} placeholder="Password"/>
              </div>
          </div>
          <div className="footer">
              <button type="submit" onClick={this.userlogin} class="btn">Login</button>
          </div>
          <div>
          <a href='/'>Dont have an account ? Register</a>
          </div>
          </div>
            </div>
        )
    }
}
export default withRouter(Login);