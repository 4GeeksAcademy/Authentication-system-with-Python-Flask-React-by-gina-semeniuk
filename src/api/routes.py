"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    last_name = data.get("last_name")

   
    new_user = User(email=email, password=password, name=name, last_name=last_name)


    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 200

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    #print(data)
    email = data.get("email")
    password = data.get("password")
    

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    user = User.query.filter_by(email=email).first()
    #print(user)

    if not user:
        return jsonify({"message": "User doesn't exist"}), 401
    token = create_access_token(identity=user.id)
    #print(token)


    token = create_access_token(identity=user.id)
    return (
        jsonify(
            {
                "token": token,
                "user": user.serialize(),
            }
        ),
        200,
    )


@api.route("/private", methods=["POST"])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    return jsonify("User authenticated"), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def get_user_info():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify(message="Welcome, {}".format(user.name)), 200