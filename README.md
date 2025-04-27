# cs465-fullstack
CS-365 Full Stack Development with MEAN

# Architecture

**Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).**  
  
This project utilized several different types of frontend development. Express HTML was used templates to render static HTML pages for our Travlr Getaways website. This method is less interactive, less flexible, and requires navigating to different pages. JavaScript was used to enhance our Express HTML site by dynamically retrieving trip data from the database using the API. A single-page application (SPA) was developed to handle the administration of the site including login and performing CRUD operations on the trips database. SPA's provide a better user experience as content is dynamically loaded instead of navigating to other pages. However, SPA's are more complex to develop and are harder to optimize for search engines.  
  
**Why did the backend use a NoSQL MongoDB database?**  

A NoSQL MongoDB database was used because it is flexible and uses JSON, which integrates easily with our stack.

# Functionality

**How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?**  

JavaScript Object Notation (JSON) and JavaScript are very different. JSON is a format for storing and transmitting data whereas JavaScript is a programming language. JSON is used to store and transmit our trip data from the backend and frontend components the project. For example, the frontend makes an API request to retrieve the JSON trip data and the backend retrieves that JSON trip data from the MongoDB database and passes it along to the frontend where it is then displayed. 
  
**Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.**

# Testing

**Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.**

# Reflection

**How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?**
