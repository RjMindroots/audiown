// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Store & Actions
import { getData } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

import {Link, useHistory} from 'react-router-dom'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus, Edit} from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import {getArtists} from '../store/actions/artistAction'

const ProjectsTable = () => {

  const history = useHistory()
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.projectsTable)

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
        sColumn : sortColumn,
        sDirection: sortDirection
      })
    )
    dispatch(getArtists())

  }, [dispatch])

  // ** Function to handle filter
  const handleFilter = e => {
    setSearchValue(e.target.value)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: e.target.value,
        sColumn : sortColumn,
        sDirection: sortDirection
      })
    )
  }


  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchValue, 
        sColumn : sortColumn,
        sDirection: sortDirection
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
        sColumn : sortColumn,
        sDirection: sortDirection
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleSort = (column, sortDirection) => {
    dispatch(
      getCustomerData({
        page: 1,
        perPage: rowsPerPage,
        q: searchValue,
        sColumn: column.selector,
        sDirection: sortDirection
      })
    )
    setSortColumn(column.selector)
    setSortDirection(sortDirection)
  }

  const handleEditID = async (id) => { 
    if (id !== undefined) {
      history.push(`/projects/edit/${id}`)
    }
  }

  // ** Table Server Side Column
 const serverSideColumns = [
    {
      name: 'Artist Name',
      selector: 'artist_name',
      sortable: true,
      minWidth: '225px'
    },
    {
      name: 'Project Name',
      selector: 'project_name',
      sortable: true,
      minWidth: '225px'
    },
    {
      name: 'Total Shares',
      selector: 'total_shares',
      sortable: true,
      minWidth: '225px'
    },
    {
      name: 'Project Release Date',
      selector: 'release_date_project',
      sortable: true,
      minWidth: '225px'
    },
    {
      name: 'Share Per Customer',
      selector: 'shares_per_customer',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Price Per Share',
      selector: 'price_per_share',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Number Of Songs',
      selector: 'number_of_songs',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Action',
      cell:(row) => (<> <Edit 
      id={row.project_id}
      className={"darkModeBtn"}
      size={18} 
      onClick={() => {
        handleEditID(row.project_id)
      }} /> </>),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ]

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number((store.data / rowsPerPage).toFixed(0))
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        }
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    const mainStore = store.data.artists

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Projects</CardTitle>
          <Link to="/projects/createprojects">
            <Button.Ripple style={{float:"right"}} color='primary'> <Plus size={14} style={{color:"#fff"}}/> Create Projects</Button.Ripple>
          </Link>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select'>entries</Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          className='react-dataTable'
          columns={serverSideColumns}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={dataToRender()}
        />
      </Card>
    </Fragment>
  )
}

export default memo(ProjectsTable)
