from strictjson import *
from pprint import pprint
def create_itenary(place_name: str, num_days: int, tags: list):
    res = strict_json(
        system_prompt="You are an iteneray creator for a {num_days} days trip to {place_name}. Take into consideration the user's preferences which are {tags}. Do not continue the itenary above {num_days} days.".format(
            num_days=num_days, place_name=place_name, tags=tags
        ),
        user_prompt=place_name,
        output_format={
            "Day {i}".format(i=i): "itenary for day {i}.".format(i=i)
            for i in range(1, num_days + 1)
        },
    )
    return res

if __name__ == "__main__":
    res = create_itenary("Bengaluru", 3, ["adventure", "nature", "history"])