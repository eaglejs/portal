# Portal a garage door application using Raspberry Pi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Use Case
If you are absent-minded like me, I tend to leave the house and forget to close my garage door. I also hate keeping those blocky remotes on my person if I'm riding a motorcycle, or sometimes I even lock myself out of the house... What if you could setup a server for a resonable price, easy to install and you can open/close your garage door from anywhere?

## What it does
This Application is meant to be used on your mobile device (i.e., phone, tablet, etc.) as well as a browser on a PC. You can use it to open/close your garage from anywhere. I am currently working on this in such a way that you can add an unlimited number of garages.

## This is a work in progress
This Application is currently a work in progress and is not ready for use in your home just yet. I too want to have this working in my garage.

## Initial Setup of your raspberry pi
This setup requires you to have Ubuntu Arm64 18.04 flavor of linux.

### This application requires the installation of the following:
    - docker, docker-compose

## Setup your node Application.

### To install and run:
`docker-compose up`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## ToDo(s)
- Create a way to reset your password.
- Create a user profile and dashboard that you can change/update your password.
- Create an ability to add garages.
