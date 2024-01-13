from flask import Flask, request, jsonify
from strictjson import strict_json

app = Flask(__name__)

def create_itinerary(place_name: str, num_days: int, tags: list):
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

@app.route('/create_itinerary', methods=['POST'])
def create_itinerary_endpoint():
    data = request.get_json()

    place_name = data.get('place_name')
    num_days = data.get('num_days')
    tags = data.get('tags')

    if place_name and num_days and tags:
        result = create_itinerary(place_name, num_days, tags)
        return jsonify(result)
    else:
        return jsonify({"error": "Invalid input"}), 400

if __name__ == "__main__":
    app.run(debug=True)
