


In this project let's build a **Photo Dekho App** by applying the concepts we have learned till now. This project allows you to practice the concepts and techniques learned till React Course and apply them in a concrete project.

You will demonstrate your skills by creating an app that will fetch data from an internal server using a class component, displaying that data, using **component lifecycle methods**, **routing** concepts, **authentication**, and **authorization**, and adding responsiveness to the website.

This is an individual assessment. All work must be your own. You will also be given feedback by code reviewers after your project submission.

<video loop="true" autoplay="autoplay" controls="controls" muted>
  <source src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1631075128/deliverables_error_lqejvb.mp4" type="video/mp4" />
</video>

### Prerequisites

#### UI Prerequisites

<details>
<summary>Click to view</summary>

- What is Figma?
  - Figma is a vector graphics editor and prototyping tool which is primarily web-based. You can check more info on the <a href="https://www.figma.com/" target="_blank">Website</a>.
- Create a Free account in Figma
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=hrHL2VLMl7g&t=37s" target="_blank">this</a> video to create a Free Figma account.
- How to Check CSS in Figma?
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=B242nuM3y2s" target="_blank">this</a> video to check CSS in the Figma screen.
- Export Images in Figma screen
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=NpzL1MONwaw" target="_blank">this</a> video to export images from the Figma screen.
  - Check <a href="https://help.trydesignlab.com/hc/en-us/articles/360011010634-How-do-I-export-images-and-PDFs-from-Sketch-or-Figma-in-my-short-course-" target="_blank">this</a> reference docs to export images in Figma screen.

</details>

#### Design Files

<details>
<summary>Click to view</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/FwBVnpWfl5DYJ77kbljTdT/Photo_Dekho?node-id=0%3A1" target="_blank">here</a>.

</details>

### Set Up Instructions

<details>

<summary>Click to view</summary>

- Download dependencies by running `npm install`

- Start up the app using `npm start`

</details>

### Completion Instructions

<details>

<summary>Functionality to be added</summary>

The app must have the following functionalities

- Login Route
  - Users should be able to see the disabled `Login` button if the user didn't enter the username and password.
  - Users should be able to see the enabled `Login` button if the user enters the username and password.
  - Users should be able to log in to their account by entering a valid username and password.
  - When the user submits a valid username and password then the users should be able to navigate to the home route.
  - When the user submits an invalid username or password then the user should be able to see an error message that the given `username or password is invalid.`
- Users should be able to navigate to the home route when clicking on the home logo.
- Users should be able to navigate to Home, Profile routes using links in Navbar.
- When the data is being fetched then the `Loading view` should be displayed to the user.
- When the user encounters an error while fetching the data from API then the `Error view` should be displayed to the user accordingly.
- In Mobile, When the user clicks on the back button then the user should be able to navigate to the previous page.
- In Mobile, When the user clicks on the `X` icon in the bottom overlay then the bottom overlay should be closed.
- Users should be able to see `Toast` with appropriate success/failure messages when the fetch call is done.

- Home Route

  - Users should be able to see stories.
    - Stories should be horizontally scrollable.
    - When the user clicks on the story, it should trigger a popup, and the `user name`, `profile pic`, `story image`, `caption` of the story should be displayed.
    - If the user didn't add their story then the user should be able to add a story by clicking on profile image.
      - When the user clicks on the profile image , it should trigger a popup
        - Users should be able to upload an image by clicking on the `Upload Image` button.
        - Users should be able to remove an image by clicking on the `X` icon.
        - Users should be able to add a caption to the story.
    - If the user added their story then the user should be able to view their story by clicking on profile image.
      - When the user clicks on profile image, it should trigger a popup, and the `user name`, `profile pic`, `story image`, `caption` of the story should be displayed.
  - Users should be able to see a list of posts.
    - Users should be able to see details about a post like `username`, `profile pic`, `post image`, `caption`, `like count`, `comments`, `comments count`, `created_at`.
    - Users should be able to see a detailed view of a user by clicking on the username.
    - Users should be able to like or dislike a post.
    - Users should be able to comment on a post.
      - Users should be able to see the disabled `Post` button if they didn't enter a comment in the comment box.
      - Users should be able to see the enabled `Post` button if they enter a comment in the comment box.
  - Users should be able to see `Home` with highlighted in Navbar.

