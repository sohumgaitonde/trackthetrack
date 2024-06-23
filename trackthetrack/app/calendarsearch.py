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

url1 = 'https://worldathletics.org/competition/calendar-results?endDate=2024-12-30&disciplineId=5&rankingCategoryId=1&startDate=2024-01-01'
url2 = 'https://worldathletics.org/competition/calendar-results?endDate=2024-12-30&disciplineId=5&rankingCategoryId=5&startDate=2024-01-01'
url3 = 'https://worldathletics.org/competition/calendar-results?endDate=2024-12-30&disciplineId=5&rankingCategoryId=11&startDate=2024-01-01'
url4 = 'https://worldathletics.org/competition/calendar-results?endDate=2024-12-30&disciplineId=5&rankingCategoryId=4&startDate=2024-01-01'

import chromedriver_autoinstaller
# setup chrome options
from selenium import webdriver
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless') # ensure GUI is off
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=chrome_options)
html = requests.get(url1)
soup = bs(html.text, 'lxml')
driver.get(url1)
content = driver.page_source
calendar_df1 = pd.read_html(content)[0]

html = requests.get(url2)
soup = bs(html.text, 'lxml')
driver.get(url2)
content = driver.page_source
calendar_df2 = pd.read_html(content)[0]

html = requests.get(url3)
soup = bs(html.text, 'lxml')
driver.get(url3)
content = driver.page_source
calendar_df3 = pd.read_html(content)[0]

html = requests.get(url4)
soup = bs(html.text, 'lxml')
driver.get(url4)
content = driver.page_source
calendar_df4 = pd.read_html(content)[0]

calendar_df = calendar_df1.append(calendar_df2, ignore_index=True)
calendar_df = calendar_df.append(calendar_df3, ignore_index=True)
calendar_df = calendar_df.append(calendar_df4, ignore_index=True)
            
calendar_df.to_json('calendartest.json', orient='records')


