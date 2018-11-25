import * as React from 'react';
import {Button, Form, Icon, Input} from 'antd';
import {FormikErrors, FormikProps, withFormik} from "formik";

import {validUserSchema} from '@airbnb/common';

const FormItem = Form.Item;

interface FormValues {
    email: string;
    password: string;
}

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {

    render() {
        const {values, handleChange, handleBlur, handleSubmit, touched, errors} = this.props;

        return (
            <form style={{width: 400, margin: '50px auto'}} className="login-form" onSubmit={handleSubmit}>
                <FormItem
                    help={touched.email && errors.email ? errors.email : ''}
                    validateStatus={touched.email && errors.email ? 'error' : 'success'}
                >
                    <Input
                        name="email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormItem>
                <FormItem
                    help={touched.password && errors.password ? errors.password : ''}
                    validateStatus={touched.email && errors.email ? 'error' : 'success'}
                >
                    <Input
                        name="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormItem>
                <FormItem>
                    <a className="login-form-forgot" href="">Forgot password</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </FormItem>
                <FormItem>
                    Or <a href="">login now!</a>
                </FormItem>
            </form>
        );
    }
}


export const RegisterView = withFormik<Props, FormValues>({
    validationSchema: validUserSchema,
    mapPropsToValues: () => ({email: '', password: ''}),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    }
})(C);