# RNboilerplate

This is simple boilerplate creator for React-Native project including TypeScript and folders structures used in ZeroToOneLabs company.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before the installation you will need yarn installed on your computer.

```
$ brew install yarn
```

### Installing

The installation process is quite easy. Clone this repo to your local machine and open folder in terminal, then install dependencies.

```
$ yarn install
```

### Usage

Without any specifications

```
$ gulp create --name name-of-a-project
```

With particular react-native verion. Example:

```
$ gulp create --vers 0.56.0 --name name-of-a-project
```

This will create a project inside the folder. Project will contain TypeScript and folder 'src' which will contain following folders with index.ts inside: api, augmentations, components, hocs, router, screens, stores, types, typings, utils.
