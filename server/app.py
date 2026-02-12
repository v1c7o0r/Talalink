import os
import secrets
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta

# --- CONFIGURATION ---
app = Flask(__name__)
@app.route('/')
def home():
    return jsonify({
        "status": "online",
        "message": "Welcome to the TalaLink API",
        "endpoints": ["/listings", "/signup", "/login", "/profile"]
    })
CORS(app) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///talalink.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'thika_artisan_secret_key_2026' 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Email Config (Replace with your actual SMTP details)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-app-password' 

# --- INITIALIZATION ---
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
mail = Mail(app)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# --- MODELS ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True) # For WhatsApp integration
    is_verified = db.Column(db.Boolean, default=True)
    verification_token = db.Column(db.String(100), unique=True)
    listings = db.relationship('Listing', backref='author', lazy=True)

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False) # 'Product' or 'Service'
    location = db.Column(db.String(100), default='Thika Town')
    image_url = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# --- AUTH ROUTES ---

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    v_token = secrets.token_urlsafe(32)

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_pw,
        verification_token=v_token
    )
    db.session.add(new_user)
    db.session.commit()

    # Send Verification Email
    try:
        msg = Message('Verify your TalaLink Account', sender='noreply@talalink.com', recipients=[data['email']])
        msg.body = f"Verify your account here: http://localhost:3000/verify/{v_token}"
       # mail.send(msg)
    except Exception as e:
        print(f"Mail delivery failed: {e}")

    return jsonify({"message": "Signup successful. Check email to verify."}), 201

@app.route('/verify/<token>', methods=['GET'])
def verify_email(token):
    user = User.query.filter_by(verification_token=token).first()
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 400
    user.is_verified = True
    user.verification_token = None
    db.session.commit()
    return jsonify({"message": "Email verified successfully!"}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        if not user.is_verified:
            return jsonify({"error": "Please verify your email first"}), 401
        
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "token": access_token,
            "user": {"id": user.id, "username": user.username}
        }), 200
    return jsonify({"error": "Invalid email or password"}), 401

# --- USER PROFILE ---

@app.route('/profile', methods=['GET', 'PUT'])
@jwt_required()
def handle_profile():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(int(user_id))
    
    if request.method == 'GET':
        return jsonify({
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number or ""
        })
    
    data = request.json
    user.phone_number = data.get('phone_number', user.phone_number)
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"})

# --- MARKETPLACE CRUD ---

@app.route('/listings', methods=['GET'])
def get_listings():
    listings = Listing.query.order_by(Listing.created_at.desc()).all()
    output = []
    output.extend(
        {
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "price": item.price,
            "category": item.category,
            "location": item.location,
            "image_url": item.image_url,
            "user_id": item.user_id,
            "phone_number": item.author.phone_number,  # Crucial for frontend contact
        }
        for item in listings
    )
    return jsonify(output)

@app.route('/listings/<int:id>', methods=['GET'])
def get_listing(id):
    item = Listing.query.get_or_404(id)
    return jsonify({
        "id": item.id, "title": item.title, "description": item.description,
        "price": item.price, "category": item.category, "location": item.location,
        "image_url": item.image_url, "user_id": item.user_id,
        "phone_number": item.author.phone_number
    })

@app.route('/listings', methods=['POST'])
@jwt_required()
def create_listing():
    user_id = int(get_jwt_identity())
    
    # Handle Dual-Mode Image
    image_url = request.form.get('image_url')
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            image_url = f"http://localhost:5000/static/uploads/{filename}"

    new_listing = Listing(
        title=request.form.get('title'),
        description=request.form.get('description'),
        price=float(request.form.get('price')),
        category=request.form.get('category'),
        location=request.form.get('location'),
        image_url=image_url,
        user_id=user_id
    )
    db.session.add(new_listing)
    db.session.commit()
    return jsonify({"message": "Listing published"}), 201

@app.route('/listings/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_listing(id):
    item = Listing.query.get_or_404(id)
    if item.user_id != int(get_jwt_identity()):
        return jsonify({"error": "Unauthorized"}), 403
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Deleted successfully"})

# --- MAIN ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(port=5000, debug=True)