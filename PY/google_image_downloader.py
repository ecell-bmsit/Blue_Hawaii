from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

import os


class GoogleImageDownloader:
    def __init__(self):
        self.driver = webdriver.Chrome()

    def download_image(self, query:str,file_name:str,folder_path:str):
        # Go to Google Images
        self.driver.get("https://www.google.com/imghp?hl=EN")

        # Find the search box, enter the query, and submit the form
        search_box = self.driver.find_element(By.NAME, "q")
        search_box.send_keys(query)
        search_box.send_keys(Keys.RETURN)

        # Wait for the results to load
        self.driver.implicitly_wait(10)

        # Find the first image result
        image_result = self.driver.find_element(By.CSS_SELECTOR, ".rg_i")

        # Save the image
        image_result.screenshot(f'{folder_path}/{file_name}.png')

    def get_images(self, query: str, folder_path: str, MAX_IMAGE_COUNT: int = 3):
        # Go to Google Images
        self.driver.get("https://www.google.com/imghp?hl=EN")

        # Find the search box, enter "apples", and submit the form
        search_box = self.driver.find_element(By.NAME, "q")
        search_box.send_keys(query)
        search_box.send_keys(Keys.RETURN)

        # Wait for the results to load
        self.driver.implicitly_wait(10)

        # Scroll down to load more images
        for _ in range(
            1
        ):  # Adjust this value based on how many images you want to load
            ActionChains(self.driver).send_keys(Keys.SPACE).perform()

        # Find the image results
        image_results = self.driver.find_elements(By.CSS_SELECTOR, ".rg_i")

        # save the images
        count = 0
        for image in image_results:
            if count == MAX_IMAGE_COUNT:
                break
            # when i do drive.find_elements for an image search using selenium in google chrome, i want to get the url of each image. Write code to print all attributes present in each result
            image.screenshot(f'{folder_path}/{query.replace(" ","_")}_{count}.png')
            count += 1

    def download_images_from_query_list(
        self, OUTPUT_DIRECTORY_PATH: str, queryt_list: list
    ):
        for query in queryt_list:
            #  i have a folder in my project directory. I have  to get the absolute path of this folder write me code to get the absolute path of this folder
            absolute_path = (
                OUTPUT_DIRECTORY_PATH  # os.path.abspath("data/object_detection")
            )
            folder_name = query.split(" ")[0]
            folder_path = os.path.join(absolute_path, folder_name)

            # if folder_path doesn't exist, create it
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            print(folder_path)
            self.get_images(query, folder_path)

    def destroy(self):
        self.driver.quit()

if __name__ == "__main__":
    downloader = GoogleImageDownloader()
    # downloader.download_images_from_query_list(
    #     "data/travel_tags", ["apple", "orange", "banana"]
    # )
    downloader.download_image(query="Dubai",file_name="Dubai",folder_path="data/place_images")
    downloader.destroy()

    # test code
    # downloader = GoogleImageDownloader()
    # downloader.download_images_from_query_list(
    #     "data/travel_tags", ["apple", "orange", "banana"]
    # )
    # downloader.destroy()