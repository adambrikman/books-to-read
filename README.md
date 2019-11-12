<!-- TITLE/ -->
<h1>Books-to-Read</h1>
<!-- /TITLE -->

<!-- DESCRIPTION/ -->

Books-to-Read is a full-stack app to help keep track of which books in your personal library need to be read (and update their status to 'read' after finished)!

This project uses React for the front-end, Node on the backend and MongoDB for the database.

<!-- /DESCRIPTION -->

<!-- Download/ -->
<h2>Download</h2>

<code>git clone https://github.com/adambrikman/books-to-read</code>

<!-- /Download -->

<!-- Install -->
<h2>Install</h2>

Once downloaded, after navigating to the downloaded file, in your command prompt/terminal/code editor, run the following commands to install all dependencies for the front and backend:

<code>cd client/</code>

<code>npm i</code>

<code>cd ..</code>

<code>npm i</code>

After this, create a .env file containing the following two items:

<code>MONGO_URI=mongodb://localhost/books-to-read</code>

<code>REACT_APP_BASE_URL=http://localhost:3000</code>

Note: You can include your own Mongo URI from mongoDB Atlas if you'd like to host the project. However, utilizing localhost within for MONGO_URI allows you to use the app locally.

To start the project, run the following script in your terminal:

<code>npm run dev</code>

That's it! The project is up and running. Visit the http://localhost:1234 to begin using it!

<!-- /Install -->

<!-- Usage/ -->
<h2>Usage</h2>
This app consists of the following pages: Home, Authors, Add Authors, Books to Read, Finished Books, Add Books, View Author and View Book.

### Home

The application first opens on the home page, which displays the books that have been recently added to the app.

### Add Authors

This page allows you to add an author to the application. You are required to add an author before you are permitted to add a book.

### Authors

The authors page allows you to do the following:

- Search through the authors in the application
- View the author's page
- Edit the author's name
- Delete the author

(Note: Author's can only be deleted if they do not have books!)

### Author Page

This page displays the author's name, buttons to edit and delete the author and all of the books written by that author. If the author has any books, you can click on the cover of that book to view the details regarding that book.

### Add Book

After an author has been added, the Add Book form will display with all of the required fields, which include:

- Title
- Number of pages
- Author (dropdown)
- Whether or not the book needs to be read
- Book cover (image upload)
- Description of why the user wants to read the book.

### Books to Read

This page displays the covers of all the books that are categorized as 'Need to be read.' This page allows the user to search through books by title and publish date.

### Finished Books

This page displays all of the books that the user has finished reading! This page contains the same search functionality as the books to read page.

### Book Page

When a user clicks on a cover image of a book, they are brought to a page which lists the details of the book, which are the same details as required by the Add Book form. On this page, the user can either edit the book details (e.g. Setting the "Need to Read" status to "No") or delete the book entirely.

<!-- /Usage -->
