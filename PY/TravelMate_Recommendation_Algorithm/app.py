from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# Load and preprocess the data
df = pd.read_csv('data/india_top_50_cities_with_categories.csv')
df = df.dropna(how='any')
df = df.drop('Country', axis=1)
df.set_index('City', inplace=True)

# Calculate similarity matrix
similarity_matrix = cosine_similarity(df)

@app.route('/recommend_cities', methods=['POST'])
def recommend_cities():
    try:
        # Get input_tags from the POST request
        input_tags = request.json['input_tags']

        # Validate input_tags
        if not isinstance(input_tags, list) or len(input_tags) != len(df.columns):
            return jsonify({'error': 'Invalid input_tags format'}), 400

        # Convert input_tags to a DataFrame
        input_data = pd.DataFrame([input_tags], columns=df.columns)

        # Calculate input similarity
        input_similarity = cosine_similarity(input_data, df)

        # Get similar cities indices
        similar_cities_indices = input_similarity.argsort()[0][::-1]

        # Get recommended cities
        recommended_cities = df.index[similar_cities_indices]

        return jsonify({'recommended_cities': recommended_cities.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=True)
