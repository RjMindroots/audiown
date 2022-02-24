import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getHomeRouteForLoggedInUser, isUserLoggedIn, isUserLoggedInToken } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { useForm } from 'react-hook-form'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

import { handleLogin } from '@store/actions/auth'
import axios from 'axios'
import {base_url} from '../config'
import { AbilityContext } from '@src/utility/context/Can'

const Login = () => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const illustration = skin === 'dark' ? 'logo.svg' : 'logo.svg',
  source = require(`@src/assets/images/logo/${illustration}`).default


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()
  const onSubmit = data => {
    axios.post(`${base_url}/login`, { email, password })
     .then(response => {
       ability.update([
        {
            "action": "manage",
            "subject": "all"
        }
    ])
      localStorage.setItem("token", response.data.body.token)
      dispatch(handleLogin(response.data))
      window.location = "/dashboard"
      
    })
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img className='img-fluid maxWidth40' src={source} alt='Login V2' />
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome to Audiown!
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account</CardText>
            <Form className='auth-login-form mt-2 pb-3'  onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='email'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <Button.Ripple type='submit' className="mt-2" color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
