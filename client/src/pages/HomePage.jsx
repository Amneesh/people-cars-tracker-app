import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import PersonForm from "../components/PersonForm";
import { GET_CARS, GET_PEOPLE } from "../apolloClient";
import CarsForm from "../components/CarsForm";
import RecordsComponent from "../components/RecordsComponent";

const HomePage = () => {
  const {
    loading: peopleLoading,
    error: peopleError,
    data: peopleData,
  } = useQuery(GET_PEOPLE);
  const {
    loading: carsLoading,
    error: carsError,
    data: carsData,
  } = useQuery(GET_CARS);

  if (peopleLoading || carsLoading) return <p>Loading...</p>;
  if (peopleError || carsError)
    return <p>Error: {peopleError?.message || carsError?.message}</p>;

  return (
    <div className="homepage-main">
      <h2>PEOPLE AND THEIR CARS</h2>

      <PersonForm />

      {peopleData.people.length > 0 && <CarsForm people={peopleData} />}

      <RecordsComponent people={peopleData} cars={carsData} />
    </div>
  );
};

export default HomePage;
