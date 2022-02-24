// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// Customer Data Table 
import ArtistTable from './ArtistTable'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'


const Artists = () => {
  document.title = "Audiown | Manage Artist"
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
            <ArtistTable />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Artists
