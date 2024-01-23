import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "jhonatanNascimento";
const yourPassword = "12345";
const yourAPIKey = "450c43d9-a7dd-4b42-b422-f62a9591ff33";
const yourBearerToken = "03def607-d806-443d-9404-30708be850d4";

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
    //TODO 2: Use axios to hit up the /random endpoint
    const response = await axios.get(
        "https://secrets-api.appbrewery.com/random"
    );

    const content = response.data;
    res.render("index.ejs", { content: JSON.stringify(content) });
    //The data you get back should be sent to the ejs file as "content"
    //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
    //TODO 3: Write your code here to hit up the /all endpoint
    const response = await axios.get(
        "https://secrets-api.appbrewery.com/all?page=2",
        {
            auth: {
                username: yourUsername,
                password: yourPassword,
            },
        }
    );

    const content = JSON.stringify(response.data);
    res.render("index.ejs", { content });
    //Specify that you only want the secrets from page 2
    //HINT: This is how you can use axios to do basic auth:
    // https://stackoverflow.com/a/74632908
    /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
    //TODO 4: Write your code here to hit up the /filter endpoint

    const response = await axios.get(
        `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`
    );

    const content = JSON.stringify(response.data);

    res.render("index.ejs", { content });

    //Filter for all secrets with an embarassment score of 5 or greater
    //HINT: You need to provide a query parameter of apiKey in the request.
});

const config = {
    headers: { Authorization: `Barer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
    //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
    try {
        const response = await axios.get(
            "https://secrets-api.appbrewery.com/secrets/42",
            config
        );

        const content = JSON.stringify(response.data);
        res.render("index.ejs", { content });
    } catch (err) {
        res.render("index.ejs", { content: err.message });
    }
    //and get the secret with id of 42
    //HINT: This is how you can use axios to do bearer token auth:
    // https://stackoverflow.com/a/52645402
    /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
