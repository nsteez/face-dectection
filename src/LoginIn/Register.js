import React from 'react';


const Register = ({onPageChange}) => {
    return (
    <article className="br4 ba dark-gray b--black-60 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
    <main className="pa4 black-80">
    <form className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f2 fw6 ph0 mh0 center ">Register</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" for="name">Name</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-lightest-blue
            hover-white w-100 b--black-60" type="text" name="name"  id="name"/>

            <label className="db fw6 lh-copy f6" for="name">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-lightest-blue
            hover-white w-100 b--black-60" type="email" name="email"  id="email"/>
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" for="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-white
            w-100 b--black-60" type="password" name="password"  id="password"/>
        </div>

        </fieldset>
        <div className="">
        <input
          onClick={() => onPageChange('home')} //func definition
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Register"
        />
        </div>
    </form>
    </main>
    </article>

    )
}
export default Register ;