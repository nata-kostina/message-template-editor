# Message Template Editor
This is a widget that creates message templates. The input parameters are the data about the message receiver, for example his first name, company he works at, or his position. The user can create if-the-else conditions to cover the situations when the data of the receiver are unknown. The user can also see how the message looks like with the particular variables.
## Demo

Here is a working live demo: [https://message-template-editor-kostsina.netlify.app/](https://message-template-editor-kostsina.netlify.app/)
## Features
- message editor
- splitting message with if-then-else block
- message preview
- save message in local storage
- upload template from local storage
- animation
- store state at Context API
- React hooks
## Built With  

- [Typescript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript.
- [React](https://reactjs.org/) - a JavaScript library for building user interfaces.
## Getting Started

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com/)) installed on your computer. From your command line:

```
# Clone this repository
$ git clone https://github.com/nata-kostina/message-template-editor.git

# Install dependencies
$ npm install
  
# Run the app
$ npm run start
```
## Usage
1. Click button "Message Editor".
2. Enter message. If you want to add variable, choose it from the list.
3. Place cursor where you want to add the condition.
4. Click "IF-THEN-ELSE" button.
5. Add variable in to the IF-block.
❗ Do not type any logical operators in the IF-block, only variables from the list are allowed. If the value for the variable exists, THEN-block will be run. If it does not exist, ELSE-block will be run.
[![message-editor.jpg](https://i.postimg.cc/k5BZ4NXt/message-editor.jpg)](https://postimg.cc/VSP4ZCtY)
6. Click "Preview" button to see the result.
[![message-preview-1.jpg](https://i.postimg.cc/J7cTRYc2/message-preview-1.jpg)](https://postimg.cc/Dm0QggNr)
7. Enter some variables in the preview.
[![message-preview-2.jpg](https://i.postimg.cc/59nwPhmb/message-preview-2.jpg)](https://postimg.cc/PNvpJFcR)
8. Close preview.
9. Save the template.

## Contacts
- Email: natakostina123@gmail.com
- LinkedIn: [https://www.linkedin.com/in/nata-kostsina/](https://www.linkedin.com/in/nata-kostsina/)
- Telegram: @kostinata