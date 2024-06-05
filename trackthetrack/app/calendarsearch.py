# !pip install google-api-python-client
from googleapiclient.discovery import build
import os
import json
from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import time

output = 'calendar_results.csv'

all_results = {}

url = 'https://worldathletics.org/competition/calendar-results?endDate=2024-12-30&disciplineId=5&rankingCategoryId=1&startDate=2024-01-01'
import chromedriver_autoinstaller
# setup chrome options
from selenium import webdriver
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless') # ensure GUI is off
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=chrome_options)
html = requests.get(url)
soup = bs(html.text, 'lxml')
driver.get(url)
content = driver.page_source
calendar_dfA = pd.read_html(content)[0]
print(calendar_dfA.head)
calendar_dfA.to_csv('calendarA.csv', sep=',', index=False, encoding='utf-8')
