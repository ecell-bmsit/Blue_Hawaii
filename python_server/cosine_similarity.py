import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


def recommend_cities(input_tags):
    df = pd.read_csv('data/india_top_50_cities_with_categories.csv')
    df = df.dropna(how='any')
    df = df.drop('Country', axis=1)
    df.set_index('City', inplace=True)
    input_data = pd.DataFrame([input_tags], columns=df.columns)
    input_similarity = cosine_similarity(input_data, df)
    similar_cities_indices = input_similarity.argsort()[0][::-1]
    recommended_cities = df.index[similar_cities_indices]
    return recommended_cities

if __name__ == "__main__":
    input_tags = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0]
    recommended_cities = recommend_cities(input_tags, similarity_matrix)
    print(f"Recommended cities based on input tags: {recommended_cities}")
