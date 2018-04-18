import React, { Component } from 'react';
import { orderBy } from 'lodash';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './../../css/App.css';

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
      columnToSort: "",
      sortDirection: "asc",
    }
  }

  // TODO: Conditions for improvement
  handleFilteringIDFrom = e => {
    e.persist();
    this.setState(prevState => ({
      filteredIDFrom: e.target.value,
      employeesData: prevState.employeesData === this.state.employeesData
        ? allEmployeesData.filter(elem => elem.id >= e.target.value)
        :
        this.state.employeesData.filter(elem => elem.id >= e.target.value)
    }))
  }

  // TODO: Conditions for improvement
  handleFilteringIDTo = e => {
    e.persist();
    this.setState(prevState => ({
      filteredIDTo: e.target.value,
      employeesData: prevState.employeesData !== this.state.employeesData
        ? allEmployeesData.filter(elem => elem.id <= e.target.value)
        :
        this.state.employeesData.filter(elem => elem.id <= e.target.value)
    }))
  }

  handleFilteringFirstName = e => {
    e.persist();
    const text = e.target.value;
    const filteredFirstNameResult = allEmployeesData.filter(user => 
      user.firstName.toLowerCase().includes(text.toLowerCase()));
    this.setState({
      filteredFirstName: e.target.value,
      employeesData: filteredFirstNameResult
    })
  }

  handleFilteringLastName = e => {
    e.persist();
    const text = e.target.value;
    const filteredLastNameResult = allEmployeesData.filter(user =>
      user.lastName.toLowerCase().includes(text.toLowerCase()));
    this.setState({
      filteredLastName: e.target.value,
      employeesData: filteredLastNameResult
    })
  }

  // TODO: Resolve issue with sortBy("dateOfBirth")
  sortBy = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort === columnName ? invertDirection[state.sortDirection] : "asc"
    }))
  }

  componentDidUpdate() {
    this.handleFilteringIDFrom.bind(this);
    this.handleFilteringIDTo.bind(this);
    this.handleFilteringFirstName.bind(this);
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

    return (
      <React.Fragment>
        <header>
          <h1 className="app-title">Employees Table</h1>
        </header>
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-3">
                {/* TODO: Filters should be in separate component */}
                <div className="filters-wrapper">
                  <p className="lead">Filtry</p>
                  <Form>
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
