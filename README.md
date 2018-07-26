# Aggregation samples

This project show how to use the Dictanova API to render some charts. It is based on documentation https://docs.dictanova.io/docs/aggregation-samples.

# How to use this project

To get started, modify APIClient.js file with your own credentials on top of the file. Add the client id, client secret and dataset id.

The dataset must have the following metadata :
* my_nps : a NPS score
* my_store : a string containing the name of each store

# Available Scripts

* yarn install
* yarn start
* yarn build