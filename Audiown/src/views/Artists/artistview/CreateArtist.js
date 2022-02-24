// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { isUserLoggedInToken } from '@utils'

import {postMehodWithBody} from '../../../commonapi'

import {imagedata} from './imagedata'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label
} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'

const CreateArtist = () => {
  document.title = "Audiown | Create Artist"
  const history = useHistory()

  const [name, setName] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [email, setEmail] = useState('')
  const [artist_id, setArtist_id] = useState("")
  const [image, setImage] = useState("")
  const [social_media_url, setSocial_media_url] = useState("")
  const [group_message, setGroupMessage] = useState('')
  const [visible, setVisible] = useState(true)
  const [messageColor, setMessageColor] = useState('primary')
  const [saveAndClose, setSaveAndClose] = useState(false)

  const dataMain = {token : isUserLoggedInToken(), artist_id, name, phone_number, email, image, social_media_url} 
 
  //in progress
  const artistImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
        const artistImageStr = reader.result
            setImage(artistImageStr)
    }
    reader.readAsDataURL(file)
}

  const createArtistHandle = async (props) => {
    const response = await postMehodWithBody({  hiturl : /createupdateartist/, dataMain })
    if (response.status === true) {
      setGroupMessage(response.message)
      setVisible(true)
      setMessageColor('primary')
      setSaveAndClose(props)
      history.push('/artist')
    } else if (response.responseCode === 500) {
      setGroupMessage('Please Fill all details')
      setMessageColor('danger')
    } else {
      setGroupMessage(response.message)
      setVisible(true)
      setMessageColor('danger')
    }
  }

  useEffect(() => {
    
  }, [createArtistHandle])


  return (
    <Fragment>

      {group_message &&
        <Alert color={messageColor} isOpen={visible} toggle={() => setVisible(false)}>
          <div className='alert-body'>
            <span className='font-weight-bold'>{group_message}</span>
          </div>
        </Alert>
      }

      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Create Artist</CardTitle>
            </CardHeader>

            <CardBody>
              <Col sm="5">
                <Form>
                  <Row>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='name'>Artist Name</Label>
                          <Input
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Artist Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='phone_number'>Phone Number</Label>
                          <Input
                            type='number'
                            name='phone_number'
                            id='phone_number'
                            placeholder='Phone Number'
                            value={phone_number}
                            onChange={e => setPhone_number(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='email'>Email</Label>
                          <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Artist Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm='12'>
                        <FormGroup>
                          <Label for='social_media_url'>Social Media Url</Label>
                          <Input
                            type='social_media_url'
                            name='social_media_url'
                            id='social_media_url'
                            placeholder='Social Media Url'
                            value={social_media_url}
                            onChange={e => setSocial_media_url(e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm='12'>
                        <FormGroup>
                            <Label for='image'>image</Label>
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                className="fileImage form-control-file"
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => { artistImage(e) }}
                            />
                          </FormGroup>
                      </Col>


                    <Col sm='12'>
                      <FormGroup className='d-flex mb-0'>
                        <Button.Ripple className='mrMin' color='primary' type='submit'
                          onClick=
                          {(e) => {
                            e.preventDefault()
                            createArtistHandle("false")
                          }
                          }>
                          Save
                        </Button.Ripple>
                        <Link to='/artist' className='mrMin waves-effect btn btn-danger' color='danger'>
                          Close
                        </Link>

                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}
export default CreateArtist
