
## Introduction
Advanced Rescue Communication (ARC) is an innovative platform designed to streamline the process of evacuation during emergencies, built using modern web technologies including Redux for state management and Bootstrap for responsive design.

## Tech Stack

- **Frontend:** The user interface is built with Bootstrap, ensuring a responsive and mobile-friendly experience.
- **State Management:** Redux is used for managing the application's state, providing a predictable state container across the platform.

## Getting Started

### Prerequisites

Before you start, ensure you have the following prerequisites installed:

- **Node.js**: You'll need Node.js to manage the client-side of the application. You can download it from [nodejs.org](https://nodejs.org/).

- **Python**: The server-side of the application uses Python. Ensure you have Python installed.

- **Pipenv**: Pipenv is used to manage Python dependencies. You can install it via pip:

  ```bash
  pip install pipenv

## Installation

1. Clone the repository
2. Navigate to the project directory and then into the server directory
3. Install the server-side dependencies using <code>pipenv install</code> and activate the virtual environment using <code>pipenv shell</code>
4. Run <code>python app.py</code> for port 5555
5. In another terminal, navigate to the project directory and then into the client directory
6. Run <code>npm install</code>
7. Run <code>npm start</code> for port 3000

## Features

- **Account Creation and Sign-in:** Users can create a new account or sign in with existing credentials.

- **Profile Management:** Users can update their profile with a picture and change their agency affiliation as required, with changes being handled smoothly through Redux.

- **User Directory:** A comprehensive list of all users, facilitated by Redux for real-time updates, along with their contact emails for efficient communication.

- **Evacuation Addresses:** A navigation bar lists all addresses requiring evacuation along with their current status, beautifully styled with Bootstrap and dynamically updated with Redux.

- **Status Update:** Users can update the evacuation status of an address by clicking on the colored circle, with each color representing a different status, managed by Redux for immediate reflection across the platform.

- **Residence Details:** Clicking on an address provides detailed information about the occupants, managed with Redux to ensure data consistency and real-time updates.

- **Notes:** Users can add critical notes to each house, which are immediately dispatched through Redux to all concerned parties.

## Usage
1. Sign up for an account or log in.
2. Complete your profile setup using our user-friendly Bootstrap forms.
3. Use the Redux-powered user directory and evacuation list to start managing evacuation efforts.
4. Update statuses and add notes efficiently with immediate synchronization across the platform.

## Support
For any technical issues or support, please contact cherise.foster@outlook.com

## Contribution
No contributing at this time. For questions, please reach out to cherise.foster@outlook.com

## License
No licensing available at this time.