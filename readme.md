### Objective
Find the oldest quote on the [quotes server][quotesServerDocs]

### Parameters
Actually only 10 pages of data
Imagine if there was a TB

### Psudeocode
```
// get the first page
// parse dates & find oldest
// compare with the current overall oldest
// if there's a next link, call that and repeat

// when you're at the end of the pages, there's no next link
```

### Environment Setup
Copy this snippet:
```
jwt=<YOUR_JWT>
quotesBaseUrl="https://candidate.commonroom.builders"
```

Then run in this directory:
```bash
pbpaste > .env
```

### Running the Code
```
node --env-file .env src/utils/apiClient.js
```

### Dependencies

[Quotes Server Documentation][quotesServerDocs]

An API Key was provided
```json
{
"header": {
    "alg": "HS256",
    "typ": "JWT"
},
"claims": {
    "sub": "hnsvill@gmail.com",
    "jti": "01K329VBNJQZN5EKBFCJSA8RAA",
    "iat": 1755645324,
    "nbf": 1755645324,
    "exp": "2025-08-19 19:15 PST",
    "https://candidate.commonroom.io/assessment": "pairing",
    "scope": "quotes analysis:earliest assessment"
}
}
```


[quotesServerDocs]: https://candidate.commonroom.builders/api-docs/index.html?javascript#quotes