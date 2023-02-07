# Fifth Wheel Automobile Searcher

## Introduction

This project started as a coding assessment from another interview. It asked to make a backend API with an authentication layer and two endpoints. The coding prompt can be viewed in the `BE` directory under `PROMPT-API.md`. There is also a README specifically for the API labelled as `README-API.md`.

In order to further show my capabilities, I added a frontend using Vite to create a React app. In it, I incorporated React-Hook-Form, MUI, and React-Query.

NOTE: As much as I wanted to host this on Stackblitz for convenience, I couldn't properly link the front and backend simaltaneously. I can speak about this issue during the interview, if requested.

#

## Requirements

- npm
- node.js

#

## Installation

1. Open terminal
2. `git clone https://github.com/dqveha/FifthWheel.git`
3. `cd FifthWheel`
4. `npm install`
5. `npm run install-both`
6. `npm run dev`
7. View `http://127.0.0.1:5173/` in internet browser

NOTE: Step #5 and #6 uses a dependency called `Concurrently` to run script commands from the different package.json (BE and FE)

#

## FAQ

**Q: Shouldn't the POST /search endpoint be using GET instead?**

**A:** I wholeheartedly agree that it should be a GET method. Initially when the backend was tested through Jest/Supertest, it allowed a request body to be inserted in a GET method and would get through the middleware without a problem. When the frontend started getting implemented, it wouldn't recognize the request body and would show up an empty object unless it was a POST method.

Ideally, a secure JWT exchange would be done to create this exchange without sending the username and password within the request body. For the sake of the project's simplicity, I opted to not do this.

**Q: If running `npm run dev` in the root directory doesn't work, what can I do instead?**

**A:** Open two terminals where each terminal respectively goes into the BE and FE directory. In each directory, run `npm install` and then `npm run dev`. You can then view the application by entering `http://127.0.0.1:5173/` in your internet browser.

#

### Respectfully Submitted: Dave Lindqvist, 02.06.2023
