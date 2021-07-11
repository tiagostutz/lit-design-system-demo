# Lit Design System Components Demo

The classic **To Do Application** demo project showing Lit components with basic Design System and a very "vanilla" approach on component construction to show that it is possible to play with the foundations of JS and HTML in componentizationa and give an overview on how things happen under the hood.

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

## Project Structure

This project, besides the Lit Web Component demo part, emulates kind of how would it be to build (or extend) a Design System, so the **src** folder has a **design-system** folder that would be an external module in production grade applications. But, for the sake of simplicity, the design system components are in the same code base here but within this specific folder.
