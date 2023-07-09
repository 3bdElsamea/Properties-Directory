README

# Properties Directory

## Introduction
Properties Directory is a comprehensive system consisting of an Admin Dashboard and a Website designed to facilitate the management of properties, offers, requests, and user interactions. It provides a user-friendly interface for both system administrators and website users. The system aims to streamline property listing, request submission, and communication between customers and employees. This README provides an overview of the project structure and functionality.

## Project Structure
The Properties Directory project is divided into two main components:

1. Admin Dashboard: This component is accessible by system administrators and employees responsible for managing the system. It offers various features for user account management, roles management, property and request management, settings configuration, chat functionality, and reporting.

2. Website: The website component caters to users accessing the system through a web browser. It provides a platform for browsing properties, submitting requests, and engaging with employees through chat and contact forms.

## Functionality Overview

### Admin Dashboard

1. Roles Management
   - Enables the super admin/employee to manage employee roles and permissions, including adding, editing, deleting, and searching roles with assigned dashboard access permissions.

2. Employees Management
   - Facilitates the management of dashboard employees, including adding new employees, assigning roles, editing, blocking, and searching existing employees.

3. Setups
   - Contains dynamic modules for setting up entities used in system processes (e.g., countries, cities, property catergories). Allows adding, editing, deleting, and searching existing entities.

4. Properties Listing
   - Enables adding, editing, deactivating, and searching properties. Each offer contains general information, owner's information, basic information (title, type, purpose, price, size, build year, description, gallary contains its images).

5. Properties Requests
   - Allows super admin/employees to list, browse, and search properties' requests submitted through the website. Offers viewing details.

6. General Settings
   - Manages system settings for the website and the dashboard, including website images, system title, system logo, and date format.

7. About Us
   - Provides an overview of the company, including its history, mission statement, values.

8. Customers
   - Lists, browses, and searches website users, displaying relevant details.

9. Chat
    - Enables real-time messaging between customers and employees. Customers can send text messages. Employees can reply to messages.

10. Notification
    - System administrators receive real-time notifications when a user makes a request for a property and when a cutomer send a message (chat).

11. Contact Us
    - Contains a list of visitor/user-submitted questions, comments, or feedback to system administrators.

12. Dashboard Statistics
    - Provides analytics on the properties listed in the system, including information on requests, employees, and customers.

13. Reports
    - Generates reports on user (customer/employee) logs.

### Website
1. Anonymous Access (Skip Login)
   - Allows visitors to navigate the website and view the system's major business values without requiring a login (except making a request for a property).

2. User Account Management
   - Provides account management features such as editing account details (email, name,...), changing passwords and updating profile picture.

3. Home
   - Presents a clean and simple design, focusing on page content. Includes sections such as major function sections (header with search by title for a property, about us and statistics, categories, last added properties).

4. Properties
   - Offers search and filtering options for property offers based on criteria like property type, purpose, location, size, and price, making a request for a property.

5. Chat
   - Enables real-time messaging between users and employees through text messages.

6. My Properties Requests
   - Displays a list of user-submitted requests, providing details and updates for each request.

7. About Us
   - Presents an overview of the company, including its history, mission statement.

8. Contact Us
   - Provides a contact form for visitors or users to submit questions, comments, or feedback to system administrators or the customer support team.

## Repo Structure:
1. [Front-end branch (default)](https://github.com/3bdElsamea/Properties-Directory/tree/frontend)
2. [Back-end branch](https://github.com/3bdElsamea/Properties-Directory/tree/backend)

## How to Run:
Run these commands step by step

```
git init
```

```
git clone https://github.com/3bdElsamea/Properties-Directory.git
```

```
npm install
```

```
npm start
```


## Front-end Team:
1. [Lamis Tarek](https://github.com/LamisTarek)
2. [Asmaa Abd ELhalem](https://github.com/asmaa388)
3. [Enas Gamal](https://github.com/enasgamal9)


Please note that the above feature list is a high-level overview of the functionality provided by the Properties Directory system. For more detailed information, please refer to code files.