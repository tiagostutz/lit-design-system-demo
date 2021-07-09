# Lit Design System Components Demo

The classic **To Do Application** demo project showing Lit components with basic Design System

> This project was scaffolded with `npm init @open-wc` - [Open Web Components](https://open-wc.org/) using NodeJS v.14

## Getting started

Go to the **lit-app** folder and run

```bash
yarn install
```
and then

```bash
yarn run start
```

This will start the project in development mode and will open on the browser the application running.

### Storybook

To check the storybook of components, run:
```bash
yarn run storybook
```

### Running production code
To run a production code you have two options:

Preview with web-dev-server:
```bash
yarn run start:build
```

Docker image with NGinx
```bash
docker-compose up --build
```