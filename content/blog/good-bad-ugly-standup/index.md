---
{
  "title": "The Good, the Bad and the Ugly Standup",
  "description": "“In this world there are two types of standup, my friend: comedy and meetings.<br>You do meetings.”", 
  "author": "Loris Cro",
  "layout": "post.html",
  "date": "2020-01-26T00:00:00",
  "draft": false
}
---

It's not always easy to understand what makes meetings successful and since Zen stories aren't the learning tool of choice in the business world, we have certified practitioners teach people what they call "ceremonies": rituals that you're supposed to imitate with the expectation that, hopefully, illumination will eventually dawn on you.

I don't claim to know everything about agile and I won't even try to recap any part of its history, or what the agile manifesto meant to say (or not say), but I've had a few different types of standup meetings in my professional life. Reading of my experiences will maybe entertain you and, hopefully, even help you eventually have better meetings.

In the beginning, I worked in academia mostly by doing data science for research groups. At that time I'd only heard stories of the rough life in the West (i.e., the industry). I had no standup meetings, no sprints, and more importantly, no customers. 

Then I joined a software consultancy firm.


## The Bad

In my first standup we were about 20 people in total. We would gather in a conference room and wait for the engineering manager to start the meeting. Once we started, one after another we would say what we did the day before, what we planned to do on the present day, and if we had encountered any blocker. I'm sure you know this prayer already.

As I mentioned, this was a consultancy firm, so the people in the standup meeting were all working on different projects, which made the standup mostly useless. I would talk about my project, boring those who didn't know the context, and they would return the favor afterwards. The only one who was never bored was the engineering manager.

We all knew that this meeting was a way for him to know who was busy on a project and who was free (or about to be). People would bounce from project to project sometimes doing billable work, sometimes not, and this meeting allowed the engineering manager to have a daily overview of what everybody was doing.

The worst was when the engineering manager was on leave. We would still hold the same meeting with the same format, all 20 developers, but for the benefit of no one. That infuriated me.

The meeting was short, we did it while literally standing up, the three ceremonial questions were answered, and yet it was a complete waste of time for all but one person in the room. This was an unequivocally bad standup.

## The Ugly

Fast-forward a couple of months and a new big project starts, causing the original standup to be broken into two: one for the big project, and one for everyone else. I was assigned to the big project, so I was also moved to the new meeting.

This new standup introduced two big changes: 
1. everyone was working on the same project,
2. in place of the engineering manager we now had a project manager and the enterprise architect in charge of the project.

The PM would lead the meeting and, like before, everyone would answer the three questions -- except now there would often be a bit of back and forth with the architect about details, clarifications about user stories, or some other exchange of information. That felt like a big improvement.

The flipside was that the chatting would regularly force the PM to remind everyone about the purpose of the "daily scrum" (aka the standup) and that long discussions should be moved to a separate meeting. 

For as long as the standup kept this format we were never able to find a balance, which felt weird because the standup had finally started to be useful, but there was a clear conflict between the stated purpose of the meeting and the type of information exchanged.

This standup too had the "on leave" problem. Without the PM we would often go down rabbit holes, and without the architect we would be missing all the good interactions.

There wasn't anything glaringly terrible with this meeting, but it wasn't that good either: it was an ugly standup.

## The Good

Let's skip forward a few months more and now the project is getting even bigger. From one team we went to two, then three, and now were about to add a fourth team.

The latest change in scope forced both architect and PM to leave my team's standup and so now we were left to our own devices. I should also add that originally our standup included people from quality assurance, but now QA had become a project-wide cross-team group and had their own meeting.

Now my standup meeting included only 4 developers not only working on the same project, but also on the same repository, and there were was no management in it.

The meeting now wasn't anymore about proving that we actually did something the day before, planned to do something on the present day, and assuring everybody that no time was being wasted. Since there were no more managers, the tone had changed drastically.

**Now we would use the meeting entirely to make tactical decisions about which task to tackle next**.

Was the frontend developer waiting for me to formalize the HTTP API? We would agree to discuss it immediately after the meeting, and maybe I could delay implementing the logic behind the interface depending on my needs.

If two tasks looked like they would require similar implementations we would agree to do pair programming or investigate the similarity somehow. This way we would avoid reinventing the wheel (at least within the team).

This way of communicating made us tackle complex tasks first, coordinate whenever it seemed a good idea, and it also let us really acknowledge "blockers" not out of loyalty towards the company (hah!), but out of respect for each other. **In other words, we made a point of making this standup a tool for making our own lives easier.** Now this meeting made sense always, no matter who was missing.

I experienced this standup format both in-person (in Italy) and remotely (from Singapore), and it was always good.

## Once upon a time in software development

It's interesting to me how all these changes happened within the same company department over a relatively short timespan. By reading this article you would think that everything got progressively better, but the reality was much messier than what the previous chapters would suggest. 

The enterprise architect doubled as many other roles and the reason why him and the PM stopped running standup meetings was because, as the project moved forward, new fires would pop up every day in other parts of the development process and so they had to divert their attention away from my team, which was doing relatively fine.

**This means that what allowed us to stumble upon the Good standup was a long series of other problems**, and in fact we might not even have understood the point of standup meetings without having first gone through the previous stages. Being battle-hardened is what made us truly appreciate the importance of taking care of each other.

Going back to my original point, it's clear how even though all companies say they "do agile", in fact most don't; they just do random meetings while standing up, which produces bad results that I consider right-out offensive towards developers.

Following religiously a methodology is not going to produce good results either. The details that make up a good meeting are subtle and the pursuit of an [artificial standard of aesthetics](https://www.youtube.com/watch?v=GzQjGhD5tSU) <sup>[1]</sup> will prevent you from doing the necessary experimentation to improve from an ugly equilibrium.

The standup that worked for my team might differ in some details from the one that works best for yours. What matters is that you **refuse to accept solutions that come at your expense without giving anything back**, but that you also maintain the mindfulness necessary to know that some details might be wrong even when everyone has the best of intentions and all the checkboxes are ticked.

To put this in a more Zen way,   
*the imitation of a frog is a frog, but a frog doesn't try to be a frog.*

<small><i><sup>[1]</sup> The linked video is quite literally business-porn. Managers who strive to imitate it are even more embarrassing than teenagers that try to imitate what they saw on regular-porn websites.</i></small>








