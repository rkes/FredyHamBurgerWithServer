import React from 'react'
import {Field, reduxForm} from 'redux-form'

const CustomerAddress = props => {
    return (
        <form className="form-group">
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">Address Form</div>
                </div>
                <label>First Name</label>
                <div>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                    />
                </div>
            </div>
            <div>
                <label>Last Name</label>
                <div>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                    />
                </div>
            </div>
            <div>
                <label>Email</label>
                <div>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
                        className="form-control"
                    />
                </div>
            </div>
            <div>
                <label>Address to Deliver</label>
                <div>
                    <Field name="address" component="textarea" className="form-control"/>
                </div>
            </div>

        </form>
    )
}

export default reduxForm({
    form: 'CustomerAddress' // a unique identifier for this form
})(CustomerAddress)