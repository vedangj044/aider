# Aider
##### Stay Informed & Organized with Aider
 
Aider means to help. Aider is an Android application built with student's needs in mind. 
This app is neither a management portal,not an attendance app. This is much more. Aider informs the students about the ongoing of the college in 50 seconds, it also helps students raise an issue and ask for their opinion, it automatically curates content relevant to students syllabus thus helping them study, it records historic data about students who clear GATE, GRE, CAT or get good placements.

### Why?
As students, do you feel secluded from the happens of your college, Do you ever feel like something is not going right but can't do anything about it? Do you have to ask your class representative repeatedly about online classes and stuff because the college website is not enough?
##### yes !
Well, now you have an app for it. We discussed what problems are faced by college authorities and students, it was not hard to figure them out, then we went on to create an extremely simplified tool for students and staff and one by one found solution for all of them. Thus Aider came to existence

### Example Scenario 

Let's imagine, Different Companies are visiting our college for placements.
##### Feature 1 - Stories
Each day a new company offers jobs to some of the final year students. We are second-year students, all information about placement we get it from our seniors. With Aider, College authorities can go to the Admin console (of Aider) and write a single line "20 Students places in VMware". That's it. Aider automatically generates a beautiful story, so whenever a student opens the app next time, he can get this info.
##### Feature 2 - Poll
Now we want to ask our seniors what is majorly asked in interviews, whether it is DBMS/ OS or Competetive Programming. College Authorities can create a poll using the admin console, Aider automatically converts the response to a beautiful story, so next time the app is opened we can see all responses.
##### Feature 3 - Feed
Imagine, Unfortunately, a student experiences some misbehavior by his fellow students, He can just add a post on Aider and tag college authorities.
##### Feauture 4 - Syllabus Generation
While preparing for Exams, Viva, or interviews, A student uses the internet to look for topics, Aider saves him the trouble by providing him with the most relevant content curated according to his syllabus for all subjects in one place.
College authorities will add a PDF of the syllabus once at the beginning of the college session, Aider automatically extracts all topics, looks for them on the internet, decides whether it should provide a youtube video or just a Wikipedia definition, and stores this is the database, A student can anytime use it as reference.
#### Feature 5 - Connect with College Mates
Students can write a bio about themselves, so next time when we need to make a team for participating in a hackathon and we are looking for a react developer, we can use Aider
#### Feature 6 - Historic Data
Information like name and scores are displayed in the app regarding all the students who have cleared exams like GATE, GRE, CAT, etc, and also about students who get placed. This information is submitted to the Admin Console by the authorities.


### Components
* Admin Console 
![demo (7)](https://user-images.githubusercontent.com/43697446/93793918-12707100-fc55-11ea-950e-9e68d1d4e6cb.jpg)

* Android app stories
![demo (8)](https://user-images.githubusercontent.com/43697446/93794203-6d09cd00-fc55-11ea-8550-b53663a25e64.jpg)

### [Download APK](https://drive.google.com/file/d/16B_MkGY5rIwzS06Pna0AxA5sqxhKWdth/view?usp=drivesdk)


### How to install?
This repo contains 3 branches, which have to be run individually

* App - This is the main react-native android application
After installing react-native from [here](https://reactnative.dev/docs/0.61/getting-started)
you can run the android app using
`npm install`
`npm start`

* Console - console branch is the admin console built using react
Installation instructions are the same as the app.

* Server - server branch is a flask server
It can be used with the command
`python3 app.py`

### How to use?
After installing and running all the components, It automatically connects to firebase and fetches all data.

### Tech Stack used
* **React-native** to create android application
* **React** to create admin console
* **Flask** to create Syllabus feed from pdf, generate stories from text
* **Firebase** is the enitre backend, realtime database is used.

### Contributors
[Anurag Pal](https://github.com/Anuragtech02)

[Dhananjay Purohit](https://github.com/DhananjayPurohit)

[Ritik Jain](https://github.com/Rits1272)

[Vedang Joshi](https://github.com/vedangj044)
