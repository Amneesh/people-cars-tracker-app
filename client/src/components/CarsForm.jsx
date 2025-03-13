import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CAR, GET_CARS } from '../apolloClient'; 
import { Input, Select, Button, Form , Divider} from 'antd';

const CarsForm = ({ people }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');

  const [addCar] = useMutation(ADD_CAR, {
    onCompleted: () => {
      console.log("Car added successfully");
      clearForm();
    },
    refetchQueries: [{ query: GET_CARS }],
    onError: (error) => {
      console.error("Error adding car: ", error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = {
      year: parseInt(year, 10),
      make,
      model,
      price: parseFloat(price),
      personId: selectedPerson,
    };

    console.log(selectedPerson, 'selectedPerson');
    console.log(carData);

    addCar({ variables: carData });
  };

  const clearForm = () => {
    setMake('');
    setModel('');
    setYear('');
    setPrice('');
    setSelectedPerson('');
  };

  return (
    <Form onSubmitCapture={handleSubmit} className='cars-form' layout="vertical">
        <Divider> CAR FORM </Divider>
      <Form.Item label="Year">
        <Input 
          type="text" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          placeholder="Enter Year" 
          required 
        />
      </Form.Item>

      <Form.Item label="Make">
        <Input 
          type="text" 
          value={make} 
          onChange={(e) => setMake(e.target.value)} 
          placeholder="Enter Make" 
          required 
        />
      </Form.Item>

      <Form.Item label="Model">
        <Input 
          type="text" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          placeholder="Enter Model" 
          required 
        />
      </Form.Item>

      <Form.Item label="Price">
        <Input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Enter Price" 
          required 
        />
      </Form.Item>

      <Form.Item label="Owner">
        <Select 
          value={selectedPerson} 
          onChange={(value) => setSelectedPerson(value)} 
          placeholder="Select an owner" 
          style={{ width: '200px' }}
          required
        >
          {people.people.map((person) => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit" className='submit-button'>
        ADD CAR
      </Button>
    </Form>
  );
};

export default CarsForm;
