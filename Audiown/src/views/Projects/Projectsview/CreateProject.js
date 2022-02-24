import { useState, useEffect, Fragment } from 'react'
import { selectThemeColors, isUserLoggedInToken } from '@utils'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardHeader, CardTitle, CardBody, Button, Form, FormGroup, Label, Input, FormFeedback, Row, Col, Alert } from 'reactstrap'
import Select from 'react-select'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { X, Plus } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {postMehodWithBody, getDataApi} from '../../../commonapi'
import moment from 'moment'

import '@styles/react/libs/flatpickr/flatpickr.scss'

const project_type = [
  { value: '0', label: 'Song' },
  { value: '1', label: 'Album' }
]

const social_media_link = [{ id: uuidv4(), key: '', value: '' }]
const streaming = [{ id: uuidv4(), key: '', value: '' }]

const CreateProject = () => {
  const history = useHistory()
  const [group_message, setGroupMessage] = useState('')
  const [visible, setVisible] = useState(true)
  const [messageColor, setMessageColor] = useState('primary')
  const [data, setData] = useState(null)
  const [allArtist, setAllArtist] = useState()
  const [featured_image, setFeatured_image] = useState("")
  const [social_media_links, setSocial_media_links] = useState(social_media_link)
  const [streaming_metrics, setStreaming_metrics] = useState(streaming)
  const [release_date, setRelease_date] = useState(new Date())
  const [publicDate, setPublicDate] = useState(new Date())
 
  // Social Media 
  const handleChangeInput = (id, event) => {
    const newsocial_media_links = social_media_links.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })
    setSocial_media_links(newsocial_media_links)
  }
  const handleAddFields = () => {
    setSocial_media_links([...social_media_links, { id: uuidv4(), key: '', value: '' }])
  }
  const handleRemoveFields = id => {
    const values = [...social_media_links]
    values.splice(values.findIndex(value => value.id === id), 1)
    setSocial_media_links(values)
  }
