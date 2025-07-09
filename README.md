# Book Management API

A simple RESTful API to manage a personal digital library, built with Node.js, Express, and MongoDB. This project reinforces the fundamental patterns of backend development, including full CRUD operations and database interaction.

---

## Core Features

- ✅ **Create:** Add a new book to the library.
- ✅ **Read:** Retrieve a list of all books or a single book by its ID.
- ✅ **Update:** Modify the details of an existing book.
- ✅ **Delete:** Remove a book from the library.

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Environment Variables:** `dotenv`
- **Version Control:** Git & GitHub

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/books` | Retrieve all books. |
| `GET` | `/books/:id` | Retrieve a single book by ID. |
| `POST` | `/books` | Create a new book. |
| `PUT` | `/books/:id` | Update an existing book. |
| `DELETE`| `/books/:id` | Delete a book. |

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/MR-Ghavidel/book-api.git](https://github.com/MR-Ghavidel/book-api.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd book-api
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
5.  Start the server:
    ```bash
    node index.js
    ```