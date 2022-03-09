import React from 'react';


const Signin = ({onPageChange}) => {
    return (
    <article className="br4 ba dark-gray b--black-60 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
    <main className="pa4 black-80">
    <form className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f2 fw6 ph0 mh0 center ">Sign In</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-white w-100 b--black-60" type="email" name="email-address"  id="email-address"/>
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-lightest-blue hover-white w-100 b--black-60" type="password" name="password"  id="password"/>
        </div>

        </fieldset>
        <div className="">
        <input
          onClick={() => onPageChange('home')} //func definition
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

    )
}
export default Signin ;