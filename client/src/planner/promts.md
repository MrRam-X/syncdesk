1. Db models Prompt

Lets start with pages.
Login (Common for all role types)
Register (only for Owner role type)
Dashboard (different view for all roles)
Orgs, Orgs/Details, Orgs/Users (only for Admin)
Employees, Employees/Details (only for Owner)
Projects, Projects/Sprints, Projects/Backlogs, Projects/Members, Projects/Sprints/Task Board (only for Owner and Employees)
About (common)
Contact (common)
Landing Page (common)


There will be an admin who can control the entire application. Admin will be pre registered meaning their details will be already entered in the db. They can add/remove/update any org/owner/users. This is the only access they will be getting as of now. Maybe in future they can access the details of an org like projects/sprints/backlogs/tasks.

Then there are Org/Owner they can go to registration page and register themselves as org fill their org details and owner details. After login they can register employees. They have the access to add/remove/update employees of their org. As of now access wise they can perform these only.

At last there are employees, they have sub roles like Manager/Team Lead/Developer/Tester. Based on the sub roles they can add/remove/update the projects/sprints/backlogs/tasks/members.

In short the roles are like this Admin, Owner, Employee, Employee have sub role like Manager, Team Lead, Developer, Tester. Only Manager have crud access to projects/sprints/backlogs/tasks and they can add/remove other employees to projects. Team Lead have crud access to backlogs/sprints/tasks and they too can add/remove other employees to projects. Developers and Testers only have crud access to their tasks.

Now as of now I am not sure which is better approach for this sub role integration to separate the roles or the owner can give particular crud access to each employee. You can analyze the role based system above and give your conclusion and optimal approach for this.


=============================================================================
##============================ Design Promts ==============================##
=============================================================================

Overall the design looks good and professional. There are a few changes that I would like to introduce. First Add a new column at the start. It will be the backlog/user story cards then there will be other columns like todo, inprogress, deployed, testing, done. What I want is an ui almost similar to azure devops board. I want by default all the user stories/backlogs to be collapsed. When expanded then show its contents and all the columns. When collapsed show the title of the user story/backlog only. Move all the filters to the right handside and instead of filters displaying side by side put a filter icon button and also add a select dropdown for selecting sprints. On click of filter button open a drawer menu from right side and list the filters inside it. In place of the filters displaying currently add tabs like task board and backlog. By default task board tab is selected. Remove add work item buttons from all the cards. It should only be visible for user Story/backlog.


I want to know for drag and drop are we going to use any library. If so then we need to make sure that our design is easily compatible with that library and our integration becomes hassle free. also there is some changes that I would like to make first remove add task button from the user story card itself and add a dotted border card in todo column for adding task. It should always be positioned below the entire todo tasks of each story. Second when story is expanded display story card only and remove the title that is shown when it is collapsed. Next remove the userstory/backlog column name and add a collapse all button to collapse all the stories at once. As we are not using Bug, Calendar, CheckCircle2, Clock, icons there is no need to import them. I noticed a strange behavior when I zoom in, the container of the entire user story hides the testing card as well as done card as you can see in the attached image. Also no need to generate the entire code again and again just provide me with the updated code and tell me which area to replace it with.


Alright a few more changes. First add some margin at the top of taskboar, backlog tab and also add some padding on top of the tabs container. Second I want to display the active filters when we actually apply filters. Add a section inside the filter side drawer to display the active filters. Make work item type multi select. Make Assignee select dropdown. Move the drop icon of the user story card to top left instead of top right after it is expanded. Also need to display different tag color of sprint that is closed. Create a span section similar to Active • Ends in 6 Days But add Complete • Ended on 26/10/26 with different color. Then two more with different colors one for upcoming with date and one for In Active not planned.

Need major changes in backog tab view. There has been a information gap from my end. What I want is in backlog tab there will be backlogs listed only. The backlog will become user story when we pull that into a sprint. Backlogs are basically user stories that are not finalized or you can say currently it is in planning stage by product owner/manager. Once the feature planning is done then they are put into an existing or upcoming sprint and becomes user story. In short display a list of backlogs/userstories with 4 columns id, assigned to, status and title. Basically this tab will list all the user stories inside a sprint based on the selected sprint. when we click on the story then a modal will open containing all the details of that story/backlog along with its tasks.

I have removed the create story button as we already have new story button. I want a modal form for creating new story. It will be open on click of new story button.

I need a few more changes. First lets make the left side drawer nav menu to expand and collapse. When collapsed use icons only and on hover display their name on a tooltip. Next add custom sprint selection dropdown with fixed height and scrollbar and add a button at the bottom to create new sprint. On Click open a modal form for creating new sprint. Then add an edit icon beside the Sprint 24.1 (Active) text. On click open the same modal form for the user to edit.