// Streming matric
  const handleChangeInBottom = (id, event) => {
    const newInputBottom = streaming_metrics.map(idForupdate => {
      if (id === idForupdate.id) {
        idForupdate[event.target.name] = event.target.value
      }
      return idForupdate
    })
    setStreaming_metrics(newInputBottom)
  }

  const handleAddFieldsBottom = () => {
    setStreaming_metrics([...streaming_metrics, { id: uuidv4(), key: '', value: '' }])
  }

  const handleRmvBottom = id => {
    const values = [...streaming_metrics]
    values.splice(values.findIndex(value => value.id === id), 1)
    setStreaming_metrics(values)
  }

  // Validation
  const projectSchema = yup.object().shape({
    number_of_songs: yup.string().required(),
    project_name: yup.string().min(3).required()
  })
  const { register, errors, control, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(projectSchema) })


  const onSubmit = async(propData) => {
    const release_date_project = moment(release_date[0]).format('yyyy-MM-DD HH:mm:ss')
    const project_public_date = moment(publicDate[0]).format('yyyy-MM-DD HH:mm:ss')
    const artist = String(propData.artist_id.artist_id)
    const dataMain = {
      token : isUserLoggedInToken(),
      project_type : propData.project_type.value,
      social_media_links,
      streaming_metrics,
      featured_image,
      release_date_project,
      project_public_date,
      artist_id: artist,
      project_name: propData.project_name,
      number_of_songs: propData.number_of_songs,
      equity_per_share: propData.equity_per_share,
      price_per_share: propData.price_per_share,
      shares_per_customer: propData.shares_per_customer,
      total_shares: propData.total_shares,
      spotify_player: propData.spotify_player,
      apple_player: propData.apple_player,
      calc_default_streams: propData.calc_default_streams,
      calc_default_shares_owned: propData.calc_default_shares_owned,
      total_equity_available: propData.total_equity_available,
      terms_conditions: propData.terms_conditions
    }

    const response = await postMehodWithBody({  hiturl : /createupdateproject/, dataMain })
    if (response.status === true) {
      setGroupMessage(response.message)
      setVisible(true)
      setMessageColor('primary')
    } else if (response.responseCode === 500) {
      setGroupMessage('Please Fill all details')
      setMessageColor('danger')
    } else {
      setGroupMessage(response.message)
      setVisible(true)
      setMessageColor('danger')
    }
  }

  //Image Uploader 
  const ProjectImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const ProjectImageStr = reader.result
      setFeatured_image(ProjectImageStr)
    }
    reader.readAsDataURL(file)
    console.log(featured_image)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataApi({ hiturl: `/getartists/` })
      setAllArtist(data.artists)
    }
    fetchData()
  }, [])

  return (
<Fragment>
    {group_message &&
      <Alert color={messageColor} isOpen={visible} toggle={() => setVisible(false)}>
        <div className='alert-body'>
          <span className='font-weight-bold'>{group_message}</span>
        </div>
      </Alert>
    }
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Create Project</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm='6'>
              <FormGroup>
                <Label for='project_name'>Project Name</Label>
                <Input
                  id='project_name'
                  name='project_name'
                  innerRef={register({ required: true })}
                  invalid={errors.project_name && true}
                  placeholder='Project Name'
                />
                {errors && errors.project_name && <FormFeedback>Please type Project name</FormFeedback>}
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label for='react-select'>Project Type</Label>
                <Controller
                  isClearable
                  as={Select}
                  id='react-select'
                  control={control}
                  name='project_type'
                  defaultValue="0"
                  options={project_type}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.project_type === null })}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                />
                
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='artist_id'>All Artist</Label>
                <Controller
                  isClearable
                  as={Select}
                  id='artist_id'
                  control={control}
                  name='artist_id'
                  options={allArtist}
                  defaultValue="0"
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.artist_id}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.artist_id === null })}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                />
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='number_of_songs'>Number of Songs</Label>
                <Input
                  id='number_of_songs'
                  name='number_of_songs'
                  innerRef={register({ required: true })}
                  invalid={errors.number_of_songs && true}
                  placeholder='Songs Number'
                />
                {errors && errors.number_of_songs && <FormFeedback>Please provide a valid number of Songs</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='featured_image'>Featured Image</Label>
                <Input
                  type="file"
                  id="featured_image"
                  name="featured_image"
                  className="fileImage form-control-file"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => { ProjectImage(e) }}
                />
              </FormGroup>
            </Col>

          </Row>

          <hr className='my-3' />

          <Row>

            <Col sm='6'>
              <FormGroup>
                <Label for='equity_per_share'>Equity Per Share</Label>
                <Input
                  id='equity_per_share'
                  name='equity_per_share'
                  innerRef={register({ required: true })}
                  invalid={errors.equity_per_share && true}
                  placeholder='Equity Per Share'
                />
                {errors && errors.equity_per_share && <FormFeedback>Please provide a valid number for Equity per Share</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='equity_per_share'>Total Equity Availble</Label>
                <Input
                  id='total_equity_available'
                  name='total_equity_available'
                  innerRef={register({ required: true })}
                  invalid={errors.total_equity_available && true}
                  placeholder='Total Equity Availble'
                />
                {errors && errors.total_equity_available && <FormFeedback>Please provide a valid number for Total Equity Availble</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='price_per_share'>Price Per Share</Label>
                <Input
                  id='price_per_share'
                  name='price_per_share'
                  innerRef={register({ required: true })}
                  invalid={errors.price_per_share && true}
                  placeholder='Price Per Share'
                />
                {errors && errors.price_per_share && <FormFeedback>Please provide a valid number for Price per Share</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='shares_per_customer'>Share Per Customer</Label>
                <Input
                  id='shares_per_customer'
                  name='shares_per_customer'
                  innerRef={register({ required: true })}
                  invalid={errors.shares_per_customer && true}
                  placeholder='Share Per Customer'
                />
                {errors && errors.shares_per_customer && <FormFeedback>Please provide a valid number for Share Per Customer</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='total_shares'>Total Shares</Label>
                <Input
                  id='total_shares'
                  name='total_shares'
                  innerRef={register({ required: true })}
                  invalid={errors.total_shares && true}
                  placeholder='Total Shares'
                />
                {errors && errors.total_shares && <FormFeedback>Please provide a valid number for Total Shares</FormFeedback>}
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Row>
                  <Col sm='6'>
                    <Label>Share Owned</Label>
                    <Input
                      id='calc_default_shares_owned'
                      name='calc_default_shares_owned'
                      innerRef={register({ required: true })}
                      invalid={errors.calc_default_shares_owned && true}
                      placeholder='Share Owned'
                    />
                    {errors && errors.calc_default_shares_owned && <FormFeedback>Please provide a valid number for Owned Shares</FormFeedback>}
                  </Col>
                  <Col sm='6'>
                    <Label>Total Listens</Label>
                    <Input
                      id='calc_default_streams'
                      name='calc_default_streams'
                      innerRef={register({ required: true })}
                      invalid={errors.calc_default_streams && true}
                      placeholder='Total Listens'
                    />
                    {errors && errors.calc_default_streams && <FormFeedback>Please provide a valid number for Total Listens</FormFeedback>}
                  </Col>
                </Row>

              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='date-time-picker'>Project Release Date</Label>
                <Flatpickr
                  value={release_date}
                  data-enable-time
                  id='date-time-picker'
                  className='form-control'
                  name='release_date'
                  onChange={date => setRelease_date(date)}
                />
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='date-time-picker'>Project Public Date</Label>
                <Flatpickr
                  value={publicDate}
                  data-enable-time
                  id='date-time-picker'
                  className='form-control'
                  name='publicDate'
                  onChange={date => setPublicDate(date)}
                />
              </FormGroup>
            </Col>

            <Col sm='6'>
              <FormGroup>
                <Label for='terms_conditions'>Terms & Conditions</Label>
                <Input
                  type='textarea'
                  row='10'
                  id='terms_conditions'
                  name='terms_conditions'
                  innerRef={register({ required: true })}
                  invalid={errors.terms_conditions && true}
                  placeholder='Terms & Conditions'
                />
                {errors && errors.terms_conditions && <FormFeedback>Please provide Terms & Conditions</FormFeedback>}
              </FormGroup>
            </Col>

          </Row>
          <hr className='my-3' />
          <Row className='justify-content-between align-items-end'>
          <Col sm='6'>
            <FormGroup>
              <Label for='spotify_player'>Spotify Link</Label>
              <Input
                type='textarea'
                row='10'
                id='spotify_player'
                name='spotify_player'
                innerRef={register({ required: true })}
                invalid={errors.spotify_player && true}
                placeholder='Spotify Link'
              />
              {errors && errors.spotify_player && <FormFeedback>Please provide Spotify Link</FormFeedback>}
            </FormGroup>
          </Col>

          <Col sm='6'>
            <FormGroup>
              <Label for='apple_player'>Apple Player Link</Label>
              <Input
                type='textarea'
                row='10'
                id='apple_player'
                name='apple_player'
                innerRef={register({ required: true })}
                invalid={errors.apple_player && true}
                placeholder='Apple Player Link'
              />
              {errors && errors.apple_player && <FormFeedback>Please provide Apple Player Link</FormFeedback>}
            </FormGroup>
          </Col>

          
            {social_media_links.map(inputField => (
              <>
                <Col className="my-1" sm='8' key={inputField.id}>
                  <Row>
                    <Col sm='6'>
                      <Label>Social Media</Label>
                      <Input
                        name="key"
                        placeholder="Social Media Type"
                        value={inputField.key}
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />  
                    </Col>
                    <Col sm='6'>
                      <Label>Social Media Link</Label>
                      <Input
                        name="value"
                        placeholder="Social Media Link"
                        value={inputField.value}
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm='4' className="my-1">
                  <Button.Ripple color='danger' className='text-nowrap px-1 mr-1' onClick={() => handleRemoveFields(inputField.id)} outline>
                    <X size={14} className='mr-50' />
                    <span>Delete</span>
                  </Button.Ripple>

                  <Button.Ripple className='btn-icon' color='primary' onClick={handleAddFields}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Add New</span>
                  </Button.Ripple>

                </Col>
              </>
            ))}
          </Row>

          <hr className='my-3' />

          <Row className='justify-content-between align-items-end'>
            {streaming_metrics.map(item => (
              <>
                <Col className="my-1" sm='8' key={item.id}>
                  <Row>
                    <Col sm='6'>
                      <Label>Streaming Metrics</Label>
                      <Input
                        name="key"
                        placeholder="Song Name"
                        value={item.key}
                        onChange={event => handleChangeInBottom(item.id, event)}
                      />  
                    </Col>
                    <Col sm='6'>
                      <Label>Streaming Metrics Entry</Label>
                      <Input
                        name="value"
                        placeholder="Streaming Metrics Entry"
                        value={item.value}
                        onChange={event => handleChangeInBottom(item.id, event)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm='4' className="my-1">
                  <Button.Ripple color='danger' className='text-nowrap px-1 mr-1' onClick={() => handleRmvBottom(item.id)} outline>
                    <X size={14} className='mr-50' />
                    <span>Delete</span>
                  </Button.Ripple>

                  <Button.Ripple className='btn-icon' color='primary' onClick={handleAddFieldsBottom}>
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Add New</span>
                  </Button.Ripple>

                </Col>
              </>
            ))}
          </Row>
          
          <hr className='my-3' />

          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit'>
              Submit
            </Button.Ripple>
            <Link to='/projects' className='mrMin waves-effect btn btn-danger' color='danger'>
              Close
            </Link>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
    </Fragment>
  )
}

export default CreateProject
