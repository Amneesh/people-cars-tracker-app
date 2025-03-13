import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { Card } from 'antd';
import { GET_PERSON_WITH_CARS } from '../apolloClient';

const PersonPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.personWithCars.firstName} {data.personWithCars.lastName}</h1>
      <h2>Cars:</h2>
      {data.personWithCars.cars.map(car => (
        <Card key={car.id} title={`${car.year} ${car.make} ${car.model} ---> $${car.price.toLocaleString()}`} style={{ marginBottom: 16 }}>
        </Card>
      ))}
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default PersonPage;
