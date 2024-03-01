# Posterr

## Installation
 - cd app/
 - npm install

 ## Run the project
 - npm run serve
  To serve the mock data

 - npm run dev
  To run the project in development mode

 ## Stack used
  ReactJs, React Query, JavaScript, Tailwindcss

 ## Info
  The serve.js file is been used as the data for the project, with json-server we can emulate a server and trigger requests towards it.


## Planning
  Questions:
  - This would be a whole new page, with route?
  - When add the "@" sign and start to white the username, should open a dropbox with the matched users?
  - How should be the items of this dropbox and what information should it show?
  - After this post is created, should be the same information as the common posts?

  Implementation:
  - Create new fields in the data about the post, to be able to register the mention to the user and the user id
  - On the API, add a filter to separate common posts from the specific posts for this new page
  - On the front end, create a new page for the mentions posts, apply the new design for the post, change the post
    component to be able the reuse the common code and pass props to apply the changes for the new design

## Critique
  Improvements:
  - With more time, I would create a State management store to share the current user info
  - Apply changes to some components and create new components to be able to reuse part of the code
  - Install a UI library, maybe shadcn, but for this would be need to use TypeScript and the requirements ask to use JS
  - Create pagination for the posts list

  Scalability:
  - In the Front End, use of the TypeScript would avoid mistakes in development time and improve the documentation of the code.
    With the improvements list above the scalability would be possible
  - In the Back End, would be necessary to create good APIs that could return the data prepared to be used as the Front End need
    that way would avoid unnecessary logic in the Front End, also the cloud services should be created expecting the high use,
    with a load balance for the servers and a automatic scale.


# React + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
