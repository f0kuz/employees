import React, { Component } from 'react';
import classNames from 'classnames';


class EmployeesTable extends Component {
    render() {
        return (
            <div className="table-responsive employees-table col-12 col-md-9">
                <table className="table table-dark table-striped table-hover table-bordered">
                    <thead className="thead-light">
                        <tr>
                            {
                                this.props.tHead.map(th => {
                                    const thActive = classNames("employees-th", {
                                        "asc": this.props.sortDirection === "asc" && this.props.columnToSort === th.name,
                                        "desc": this.props.sortDirection === "desc" && this.props.columnToSort === th.name
                                    })
                                    return (
                                        <th
                                            key={th.name}
                                            scope="col"
                                            className={thActive}
                                            onClick={() => this.props.sortBy(th.name)}
                                            >{th.value}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.employeesData.map(person => {
                                return (
                                    <tr key={person.id}>
                                        <th scope="row">{person.id}</th>
                                        <td>{person.firstName}</td>
                                        <td>{person.lastName}</td>
                                        <td>{person.dateOfBirth}</td>
                                        <td>{person.company}</td>
                                        <td>{person.note}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <caption className="small text-right mr-3">recruitment task by trainee <strong className="author">Marcin Groszkiewicz</strong></caption>
                </table>
            </div>
        )
    }
}

export default EmployeesTable;