import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listBusinesses } from './graphql/queries';
import { createBusiness as createBusinessMutation, deleteBusiness as deleteBusinessMutation } from './graphql/mutations';

const initialFormState = { 
  name: '',
  image: ''
}

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchBusinesses();
  }

  async function fetchBusinesses() {
    const apiData = await API.graphql({ query: listBusinesses });
    const businessesFromAPI = apiData.data.listBusinesses.items;
    await Promise.all(businessesFromAPI.map(async business => {
      if (business.image) {
        const image = await Storage.get(business.image);
        business.image = image;
      }
      return business;
    }))
    setBusinesses(apiData.data.listBusinesses.items);
  }

  async function createBusiness() {
    if (!formData.name) return;
    await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBusinesses([ ...businesses, formData ]);
    setFormData(initialFormState);
  }

  async function deleteBusiness({ id }) {
    const newBusinessesArray = businesses.filter(business => business.id !== id);
    setBusinesses(newBusinessesArray);
    await API.graphql({ query: deleteBusinessMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My App</h1>
      <div style={{marginBottom: 30}}>
        <h2>Businesses</h2>
        {
          (businesses.length) ? businesses.map(business => (
            <div key={business.id || business.name}>
              <h3>{business.name}</h3>
              <button onClick={() => deleteBusiness(business)}>Delete business</button>
              {
                business.image && <img src={business.image} style={{width: 100}} />
              }
            </div>
          )) : 'No businesses set up yet, add one below'
        }
      </div>
      <div style={{marginBottom: 30}}>
        <h2>Add a new business</h2>
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Business name"
          value={formData.name}
        />
        <input
          type="file"
          onChange={onChange}
        />
        <button onClick={createBusiness}>Create Business</button>
      </div>
      <div style={{marginBottom: 30}}>
        <h2>Join an existing business</h2>
        <p>TODO</p>
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);