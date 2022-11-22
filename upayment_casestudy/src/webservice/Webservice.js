import React from 'react';
import {

} from 'react-native';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imphc3ByZWV0dGl3YW5hOTNAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL3Rpd2FuYWphc3ByZWV0MzkiLCJpYXQiOjE2NjkwOTA1MjQsImV4cCI6MTY2OTUyMjUyNH0.OB0xr58n2zGwv_GiIOAaRPdNPzynRl7TjAJWIedz4qY'

export default Webservice = {
    getCategories: (completion) => {
        fetch('https://upayments-studycase-api.herokuapp.com/api/categories/', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token
            }
          })
          .then(response => response.json())
          .then(responseJson => {
              completion(responseJson)
          })
    },
    getProducts: (completion) => {
        fetch('https://upayments-studycase-api.herokuapp.com/api/products', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token
            }
          })
          .then(response => response.json())
          .then(responseJson => {
              completion(responseJson)
          })
    },
    addItem: (body, completion) => {
        fetch('https://upayments-studycase-api.herokuapp.com/api/products', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify(body)
          })
          .then(response => response.json())
          .then(responseJson => {
              completion(responseJson)
          })
    }
};