- User Detailed View (Others Profile) Route

  - Users should be able to see details about a user like `username`, `user_id`, `profile pic`, `posts count`, `followers count`, `following count`, `about user`.
  - Users should be able to see the stories of the user.
  - If there are no posts to the user then the users should be able to see a message like `No Posts Yet` in the `Posts` section.
  - If there are posts to the user then the users should be able to see the posts images in the `Posts` section.
  - Users should be able to follow or un-follow a user.

- My Profile Route

  - Users should be able to see their details like `username`, `user_id`, `profile pic`, `posts count`, `followers count`, `following count`, `about`.
  - Users should be able to see stories in their profiles.
  - If there are no posts in their profile then they should be able to see a message like `No Posts Yet` in the `Posts` section.
  - If there are posts in the profile then they should be able to see the posts images in the `Posts` section.
  - Users should be able to edit their profile by clicking on the `Edit Profile` button.

- Edit Profile Route

  - Users should be able to edit their profile details like `username`, `bio`, `phone number`, `gender`.
  - Users should be able to see the `user id` field as disabled.

- Add Post

  - Users should be able to add a post by clicking on the `Add Post` button in the NavBar.
  - When the user clicks on the `Add Post`, it should trigger a popup
    - Users should be able to upload an image by clicking on the `Upload Image` button.
    - Users should be able to remove an image by clicking on the `IoMdClose` icon which is imported from `react-icons` library.
    - Users should be able to add a caption to the post.

- Search Functionality

  - Users should be able to search posts with the caption.
  - If search results are not empty then the users should be able to see searched results (posts).
  - If search results are empty then the user should be able to see the message like `Search Not Found`.

- Logout Button

  - Users should be able to log out from the application.

- When the users enter an invalid route in the URL then the Page not found Route should be displayed with a button that can navigate the user to the `Home page` on click.

</details>

### Quick Tips

<details>

<summary>Click to view</summary>

- Third party packages to be used to achieve the design or functionality
  - React Slick
    - React Slick <a  href="https://react-slick.neostack.com/docs/get-started"  target="_blank">Documentation</a>
    - React Slick implementation <a  href="https://codesandbox.io/s/stories-cv67c?file=/src/App.js"  target="_blank">CodeSandbox</a>
  - Reactstrap
    - Reactstrap <a  href="https://www.npmjs.com/package/reactstrap"  target="_blank">Documentation</a>
    - Reactstrap implementation <a  href="https://codesandbox.io/s/react-strap-5m513?file=/src/index.js"  target="_blank">CodeSandbox</a>
  - React Toastify
    - React Toastify <a  href="https://fkhadra.github.io/react-toastify/introduction/"  target="_blank">Documentation</a>
    - React Toastify implementation <a  href="https://codesandbox.io/s/mcqxc"  target="_blank">CodeSandbox</a>
- Uploading images to firebase and getting image URL from firebase
  - Video <a  href="https://www.youtube.com/watch?v=8r1Pb6Ja90o"  target="_blank">Reference</a>
  - <a  href="https://www.npmjs.com/package/firebase/v/8.2.7-2021110184936"  target="_blank">Documentation</a>
  - Implementation <a  href="https://codesandbox.io/s/firebase-image-upload-80890?file=/src/index.js"  target="_blank">CodeSandbox</a>
- Refer this code for NavBar implementation <a  href="https://codesandbox.io/s/navbar-91su6?file=/src/App.js"  target="_blank">CodeSandbox</a>

</details>

### Important Note

- In this project, the data you have sent through `POST-APIs` are not saved in the `Database`. If you refresh the page, the changes will not be persisted.
- Whenever you do a `POST-API` call, we are sending a mock object as a response.

Below Instructions are needed to pass the test cases.

<details>
<summary>Click to view</summary>

- **Note:**

  - If you are using styled components or normal HTML elements in your components then you should use the test id attribute as `data-testid` for all the elements wherever needed.
    - Example :- `<PostItem data-testid="postItem" />` or `<div data-testid="postItem"/>`

- Routes:

  - The Login Route should contain the pathname as `/login`.
  - The Home Route should contain the pathname as `/`.
  - The My Profile Route should contain the pathname as `/my-profile`.
  - The Other Profile Route should contain the pathname as `/user/:id`.
    - **Note:-** use the particular user id in place of id.
  - The Edit Profile Route should contain the pathname as `/edit-profile`.

- Login Component:

  - The Landing image should consist of alt at the text as `website login`.
  - The Photo Dekho image should consist of alt text as `website logo`.
  - The Cookies should be set by using the key name `jwt_token`.

