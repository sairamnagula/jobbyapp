import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorStatus: false,
  }

  callForHome = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  errorMessageRendering = error => {
    this.setState({errorMsg: error})
    this.setState({errorStatus: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.callForHome(data.jwt_token)
    } else {
      this.errorMessageRendering(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderFormDetails = () => (
    <>
      <label htmlFor="username" className="input-label">
        USERNAME
      </label>
      <input
        type="text"
        placeholder="Username"
        id="username"
        className="input-text"
        onChange={this.onChangeUserName}
      />
      <label htmlFor="password" className="input-label">
        PASSWORD
      </label>
      <input
        type="text"
        placeholder="Password"
        id="password"
        className="input-text"
        onChange={this.onChangePassword}
      />
    </>
  )

  render() {
    const {errorMsg, errorStatus} = this.state
    console.log(errorMsg)
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-container">{this.renderFormDetails()}</div>
          <button className="login-button" type="submit">
            Login
          </button>
          {errorStatus && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute
