from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app, supports_credentials=True , origins="http://127.0.0.1:5500") # using cors headers to give access to my front end project port 



if __name__ == '__main__':
    app.run(debug=True) # allow debuging for development mode 
