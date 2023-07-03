# The Restaurant Companion
#### Video Demo:  <URL>

#### Description:
!!Please see "Min's BBQ Joint" for a complete example of a restaurant with its allergies intact!!

The Problem:

The Restaurant Companion was initially conceived to address two difficult issues known to most hospitality workers for some time now. Firstly, the web application addresses the language barrier. From time to time, especially in cities as large and diverse as NY or LA, for example, people from varying cultures speaking different languages will come in and be unable to understand the menu. Often times, they will try to communicate with their server / bartender through hand motions, sounding out words, or in their own language. Apart from the obvious frustration that this causes both parties, it also leaves a fair amount of room for miscommunication.

Secondly, The Restaurant Companion aims to create a safer experience for people with allergies. Allergies abound these days. As someone who previously worked in hospitality for years, I can with confidence say that its rare a few shifts will go by without at least one guest having multiple allergies. Occasionally, you may even have a guest arrive with an actual card listing their many allergies. This combination of allergies creates some fairly complex issues:

What dishes can this person have?
Which allergies can be removed from which allergies?
What combination of dishes allows the guest to have a meal that they'd actually want to eat?

Between these two issues (and the horrible combination of the two), a clear problem presented itself. The Restaurant Companion endeavors to solve that problem.

The Design:

In terms of the tech stack of the project, specific choices were made.

React.js allows for a quick and user-friendly frontend. Given the nature of the users (hungry people in restaurants), the time complexity was important. This became even more paramount when the googletrans library was used to translate nested data structure, which already can take time.

Flask (and thus Python) was used for the backend. Flask is lightweight, but also robust enough to handle the needs of the project. Also, in the Python Library there were several different translation libraries to choose from. Recognizing the chief issue with the time complexity to be language translation, I chose googletrans after a fair amount of testing, principally for speed, but also for reliability.

PostgreSQL was used for the database. For scalability reasons an online databse was preferable. SQL Alchemy was employed as well, as it abstracts away a lot of the need for more complex SQL Queries and allows for clear, readable, code.

From a design standpoint, I decided to split the project into three different "portals."

The first is the User Portal, which allows them to translate the entire menu, work with allergies in any language they choose, and build a multilingual order that notes all of the allergies they are having removed from the dish. The order is held in state, via React's useState hook, but on completion, the user can choose to translate the order. The order is saved to the databse, and a side-by-side comparison of the order in english and whichever language (or languages) the dishes were selected in is displayed, along with an order number.

This order is accessible via a Hidden URL: namely the Server Portal The server or bartender is able to input the order number provided to the guest on translation and retrieve from the database the english version of their order.

Lastly, there is a Manager Portal. The manager portal does what you would imagine. It allows the manager to create an account and input / edit all the necessary data for their menu. It allows full CRUD capabailities for users, allergies, menu items, etc. I employed Stripe to deal with all financial aspects of the project. When a manager first creates an account, they are prompted to create a stripe account and sign up for a trial period. Via webhooks, the data necessary to interact with Stripe (though not the users financial data) is persisted in the database. For obvious reasons, access to the Manager Portal is accessible only via username / encrypted password. The only exception being cookies, which are employed for ease-of-use, but are cleared upon logout.