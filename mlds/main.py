from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
# import try
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
import pandas as pd
import random

import time

options = webdriver.ChromeOptions()

options.add_experimental_option('detach', True)

driver = webdriver.Chrome(options=options)

driver.get('https://www.volunteermatch.org/search/?l=Evanston%2C+IL%2C+USA&v=true&o=distance')
print(driver.title)

all_opporunities = []

# Pagination handling
page_num = 1
has_next_page = True

while has_next_page:
    print(f"Processing page {page_num}")
    
    # Process all opportunities on the current page
    # (code from above)

    try:
        # Wait for search results to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp']"))
        )
        
        # Get all search results
        search_results = driver.find_elements(By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp']")
        
        print(f"Found {len(search_results)} search results")

        # get each result
        for index, result in enumerate(search_results):
            print(f"Processing result {index + 1}/{len(search_results)}")
            WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp']"))
            )
            # Get the link URL before clicking (in case we need it)
            try:
                link_element = result.find_element(By.CSS_SELECTOR, "h3 a")
                link_url = link_element.get_attribute("href")
            except Exception as e:
                print(f"Error getting link URL: {e}")
                link_url = None

            # Click the link
            try:
                driver.execute_script("window.open(arguments[0]);", link_url)
                driver.switch_to.window(driver.window_handles[-1])  # Switch to the new tab

                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.TAG_NAME,"body"))
                )

                opportunity_data = {
                    "Title": "",
                    "Organization": "",
                    "Description": "",
                    "Date": "",
                    "Location": "",
                    "Skills": "",
                    "Requirement": "",
                    "URL": driver.current_url
                }

                try:
                    opportunity_data["Title"] = driver.find_element(By.CSS_SELECTOR, "h1").text
                except:
                    print("Error getting title")
                    break

                try:
                    org_name = driver.find_element(By.CSS_SELECTOR, 'h2.opp-dtl__org-name.text-sm a').text
                    opportunity_data["Organization"] = driver.find_element(By.CSS_SELECTOR, 'h2.opp-dtl__org-name.text-sm a').text
                    print(f"Organization: {org_name}")
                except:
                    print("Error getting organization name")
                    break

                try:
                    desc_div = driver.find_element(By.ID, "short_desc")
                    paragraphs = desc_div.find_elements(By.TAG_NAME, "p")
                    description = " ".join([p.text for p in paragraphs])
                    opportunity_data["Description"] = description
                except:
                    print("Error getting description")
                    break
                
                try:
                    date = driver.find_element(By.CSS_SELECTOR, 'section.logistics__section--when div.para').text
                    opportunity_data["Date"] = date
                except:
                    print("Error getting date")
                    break

                try:
                    skill_elements = driver.find_elements(By.CSS_SELECTOR, "section.logistics__section--skills li.item")
                    skills = [skill.text for skill in skill_elements]
                    opportunity_data["Skills"] = ", ".join(skills)

                except:
                    print("Error getting skills")
                    break

                try:
                    requirement_element = driver.find_element(By.CSS_SELECTOR, "section.logistics__section--requirements li.item")
                    requirement = requirement_element.text
                    opportunity_data["Requirement"] = requirement
                except:
                    opportunity_data["Requirement"] = "no requirement"
                    

                try:
                    location_element = driver.find_element(By.CSS_SELECTOR, "h4.l-location + p.left")
                    location = location_element.text
                    opportunity_data["Location"] = location
                except Exception as e:
                    print(f"Error getting location: {e}")
                    opportunity_data["Location"] = ""

                

                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                all_opporunities.append(opportunity_data)

            except Exception as e:
                print(f"Error processing result {index + 1}: {e}")
                # If there was an error, make sure we're back on the main tab

    except Exception as e:
        print(f"An error occurred: {e}")
  

        
    # Check if there's a next page button
    try:

        wait = WebDriverWait(driver, 10)
        next_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "span.pub-srp-pag__arrw--next"))
        )       
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", next_button)
        WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "span.pub-srp-pag__arrw--next"))
        )       
        driver.execute_script("arguments[0].click();", next_button)
        
        if next_button.is_enabled():
            page_num += 1
            # Wait for the next page to load
            time.sleep(60)
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp']"))
            )
        else:
            has_next_page = False
    except Exception as e:
        print(f"No more pages or error navigating: {e}")
        has_next_page = False



df = pd.DataFrame(all_opporunities)
df.to_csv('volunteer_opportunities.csv', index=False)

            





time.sleep(5)
driver.quit()