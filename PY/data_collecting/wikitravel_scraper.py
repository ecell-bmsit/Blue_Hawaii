import os
from langchain_community.document_loaders import WebBaseLoader
import re
import time


class WikiTravelScraper:
    def load_document(self, loader_class, website_url):
        """
        Load a document using the specified loader class and website URL.

        Args:
        loader_class (class): The class of the loader to be used.
        website_url (str): The URL of the website from which to load the document.

        Returns:
        str: The loaded document.
        """
        loader = loader_class([website_url])
        return loader.load()

    def get_page_content(self, website):
        wb_loader_doc = self.load_document(WebBaseLoader, website)

        return wb_loader_doc[0].page_content

    def clean_data(self, data: str):
        cleaned_data = data

        cleaned_data = re.sub("\n+", "\n", cleaned_data)

        cleaned_data = re.sub(r"\[\d+\]", "", cleaned_data)

        cleaned_data = re.sub(
            r"This article is an outline and needs more content.*",
            "",
            cleaned_data,
            flags=re.DOTALL,
        )

        cleaned_data = re.sub(r"WikiPedia.*", "", cleaned_data, flags=re.DOTALL)

        cleaned_data = re.sub(r"☎", "", cleaned_data)
        cleaned_data = cleaned_data.replace("+,", "")
        cleaned_data = re.sub(r"\+", "", cleaned_data)

        pattern = r"^((?:.*?\n){7})"
        result = re.sub(pattern, "", cleaned_data, flags=re.DOTALL)

        square_brackets_pattern = re.compile(r"\[.*?\]")
        cleaned_data = re.sub(square_brackets_pattern, "", cleaned_data)

        phone_number_pattern = re.compile(
            r"\b(?:\+?[1-9]\d{0,2}[\s-]?)?(?:\([0-9]+\)[\s-]?)?[0-9]+(?:[\s-][0-9]+)*\b"
        )
        cleaned_data = re.sub(phone_number_pattern, "", cleaned_data)

        return cleaned_data

    def get_data(self, place):
        website=f"https://wikitravel.org/en/{place}"
        return self.clean_data(self.get_page_content(website).strip())

if __name__ == "__main__":
    scraper = WikiTravelScraper()
    
    start_time = time.time()
    place = "Seoul"
    data = scraper.get_data(place)
    end_time = time.time()

    time_taken = end_time - start_time
    print(f"Time taken: {time_taken} seconds")
