import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { baseUrl } from 'repositories/Repository';
import axios from "axios";
import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            successfullLogin:''
        };        
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this) 
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }
   
    handleLoginSubmit (e) {       
        //console.log(this.state.email);       
       // this.props.dispatch(login());
       console.log("41");
        this.loadData();  
        console.log("43");
                           
    };

    async loadData() {      
        const headers={'Content-Type':'application/json' };    
        
       // alert (this.state.email+ " "+this.state.password);  

        const body={ "email":this.state.email, "password":this.state.password };    
        
        const gatResponse=await axios.post(`${baseUrl}/tokenweb/login`,body,{headers})
        .then((response) => {  
            var jr=response.data;          
            axios.defaults.headers.common['Authorization'] =`Bearer `+jr['AccessToken']; 
            axios.defaults.headers.common['GNUser'] ='registered';   
                        
            return true; //return anything other than false or 0
        })        
        this.setState({            
            data: gatResponse
        });               
    }

    render() {
        if (this.state.data) {            
            this.props.dispatch(login());
            Router.push('/');             
            return ('');                            
        }  
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        >
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Username or email address"
                                            value={this.state.email} 
                                            onChange={(e) => this.setState({email:e.target.value})}                                        
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            value={this.state.password} 
                                            onChange={(e) => this.setState({password:base64_encode(e.target.value)})}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                        <label htmlFor="remember-me">
                                            Rememeber me
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        onClick={(e)=>this.handleLoginSubmit(e)}
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a
                                            className="facebook"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="google"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="twitter"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="instagram"
                                            href="#"
                                            onClick={e =>
                                                this.handleFeatureWillUpdate(e)
                                            }>
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);
