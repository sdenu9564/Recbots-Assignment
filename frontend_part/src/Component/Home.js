import React from 'react';
import '../../src/Home.css'
import axios from 'axios';
import validator from 'validator';
import {withRouter } from 'react-router-dom';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            email: '',
            Password: '',
            Confpassword: '',
            user_name: '',
            Phone :'',
            error : '',
        }
        this.handleRegister = this.handleRegister.bind(this);
    }
    
    

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }
    
    handleRegister =  async () => {
        const { email, Password, user_name, Confpassword ,Phone,error } = this.state;
        if(user_name ===''){
            this.setState({error : ' please enter a valid user name'})
            return;
        }
        if(!validator.isEmail(email)){
            this.setState({error : 'Invalid Email'})
            return;
        }
        if(Phone ==='' && !validator.isMobilePhone(Phone)){
            this.setState({error : ' please enter a valid Phone Number'})
            return;
        }
        if(!validator.isStrongPassword(Password)){
            this.setState({error :'Password must have a smallcase Uppercase and special character'});
           return;
        }
        if(Password === '' || Password !== Confpassword){
           this.setState({error :'password does not matched'});
           return;
        }
        
        const signUpObj = {
            email: email,
            password: Password,
            name : user_name,
            mobile : Phone 
            
        };
        await axios ({
            method: 'POST',
            url: 'http://localhost:8000/usersingup',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
        }).then(response => {
            console.log(response);
                if (response.data.user.length!==0) {
                    this.setState({
                        email: response.data.user.email,
                        user_name: response.data.user.name,
                    });
                    // console.log(this.state);
                    // alert(response.data.message);
                    if( response.status === 200){
                        window.location.href="http://localhost:3000/login";
                    }
                }
            })
            .catch(err => console.log(err))
    }
    render(){
        const {error} =this.state;
        return(
            <div>
                <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" htmlFor="firstName">User Name </label>
                  <input className="form__input" type="text" id="firstName" onChange={(event) => this.handleChange(event, 'user_name')}  placeholder="User Name"/>
              </div>
              <div className="email">
                  <label className="form__label" htmlFor="email">Email </label>
                  <input  type="email" id="email" className="form__input" onChange={(event) => this.handleChange(event, 'email')} placeholder="Email"/>
              </div>
              <div className="email">
                  <label className="form__label" htmlFor="mobile">Phone </label>
                  <input  type="tel" id="email" className="form__input" onChange={(event) => this.handleChange(event, 'Phone')} placeholder="Phone"/>
              </div>
              <div className="password">
                  <label className="form__label" htmlFor="password">Password </label>
                  <input className="form__input" type="password"  id="password" onChange={(event) => this.handleChange(event, 'Password')} placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" onChange={(event) => this.handleChange(event, 'Confpassword')} placeholder="Confirm Password"/>
              </div>
          </div>
          <div className='footer'>
              <button type="submit" className="btn" onClick={this.handleRegister}>Register</button>
          </div>
          <div className='footer'>
          <span className="text-danger">{error}</span>
          </div>
          <div>
          <a href='/login'>Already have an account ? Login</a>
          </div>
          </div>
            </div>
        )
    }
}
export default withRouter(Home);