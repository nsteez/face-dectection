import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: "post",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name})
        })
        // console.log(this.state);
        .then(response => response.json())
        .then(user => {
            if (user) {
                this.props.loadUserData(user)
                this.props.onPageChange('home')
            }
        })
    }

   render(){

    return (
    <article className="br4 ba dark-gray b--black-60 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
    <main className="pa4 black-80">
        <div className='measure' >

        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f2 fw6 ph0 mh0 center ">Register</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" for="name">Name</label>
            <input
            className="pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-black w-100 b--black-60"
            type="text" name="name"  id="name"
            onChange={this.onNameChange}

            />
            <label className="db fw6 lh-copy f6" for="name">Email</label>
            <input
            className="pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-black w-100 b--black-60"
            type="email" name="email"  id="email"
            onChange={this.onEmailChange}

            />
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" for="password">Password</label>
            <input
            className="b pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-black w-100 b--black-60"
              type="password" name="password"  id="password"
              onChange={this.onPasswordChange}

              />
        </div>

        </fieldset>
        <div className="">
        <input
          onClick={this.onSubmitRegister}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="register"
        />
        </div>
        </div>
    {/* </form> */}
    </main>
    </article>
    )
}
}
export default Register;