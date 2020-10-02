import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'; 
import './Signup.css';
function Signup({setAlert, register, isAuthenticated}){

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const{name , email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('password do not match', 'danger');
        }
        else{
          register({name, email, password});
        }
    };

    if(isAuthenticated){
        return <Redirect to='/homepage'/>;
    }

    return(
        <div>
            <h1 class='large text-primary'>Sign Up</h1>
            <p class='lead'><i class='fas fa-user'></i> Create Your Account</p>
            <form onSubmit={e => onSubmit(e)} className='form'>
                <div className='form-group'>
                    <label>Name</label>
                    <input 
                        type='text' 
                        placeholder='Name'
                        value={name}
                        name='name'
                        onChange={e => onChange(e)}
                        required/>
                </div>
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
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input 
                        type='password' 
                        placeholder='Confirm Password'
                        value={password2}
                        name='password2'
                        onChange={e => onChange(e)}
                        required/>
                </div>
                <input type='submit' className='btn btn-primary' value='Register'/>
            </form>
        </div>
    );
}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Signup);