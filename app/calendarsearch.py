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
url5 = 'https://worldathletics.org/competition/calendar-results?endDate=2024-12-31&disciplineId=5&rankingCategoryId=2&startDate=2024-01-01'

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

html = requests.get(url5)
soup = bs(html.text, 'lxml')
driver.get(url5)
content = driver.page_source
calendar_df5 = pd.read_html(content)[0]

calendar_df = calendar_df1.append(calendar_df2, ignore_index=True)
calendar_df = calendar_df.append(calendar_df3, ignore_index=True)
calendar_df = calendar_df.append(calendar_df4, ignore_index=True)
calendar_df = calendar_df.append(calendar_df5, ignore_index=True)
def convert_date_string(input: str) -> list:
    months = {
        'JAN': '01',
        'FEB': '02',
        'MAR': '03',
        'APR': '04',
        'MAY': '05',
        'JUN': '06',
        'JUL': '07',
        'AUG': '08',
        'SEP': '09',
        'OCT': '10',
        'NOV': '11',
        'DEC': '12',
    }

    parts = input.split(' ')
    year = parts[-1]
    month = months[parts[-2].upper()]
    print(input)
    day_part = parts[0]
    day_range = day_part.split('–')
    print(day_range)
    start_day = int(day_part[0:2])
    end_day = int(day_part[3:5]) if len(day_range) > 1 else start_day

    dates = [f"{year}-{month}-{str(day).zfill(2)}" for day in range(start_day, end_day + 1)]
    return dates
expanded_rows = []
for _, row in calendar_df.iterrows():
    dates = convert_date_string(row['Date'])
    for date in dates:
        new_row = row.copy()
        new_row['Date'] = date
        expanded_rows.append(new_row)
        
expanded_df = pd.DataFrame(expanded_rows)
print(expanded_df)
            
expanded_df.to_json('calendartest.json', orient='records')