Okay a minor change in the collapsable menu instead of Collapse Menu button at the bottom add a collapse button at the center but outside sticked to the border of the menu. When collapsed the button should point in the opposite direction and vice versa. And also removing the following icon imports as they are not being used GripVertical, MoreHorizontal, Target.

Few more changes for the collapsable menu add some transition animation effects. Right now when the menu is expanded the texts just pops up in a weird way feels a bit clunky and is visually unappealing. and also looks like the space is being occupied suddenly. I believe adding animation and transition effects can solve this. But feel free to add your solution. Next the collapsable button does not look professional at all. Instead of a circular button can we make it a rectangular button and instead of positioned at the center of the border make it outside the border stuck to the border. And the rectangle should be upside down meaning the length should be parallel to our vertical border. and the button should have rounded edges and opposite side rounded at the point where it is touching our vertical border. Hopefully I am able to convey properly.

In the left side menu remove backlog and add Projects. Next remove the white bottom rounded border from each item in sprints dropdown list. No need to generate entire code again and again just provide the necessary code for the changes and instructions to where put it.

Need to add Team members tab in Sprints and Board screen beside Taskboard, backlog tabs and remove team members from the sidebar menu, Rename Sprints And Board to Board in the side menu, Add Sprints, Task Items, Planner in the side menu as well to finalize the sprint and Board screen design. Add Dashboard at the top of the sidebar menu. Remove Project Settings from sidebar menu.

There are still some ui and screen related thing we need to sort out. Need header custom project selection dropdown just like sprint selection dropdown except create new button. Then custom notifications popup when we click on notification bell icon. Second custom popup list when clicked on user profile icon at the right top corner. Then all projects screen where all the projects of the organization will be listed in a card format with title, members icons and if more than 4 members then 3icons stacked then +number of members left. Then create the dashboard screen, sprint screen where all the sprints across all projects will be listed. There will be controls to see particular project's sprints. Then Task Items screen where all the task items will be listed. Then planner screen which one can use as a custom text editor for the individual's planning or notebook kind of thing. Before moving to any other steps of our phase 1 I think these things should be included in our steps of phase 1. Divide these changes in steps and relist our steps with their respective statuses.

When clicking outside neither of the popups closes, be it profile, notification or project selection popup. Project selection popup is going under the left sidebar menu. Check the attached image for reference.

Before implementing the solutions I want to know does any of these changes affect the behavior of my modals.

Little change in projects screen view. Instead of listing all projects in a card view. Display card view for projects that the logged in user is currently part of and below that display All Projects section where all the projects will be listed in a row wise manner just like in backlog tab view. For list view keep title and a short description below it then along the description line at the right side show the members avatar just like the card. Now begin the step 1.8

do onething no need to keep the code that is not related to this screen. All the functionality like modals, popups and board related code is not needed for this screen. give me full code of App.tsx for Project Screen focused only, with of course the static global app shell layout. From now onwards for each screen we are gonna follow this approach only. Static code for global app layout then the screen code.

The white border around the projects is visually unappealing. Change the border color to the same border of the searchbox. Give the code for this change only and where to put this code. Same for the all projects section.

Need to include project details screen as well. Transition to this page when clicked on the any of the project displayed in the projects screen. The details screen will contain details like About this project with an edit icon to edit it. A section for the project stats like Backlogs, Work Items, sprints, members with all their avatar and names beside it. add an invite button for inviting members.

Project details screen contents are shifted to the left side unlike the project listing screen. give me the code to fix this and where to put the code.

A layout change is needed for the details page. Keep the about section as it is but below it divide into two equal parts left one for the stats and right one for the members.

The left and right column headers are not aligned horizontally. check the reference image.

I have replaced the divide-slate-850 to divide-slate-800 in the members list. Now lets analyze again how much of our part c is done. I believe projects screen is done. Also include the project details points that we have covered in step 1.8

Lets move to dashboard screen step 1.9 and the same as before keep the global app shell and give the code specific to this screen.

Need a dashboard screen view when the user is logged in for the first time in the app. He is not any part of a project.

Alright I cant think of any other features to be included in  Dashboard screen is apart from this. As of now lets lock the design for this screen. Move to the next step/screen.

Move to task items screen

Move to planner screen

Add a little bit of more gap between the sidebar and the screen contents as the expand collapse icon is directly sitting on the edge of the note left column texts.

Lets move to part D with a little bit of shuffle in execution. First go with auth screens then the portals.

Move to Owner & Admin Management Portals