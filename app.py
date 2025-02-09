from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Define the API route
@app.route('/api/job-role-data', methods=['GET'])
def get_job_role_data():
    # Load the processed data from the JSON file
    data = pd.read_json('/content/drive/MyDrive/Processed_Job_Role_Data.json')
    # Convert the data to a JSON-compatible format
    return jsonify(data.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
