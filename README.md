# StrongMind Full Stack Pizza App

This app was created to showcase my full-stack programming ability. It is a pizza making app that allows you (the user) to type in any pizza toppings you would like and submit it to the app. You are then able to "make pizzas" using the toppings you've added. All toppings can be created, deleted, and updated. All pizzas can be created, deleted, and have both the pizza names and the pizza toppings updated as well.

# Installation

### To set up the project locally, follow these steps:
- Becuase this project is deployed on Vercel and uses the Vercel Postgres, you need a Vercel account linked to your Github account (or similar) to successfully run step 3 below. Sign up here: https://vercel.com/signup
- In the spirit of Vercel making things difficult for everyone who isnt me (Ryan McCabe), to run this locally, you must fork the repo before the following steps may take place. 
- Even more fun: If you are not me, you will have a difficult time (its impossible) to perform step 4 below and get credentials you need. For this reason, I have contained the contents of the necessary `.env` file in the email sent to `recruiter@strongmind.com`. It pains me to do this, but if you want to run this app locally, that's what's required. Please be nice and delete when you're done.

1. Run `npm install` in this project's root directory to install the dependencies
2. Run `npm i -g vercel@latest`
3. Run `vercel link`
4. Run `vercel env pull .env.local`
5. Either remove the `.local` portion of the `.env.local`, or copy the contents from `.env.local` to a new `.env` file.
6. Run `npx prisma db push`
7. run `npm run dev` to start the development server.
8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
    - note: if port 3000 is already in use, another port will be chosen automatically and output in the terminal. Be sure that matches the port in the localhost url in your browser.

# How to use
### Now that you're fully installed, lets play around with the app.
- The main page will have two buttons: 'Manage Toppings' and 'Manage Pizzas'.
- To manage pizzas, you'll need toppings first. Click the 'Manage Toppings' button.
- If this is your first time spinning up the app, you will be notified that there are not any toppings yet. Click the 'Add' button to add a topping. An input field will populate asking you for a topping name.
- Enter a topping name and press the 'OK' button or press the enter key.

### Now that you have a topping, lets create a pizza.
 - From the toppings page, click the 'Home' button in the upper left of the page. Now click 'Manage Pizzas'.
 - Click the 'Create' button and the pizza creation form will appear.
 - Type in a name for your new pizza in the input field.
 - To select toppings for your pizza, simply click the topping name under 'Available Toppings'.
 - Click the 'OK' button or press the enter key.

### To update a pizza or topping:
 - From the toppings page, click on the topping you want to update.
     - Click 'Update'
     - Type in a new name and press 'OK' or the enter key
 - From othe pizzas page, click on the pizza you want to update.
     - Click either 'Update Name' or 'Update Toppings'.
     - Updating the name will make an input field appear for you to input a name. Press enter or the check mark button to save.
     - Updating the Toppings will show a list of the existing toppings, and a list of available toppings. Click any of the available toppings, then press the green checkmark button within the pizza card.

### To delete a pizza or topping:
 - You can only delete a topping from the toppings page. You can only delete a pizza from the pizzas page.
 - Click the item you want to delete. Once selected, press the 'Delete' button and the item will be gone.

# Tests
To run test locally, run the `npm test` command from this project's root directory.

