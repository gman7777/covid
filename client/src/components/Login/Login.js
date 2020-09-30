import React, {useState} from 'react';
import { Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

function Login({login, isAuthenticated}){

    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const{email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    //redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/homepage"/>;
    };

    return(
        <div>
            <h1 class='large text-primary'>Sign In</h1>
            <p class='lead'><i class='fas fa-user'></i> Sign into Your Account</p>
            <form onSubmit={e => onSubmit(e)} className='form'>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type='text' 
                        placeholder='Email id'
                        value={email}
                        name='email'
                        minLength='6'
                        onChange={e => onChange(e)}
                        required/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input 
                        type='password' 
                        placeholder='Password'
                        value={password}
                        name='password'
                        onChange={e => onChange(e)}
                        required/>
                </div>
                <input type='submit' className='btn btn-primary' value='Login'/>
            </form>
        </div>
    );
}

Login.propTypes = {
    login:PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {login})(Login);