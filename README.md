# safeBites
Recipe Filter for Diabetes 
MIT Blueprint 2025 

Inspiration: 
- It can be difficult to find recipes that fit specific dietary restrictions, and one often has to search up specialized blogs (because no one really has time to look through the ingredients of normal recipes to see if it it their ideal daily sugar intake). These can have pretty limited options, and time consuming to search for. Diabetic people, especially those who have to cook for whole families (or parents who have to cook for kids with diabetes), may struggle to accommodate in their cooking because these recipes can be hard to find. We wanted to make this easier by making a website to help find more of these recipes.

What it does: 
- Our project takes in information from the user on their weight (or if they have a child with diabetes, that child's weight), and using formulas given by the WHO (https://www.who.int/tools/elena/interventions/free-sugars-adults-ncds#:~:text=WHO%20recommends%20a%20reduced%20intake,5%25%20of%20total%20energy%20intake.) and a Harvard calorie intake calculator (https://www.health.harvard.edu/staying-healthy/calorie-counting-made-easy) to calculate the ideal amount of daily free sugar (granulated, powdered, honey) for a diabetic person. Taking the amount of people the recipe is meant to be for, it filters this further by only providing recipes that are for the selected amount of people, as well as filtering out any recipes with common allergens that the user may select from a list (for convenience). We hope that this website can, in future versions, accommodate other dietary restrictions, so the allergens sections was the beginning of that. It gives the option to both search for specific recipes and scroll through suggested recipes (that appear depending on the filter).

How we built it: 
- Initially, we ran our website plan through chatGBT to get a checklist of tasks to organize ourselves. We used Glitch.com for our website, writing html and css while referencing W3 schools and StackOverflow as well as some other websites. If we ran into bugs, we would talk to each other and check online, and if all else failed ask chatGBT. The css and html were done simultaneously, and the javascript was done closer to the end with minor edits to html. The javascript is dependent on a jsop file containing recipe information (produced by chatGBT) and it autopopulates the recipe cards onto the recipe page.

Challenges we ran into: 
- We had originally planned on this being an application, but after a few hours of struggling and frustration we had a discussion and decided that we all felt more confident navigating through html, css, and javascript over the React Native we'd learned the day before. With a smaller time frame and restarting code, we had to keep up supportive attitudes, which was honestly a lot easier with web development since we felt good about it. The hardest of all was that we realized we weren't going to finish everything we wanted to, but that's alright because we enjoyed the process and getting to work together on a project like this.

Accomplishments that we're proud of:
- We were able to get it working in such a short period of time while still having fun!

What's next for our project:
- We want this website to accommodate other types of food restrictions with more filters, as well as a wider variety of recipes.

Project Creators:
- Ana Albornoz
- Caroline Walczak
- Bhavna Patur
- Anika Sivasankar