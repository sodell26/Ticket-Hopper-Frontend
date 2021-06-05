# Ticket-Hopper

A full CRUD app to for tracking tickets. 

# User Stories  
### Team Member 
User will be able to create an account.   
User will be able to login if account exists and credentials match.  
User will be able to see tickets   
User will be able to open ticket to see details.   
User will be able to add notes (edit), complete ticket  
User will be able to create a ticket. 




## Stretch Goals
Ticket and team can be assigned dynamically.    
User will be able to reject a ticket, with a note (optional).     
User will be able to request to join a team. 
User will be able to view tickets assigned to them, all available tickets, completed tickets, and all tickets (closed and open).    
Team member will be able to add notes that the customer cannot see as well as ones for the customer.      
Customer will be notified automatically via email once the ticket is marked completed.       
Frog specific design.        
Search for tickets by team, assigned team member, customer, key words.       
Admin account that can see all teams and all tickets.      
Chat feature between members of the team.          
Manager/Team Members will be able to switch between teams without signing out or making a new account.      
Completed tickets automatically delete after so many days.                


### Manager Member 
User will be able to do the same as Team Member.   
User will be able to create a Team.      
User can only create unique team names.            
User with manager authority will be able to add, edit, delete to the list of members on a team.   
User will be able to assign tickets to Team Members, including self.    
User will be able to return tickets to customer to reject, review, or ask for more information.   

### Customer
User will be able to submit tickets.      
User will be able to see status of ticket (who it's assigned to, any notes, and when it's completed).      
User will be able to add contact information to ticket.   

## Models

### customer
Username: CharField   
Email: CharField   
Password: CharField   
tickets: []      

### Team Member/ Manager   
Username: CharField,
Email: CharField,
Password: CharField,
Teams:
Tickets:
Manager: boolean   

### Team
name: CharField   


### Tickets:   
Id:   
AssignedTo: (member/manager id as foreign key)   
Description: CharField,   
Submitted by: linked to any user,   
notes: (this will be where they can add line of code, maybe not needed for model?)   
open: boolean   
created:   
team:   

### TeamMemberTeam
team: ForeignKey to Team    
team_member: ForeignKey to TeamMember   


##WireFrame   

###Landing Page

![Landing Page](/images/Landing-Page.png)      

###Create Account Page

![Create Account](/images/Create-Account.png)  

###Ticket Page
   
![Ticket Page](/images/All-Tickets.png)  








