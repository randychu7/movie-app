This is for those interested in how the database works. If you're not interested, feel free to skip this section.

## Under the Hood - How the Database Works

The database is built using Firebase Firestore. Each team has a unique collection that is created when the app is loaded. It is created using the team name that you provide in the `movies-api.js` file.

<!-- Add firebase-database.png as an image -->
[![Firebase Database](images/firebase-database.png)](images/firebase-database.png)

This is made possible by the `FirebaseDatabase` class in the `firebase-config.js` file. This class is initialized with the team name and creates an object with a fetch() method that is meant to mimic the fetch() method that students are already familiar with.

```js 
let db = new FirebaseDatabase({
    team: "YOUR_TEAM_NAME" // Replace this with your team name
});
```
```js
class FirebaseDatabase {
    constructor({ team }) {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this.collectionName = `movies_${team}`;
        this.createCollection(`movies_${team}`);
    }
    ...
}
```
This ensures that, although the database is shared, each team has their own collection of movies by appending their team name to the collection name. For example, if the team name is "team1", the collection name will be "movies_team1".

The `fetch()` method, as previously mentioned, is meant to mimic the normal javascript `fetch()` API, and validates the parameters passed to it to ensure that it is being used correctly. It even requires that the response be parsed as JSON before it is returned. 

Example of a request:
```js
const url = '/movies';
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
db.fetch(url, options).then(response => response.json()).then(data => console.log(data));
```
How it's done under the hood:
```js
class FirebaseDatabase {
    ...
    async fetch(url, options) {
        let response, id;
        // Validate options object
        if (!options || !options.method || !options.headers) {
            throw new Error('The options object must include a `method` and `headers` property.');
        }
        if (options.body && typeof options.body !== 'string') {
            throw new Error('The `body` property of the options object must be a string.');
        }
        if (options.body && !options.headers['Content-Type']) {
            throw new Error('The `headers` property of the options object must include a `Content-Type` property.');
        }
        switch (options.method) {
            case 'GET':
                if (url === '/movies') {
                    const snapshot = await this.db.collection(this.collectionName).get();
                    // add the id of each document to the data
                    response = snapshot.docs.map(doc => {
                        const data = doc.data();
                        data.id = doc.id;
                        return data;
                    });
                } else {
                    const id = url.split('/')[2];
                    const doc = await this.db.collection(this.collectionName).doc(id).get();
                    // add the id of the document to the data
                    response = doc.data();
                    response.id = doc.id;
                }
                break;
            case 'POST':
                // check to make sure there isn't a document with the same title
                const checkSnapshot = await this.db.collection(this.collectionName).get();
                const checkDocs = checkSnapshot.docs;
                const titles = checkDocs.map(doc => doc.data().title);
                if (titles.includes(JSON.parse(options.body).title)) {
                    throw new Error(`A movie with the title "${JSON.parse(options.body).title}" already exists.`);
                }
                // add the document
                await this.db.collection(this.collectionName).add(JSON.parse(options.body));
                // get the id of the document just added
                const snapshot = await this.db.collection(this.collectionName).get();
                const docs = snapshot.docs;
                id = docs[docs.length - 1].id;
                response = {id};
                break;
            case 'PUT':
                id = url.split('/')[2];
                await this.db.collection(this.collectionName).doc(id).update(JSON.parse(options.body));
                response = {};
                break;
            case 'DELETE':
                id = url.split('/')[2];
                await this.db.collection(this.collectionName).doc(id).delete();
                response = {};
                break;
            default:
                throw new Error(`Unsupported method: ${options.method}`);
        }

        return Promise.resolve({
            json: () => Promise.resolve(response)
        });
    }
}
```

Depending on the method and url passed to the `fetch()` method, it will perform the appropriate action on the database. For example, if the method is "GET" and the url is "/movies", it will return all movies in the collection. If the method is "POST" and the url is "/movies", it will add a new movie to the collection. If the method is "PUT" and the url is "/movies/{id}", it will update the movie with the given id. If the method is "DELETE" and the url is "/movies/{id}", it will delete the movie with the given id.

This allows students to focus on learning how to **use the database**, and allows instructors to handle the configuration necessary to organize the tables in single, accessible resource for the class.