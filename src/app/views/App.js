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
        ? allEmployeesData.filter(elem => {
          if (elem.id >= e.target.value) {
            return true;
          }
        })
        :
        this.state.employeesData.filter(elem => {
          if (elem.id >= e.target.value) {
            return true;
          }
        })
    }))
  }

  handleFilteringIDTo = e => {
    e.persist();
    this.setState(prevState => ({
      filteredIDTo: e.target.value,
      employeesData: prevState.employeesData !== this.state.employeesData
        ? allEmployeesData.filter(elem => {
          if (elem.id <= e.target.value) {
            return true;
          }
        })
        :
        this.state.employeesData.filter(elem => {
          if (elem.id <= e.target.value) {
            return true;
          }
        })
    }))
  }

  // TODO: resolve issue with sortBy("dateOfBirth")
  sortBy = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort === columnName ? invertDirection[state.sortDirection] : "asc"
    }))
  }

  componentDidUpdate() {
    this.handleFilteringIDFrom.bind(this);
    this.handleFilteringIDTo.bind(this);
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
        </header>
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-3">
                <div className="filters-wrapper">
                  <p className="lead">Filtry</p>
                  <Form>
                    <FormGroup>
                      <Label for="exampleNumber">ID</Label>
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
