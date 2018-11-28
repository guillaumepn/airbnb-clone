import * as React from 'react';
import {Button, Form, Icon} from 'antd';
import {FormikErrors, FormikProps, withFormik, Field, Form as FormikForm} from "formik";

import {validUserSchema} from '@airbnb/common';
import {InputField} from "../../shared/InputField";

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

        return (
            <FormikForm style={{width: 400, margin: '50px auto'}} className="login-form">
                <Field
                    name="email"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                    component={InputField}
                />

                <Field
                    name="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password"
                    component={InputField}
                />

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
            </FormikForm>
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