from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import time
import json
import re

import chromedriver_autoinstaller
# setup chrome options
from selenium import webdriver
chrome_options = webdriver.ChromeOptions()


driver = webdriver.Chrome(options=chrome_options)


url = 'https://olympics.com/en/paris-2024/entries/athletics/all-noc/men-s-1500m'
driver.get(url)
time.sleep(6)
html_content = driver.page_source
soup = bs(html_content, 'html.parser')
driver.quit()
athlete_rows = soup.find_all('tr', {'data-key': lambda x: x and 'mirs-table-athletes' in x})
#print(athlete_rows)
names = []
nationalities = []
for row in athlete_rows:
    print(row)
    nation_abbr = row.find('div', {'class': 'wrsNoc'}).text.strip()
    athlete_name = row.find('span', {'class': 'competitor-long-name'}).text.strip()
    names.append(athlete_name)
    nationalities.append(nation_abbr)
athletics_dict_1500 = {
    'Athlete':names,
    'Nationality':nationalities
    }

driver = webdriver.Chrome(options=chrome_options)
url = 'https://olympics.com/en/paris-2024/entries/athletics/all-noc/men-s-800m'
driver.get(url)
time.sleep(6)
html_content = driver.page_source
soup = bs(html_content, 'html.parser')
driver.quit()
athlete_rows = soup.find_all('tr', {'data-key': lambda x: x and 'mirs-table-athletes' in x})
#print(athlete_rows)
names = []
nationalities = []
for row in athlete_rows:
    print(row)
    nation_abbr = row.find('div', {'class': 'wrsNoc'}).text.strip()
    athlete_name = row.find('span', {'class': 'competitor-long-name'}).text.strip()
    names.append(athlete_name)
    nationalities.append(nation_abbr)
athletics_dict_800 = {
    'Athlete':names,
    'Nationality':nationalities
    }

driver = webdriver.Chrome(options=chrome_options)
url = 'https://olympics.com/en/paris-2024/entries/athletics/all-noc/men-s-5000m'
driver.get(url)
time.sleep(6)
html_content = driver.page_source
soup = bs(html_content, 'html.parser')
driver.quit()
athlete_rows = soup.find_all('tr', {'data-key': lambda x: x and 'mirs-table-athletes' in x})
#print(athlete_rows)
names = []
nationalities = []
for row in athlete_rows:
    print(row)
    nation_abbr = row.find('div', {'class': 'wrsNoc'}).text.strip()
    athlete_name = row.find('span', {'class': 'competitor-long-name'}).text.strip()
    names.append(athlete_name)
    nationalities.append(nation_abbr)
athletics_dict_5000 = {
    'Athlete':names,
    'Nationality':nationalities
    }

driver = webdriver.Chrome(options=chrome_options)
url = 'https://olympics.com/en/paris-2024/entries/athletics/all-noc/men-s-10000m'
driver.get(url)
time.sleep(6)
html_content = driver.page_source
soup = bs(html_content, 'html.parser')
driver.quit()
athlete_rows = soup.find_all('tr', {'data-key': lambda x: x and 'mirs-table-athletes' in x})
#print(athlete_rows)
names = []
nationalities = []
for row in athlete_rows:
    print(row)
    nation_abbr = row.find('div', {'class': 'wrsNoc'}).text.strip()
    athlete_name = row.find('span', {'class': 'competitor-long-name'}).text.strip()
    names.append(athlete_name)
    nationalities.append(nation_abbr)
athletics_dict_10000 = {
    'Athlete':names,
    'Nationality':nationalities
    }


all_athletes = {
    '800': athletics_dict_800,
    '1500': athletics_dict_1500,
    '5000': athletics_dict_5000,
    '10000': athletics_dict_10000
    }

olympic_df = pd.DataFrame(all_athletes)
olympic_df.to_json('olympic_athletes.json', orient='records')