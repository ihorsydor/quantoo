Book API

Endpoint: /book


GET /book/images/:imageName
Retrieve an image with the specified imageName.
Request Parameters:
imageName (string, required): The name of the image file.

GET /book
Get all books.

GET /book/:id
Get a book with the specified id.
Request Parameters:
id (string, required): The identifier of the book.

POST /book
Create a new book.
Request Body:
image (string, required): The image file for the book.
destination (string, required): The destination of the image file.
imagePath (string, required): The path of the image file.
filename (string, required): The filename of the image file.
name (string, required): The name of the book.
publishing (string, required): Publishing information of the book.
siteNumber (number, required): The page number of the book.
author (string, required): The identifier of the author associated with the book.

PUT /book/:id
Update an existing book.
Request Parameters:
id (string, required): The identifier of the book.
Request Body:
image (string, required): The updated image file for the book.
destination (string, required): The updated destination of the image file.
imagePath (string, required): The updated path of the image file.
filename (string, required): The updated filename of the image file.
name (string, required): The updated name of the book.
publishing (string, required): The updated publishing information of the book.
siteNumber (number, required): The updated page number of the book.
author (string, required): The updated identifier of the author associated with the book.

DELETE /book/:id/:filename
Delete a book.
Request Parameters:
id (string, required): The identifier of the book.
filename (string, required): The filename of the image file associated with the book.
Author API
Endpoint: /author

GET /author/search
Search for authors.
Request Parameters:
No request parameters.

GET /author
Get all authors.

GET /author/:id
Get an author with the specified id.
Request Parameters:
id (string, required): The identifier of the author.

POST /author
Create a new author.
Request Body:
name (string, required): The name of the author.
country (string, required): The country of the author.

PUT /author/:id
Update an existing author.
Request Parameters:
id (string, required): The identifier of the author.
Request Body:
name (string, required): The updated name of the author.
country (string, required): The updated country of the author.

DELETE /author/:id
Delete an author.
Request Parameters:
id (string, required): The identifier of the author.
