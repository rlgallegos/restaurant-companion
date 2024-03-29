# The Restaurant Companion

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Notes On Testing](#notes-on-testing)
- [Key Features](#key-features)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

**The Restaurant Companion** is a web application designed to facilitate better communication between restaurants and their guests. It empowers restaurants to easily display their menu items along with associated allergy information. At the same time, it allows guests to navigate the menu, filter items based on their allergies, and even translates the menu and allergy information into various languages.

## Technologies

The project leverages a stack of technologies to deliver its functionality:

- **Frontend**: JavaScript, React.js
- **Backend**: Python, Flask
- **Database**: PostgreSQL, SQLAlchemy
- **Payment Integration**: Stripe API
- **Validation**: Formik, Yup (Frontend), Bcrypt (Backend)
- **Translation**: Googletrans

## Notes On Testing
  - All Data is randomly seeded specifically to show functionality, so allergy / dietary information may be incorrect / illogical 
  as a result (Vegan Ribeye, for example).
  - To pass test credit card validation via Stripe's API, per their documentation, the credit card entered must be 4242-4242-4242-4242.
  - There is an additional path intentionally separated from the main app at path "/server". This path is intended to be used by servers 
  who have access to it behind the scenes in the form of a QR Code. There, the server can input the code provided to the guest upon them submitting 
  their order for translation. The server receives at this path, using this code, the translated version of the guests' order.

## Key Features

**The Restaurant Companion** offers a range of key features for both restaurants and guests:

- **Restaurant Management**:
  - Full CRUD (Create, Read, Update, Delete) capabilities for menu items, allergies, and user accounts.
  - Subscription management using the Stripe API.

- **Guest Experience**:
  - Menu navigation with allergy filtering.
  - On-the-fly translation of menu items and allergy information into multiple languages.
  - Generation of unique order numbers for easy communication with restaurant staff.

## Installation

To run this project locally, ensure you have all the necessary dependencies listed in the `piplock` file (for Python) and the `package.json` file (for JavaScript). You can install these dependencies using package managers like pip and npm.

## Third-Party Integrations and APIs

**The Restaurant Companion** integrates with the following third-party services and APIs:

- **Stripe API**: Used to manage subscription services for restaurants.
- **Googletrans Library**: Enables real-time translation of menu items and allergy information into multiple languages.

## Contributing

Contributions and issue reports are welcome! You can contribute to the project or report any issues by reaching out through the following channels:

- **LinkedIn**: [Connect with Me](https://www.linkedin.com/feed/)
- **Email**: rlgallegos85@gmail.com

## License

This project is open-source and currently has no licensing agreement. You are free to explore, modify, and distribute the code as needed.

## Contact Information

You can get in touch with me and explore more of my work through the following links:

- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/feed/)
- **GitHub**: [GitHub Profile](https://github.com/rlgallegos)
- **Email**: rlgallegos85@gmail.com

## Future Plans and Features

I have exciting plans for the future of **The Restaurant Companion**:
- Expanding subscription options with Stripe.
- Allowing users to personalize menus by adding images and more.

## Acknowledgments

I would like to express my gratitude to the following individuals for their valuable support, ideas, and constructive feedback during the development of **The Restaurant Companion**:

- [mins6649](https://github.com/mins6649)
- [funky-dolphin](https://github.com/funky-dolphin)

Your contributions have played an essential role in shaping this project. Thank you for your dedication and collaboration!