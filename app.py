from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

# Initialize Flask app
app = Flask(__name__)

# Load your chatbot model
model = load_model("medical_chatbot_model.h5")

# Define a function to generate responses
def generate_response(user_input):
    # Process user_input (modify based on your model's input format)
    input_data = np.array([user_input])  # Example preprocessing
    prediction = model.predict(input_data)
    
    # Convert prediction to readable text (Modify based on your model's output format)
    response = f"AI Response: {prediction[0][0]}"
    
    return response

# Create API endpoint
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    user_message = data.get("message", "")
    
    if not user_message:
        return jsonify({"response": "Please enter a message."})
    
    bot_response = generate_response(user_message)
    
    return jsonify({"response": bot_response})

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
