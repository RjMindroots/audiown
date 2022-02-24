import { useState, useEffect } from 'react'
import { isUserLoggedInToken } from '@utils'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardHeader, CardTitle, CardBody, Button, Form, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap'
import { getDataApiForUpdate, postMehodWithBody } from '../../../commonapi'
import { Link } from 'react-router-dom'


const updateArtist = ({ match }) => {

  const [data, setData] = useState({ token : isUserLoggedInToken()})
  const [image, setImage] = useState()

  const projectSchema = yup.object().shape({
    name: yup.string().min(3).required()
  })
  const { register, errors, control, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(projectSchema) })

  const onSubmit = async () => {
    data.image = image
    const response = await postMehodWithBody({  hiturl : /createupdateartist/, dataMain:data })
    console.log(response)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDataApiForUpdate({ hiturl: `/getartist`, id: match.params.id })
      const artistData = res.artist
      artistData.token = isUserLoggedInToken()
      setData(artistData)
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  //Image Uploader 
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

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Artist</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <Label for='name'>Artist Name</Label>
                <Input
                  id='name'
                  name='name'
                  value={data.name}
                  innerRef={register({ required: true })}
                  invalid={errors.name && true}
                  placeholder='Artist Name'
                  onChange={(e) => { handleChange(e) }}
                />
                {errors && errors.name && <FormFeedback>Please type Artist name</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='phone_number'>Phone Number</Label>
                <Input
                  id='phone_number'
                  name='phone_number'
                  value={data.phone_number}
                  innerRef={register({ required: true })}
                  invalid={errors.phone_number && true}
                  placeholder='Phone Number'
                  onChange={(e) => { handleChange(e) }}
                />
                {errors && errors.phone_number && <FormFeedback>Please type Phone Number</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  value={data.email}
                  innerRef={register({ required: true })}
                  invalid={errors.email && true}
                  placeholder='Email'
                  onChange={(e) => { handleChange(e) }}
                />
                {errors && errors.email && <FormFeedback>Please type Email</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='social_media_url'>Social Media Url</Label>
                <Input
                  id='social_media_url'
                  name='social_media_url'
                  value={data.social_media_url}
                  innerRef={register({ required: true })}
                  invalid={errors.social_media_url && true}
                  placeholder='Social Media Url'
                  onChange={(e) => { handleChange(e) }}
                />
                {errors && errors.social_media_url && <FormFeedback>Please type Social Media Url</FormFeedback>}
              </FormGroup>
            </Col>
            {!data.image && 
              <Col sm='6'>
                <FormGroup>
                  <Label for='image'>Featured Image</Label>
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
            } 

            
              {data.image && 
              <>
              <Col sm='6'>
                  <Label for='image'>Featured Image</Label>
                <FormGroup>
                  <img className="updateImage" src={data.image}/>
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    className="fileImage form-control-file updateProfile"
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => { artistImage(e) }}
                    />
                </FormGroup>
              </Col>
              </>
              }
            

          </Row>

          <hr className='my-3' />

          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit'>
              Submit
            </Button.Ripple>
            <Link to='/artist' className='mrMin waves-effect btn btn-danger' color='danger'>
              Close
            </Link>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}

export default updateArtist
