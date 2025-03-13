import React, { useState } from "react";
import {
  DELETE_PERSON,
  DELETE_CAR,
  GET_PEOPLE,
  UPDATE_CAR,
  GET_CARS,
  UPDATE_PERSON, // Assuming you have an UPDATE_PERSON mutation
} from "../apolloClient";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Card, Button, Input, Form, Select } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";

const RecordsComponent = ({ people, cars }) => {
  const [editingCar, setEditingCar] = useState(null);
  const [editedCarData, setEditedCarData] = useState({});
  const [editingPerson, setEditingPerson] = useState(null);
  const [editedPersonData, setEditedPersonData] = useState({});

  const [deletePerson] = useMutation(DELETE_PERSON, {
    onCompleted: () => {
      console.log("Person deleted successfully");
    },
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_CARS }],
    onCompleted: () => console.log("Car deleted successfully"),
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });


  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleDeletePerson = async (id) => {
    deletePerson({ variables: { id } }).catch((error) =>
      console.error("Mutation error:", error)
    );
  };

  const handleDeleteCar = (id) => {
    deleteCar({ variables: { id } }).catch((error) =>
      console.error("Mutation error:", error)
    );
  };

  const handleEditCar = (car) => {
    setEditingCar(car.id);
    setEditedCarData({ ...car });
  };

  const handleEditPerson = (person) => {
    setEditingPerson(person.id);
    setEditedPersonData({ ...person });
  };

  const handleChangeCar = (e, field) => {
    setEditedCarData({ ...editedCarData, [field]: e.target.value });
  };

  const handleChangePerson = (e, field) => {
    setEditedPersonData({ ...editedPersonData, [field]: e.target.value });
  };

  const handleSaveCar = (id) => {
    updateCar({
      variables: {
        id,
        year: parseInt(editedCarData.year, 10),
        make: editedCarData.make,
        model: editedCarData.model,
        price: parseFloat(editedCarData.price),
        personId: editedCarData.personId,
      },
    })
      .then(() => {
        setEditingCar(null);
      })
      .catch((error) => console.error("Error updating car:", error));
  };

  const handleSavePerson = (id) => {
    updatePerson({ variables: { id, ...editedPersonData }})
      .then(() => setEditingPerson(null))
      .catch((error) => console.error("Error updating person:", error));
  };

  return (
    <div className="records-section">
      <h2>Records</h2>
    
      { people.people.map((person) => (
        <Card
          className="main-card"
          key={person.id}
          title={
            editingPerson === person.id ? (
              <>
                <Form layout="vertical" className="person-edit-form">
                  <Form.Item label="First Name" className="person-fields">
                    <Input
                      value={editedPersonData.firstName}
                      onChange={(e) => handleChangePerson(e, "firstName")}
                    />
                  </Form.Item>
                  <Form.Item label="Last Name" className="person-fields">
                    <Input
                      value={editedPersonData.lastName}
                      onChange={(e) => handleChangePerson(e, "lastName")}
                    />
                  </Form.Item>
                </Form>
              </>
            ) : (
              `${person.firstName} ${person.lastName}`
            )
          }
          actions={
            editingPerson === person.id
              ? [
                  <SaveOutlined
                    className="save-icon"
                    onClick={() => handleSavePerson(person.id)}
                    style={{ color: "#1890ff", fontSize: "18px" }}
                  />,
                ]
              : [
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => handleEditPerson(person)}
                    style={{ color: "#1890ff", fontSize: "18px" }}
                  />,
                  <DeleteOutlined
                    className="delete-icon"
                    onClick={() => handleDeletePerson(person.id)}
                    style={{ color: "red", fontSize: "18px" }}
                  />,
                ]
          }
        >
            {cars?.cars.length>0 
            
            ?
            
            cars.cars
                .filter((car) => car.personId === person.id)
                .map((car) => (
                  <Card
                    type="inner"
                    key={`${car.id}`}
                    title={`${car.year} ${car.make} ${
                      car.model
                    } ----> $${car.price.toLocaleString()}`}
                    actions={[
                      <EditOutlined
                        className="edit-icon"
                        onClick={() => handleEditCar(car)}
                        style={{ color: "#1890ff", fontSize: "18px" }}
                      />,
                      <DeleteOutlined
                        className="delete-icon"
                        onClick={() => handleDeleteCar(car.id)}
                        style={{ color: "red", fontSize: "18px" }}
                      />,
                    ]}
                  >
                    {editingCar === car.id ? (
                      <>
                        <Form layout="vertical" className="car-edit-form">
                          <Form.Item label="Year">
                            <Input
                              value={editedCarData.year}
                              onChange={(e) => handleChangeCar(e, "year")}
                            />
                          </Form.Item>
                          <Form.Item label="Make">
                            <Input
                              value={editedCarData.make}
                              onChange={(e) => handleChangeCar(e, "make")}
                            />
                          </Form.Item>
                          <Form.Item label="Model">
                            <Input
                              value={editedCarData.model}
                              onChange={(e) => handleChangeCar(e, "model")}
                            />
                          </Form.Item>
                          <Form.Item label="Price">
                            <Input
                              value={editedCarData.price}
                              onChange={(e) => handleChangeCar(e, "price")}
                            />
                          </Form.Item>
                          <Form.Item label="Assign Person">
                            <Select
                              value={editedCarData.personId}
                              onChange={(value) =>
                                setEditedCarData({
                                  ...editedCarData,
                                  personId: value,
                                })
                              }
                            >
                              {people.people.map((person) => (
                                <Select.Option key={person.id} value={person.id}>
                                  {person.firstName} {person.lastName}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <SaveOutlined
                            className="save-icon"
                            onClick={() => handleSaveCar(car.id)}
                            style={{ color: "#1890ff", fontSize: "18px" }}
                          />
                        </Form>
                      </>
                    ) : (
                      <></>
                    )}
                  </Card>
                ))
            : <div className="no-cars">There are no cars owned by {person.firstName}</div>}
       
          <div className="link-people-car">
            <Link to={`/people/${person.id}`}>Learn More</Link>
          </div>
        </Card>
      ))}
    
    </div>
  );
};

export default RecordsComponent;