- Header:

  - The Photo Dekho image should consist of alt text as `website logo`.
  - The Search icon should contain the test id with value as `searchIcon`.
  - In the `Home Route`, `AiFillHome` icon which is imported from `react-icons/ai` third party library should contain the test id with value as `homeFilled`.
  - For all the Routes except `Home Route`, `AiOutlineHome` icon which is imported from `react-icons/ai` third party library should contain the test id with value as `homeOutline`.
  - The Profile image should consist of alt text as `header profile pic`.
  - Popover Menu (Displayed in the UI when we click profile in the Header)
    - Popover should contain the test id with value as `popover`.
    - The Close Icon (`IoMdClose` imported from `react-icons/io`) should contain the test id with value as `closeIcon`.
    - The Profile icon (`CgProfile` imported from `react-icons/cg`) should contain the test id with value as `popOverMenuProfileIcon`.
    - The Logout icon (`FiLogOut` imported from `react-icons/fi`) should contain the test id with value as `popOverMenuLogOutIcon`.

- Search Functionality:

  - Search Results (where all the search results rendering in the UI) container should contain the test id with value as `searchResultsContainer`.
  - When Search Results are not empty
    - The Post Items should contain the test id with value as `post`.
      - The Author Profile image in the post should consist of alt text as `post author profile pic`.
      - The Post image should consist of alt text as `post pic`.
      - The Like icon (`BsHeart` imported from `react-icons/bs` library) should contain the test id with value as `likeIcon`.
      - The Un Like icon (`FcLike` imported from `react-icons/fc` library) should contain the test id with value as `unLikeIcon`.
      - The Comment icon (`FaRegComment` imported from `react-icons/fa` library) should contain the test id with value as `commentIcon`.
      - The Share icon (`BiShareAlt` imported from `react-icons/bi` library) should contain the test id with value as `shareIcon`.
      - My Profile in the comment section should consist of alt text as `my profile pic`.
  - When Search Results are Empty
    - Search Results Not Found image should consist of alt text as `search not found`.

- Home:

  - User Stories List
    - The User stories List Loader component should contain the test id with value as `userStoriesLoader`.
    - React Slick should be wrapped with HTML container element and it should contain the test id with value as `reactSlickContainer`.
      - User Stories List images should consist of alt text as `user story`.
  - Posts List
    - The Posts List Loader component should contain the test id with value as `postListLoader`.
    - The Post Items should contain the test id with value as `post`.
      - The Post User Profile image should consist of alt text as `post author profile pic`.
      - The Post image should consist of alt text as `post pic`.
      - The Like icon (`BsHeart` imported from `react-icons/bs` library) should contain the test id with value as `likeIcon`.
      - The Un Like icon (`FcLike` imported from `react-icons/fc` library) should contain the test id with value as `unLikeIcon`.
      - The Comment icon (`FaRegComment` imported from `react-icons/fa` library) should contain the test id with value as `commentIcon`.
      - The Share icon (`BiShareAlt` imported from `react-icons/bi` library) should contain the test id with value as `shareIcon`.
      - My Profile in the comment section should consist of alt text as `my profile pic`.
  - User Story (when clicking on user story in react slick container) React Modal
    - The First child container in My Story Modal should contain the test id with value as `userStoryModal`.
    - The User Story Loader container should contain the test id with value as `userStoryLoader`.
    - The Profile image should consist of alt text as `user story profile pic`.
    - The Story image should consist of alt text as `user story pic`.

- My Profile:

  - The Loader component should contain the test id value as `myProfileLoader`.
  - The Profile image should consist of alt text as `profile route profile pic`
  - Story images should consist of alt text as `profile route story pic`.
  - Posts icon (`BsGrid3X3` imported from `react-icons` library) should contain the test id value as `postsIcon`.
  - Post images should consist of alt text as `profile route post pic`.
  - If the posts are empty then No Posts icon (`BiCamera` imported from `react-icons/bi` library) should contain the test id value as `noPostsPic`.

- User Profile:

  - The Loader component should contain the test id value as `userProfileLoader`.
  - The Profile image should consist of alt text as `profile route profile pic`.
  - Story images should consist of alt text as `profile route story pic`.
  - Posts icon should contain the test id value as `postsIcon`.
  - Post images should consist of alt text as `profile route post pic`.
  - If the posts are empty then No Posts icon (`BiCamera` imported from `react-icons/bi` library) should contain the test id value as `noPostsPic`.
  - When Following User
    - The following icon should contain the test id value as `followingIcon`.
    - Follow Popover (when we click `BsFillPersonCheckFill` icon which is imported from `react-icons/bs` library)
      - Popover should contain the test id with value as `followingPopOver`.
      - The Profile image should consist of alt text as `follow popover profile pic`.

