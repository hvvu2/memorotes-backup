# Memorotes
### https://memorotes.web.app/

# Description
Memorotes is a sticky note style website that allows users to record their memorable moments or vent their feelings by writing a note every day, but the difference from other note-taking websites is that the note can't be edited or deleted after the day anymore, and then it becomes a "memory note".

＊ Test Username: guest@guest.gst
<br/>
＊ Test Password: 000000

# Features
1. A single-page application to enhance the user experience by using AJAX and many popups.
2. Users can log in/sign up to access all the services, or try some basic features as a guest.
3. Notes are time-limited to be edited or deleted, once after the day, the contents will be stored permanently.
4. Users can expand the style panel to customize the note's style, color, align, text color, etc.
5. The member center allows users to check their statics and change their names.

# Structure
![memorotes drawio](https://user-images.githubusercontent.com/19690558/177708468-7e6ee8be-499d-4874-a753-0eef3128e808.png)

# Frontend Techniques
## HTML

## CSS (SCSS)

## React (React Hooks)
* useState: Store local states, such as note title, content, timestamp, etc.
* useEffect: Execute conditional statements or codes, such as updating time, after rendering.
* useContext: Pass the local states to the sub components.
* useRef: Get the certain react-dom elements.

## Redux (Redux Toolkit)
* slice: Manage global states, such as UI and popups toggles, actions and reducers, so as to simplify the project structure.
* thunk: Handle async actions and simplify the main components.
* useDispatch: Dispatch an action to modify the global states.
* useSelector: Get the global states.

## AJAX

## RWD
***
# Backend Techniques
## Firebase Hosting

## Firebase Authentication

## Firestore
