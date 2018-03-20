import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express()
app.use(bodyParser.json());

app.post('/run', (req, res) => {
    let payload = (req.body || {}).value;
    let id = payload.id;

    let result;
    if (id == 'nheidloff') {
        result = {
            'output-read-person-profile': {
                "firstName": "Niklas",
                "lastName": "Heidloff",
                "id": id,
                "phone": "",
                "email": [
                    {
                        "type": "office",
                        "address": [
                            "abc@gmail.com",
                            "asasfddafdfafabc@gmail.com"
                        ]
                    },
                    {
                        "type": "home",
                        "address": [
                            "wryiuwradsfabc@gmail.com",
                            "hwqrafdasfjabc@gmail.com"
                        ]
                    }
                ]
            }
        }
    }
    else {
        result = {
            'output-read-person-profile': {
                "firstName": "Mark",
                "lastName": "Mueller",
                "id": id,
                "phone": "+49000000000",
                "email": [
                    {
                        "type": "office",
                        "address": [
                            "aaaaaaaaaaaaa@gmail.com",
                            "bbbbbbbbbbbbb@gmail.com"
                        ]
                    },
                    {
                        "type": "home",
                        "address": [
                            "cccccccccc@gmail.com",
                            "dddddddddd@gmail.com"
                        ]
                    }
                ]
            }
        }
    }
    res.status(200).json(result);
});

app.post('/init', function (req, res) {
    res.status(200).send();
});

app.listen(8080, () => console.log('Listening on port 8080'))


/* Input: Sample JSON and Schema

{
    "id": "nheidloff"
}

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    }
  },
  "title": "Schema Input of read-person-profile"
}

*/


/* Output: Sample JSON and Schema

{
    "firstName": "Niklas",
    "lastName": "Heidloff",
    "id": "28",
    "phone": "+49000000000",
    "Email": [
        {
            "type": "office",
            "address": [
                "abc@gmail.com",
                "asasfddafdfafabc@gmail.com"
            ]
        },
        {
            "type": "home",
            "address": [
                "wryiuwradsfabc@gmail.com",
                "hwqrafdasfjabc@gmail.com"
            ]
        }
    ]
}

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "phone": {
      "type": "string"
    },
    "Email": {
      "type": "array",
      "items": {
        "properties": {
          "type": {
            "type": "string"
          },
          "address": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "type": "object"
      }
    }
  },
  "title": "Schema Output of read-person-profile"
}

*/