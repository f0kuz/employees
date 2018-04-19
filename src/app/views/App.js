import React, { Component } from 'react';
import { orderBy } from 'lodash';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker'
import './../../css/App.css';
import classNames from 'classnames';

import data from './../../data/data.json';
import EmployeesTable from '../../employees-table/components/EmployeesTable';



const invertDirection = {
  "desc": "asc",
  "asc": "desc"
}

const allEmployeesData = data;

class App extends Component {
  constructor() {
    super();

    this.state = {
      employeesData: allEmployeesData,
      filteredIDFrom: "",
      filteredIDTo: "",
      filteredFirstName: "",
      filteredLastName: "",
      filteredDate: new Date(),
      filteredCompany: "",
      filteredNote: "",
      columnToSort: "",
      sortDirection: "asc",
      hideFilters: true
    }
  }

  // TODO: Conditions for improvement for all filtering methods
  handleFilteringIDFrom = e => {
    e.persist();
    this.setState(prevState => ({
      filteredIDFrom: e.target.value,
      employeesData: prevState.employeesData === this.state.employeesData
        ? allEmployeesData.filter(employee => employee.id >= e.target.value)
        : this.state.employeesData.filter(employee => employee.id >= e.target.value)
    }))
  }

  handleFilteringIDTo = e => {
    e.persist();
    this.setState(prevState => ({
      filteredIDTo: e.target.value,
      employeesData: prevState.employeesData !== this.state.employeesData
        ? allEmployeesData.filter(employee => employee.id <= e.target.value)
        : this.state.employeesData.filter(employee => employee.id <= e.target.value)
    }))
  }

  handleFilteringFirstName = e => {
    e.persist();
    this.setState(prevState => ({
      filteredFirstName: e.target.value,
      employeesData: prevState.employeesData === this.state.employeesData
        ? allEmployeesData.filter(employee =>
          employee.firstName.toLowerCase().includes(e.target.value.toLowerCase()))
        : this.state.employeesData.filter(employee =>
          employee.firstName.toLowerCase().includes(e.target.value.toLowerCase()))
    }))
  }

  handleFilteringLastName = e => {
    e.persist();
    this.setState(prevState => ({
      filteredLastName: e.target.value,
      employeesData: prevState.employeesData === this.state.employeesData
        ? allEmployeesData.filter(employee =>
          employee.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
        : this.state.employeesData.filter(employee =>
          employee.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
    }))
  }

  handleFilteringDate = date => {
    this.setState(prevState => ({
      filteredDate: date,
      employeesData: prevState.employeesData === this.state.employeesData
      ? allEmployeesData.filter(employee => employee.dateOfBirth === date)
      : this.state.employeesData.filter(employee => employee.dateOfBirth === date)
    }))
  }

  handleFilteringCompany = e => {
    e.persist();
    this.setState(prevState => ({
      filteredCompany: e.target.value,
      employeesData: prevState.employeesData === this.state.employeesData
        ? allEmployeesData.filter(employee =>
          employee.company.toLowerCase().includes(e.target.value.toLowerCase()))
        : this.state.employeesData.filter(employee =>
          employee.company.toLowerCase().includes(e.target.value.toLowerCase()))
    }))
  }

  // TODO: Filtering by Note will be implement the same way as by ID. For now is like this.
  handleFilteringNote = e => {
    e.persist();
    this.setState(prevState => ({
      filteredNote: e.target.value,
      employeesData: prevState.employeesData === this.state.employeesData
        ? allEmployeesData.filter(employee =>
          employee.note.toString().includes(e.target.value.toString()))
        : this.state.employeesData.filter(employee =>
          employee.note.toString().includes(e.target.value.toString()))
    }))
  }

  // TODO: Resolve issue with sortBy("dateOfBirth")
  sortBy = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort === columnName ? invertDirection[state.sortDirection] : "asc"
    }))
  }

  handleShowingFilters = () => {
    this.setState({
      hideFilters: !this.state.hideFilters
    })
  }

  render() {
    const tHeadProps = [
      {
        name: "id",
        value: "#"
      },
      {
        name: "firstName",
        value: "First Name"
      },
      {
        name: "lastName",
        value: "Last Name"
      },
      {
        name: "dateOfBirth",
        value: "Date of Birth"
      },
      {
        name: "company",
        value: "Company"
      },
      {
        name: "note",
        value: "Note"
      }
    ];

    const sortedData = orderBy(this.state.employeesData, this.state.columnToSort, this.state.sortDirection);

    const filtersClassName = classNames(
      {"hide-filters": this.state.hideFilters},
      {"show-filters": !this.state.hideFilters}
    )

    const showHideFiltersText = this.state.hideFilters ? "Pokaż filtry" : "Ukryj filtry"

    return (
      <React.Fragment>
        <header>
          <h1 className="app-title">Employees Data</h1>
        </header>
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-3">
                {/* TODO: Filters should be in separate component */}
                <div className="filters-wrapper">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="lead filters-title">Filtry</p>
                    <Button onClick={this.handleShowingFilters} size="sm" >{showHideFiltersText}</Button>
                  </div>
                  <Form className={filtersClassName} >
                    <FormGroup>
                      <Label>ID</Label>
                      <Input
                        onChange={this.handleFilteringIDFrom}
                        value={this.state.filteredIDFrom}
                        bsSize="sm"
                        type="number"
                        name="id-number"
                        id="id-from"
                        placeholder="Od"
                      />
                      <Input
                        onChange={this.handleFilteringIDTo}
                        value={this.state.filteredIDTo}
                        bsSize="sm"
                        type="number"
                        name="id-number"
                        id="id-to"
                        placeholder="Do"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="fName">First Name</Label>
                      <Input
                        onChange={this.handleFilteringFirstName}
                        value={this.state.filteredFirstName}
                        bsSize="sm"
                        type="text"
                        name="fName"
                        id="id-fName"
                        placeholder="Szukaj"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="lName">Last Name</Label>
                      <Input
                        onChange={this.handleFilteringLastName}
                        value={this.state.filteredLastName}
                        bsSize="sm"
                        type="text"
                        name="lName"
                        id="id-lName"
                        placeholder="Szukaj"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Date of Birth</Label><br />
                      <DateTimePicker
                        value={this.state.filteredDate}
                        onChange={this.handleFilteringDate}
                        placeholderText="Kliknij aby wybrać datę"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="company">Company</Label>
                      <Input
                        onChange={this.handleFilteringCompany}
                        value={this.state.filteredCompany}
                        bsSize="sm"
                        type="text"
                        name="company"
                        id="id-company"
                        placeholder="Szukaj"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="note">Note</Label>
                      <Input
                        onChange={this.handleFilteringNote}
                        value={this.state.filteredNote}
                        bsSize="sm"
                        type="text"
                        name="note"
                        id="id-note"
                        placeholder="Szukaj"
                      />
                    </FormGroup>
                  </Form>
                </div>
              </div>
              <EmployeesTable
                tHead={tHeadProps}
                employeesData={sortedData}
                sortBy={this.sortBy}
                columnToSort={this.state.columnToSort}
                sortDirection={this.state.sortDirection}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
