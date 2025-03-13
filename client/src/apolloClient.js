import { ApolloClient, InMemoryCache , gql} from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: 'http://localhost:9200/graphql', 

  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});


export const GET_PEOPLE = gql`
  query {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const GET_CARS = gql`
  query {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const GET_PERSON_WITH_CARS = gql`
  query PersonWithCars($id: ID!) {
    personWithCars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;


export const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: ID!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const DELETE_PERSON = gql`
mutation DeletePerson($id: ID!) {
   deletePerson(id: $id) {
    id
  }
}
`;

export const ADD_CAR = gql`
  mutation AddCar($year: Int!, $make: String!, $model: String!, $price: Float!, $personId: ID!) {
    addCar(year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: ID!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: ID!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId:$personId ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;

export default client;
