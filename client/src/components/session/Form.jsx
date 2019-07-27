import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import useForm from './useForm';
import { signup, login } from '../../util/session_api_util';

const Form = () => {
    // pass in signup or login to useForm(cb) depending on route;
    const { values, handleChange, handleSubmit } = useForm(signup);

    return (
        <>
            <form className="" onSumbit={handleSubmit}>
                <input className=""
                    type="text"
                    value={values.email}
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input className=""
                    type="text"
                    value=""
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input className=""
                    type="password"
                    value={values.password}
                    placeholder="Password"
                    onChange={handleChange}
                />

                <input className=""
                    type="password"
                    value=""
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />

                <input type="submit" value=""/>

            </form>
        </>
    )
}

export default withRouter(Form);