# Lorcana Deck Tracker
A Disney Lorcana deck tracking website made with Angular and .NET Core

## Table of Contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Status](#status)

## General info
This project is purely for showing my skills with Angular and .NET Core (C#). The application itself is a website where Disney Lorcana card collectors can add their collected cards, view their progress and track how much their current deck is worth.

## Technologies
Various technologies have been used to realise this project. Let's separate them by back-end and front-end:

### Back-end
- .NET Core 7.0 with C# 11.0
- SQL with Entity Framework Core 7.0

### Front-end
- Angular 15.1.0 with Typescript 5.3.3
- Bootstrap
- HTML & CSS

## Features
The application contains a lot of features that you would expect a deck tracking application has. Let us look at all the features in detail here:

### Authentication
Users can register and login with their credentials to gain access to extra features.

### Mailing Service
The application has a built in mailing service which sends mails to the user when:
- Creating a new account
- Password has been forgotten
- Resetting your current password

### Database
User accounts, cards and all of their details are saved in a database. Collectors can easily update or delete this data. This way the application can support an enormous amount of users and cards and makes sure the correct data types are used when adding or updating data.

### CRUD Card
Dealers can add their cards easily by choosing the correct card out of the existing list of Disney Lorcana cards.

### Client Side Filtering & Searching
When listing cards, filters can be applied so searching is made easier. There is also the possibility to search freely with the help of a search bar.
Next to these 2 functionalities, the user can also sort the list.

## Setup
TODO

## Status
This project is currently in progress.
