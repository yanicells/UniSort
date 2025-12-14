Unisort (quick)
Post on reddit to improve questions, ask for opinions on my questions
Have AIs do deep research on it to generate questions and constructs about certain universities and their students, environment
Could have very simple backend but for storing results
Can ask AI to help with assets, like headers, etc
Maybe I can integrate the AI chatbot here, to ask questions about universities, and personalities, etc.
ENSURE WEBSITE IS SEO


Project Features
- Quiz
    - Results page with suggestions for universities based on answers, have like a scoring system to see like how well they fit certain universities
    - Have statistics about how many people took the quiz, average scores, etc.
    - Like graphing the distribution of scores for each university and also the people who took the quiz
    - Share results on social media
- About universities 
    - Have like a comment ish UI for student testimonials, from reddit, fb, etc.
    - Maybe in the future make into actual CRUD app for students to leave reviews or like a freedom wall
- General Freedom Wall
    - Make it have clickable buttons to toggle which universities you can view, and add dropdown for date, likes, comments, etc.

Possible Features
- add admin for the CRUD app

Tech stack
- Next.js
- Typescript
- BetterAuth if add admin
- Neon + Drizzle

Quiz
- Have a question, each one having a score for each university

Tasks
- Add bar graph to the stats page to just show percentages of each uni selected similar to results page.
- Improve quiz
    - Post on reddit, fb
    - AI to do research
    - Shareable results
- Uni page
    - Testimonials 
    - Curated info, things that matter to the student life
- Home page
- Proper dashboard/sidebar
- SEO optimization
- Vercel analytics
- Pagination/Loading only when needed and filters
- Freedom wall
    - Filters for universities, date, likes, comments

For AI prompt
- Ask help for UI, page by page, as specific as possible, with colors, fonts, themes, layout, etc.
- Brainstorm UI libraries to use, and install ahead of time, and add in the prompt that we installed them already
- Ask for SEO optimization strategies for Next.js websites
- Double check all code for mobile responsiveness

Future possibilities
- Add uni specific freedom walls

DLSU-D: 1B6HWQ16 | https://www.facebook.com/profile.php?id=61559785568940
DLSU: YYNED2KT | https://www.facebook.com/archerfreedomwall
ADMU: LDW8EKTE | https://www.facebook.com/ADMUFW
UP: 1QB1WBHO | https://www.facebook.com/updilimanFW

i want you to create a prompt. basically to help you understand the codebase right now. because my code right now is just functionality first. no design whatsoever, so it looks very shit. and lots of things are not yet implemented. basically i know you know most of what is happening but there are details that are not there yet. basically create a prompt so that you are able to be up to speed. so that, we can brainstorm what needs to be done, what UI changes we should make, basically transform this workin version into one that looks nice and ready for production.

dump:
have separate chats for each university
tell it to look mainly for ff categories (find in old chat)
make it more personality and like preferences even dating, culture, etc.
tell it to find on freedomwall, fb post, twitter post, reddit post those that are more unfiltered and raw

compile those they have researched and let new ai make the quiz

quiz
not necessarily 4 3 2 1
not necessarily like each uni has their own take
we can assign questions to be like on a scale?
not necessarily like which one are you gonna do or which one do u like most
it can be like
like for example if the question is participating in orgs its like kind of likely, no, sure, ofc something like that and we decide points which uni suits that