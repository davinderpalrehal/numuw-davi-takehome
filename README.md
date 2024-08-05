# Numuw Davi - Takehome

## Requirements

### Description

Numuw as we know offers a video conference capability between the parent/child & specialist on the platform which works great so far. Though, lately there has been some suggestions from our customers that they sometimes prefer to be able to have the ability to chat with the therapist directly from the same application when a video call is not ideal where they need to have a quick chat to give updates regarding their child's progress. Note that we need to MVP this feature to really validate if it's worth investing more time into it at a later point

### Requirements

Build a **real-time** chatting system between the therapist and parent where the following should be met.

#### Functional Requirements
- The specialist can open a new conversation with the parent at any time
- The parent can only send a request for therapist to initiate a new conversation and cannot open a new conversation
- The conversation can hold different statuses and can be visited back at any point in time even if it was "closed"
- Ability for both parties to upload a video/image & be able to load it inside of the chat
- The chat history can be retrieved by either the therapist of the parent at any point of time

#### Technical Requirements
- The communcation should be secure at all times between both parties
- The chat history should be stored securely
- The infrastructure should be build using AWS, ideally built using IaC (Infrastructure as Code) with the tool of your choice (CloudFormation, Terraform, Serverless Framework, CDK, Pulumi, etc.)
- User 3rd party services for socket communication is **not** allowed other than AWS
- A simple pipeline setup that enables continuous integration and deployment

### Technologies
- Django
- ReactJS
- AWS

### Submission
The solution should be uploaded to a github repository with a README.md file that explains
- An overview of the solution and how it works
- The reason behind the different choices of technologies (AWS specifically)
- The data model that was used and the reason behind it (if there is any)
- A step-by-step guide on how to run the solution, note that it shouldn't take more than 2 commands to get it up and running if everything is setup correctly