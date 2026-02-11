import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt

# Import our database instance and models
from models import db, User, Listing 

app = Flask(__name__)

# --- CONFIGURATION ---
# We use SQLite for a simple, local development setup in Thika
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///talalink.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# In a real production app, you would move this to a .env file
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'thika-artisan-access-key-2024')

# --- INITIALIZATION ---
CORS(app)           # Allows your React frontend to talk to this API
bcrypt = Bcrypt(app) # For hashing passwords
jwt = JWTManager(app) # For handling secure login tokens
db.init_app(app)     # Links SQLAlchemy to this Flask app
migrate = Migrate(app, db) # Enables 'flask db' commands

# --- BASIC & TEST ROUTES ---

@app.route('/')
def home():
    return "Talalink Backend is Running!"

@app.route('/api/test', methods=['GET'])
def test_connection():
    """Route to verify the frontend-backend connection."""
    return jsonify({
        "status": "success",
        "message": "Backend reached! Database and JWT are active.",
        "location_origin": "Thika, Kenya"
    })

# --- AUTHENTICATION ROUTES ---

@app.route('/register', methods=['POST'])
def register():
    """Handles User Registration for both Artisans and Consumers."""
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Email already registered"}), 400
        
    # Hash the password for security
    hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    
    # Create the new user with dual-role capability
    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=hashed_password,
        is_artisan=data.get('is_artisan', False) # Defaults to False (Consumer)
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Account created! Karibu TalaLink."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    """Handles User Login and returns a JWT token."""
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and bcrypt.check_password_hash(user.password_hash, data.get('password')):
        # Create a JWT token for the session
        # We store the user's ID as the identity
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            "token": access_token,
            "user": user.to_dict() # includes id, username, and is_artisan status
        }), 200
    
    return jsonify({"error": "Invalid email or password"}), 401

# --- MARKETPLACE ROUTES ---

@app.route('/listings', methods=['GET'])
def get_listings():
    """Fetches all items for the Home page marketplace."""
    listings = Listing.query.all()
    return jsonify([listing.to_dict() for listing in listings]), 200

# --- START THE SERVER ---

if __name__ == '__main__':
    # Running on port 5000 as requested
    app.run(debug=True, port=5000)