- Edit Profile

  - The Loader component should contain the test id value as `editProfileLoader`.
  - The Profile image should consist of alt text as `edit profile route profile pic`.
  - If the profile is updated successfully then the message `Profile Updated Successfully` should be displayed in the toast.
  - If we get any error while updating profile then the message in the response should be displayed in the toast.

- Failure View

  - The failure view image should consist of alt text as `failure view`.

- Page Not Found:

  - The page not found image should consist of alt text as `not found`.

</details>

### Resources

<details>
<summary>Data fetch URLs</summary>

**Note**: Use the values in the APIS as shown below

- Use the search input value in place of `searchInput` in the query parameters.
- The value of the user_id should be given in the place of `userId`.
- The value of the post_id should be given in the place of `postId`.

- Use the below sample code snippet to make a POST request on Login using a valid username and password.

  ```js
  const options = {
    method: 'POST',
    body: JSON.stringify(userDetails),
  }
  ```

- Login Route:

  - Get Request Token:

    ```js
    'https://apis.ccbp.in/login'

    ```

    - Sample request object:

      ```example
      {
        "username": "rahul",
        "password": "rahul@2021",
      }
      ```

    - Valid credentials

      ```example
      username: rahul
      password: rahul@2021
      ```

    - Sample response object:

      ```json
      {
        "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y"
      }
      ```

- Home Route:

  - Get stories:

    ```js
    'https://apis.ccbp.in/insta-stories'

    ```

    - Sample response object:

      ```example
      {
        "users_stories": [
            {
              "user_id": "Varun_Aadithya",
              "user_name": "Varun Aadithya",
              "profile_pic": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png"
            },
            ...
          ],
        "total": 9
        "my_story": null
      }
      ```

  - Get user specific story:

    ```js
    'https://apis.ccbp.in/insta-stories/{userId}'

    ```

    - Sample response object:

      ```example
      {
        "story": {
            "user_id": "Varun_Aadithya",
            "user_name": "Varun Aadithya",
            "profile_pic": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png",
            "story_details": {
                "caption": "Cute",
                "image_url": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-1-img.png"
            }
        }
      }
      ```

  - Add story:

    ```js
    'https://apis.ccbp.in/insta-stories'

    ```

    - Sample request object:

      ```example
      {
        "story_image": imageURL, // add image URL in place of imageURL and imageURL should not be empty
        "caption": "caption"
      }
      ```

    - Sample response object:

      ```example
      {
        "my_story": {
            "id": "8ef73378-58ab-4c95-9d7a-d4299767c6f1",
            "story_image": "imageURL",
            "caption": "caption"
        }
      }
      ```

  - Get posts:

    ```js
    'https://apis.ccbp.in/insta-posts'

    ```

    - Sample response object:

      ```example
      {
          "posts": [{
      	    "post_id": "f25d77f0-602e-41d1-971e-4b8cf54709eb",
      	    "user_id": "Varun_Aadithya",
      	    "user_name": "Varun Aadithya",
      	    "profile_pic": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png",
      	    "post_details": {
      		    "image_url": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png",
      		    "caption": "Another day, another sunrise"
      	    },
      	    "comments_count": 2,
      	    "likes_count": 7,
              "comments": [{
                  "user_name": "Prabuddha Dasgupta",
                  "user_id": "Prabuddha_Dasgupta",
                  "comment": "Lightning is incredible."
              },
              ...
              ],
              "created_at": "4 Hours Ago"
          },
          ...
          ],
          "total": 33
      }
      ```

  - Like/Dislike a post:

    ```js
    'https://apis.ccbp.in/insta-posts/{postId}/like'

    ```

    - Sample request object:

      ```example
      {
        "like_status": true // If you want to like a post then set like_status as true otherwise set it as false.
      }
      ```

    - Sample response object:

      ```example
      {
        "message": "Post has been liked"
      }
      ```

  - Add comment to a post:

    ```js
    'https://apis.ccbp.in/insta-posts/{postId}/comment'

    ```

    - Sample request object:

      ```example
      {
        "comment_text": "comment"
      }
      ```

    - Sample response object:

      ```example
      {
        "message": "Comment has been added"
      }
      ```

