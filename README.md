Expense Tracker (Full-Stack Project)

Project Description                                                                                                                                                                                                        
    This is a full-stack web application that helps users track their expenses.
    The backend is built with Flask, providing a REST API for user authentication and expense management,
    while the frontend is developed using JavaScript and interacts with the backend via API calls.                                                                                                                              
    
New Features :                                                                                                                                                                                                             
        - This project implements JWT authentication for secure user access and localStorage in the frontend to persist login sessions.
          it also features a fully functional expense tracking system.                                                                                                                                                
        - Chart drawing library graphs total expenses for each user for each month

Prerequisites:
Backend Dependencies

    Install the required Python packages:
    PyJWT==2.10.1
    pytz==2025.1
    six==1.17.0
    SQLAlchemy==2.0.37
    Flask-JWT-Extended==4.7.1
    Flask-RESTful==0.3.10
    Flask-SQLAlchemy==3.1.1
    
    pip install flask flask_sqlalchemy flask_bcrypt flask_jwt_extended flask_cors                                                                                                                                                   
Or just use the requirements file :   
    
    pip install -r requirements.txt

Frontend Dependencies
    No additional dependencies; the frontend is built with vanilla JavaScript, HTML, and Css

Project Checklist:

-It is available on GitHub.

-It uses the Flask web framework.

-It uses at least one module from the Python Standard Library other than the random module:

    - Module name: datetime
    - File name : app/models.py
    - Line number : (line 12)
    
-It contains at least one class written by you that has both properties and methods, including an __init__() constructor:

    File name for the class definition: app/models.py
    Line number(s) for the class definition: User (line 5), Expense (line 35)
    Name of two properties: email, password
    Name of two methods: create_user(), add_expense()
    File name and line numbers where the methods are used: app/routes.py (line 25, 55)

-It makes use of JavaScript in the front end and uses the localStorage of the web browser.

-It uses modern JavaScript (let, const rather than var).

-It makes use of reading and writing to the same file feature.(Using SQLite) 

-It contains conditional statements.

    File name: app/routes.py, app.js
    Line number(s): 37, 52, 87 (app/routes.py), 20, 45 (app.js)

-It contains loops.

    File name: app/routes.py, app.js
    Line number(s): 19, 52, 122 (app/routes.py), 30, 55 (app.js)

-It lets the user enter a value in a text box at some point (API receives input from users for registration, login, and expenses).

-It doesn't generate any error message even if the user enters a wrong input (errors are handled properly with 400 and 404 responses).

-It is styled using your own CSS.

-The code follows the code and style conventions, is fully documented using comments, and doesn't contain unused or experimental code.

-All exercises have been completed as per the requirements and pushed to the respective GitHub repository.

How to use the project:
   - Clone the repository:
     
         git clone <your-repo-link>
     
         cd <project-folder>/backend

   - Install dependencies for backend:
     
            pip install -r requirements.txt
   
   - Initialize the database:
     
            python
            >>> from app import create_app, db
            >>> app = create_app()
            >>> with app.app_context():
            >>> db.create_all()
            >>> exit()
     
   - Run the Flask server:
    
            python run.py

   - The API will be available at:
    
            http://127.0.0.1:5000/
        
   - Navigate to the frontend folder:
    
            cd <project-folder>/frontend

   - Open index.html in a browser.    

    

     


