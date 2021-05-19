![WATER REMINDER](.github/readme.png)

# Water Reminder

[![Maintainability](https://api.codeclimate.com/v1/badges/706d0ce70c31e3977832/maintainability)](https://codeclimate.com/github/Cauaspinheiro/water-reminder-2/maintainability)

Water Reminder is a desktop app using electron to remember the user to drink water periodically.

At the moment the only supported language is pt-br.

## Features

- Hide to tray when closed
- Open on startup
- Notify when you need to drink water
- Calculate how much water you drink every day and week
- Counts the total water drank by you on the app

## Screenshots

### Full app

![app](.github/app.gif)

### Home Page

![home](.github/home.png)

### Config Page

![config](.github/config.png)

## Usage

At the moment, only the windows version is available for download, if you have a different OS, you need to install the project and build in you own machine, for this, please see [Installation Guide](#installation)

Windows .exe file: https://drive.google.com/file/d/1ytXrVLtX0uCew_y0hqAtN8FVOS1Og2lS/view?usp=sharing

## Installation

You will need some tools to run the project locally. If you just want to access the app, see the topic [Usage](#usage)

### GIT

- Install git on your machine: https://git-scm.com/downloads
- With git installed on your machine, clone the repository using the **Code** button at https://github.com/Cauaspinheiro/water-reminder-2

### NodeJS

- Download the LTS version of the node at https://nodejs.org/en/
- To test whether node is installed on your machine, run the following `node -v` command. The NodeJS version should appear

### Installing the packages

- Inside the project folder, run the following command: `npm install`

---

**Well done!** You can now start using the app, go to the [Scripts](#scripts) tab to see which scripts are available for use

## Scripts

All of these scripts can be run on your machine using npm

### dev

```shell script
npm dev
```

Runs the application locally

### build

```shell script
npm build
```

Builds the application executable for your OS

## Used Tools

### Nextron

Combined tools to build Next.js applications into Electron

Link: https://github.com/saltyshiomix/nextron

### TailwindCSS

A utility-first CSS framework packed that can be composed to build any design, directly in your markup.

Link: https://tailwindcss.com/

### Framer Motion

A production-ready motion library for React.

Link: https://www.framer.com/motion/

### Others

You can see all the project's dependencies at the following link: https://github.com/Cauaspinheiro/water-reminder-2/network/dependencies

## Naming Conventions

For better separation and understandability, I use these naming conventions in this project:

React Logic: camelCase

Everything else: snake_case
