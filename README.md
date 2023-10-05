# Admin UI

Hey there! This is a simple Admin User Interface I put together using React and Material-UI. It's got some cool features like pagination, easy editing, and deleting options, plus a handy search bar!

## About this Project

I developed this Admin UI to address the requirements of the Geektrust challenge. The main features of this UI include:

- Pagination for managing a large dataset.
- Edit and delete buttons for individual entries.
- In-memory operations for edit and delete functionality.

Feel free to raise a PR if you find any bugs.

## Project Requirements (from [Geektrust Challenge](https://www.geektrust.com/coding/detailed/admin-ui))

📋 **User Interface Requirements**

1. Column titles must stand out from the entries.
2. A search bar should be available for filtering based on any property.
3. Rows should be editable and deletable in-place (in-memory operations only).
4. Pagination should be implemented, with each page containing 10 rows. Pagination buttons should dynamically adjust based on search/filtering results.

🔄 **Data Handling**

- Users are provided via an API and are sorted by their `id` field (no alphabetical sorting).
- API Endpoint: [Users API](https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json)
- Request Type: GET

🖱️ **Row Selection**

- Users should be able to select one or more rows. A selected row will be highlighted with a grayish background.
- A checkbox in the top left allows for quick selection or deselection of all displayed rows (limited to the current page).

🗑️ **Bulk Deletion**

- Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deploying to Netlify: A Student's Guide

Alright, so I'm gonna walk you through how I got this project up and running on Netlify. It's actually pretty straightforward:

1. **Sign Up on Netlify**:

   - First things first, you'll need a Netlify account. So, go ahead and [sign up](https://app.netlify.com/signup) if you haven't already.

2. **Connect to GitHub**:

   - In the Netlify dashboard, there's this cool button that says "New site from Git". Click on that.
   - You'll need to connect your GitHub account. Don't worry, it's safe and sound.

3. **Pick Your Repo**:

   - Once you're connected, you'll see a list of your GitHub repositories. Choose the one you want to deploy.

4. **Configure Build Settings**:

   - Okay, here's a bit of tech stuff. In the deploy settings, you wanna set the build command to `npm run build` and the publish directory to `build`. This makes sure everything gets set up right.

5. **Deploy Away**:

   - Click on that "Deploy site" button and watch the magic happen! Netlify will take care of the rest.

6. **Voilà!**:
   - Once it's done, your project will be live. They'll give you a special link to see it in action.

That's it! You're officially a deploy master now. If you have any hiccups, don't hesitate to hit me up.

## Live Demo

Check out the live version of this project: [Admin UI Live Demo](https://adminui-5cba6f.netlify.app/)

## Screenshots

These are the screenshots of my project.

### Homepage

![homepage](https://github.com/AbhinavChandurkar/AdminUI/assets/62837490/bb1317d5-93c6-4541-85f2-ea043687a2e6)

### Last Page

![lastpage](https://github.com/AbhinavChandurkar/AdminUI/assets/62837490/7b2673bf-5fca-4e01-9a8f-f7d0ee97719c)

### Multiple Selection

![multipleselect](https://github.com/AbhinavChandurkar/AdminUI/assets/62837490/d245925a-a24d-4bb3-bd8f-923ef90ee627)


### Search Functionality

![search](https://github.com/AbhinavChandurkar/AdminUI/assets/62837490/be70b133-9eaf-41fb-92fb-3564ae147a73)


### All Data Deleted

![alldatadeleted](https://github.com/AbhinavChandurkar/AdminUI/assets/62837490/9975d02e-e372-43bd-968b-a123b6dac749)


### Edit Functionality

![editclick](https://github.com/AbhinavChandurkar/AdminUI/assets/62837490/fad4efb2-8bc1-4ef3-b37a-ff0514325ad5)


## Contact Me 📬

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/abhinav-chandurkar-023126193/)!
