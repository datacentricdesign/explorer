# DCD Lab Angular Template

Requirements: NodeJS

## Get Started

Fork and clone this repository on your machine, and open the folder in an IDE such as VS Code. In the IDE, open a Terminal Window and type in:

```sh
npm install
npm start
```

Go to [http://localhost:4200/myapp](http://localhost:4200/myapp) to see the app in action.

## What's in it?

This repo contains an Angular skeleton for a Bucket Web application.

- Top structure: generic app component / routes / module / service (include service for the settings and token for the oauth2 'code' flow)

- **public module**: Public part of the web app (including landing page with login button)
- **myapp module**: Private part of the web app (including Dashboard as a logged-in home page)
    - Bucket service to access Bucket resources
- **shared module**: the auth guard to ensure private pages remain private, and some UI components provided with the template

- Theme by Creative Tim: Paper Dashboard Angular - v2.1.0 ([https://www.creative-tim.com/product/paper-dashboard-angular](Theme Page))

## Requesting your client app

Once you have played around and taken your mark, you must request a client app by email at lab@datacentricdesign.org. (You will not be able to deploy your app with the example client). Your request should include the following information:

- App Name
- App description
- App URI
- App logo URI
- Owner name (or person or organisation) and email address
- Link to Privacy Policy
- Link to Terms of Services

We will send back to you a setting to update src/config.json. You might also search and replace 'myapp' with a more fitting name for your web application.

## Deployment

For deployment, we suggest serving your app with Nginx in a Docker container.

- Install Docker and Docker compose on your server
- Clone your app repository on your server
- Create a .env file in the root folder (on the server) and adapt the example.env file to your need

Once your setting is ready, run the docker-compose command:

```
docker-compose up
```

Note that this setting does not include any SSL support. We expect you to deploy this service behind a reverse proxy dealing with SSL (among other things) for all your server applications.