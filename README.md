# Streaming

Our application is divided between a client-side ReactJS application and a server-side Node.js application.

## Server-side

### Models

- User
  - name - String
  - email - String
  - passwordHashAndSalt - String
  - role - String, either 'viewer' or 'creator'
- Course
  - title - String
  - description - String
  - creator - ObjectId, refers to user document
  - episodes - Array of ObjectId, refers to episode document
- Episode
  - title - String
  - url - String
- Subscription
  - user - ObjectId, refers to user document
  - startDate - Date
  - nextBillingDate - Date
  - active - Boolean
  - customerId - String, provided by Stripe (should exist for viewers only).
- Charge
  - subscription - ObjectId, refers to subscription document
  - date - Date
  - successful - Boolean

### CRON Jobs

Some scripts need to run at predetermined intervals.

- Script that lists subscriptions where nextBillingDate is in the past and active is true. It triggers a credit card charge through Stripe, it creates a charge document where successful is set to wether the charge was successful or not. If true, then nextBillingDate on subscription document is set to today + 30 days. If false, active is set to false.

### Controllers (REST API endpoints)

// all, authenticated, viewers, creators, visitor

| METHOD | PATH                          | DESCRIPTION                                                             | AUTHENTICATION |
| ------ | ----------------------------- | ----------------------------------------------------------------------- | -------------- |
| GET    | "/course/list"                | List available courses.                                                 | all            |
| GET    | "/course/:id"                 | Load details of single course.                                          | all            |
| GET    | "/episode/:id"                | Load video URL for specific episode.                                    | viewers        |
| POST   | "/authentication/sign-up"     | Sign Up.                                                                | visitor        |
| POST   | "/authentication/sign-in"     | Sign In.                                                                | visitor        |
| DELETE | "/authentication/sign-out"    | Sign Out.                                                               | authenticated  |
| GET    | "/subscription"               | Get status of subscription.                                             | viewers        |
| POST   | "/subscription"               | Create new viewer subscription (credit card details - stripe token)     | viewers        |
| PATCH  | "/subscription"               | Create new viewer subscription (credit card details - stripe token)     | viewers        |
| GET    | "/settings"                   | Get settings for current account (email)                                | authenticated  |
| PATCH  | "/settings"                   | Set settings for current account (email and name)                       | authenticated  |
| GET    | "/creator/course/list"        | List all of creator's courses                                           | creators       |
| POST   | "/creator/course"             | Create a new course                                                     | creators       |
| PATCH  | "/creator/course/:id"         | Edit single course                                                      | creators       |
| DELETE | "/creator/course/:id"         | Delete single course                                                    | creators       |
| POST   | "/creator/course/:id/episode" | Add each episode individually.                                          | creators       |
| GET    | "/file-upload-authentication" | Allow imagekit to generate a signed URL that can be used to upload file | creators       |

// GET - Load data
// POST - Create new resource
// PATCH - Edit resource.
// DELETE - Delete resource.
// PUT - Replace resource.
// OPTIONS, ETC.

## Client-side

### Views

| NAME             | DESCRIPTION                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home             | Display list of available courses to any user, authenticated or not. If user is not authenticated, they should also see a call to action asking them to join the service or authenticate. |
| Course           | Display information about a course, such as title, cover image, description, creator, episode list. Each episode in list should display episode name and possible description.            |
| Episode          | Display episode video element.                                                                                                                                                            |
| SignIn           | Show sign in form.                                                                                                                                                                        |
| SignUp           | Show sign up form.                                                                                                                                                                        |
| CreatorSignUp    | Show sign up form.                                                                                                                                                                        |
| Subscription     | Shows subscription status. If no subscription has been made, display credit card form. Otherwise, show subscription details, cancel subscription.                                         |
| Settings         | Allow viewers to change account settings (email, password).                                                                                                                               |
| CourseCreate     | Allows creators to add a course (create a CourseForm component which is also shared with CourseManagement view).                                                                          |
| CourseList       | Shows a creator all of their courses.                                                                                                                                                     |
| CourseManagement | Allows creators to manage a course.                                                                                                                                                       |

## Wishlist Items

If the user is authenticated, besides showing all courses, you should see the courses you're currently viewing (or courses that are appropriate to you).

Allow creators to add notes to each episode

Allow users to add their own persisting notes

Timestamped notes

In episode list, episodes should have covers and runtime.

Bulletproof subscription charging logic to ensure no repeat charges (idempotency).

## Drawbacks / Edge cases

These are some edge cases we won't be considering:

- We might not be able to issue payments through the platform.
- Taxing customers or creators.
- Handling payment reversals.
- Videos are provided as uploaded by the creator to the viewer.
- Charge is unsuccessful (we won't retry it, just de-activate subscription).

## Other

URL of video to test
http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

## Difference between uploading files to Cloudinary and Imagekit

### Cloudinary

1. User submits a form that issues a POST request to the server with encoding type of "multipart/form-data", where one inputs includes an image or video file.
2. Server handles request, multer middleware parses request body and uploads the file to cloudinary.
3. Server responds with redirection to another page.

### Imagekit

1. Imagekit React component makes GET request to '/file-upload-authentication'.
2. Request handler makes a call to the Imagekit API and generates some unique keys to perform the upload. It responds back to the client with said keys.
3. Using keys from response, client makes additional request to Imagekit API to which it sends these keys + file.
4. Imagekit API responds to client with success or error.
