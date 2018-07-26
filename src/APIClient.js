const CLIENT_SECRET = 'YOUR_SECRET';
const CLIENT_ID = 'YOUR_ID';
const API_URL = 'https://api.dictanova.io/v1';
const DATASET_ID = 'YOUR_DATASET';

class APIClient {

  getToken() {
    return this.token;
  }

  authenticate() {

    const that = this;

    if (that.token) {

      return new Promise((resolve, reject) => {
        resolve(that.token);
      });

    } else {

      const data = JSON.stringify({
        'clientId': CLIENT_ID,
        'clientSecret': CLIENT_SECRET
      });

      return fetch(API_URL + '/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: data
      }).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        that.token = jsonResponse.access_token;
        return new Promise((resolve, reject) => {
          resolve(that.token);
        });
      });

    }


  }

  npsScoreByStoreAndMonth() {

    const request = JSON.stringify({
      type: 'NPS',
      field: 'metadata.my_nps',
      dimensions: [
        {
          field: 'metadata.my_store',
          group: 'DISTINCT'
        },
        {
          field: 'metadata.my_date',
          group: 'MONTH'
        }
      ]
    });


    return this.aggregation(request);

  }


  npsScoreByStore() {

    const request = JSON.stringify({
      type: 'NPS',
      field: 'metadata.my_nps',
      dimensions: [
        {
          field: 'metadata.my_store',
          group: 'DISTINCT'
        }
      ]
    });


    return this.aggregation(request);

  }

  aggregation(request) {
    return this.authenticate().then((token) => {

      return fetch(API_URL + '/aggregation/datasets/' + DATASET_ID + '/documents', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: request
      }).then(function (response) {
        return response.json();
      })

    });
  }

}

export default APIClient;