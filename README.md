# Project CPSC 349
## Pet Kennel 
## Project By Harrold Ventayen and Claire Rhoda
This project was created using HTML / CSS / JavaScript / MongoDB.

## Steps to Run Project
1. Download or clone the contents of ProjectPetKennel
2. In your terminal, run the following commands:
### `npm install express --save`
### `npm install --save-dev mongodb`
### `npm install --save-dev cors`
3. If you used brew to install mongodb, use the command:
### `brew services start mongodb-community`to run the database
4. In a separate terminal, run the index-rest.js with the command:
### `node index-rest.js`
5. Lastly, run the index.js file using:
### `node index.js`
6. Use this link to open the project from start 
### http://localhost:4020/startScreen.html

## Steps to perform/test in project
1. Select New User on Welcome/Start screen
2. Enter a random 10 digit number for the Employee ID and a 7+ character password
3. You will then be redirected to the home page.
4. Select the Check In button in the navigation bar to enter the details of a pet that is checking into the kennel
5. Select the Check Out button in the navigation bar to confirm the check out of any pets that ahve reached their check out time (this can be tested by setting a pet's check out time to one minute after the current time)
6. The Emergency button icon found in the navigation bar is a fake button used in the case of if a real emergency occured at the pet kennel.
7. To go back to the Home page, Select the "Pet Kennel Tracker" text in the left corner.
8. An animal can be searched at any time through the search bar in the navigation bar.
9. The "More Details" button found in the home page and the search page of each pet is used to display more information on a pet when clicked
10. The "Send Photo" button next to the "More Details" button opens an email app (whichever is linked to the system) with the To: address set to the email of the pet's owner. This can be used to send update photos to the owners.
