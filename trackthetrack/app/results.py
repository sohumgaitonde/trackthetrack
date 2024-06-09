from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import time
import json
import re

import chromedriver_autoinstaller
# setup chrome options
from selenium import webdriver
import selenium.webdriver as webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
chrome_options = webdriver.ChromeOptions()

driver = webdriver.Chrome(options=chrome_options)


def get_names(soup): #Gets all the top 1500 names
    td_tags = soup.find_all('td', {'data-th' : "Competitor"})
    names_and_links = []

    for tag in td_tags:
      a_tag = tag.find('a')
      if a_tag:
        name = a_tag.text.strip()
        link = 'https://worldathletics.org' + a_tag['href']
        names_and_links.append((name, link))
      names_and_links = names_and_links[0:20]
    return names_and_links

def get_times(soup): #Gets the top 20 times
    td_tags = soup.find_all('td', {'data-th' : "Mark"})
    times = []
    for tag in td_tags:
      times.append(tag.text.strip())
      times = times[0:20]
    return times
def get_venues(soup):
    td_tags = soup.find_all('td', {'data-th' : "Venue"})
    venues = []
    for tag in td_tags:
      venues.append(tag.text.strip())
      venues = venues[0:20]
    return venues
def get_dates(soup):
    td_tags = soup.find_all('td', {'data-th' : "Date"})
    dates = []
    for tag in td_tags:
      dates.append(tag.text.strip())
      dates = dates[0:20]
    return dates
  

def top20_scrape():
    html= requests.get('https://worldathletics.org/records/toplists/middlelong/1500-metres/all/men/senior/2024?regionType=countries&region=usa&page=1&bestResultsOnly=true&maxResultsByCountry=all&eventId=10229502&ageCategory=senior')
    if html.status_code != 200:
        raise Exception ('error {}'.format(html))
    soup = bs(html.text, 'lxml')

    athletics_dict = {
    'Athlete':get_names(soup),
    'Mark':get_times(soup),
    'Venue':get_venues(soup),
    'Date':get_dates(soup)
    }
    return pd.DataFrame(athletics_dict)

top20_df = top20_scrape()

def create_profile_list():
  profile_list = []
  for i in range(20):
    indiv = top20_df.iloc[i]
    profile_list.append(indiv.values[0][1])
  return profile_list

profile_links = create_profile_list()
profile_links

driver = webdriver.Chrome(options=chrome_options)
driver.get(profile_links[0])
driver.maximize_window()
actions = ActionChains(driver)
print(driver.title)

url = profile_links[0]
html = requests.get(url)
soup = bs(html.text, 'lxml')
driver.get(url)
time.sleep(3)

wait = WebDriverWait(driver, 10)
cookies = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div[1]/div[2]/a')))
cookies.click()
time.sleep(4)


element = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div[5]/div/div[1]/ul/li[4]')))
#element2 = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div[5]/div/div[2]/div/div[1]/div[2]/div[1]/div/table/tbody/tr[3]/td[1]/a')))

#element3 = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/section[2]/div[1]/div[1]/div/h1')))


time.sleep(3)
#print(button_list.text)
#print(button_list)


#print("Is element clickable:", element.is_enabled() and element.is_displayed())
#print("Element text:", button_list.text)
#actions.move_to_element(element3).perform()
time.sleep(3)
element.click()
#<div class="profileStatistics_tab__1Blal profileStatistics_active__1QQ9F">Results</div>


t1= driver.find_elements(By.CLASS_NAME, 'profileStatistics_tab__1Blal profileStatistics_active__1QQ9F')
print(t1)
#button_list[3].send_keys('\n')


'''
for button in button_list:
  print(button.text)
  if button.text == "Results":
    button.click()

'''

time.sleep(8)
content = driver.page_source
test = pd.read_html(content)
print(test)