import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../apolloClient';
import { Input, Button, Form, Divider } from 'antd';

const PersonForm = () => {

  const [form] = Form.useForm();

  const [addPerson] = useMutation(ADD_PERSON, {
    onCompleted: (data) => {
      console.log('Person added:', data.addPerson);
      clearForm();
    },
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleSubmit = (values) => {
    const { firstName, lastName } = values;
    addPerson({ variables: { firstName, lastName } });
  };

  const clearForm = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="person-form"
    >
      <Divider>PERSON FORM</Divider>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter first name' }]}
      >
        <Input placeholder="Enter First Name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter last name' }]}
      >
        <Input placeholder="Enter Last Name" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="submit-button">
          ADD PERSON
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonForm;
