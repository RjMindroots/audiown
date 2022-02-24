// ** React Imports
import { Fragment } from 'react'


// ** Third Party Components
import { Row, Col } from 'reactstrap'

// Customer Data Table 
import ProjectsTable from './ProjectsTable'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'


const Products = () => {
  document.title = "Audiown | Manage Products"
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
            <ProjectsTable />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Products
