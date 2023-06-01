import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateLocation = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries from the JSON server
  useEffect(() => {
    axios.get('http://localhost:3001/countries')
      .then(response => setCountries(response.data))
      .catch(error => console.log(error));
  }, []);

  // Fetch cities based on selected country
  const fetchCities = (countryId) => {
    axios.get(`http://localhost:3001/countries/${countryId}/cities`)
      .then(response => setCities(response.data))
      .catch(error => console.log(error));
  };

  const initialValues = {
    country: '',
    city: ''
  };

  const validationSchema = Yup.object().shape({
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required')
  });

  const onSubmit = (values, { resetForm }) => {
    // Handle form submission
    console.log(values);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Location Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <div>
              <label htmlFor="country">Country:</label>
              <Field as="select" name="country" id="country" onChange={(e) => {
                handleChange(e);
                fetchCities(e.target.value);
              }}>
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </Field>
              <ErrorMessage name="country" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <Field as="select" name="city" id="city">
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </Field>
              <ErrorMessage name="city" component="div" className="error" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateLocation;