- User Detailed View (Others Profile) Route:

  - Get user details:

    ```js
    'https://apis.ccbp.in/insta-users/{userId}'

    ```

    - Sample response object:

      ```example
      {
        "user_details": {
        	"id": "df3234jkjn2-32432nnknn-w23231",
            "user_id": "Prabuddha_Dasgupta",
            "user_name": "Prabuddha Dasgupta",
            "is_following": false,
            "profile_pic": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-4-img.png",
            "followers_count": 297,
            "following_count": 303,
            "user_bio": "Prabuddha Dasgupta (21 September 1956 – 12 August 2012) was an Indian fashion and fine-art photographer. ",
            "posts_count": 3,
            "posts": [{
                "id": "390562f5-298f-4904-aea4-07ecc212febe",
                "image": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-10-img.png"
            },
            ...
            ],
            "stories": [{
                    "id": "UnrObltRP",
                    "image": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-10-img.png"
            },
            ...
            ]
        }
      }
      ```

  - Follow/Unfollow user:

    ```js
    'https://apis.ccbp.in/insta-users/{userId}'

    ```

    - Sample request object:

      ```example
      {
        "follow_status":true
      }
      ```

    - Sample response object:

      ```example
      {
        "message": "Followed the user Prabuddha Dasgupta"
      }
      ```

- My Profile Route:

  - Get profile details:

    ```js
    'https://apis.ccbp.in/insta-profile'

    ```

    - Sample response object:

      ```example
      {
        "profile": {
            "id": "df3234jkjn2-324sdf1132nnknn-234324234",
            "user_id": "rahul",
            "user_name": "John",
            "profile_pic": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/profile/instagram-mini-project-profile-1.png",
            "followers_count": 289,
            "following_count": 12,
            "user_bio": "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
            "posts": [{
                "id": "1a698dc4-sdf6e83-4ede-998e-638305f7aee6",
                "image": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-31-img.png"
            },
            ...
            ],
            "posts_count": 3,
            "stories": [{
                "id": "5HJ25nUNJ",
                "image": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-34-img.png"
            },
            ...
            ]
        }
      }
      ```

- Edit Profile Route:

  - Edit profile details:

    ```js
    'https://apis.ccbp.in/insta-profile'

    ```

    - Sample request object (add keys and values in the request object which are needed to be update):

      ```example
      {
        "user_name": "Rahul",
        "bio": "We craft chocolates into a healthier food.",
        "gender": "MALE", // gender value should be MALE/FEMALE/OTHER
        "phone_number": "9090900078"
      }
      ```

    - Sample response object:

      ```example
      {
        "profile": {
            "id": "df3234jkjn2-324sdf1132nnknn-234324234",
            "user_id": "rahul",
            "gender": "MALE",
            "user_name": "Rahul",
            "user_bio": "We craft chocolates into a healthier food.",
            "phone_number": "9090900078"
        }
      }
      ```

- Add Post:

  ```js
  'https://apis.ccbp.in/insta-posts'

  ```

  - Sample request object:

    ```example
    {
        "post_image": imageURL,  // add image URL in place of imageURL and imageURL should not be empty
        "caption": "string"
    }
    ```

  - Sample response object:

    ```example
    {
      "post": {
        "id": "a7bb604a-f760-4695-81e5-2faac7f798c5",
        "post_image": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-34-img.png",
        "caption": "caption"
      }
    }
    ```

- Search Functionality:

  ```js
  'https://apis.ccbp.in/insta-posts?search={searchInput}'

  ```

  - Sample response object:

    ```example
    {
      "posts": [{
            "post_id": "6fb210a9-0c4d-431f-8585-b3a4f065a171",
            "user_id": "Atul_Kasbekar",
            "user_name": "Atul Kasbekar",
            "profile_pic": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-5-img.png",
            "post_details": {
                "image_url": "https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-5-img.png",
                "caption": "The sky is the daily bread of the eyes."
            },
            "comments_count": 2,
            "likes_count": 9,
            "comments": [{
                "user_name": "Arjun Mark",
                "user_id": "Arjun_Mark",
                "comment": "Aim for the sky, but move slowly, enjoying every step along the way."
            },
            ...
            ],
            "created_at": "4 Hours Ago"
            },
        ...
        ],
      "total": 2
    }
    ```

</details>

### Project Submission Instructions

- For Mini Projects, you can submit the test cases at own your pace. But we suggest you to submit the code to know the percentage of completion through test cases and that score will be considered for your interviews

- For Mini Projects, you can publish/deploy the code using `ccbp publish RJSCPIHAM7 domain_name.ccbp.tech`. So that our team will be able to see that code and deployed URL (Ex: something.ccbp.tech) and will share feedback to you if required.

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
