# EventManagementAutomation
This project's components automate tasks which are triggered by event management system (OMi). I wrote a nodeJS server app (which is called rpaServer) to receive http request from Event Management System and then forwards requests to related RPA (robotic process automation) robot. I also added a Queue structure to hold rejected requests to resend to RPA robot.

Note: Project started 1 week ago. So, there are lots of missings in terms of exception handling etc. I need to refactor the code as well.
