import * as React from 'react';

import {FieldProps} from 'formik';
import {Input, Form} from "antd";

const FormItem = Form.Item;


export const InputField: React.FunctionComponent<FieldProps<any> & {}> =
    ({
         field, // { name, value, onChange, onBlur }
         form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
         ...props
     }) => {

    const errorMsg = touched[field.name] && errors[field.name];

    return (
        <FormItem help={errorMsg} validateStatus={errorMsg ? 'error' : 'success'}>
            <Input {...field} {...props} />
        </FormItem>
    )};