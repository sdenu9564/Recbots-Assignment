import React from 'react';
import axios from 'axios';
import querystring from 'query-string';
class Dashboard extends React.Component{
    constructor(){
        super();
        this.state={
            plan:'',
            name :'',
            previos_plan:''
        }
    }
    componentDidMount(){
        const qs=querystring.parse(this.props.location.search);
        const previos_plan=qs.plan;
        this.setState({
            previos_plan : previos_plan
        })
        const user_name = sessionStorage.getItem("user_name");
        console.log(user_name);
        this.setState({
            name :user_name
        })
        if(previos_plan!=="Platinum"){
        const array = ["Silver","Gold","Diamond","Platinum"];
        let new_plan ;
        for (let index = 0; index < array.length; index++) {
            if(array[index]==previos_plan){
            new_plan= array[index+1];
         }   
        }
        this.setState({
            plan : new_plan
        })
        }
    }
    handleBack =()=>{
        window.location.href="http://localhost:3000/login";
    }
    handleUpgrade = ()=>{
        const {plan,previos_plan} =this.state;
        const  email = sessionStorage.getItem("email");
       const token =localStorage.getItem("token");
       if(previos_plan!=="Platinum"){
        const array = ["Silver","Gold","Diamond","Platinum"];
        let new_plan ;
        for (let index = 0; index < array.length; index++) {
            if(array[index]==previos_plan){
            new_plan= array[index+1];
         }   
        }
        this.setState({
            plan : new_plan
        })
        }
       console.log(token);
        const data={
            email:email,
            plan : plan,
            token:token
        }
        axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: 'http://localhost:8000/upgradeplan',
            data: data
        }).then(response=>{
            this.setState({
                previos_plan:response.data.plan,
            })
            window.location.href="http://localhost:3000/login";
        }).catch(err=>console.log(err))
        


    }
    handlelogout=()=>{
        
    }
    render(){
        const {plan,name,previos_plan}= this.state;
        return(
            <div>
                <div className="form">
                <div className="form-body">
                    <div>
                        <span>{name}</span>
                    </div>
                    <div>
                      <h3>Now are now in  {previos_plan}</h3>
                      {previos_plan!="Platinum"?<span>Would you like to update your plan to {plan}?</span>:null}
                      
                      <span></span>
                    </div>
                <div className='footer'>
                    {previos_plan!="Platinum"? <button type="submit" className="btn" onClick={this.handleUpgrade}>Upgrade Your plan </button>: <button type="submit" className="btn" onClick={this.handleBack}>Back to Login</button>}
                   
                </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;