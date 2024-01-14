from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from strictjson import strict_json
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()

# Load and preprocess the data
df = pd.read_csv("./data/india_top_50_cities_with_categories.csv")
df = df.dropna(how="any")
df = df.drop("Country", axis=1)
df.set_index("City", inplace=True)

# Calculate similarity matrix
similarity_matrix = cosine_similarity(df)
input_tags = None


@app.route("/recommend_cities", methods=["POST"])
def recommend_cities():
    global input_tags
    try:
        # Get input_tags from the POST request
        input_tags = request.json["input_tags"]

        # Validate input_tags
        if not isinstance(input_tags, list) or len(input_tags) != len(df.columns):
            return jsonify({"error": "Invalid input_tags format"}), 400

        # Convert input_tags to a DataFrame
        input_data = pd.DataFrame([input_tags], columns=df.columns)

        # Calculate input similarity
        input_similarity = cosine_similarity(input_data, df)

        # Get similar cities indices
        similar_cities_indices = input_similarity.argsort()[0][::-1]

        # Get recommended cities
        recommended_cities = df.index[similar_cities_indices]

        return jsonify({"recommended_cities": recommended_cities.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def create_itinerary_endpoint(place_name: str, num_days: int, tags: list):
    res = strict_json(
        system_prompt="You are an itinerary creator for a {num_days} days trip to {place_name}. Take into consideration the user's preferences which are {tags}. Do not continue the itinerary above {num_days} days.".format(
            num_days=num_days, place_name=place_name, tags=tags
        ),
        user_prompt=place_name,
        output_format={
            "Day {i}".format(i=i): "itinerary for day {i}.".format(i=i)
            for i in range(1, num_days + 1)
        },
    )
    return res

TAGS = [
    "Historical Sites",
    "Mueseums",
    "Art Gallery",
    "Piligrimage",
    "Beaches",
    "Hiking",
    "Greenery",
    "Mountains",
    "Shopping",
    "Nightlife",
    "Urban",
    "Desert",
    "Adventure",
    "Cultural Experience",
    "Waterfalls",
    "Caves",
    "Wildlife Experience",
    "Skiing",
    "Scuba Diving",
    "Water Activites",
]


@app.route("/create_itinerary", methods=["POST"])
def create_itinerary():
    try:
        data = request.get_json()

        place_name = data.get("place_name")
        num_days = data.get("num_days")
        input_tags = data.get("input_tags")

        tags = [TAGS[i] for i, tag in enumerate(input_tags) if tag == 1]

        if place_name and num_days and tags:
            result = create_itinerary_endpoint(place_name, num_days, tags)
            return jsonify(result)
        else:
            return jsonify({"error": "Invalid input"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860, debug=True)
