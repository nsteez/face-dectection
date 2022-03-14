import React from 'react';

// adding state of email and password
//const Signin = ({onPageChange}) => {
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: "post",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({email:this.state.signInEmail, password:this.state.signInPassword})
        })
        // console.log(this.state);
        .then(response => response.json())
        .then(data=> {
            if (data === 'success') {
                this.props.onPageChange('home')

            }
        })

    }
    render(){
        const {onPageChange} = this.props
    return (
    <article className="br4 ba dark-gray b--black-60 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
    <main className="pa4 black-80">
    <form className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f2 fw6 ph0 mh0 center ">Sign In</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
                className="pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-black w-100 b--black-60"
                type="email" name="email-address"  id="email-address"
                onChange={this.onEmailChange}
                />
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
                className="b pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-black w-100 b--black-60"
                type="password" name="password"  id="password"
                onChange={this.onPasswordChange}
                />
        </div>

        </fieldset>
        <div className="">
        <input
            onClick={this.onSubmitSignIn}
            // onClick={() => onPageChange('home')} //func definition
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
        />
        </div>
        <div className="lh-copy mt3">
            <p onClick={()=>onPageChange("register")} className="f6 link dim black db pointer">Register</p>
        {/* <a href="#0" className="f6 link dim black db">Register</a>
        <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
        </div>
    </form>
    </main>
    </article>

        );
    }

}
export default Signin;