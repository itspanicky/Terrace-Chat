# Terrace-Chat

## Additional Concepts
* livingRoom or Houses have expiration dates that can be extended.

### Run Through MVP of User creation.
* Upon user creation - Backend will check if there are 3 Male users and 3 Female users who do not have yet have a room. 
 - If there aren't enough users, User will be directed to a waiting page. 
 - If there are enough users, User will be directed to a Chat page. Other users who were waiting will receive an email that they are accepted in a chat page. 
    - Users all updated with a new room id.
    - Users have a room id? 
    - Room has user ids? 
    - Users who have room ids will be brought to a room (Chat page).

* Chat/Room page - Socket.io 
 - On render Chat page will fetch all Messages pertaining to Room id and render them on the page. 
 - Users will be put in a room according to their room.id 
 - Messages emit to backend which are broadcasted to the chatroom. Messages are also created in the database. 
    - Messages Model
        id,
        livingroom,
        text,
        user

 #### Additional features.
* Upon user creation - If there is a room that is missing a certain gender. Join that one instead if you are that gender. 
* Chat Rooms will expire over time.
