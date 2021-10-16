import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  render,
  screen,
  waitFor,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginRoutePath = '/login'

const userProfileRoutePath = '/user/Varun_Aadithya'

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-stories'

const postsAPIURL = 'https://apis.ccbp.in/insta-posts'

const userProfileAPIURL = 'https://apis.ccbp.in/insta-users/Varun_Aadithya'

const myProfileURL = 'https://apis.ccbp.in/insta-profile'

const userFollowAPIURL = 'https://apis.ccbp.in/insta-users/Varun_Aadithya'

const userStoriesResponse = {
  users_stories: [
    {
      user_id: 'Varun_Aadithya',
      user_name: 'Varun Aadithya',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    },
    {
      user_id: 'Arjun_Mark',
      user_name: 'Arjun Mark',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-2-img.png',
    },
    {
      user_id: 'Gautam_Rajadhyaksha',
      user_name: 'Gautam Rajadhyaksha',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-3-img.png',
    },
    {
      user_id: 'Prabuddha_Dasgupta',
      user_name: 'Prabuddha Dasgupta',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-4-img.png',
    },
  ],
  total: 9,
  my_story: null,
}

const postsResponse = {
  posts: [
    {
      post_id: 'f25d77f0-602e-41d1-971e-4b8cf54709eb',
      user_id: 'Varun_Aadithya',
      user_name: 'Varun Aadithya',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
        caption: 'Another day, another sunrise',
      },
      comments_count: 2,
      likes_count: 7,
      comments: [
        {
          user_name: 'Prabuddha Dasgupta',
          user_id: 'Prabuddha_Dasgupta',
          comment: 'Lightning is incredible.',
        },
        {
          user_name: 'Gautam Rajadhyaksha',
          user_id: 'Gautam_Rajadhyaksha',
          comment: 'The Earth laughs in flowers.',
        },
      ],
      created_at: '4 Hours Ago',
    },
    {
      post_id: '2844b49e-28ad-413f-9846-8b9005ed9f6f',
      user_id: 'Dabboo_Ratnani',
      user_name: 'Dabboo Ratnani',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-11-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-2-img.png',
        caption: '#Nofilter needed,',
      },
      comments_count: 2,
      likes_count: 8,
      comments: [
        {
          user_name: 'Varun Aadithya',
          user_id: 'Varun_Aadithya',
          comment: 'Beauty is power; a smile is its sword.',
        },
        {
          user_name: 'Atul Kasbekar',
          user_id: 'Atul_Kasbekar',
          comment: 'Someone looked pretty today.',
        },
      ],
      created_at: 'August 21',
    },
  ],
}

const userProfileResponse = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-234324234',
    user_id: 'Varun_Aadithya',
    user_name: 'Varun Aadithya',
    is_following: false,
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    followers_count: 300,
    following_count: 400,
    user_bio:
      'Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony Alpha Ambassador OPPO Ambassador தமிழன்.',
    posts_count: 5,
    posts: [
      {
        id: 'f25d77f0-602e-41d1-971e-4b8cf54709eb',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
      },
    ],
    stories: [
      {
        id: 'QAeIMOwzK',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-1-img.png',
      },
    ],
  },
}

const userProfileResponseWithNoPosts = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-234324234',
    user_id: 'Varun_Aadithya',
    user_name: 'Varun Aadithya',
    is_following: false,
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    followers_count: 300,
    following_count: 400,
    user_bio:
      'Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony Alpha Ambassador OPPO Ambassador தமிழன்.',
    posts_count: 5,
    posts: [],
    stories: [
      {
        id: 'QAeIMOwzK',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-1-img.png',
      },
    ],
  },
}

const myProfileResponse = {
  profile: {
    id: 'df3234jkjn2-324sdf1132nnknn-234324234',
    user_id: 'rahul',
    user_name: 'John',
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/profile/instagram-mini-project-profile-1.png',
    followers_count: 289,
    following_count: 12,
    user_bio:
      'It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.',
    posts: [
      {
        id: '1a698dc4-sdf6e83-4ede-998e-638305f7aee6',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-31-img.png',
      },
    ],
    posts_count: 3,
    stories: [
      {
        id: '5HJ25nUNJ',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-34-img.png',
      },
    ],
  },
}

const userFollowResponse = {message: 'Followed the user Varun Aadithya'}

const server = setupServer(
  rest.get(userStoriesAPIURL, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIURL, (req, res, ctx) => res(ctx.json(postsResponse))),
  rest.get(userProfileAPIURL, (req, res, ctx) =>
    res(ctx.json(userProfileResponse)),
  ),
  rest.post(userFollowAPIURL, (req, res, ctx) =>
    res(ctx.json(userFollowResponse)),
  ),
  rest.get(myProfileURL, (req, res, ctx) => res(ctx.json(myProfileResponse))),
)

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const assertFollowButton = async () => {
  const followButton = await screen.findByRole('button', {
    name: /Follow/i,
    exact: false,
  })
  expect(followButton).toBeInTheDocument()
  return followButton
}

const assertFollowPopOver = async () => {
  const followButton = await assertFollowButton()
  userEvent.click(followButton)

  const followingIcon = await screen.findByTestId('followingIcon')
  expect(followingIcon).toBeInTheDocument()

  userEvent.click(followingIcon)

  const popoverEl = await screen.findByTestId('followingPopOver')
  expect(popoverEl).toBeInTheDocument()

  return popoverEl
}

const unFollowUser = async () => {
  const popoverEl = await assertFollowPopOver()
  const buttonEl = within(popoverEl).getByRole('button', {
    name: /Unfollow/i,
    exact: false,
  })

  expect(buttonEl).toBeInTheDocument()

  userEvent.click(buttonEl)
  return popoverEl
}

const mockUserProfileFollowAPI = () => {
  const mockFetchFunction = jest.fn().mockImplementation(url => {
    if (url === userProfileAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(userProfileResponse),
      }
    }
    if (url === userFollowAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(userFollowResponse),
      }
    }
  })

  return mockFetchFunction
}

const renderWithBrowserRouter = (
  ui = <App />,
  {route = userProfileRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const originalConsoleError = console.error
const originalFetch = window.fetch

// NOTE:below code is to resolve third party library issue
jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js')

  return class {
    static placements = PopperJS.placements

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      }
    }
  }
})

describe('Others Profile Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    window.fetch = originalFetch
  })

  afterAll(() => {
    server.close()
  })

  // #region key related test case

  it('When the HTTP GET request of user Profile Route is successful, then all the list items should be rendered using a unique key as a prop for each similar list item:::5:::', async () => {
    mockGetCookie()

    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }

    renderWithBrowserRouter(<App />)

    await assertFollowButton()

    console.error = originalConsoleError
    restoreGetCookieFns()
  })

  // #region authenticated user and unauthenticated user test cases

  it('When the "/user/:userId" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    await waitFor(() => expect(window.location.pathname).toBe(loginRoutePath))
  })

  it('When the "/user/:userId" is provided in the URL by an unauthenticated user, then the page should be navigated to userProfile Route:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await waitFor(() =>
      expect(window.location.pathname).toBe(userProfileRoutePath),
    )

    await assertFollowButton()

    restoreGetCookieFns()
  })

  it('When the User Profile Route is opened, an HTTP GET request should be made to userProfileApiUrl with the user id as path parameter:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === userProfileAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(userProfileResponse),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertFollowButton()

    expect(
      mockFetchFunction.mock.calls.some(
        eachCall => eachCall[0] === userProfileAPIURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  // #region My Profile Route UI test cases

  it('When the HTTP GET request of the user profile Route is in progress, then the page should consist of the HTML container element with test id attribute value as "userProfileLoader" should be displayed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('userProfileLoader'),
    )

    await assertFollowButton()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML image element with alt text as "profile route profile pic" and src as the value of key "profile_pic" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {profile_pic},
    } = userProfileResponse

    const profilePicEl = await screen.findByAltText(
      /profile route profile pic/i,
      {
        exact: false,
      },
    )
    expect(profilePicEl).toBeInTheDocument()
    expect(profilePicEl.src).toBe(profile_pic)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML heading element with text content as the value of the key "user_id" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {user_id},
    } = userProfileResponse

    const headingEl = await screen.findByRole('heading', {
      name: user_id,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML button element with the text "Follow":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertFollowButton()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "posts_count" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {posts_count},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(posts_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "followers_count" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {followers_count},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(followers_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_name" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {user_name},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(user_name, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_bio" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {user_bio},
    } = userProfileResponse
    const paragraphEl = await screen.findByText(user_bio, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of 2 HTML unordered list elements to display the list of posts and stories:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const unorderedLists = await screen.findAllByRole('list')

    expect(unorderedLists[0]).toBeInTheDocument()
    expect(unorderedLists[0].tagName).toBe('UL')
    expect(unorderedLists.length).toBe(2)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of at least two HTML list items:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const listItems = await screen.findAllByRole('listitem')

    expect(listItems.length).toBeGreaterThanOrEqual(2)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML image element with alt text as "profile route story pic" and src as the value of key "image" from each object in stories from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {stories},
    } = userProfileResponse
    const {image} = stories[0]

    const storyImg = await screen.findAllByAltText(/profile route story pic/i, {
      exact: false,
    })
    expect(storyImg[0]).toBeInTheDocument()
    expect(storyImg[0].src).toBe(image)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of "BsGrid3X3" icon imported from "react-icons/bs" package with test id value as "postsIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const postsIconEL = await screen.findByTestId('postsIcon')
    expect(postsIconEL).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML main heading element with text content as "Posts":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const headingEl = await screen.findByRole('heading', {
      name: /Posts/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, then the page should consist of the HTML image element with alt text as "profile route post pic" and src as the value of key "image" from each object in posts from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      user_details: {posts},
    } = userProfileResponse
    const {image} = posts[0]

    const myPostsPics = await screen.findAllByAltText(
      /profile route post pic/i,
      {
        exact: false,
      },
    )
    expect(myPostsPics[0]).toBeInTheDocument()
    expect(myPostsPics[0].src).toBe(image)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, if the posts from the userProfileResponse are empty then the page should consist of the "BiCamera" icon from "react-icons/bi" with test id value as "noPostsPic":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(userProfileResponseWithNoPosts),
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    const noPostsIcon = await screen.findByTestId('noPostsPic')
    expect(noPostsIcon).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, if the posts from the userProfileResponse are empty then the page should consist of the HTML heading element with text content as "No Posts":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(userProfileResponseWithNoPosts),
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    const noPostsHeadingEl = await screen.findByRole('heading', {
      name: /No Posts/i,
      exact: false,
    })
    expect(noPostsHeadingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region Follow / Un Follow UI test cases

  it('When the HTTP GET request of the user profile Route is successful, if the user clicks on the follow button then the page should contain "BsFillPersonCheckFill" icon from "react-icons/bs" with test id value as "followingIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const followButton = await assertFollowButton()
    userEvent.click(followButton)

    const followingIcon = await screen.findByTestId('followingIcon')
    expect(followingIcon).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, if the user clicks on the "BsFillPersonCheckFill" icon from "react-icons/bs" then it should trigger a popover with test id value as "followingPopOver" :::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertFollowPopOver()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, When the user clicks on the follow button then an HTTP POST request should be made to the followAPIURL with follow status true:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockUserProfileFollowAPI()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    const popoverEl = await unFollowUser()

    await waitFor(() => expect(popoverEl).not.toBeInTheDocument())
    await assertFollowButton()

    const bodyObject = JSON.parse(mockFetchFunction.mock.calls[1][1].body)

    expect(mockFetchFunction.mock.calls[1][0]).toBe(userFollowAPIURL)
    expect(bodyObject.follow_status).toBeTruthy()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, if the user is already followed then the following popover should contain an HTML image element with alt text as "follow popover profile pic" and src as the value of key "profile_pic" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const popoverEl = await assertFollowPopOver()

    const {
      user_details: {profile_pic},
    } = userProfileResponse

    const imgEl = within(popoverEl).getByAltText(
      /follow popover profile pic/i,
      {
        exact: false,
      },
    )
    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(profile_pic)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, if the user is already followed then the following popover should contain an HTML paragraph element with text content as the value of the key "user_id" in profile from userProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const popoverEl = await assertFollowPopOver()

    const {
      user_details: {user_id},
    } = userProfileResponse

    const paragraphEl = within(popoverEl).getByText(user_id, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, if the user is already followed then the following popover should contain an HTML button element with text content as "Unfollow":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const popoverEl = await assertFollowPopOver()

    const unFollowBtnEl = within(popoverEl).getByRole('button', {
      name: /Unfollow/i,
      exact: false,
    })
    expect(unFollowBtnEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, if the user is already followed then the following popover should contain an HTML button element with text content as "Cancel":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const popoverEl = await assertFollowPopOver()

    const buttonEl = within(popoverEl).getByRole('button', {
      name: /Cancel/i,
      exact: false,
    })

    expect(buttonEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, When the user clicks on Unfollow button in popover then the page should not contain the popover, and follow button should be displayed:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const popoverEl = await unFollowUser()

    await waitFor(() => expect(popoverEl).not.toBeInTheDocument())
    await assertFollowButton()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, When the user clicks on Unfollow button in popover then an HTTP POST request should be made to the followAPIURL with follow status false:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockUserProfileFollowAPI()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    const popoverEl = await unFollowUser()

    await waitFor(() => expect(popoverEl).not.toBeInTheDocument())
    await assertFollowButton()

    const bodyObject = JSON.parse(mockFetchFunction.mock.calls[2][1].body)

    expect(mockFetchFunction.mock.calls[2][0]).toBe(userFollowAPIURL)
    expect(bodyObject.follow_status).toBeFalsy()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is successful, When the user clicks on the Cancel button in popover then the following popover should not be displayed:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const popoverEl = await assertFollowPopOver()

    const buttonEl = within(popoverEl).getByRole('button', {
      name: /Cancel/i,
      exact: false,
    })

    expect(buttonEl).toBeInTheDocument()

    userEvent.click(buttonEl)

    await waitFor(() => expect(popoverEl).not.toBeInTheDocument())
    const followingIconTwo = await screen.findByTestId('followingIcon')
    expect(followingIconTwo).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region user Profile Failure test cases

  it('When the HTTP GET request of the user profile Route is unsuccessful, then the page should consist of the HTML image element with alt text as "failure view":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userProfileAPIURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userProfileAPIURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(/Something went wrong. Please try again/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userProfileAPIURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByRole('button', {name: /Try again/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the HTTP GET request of the user profile Route is unsuccessful, if the HTML button element with text content "Try again" is clicked, then an HTTP GET request should be made to userProfileUrl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === userProfileAPIURL) {
        return {
          ok: true,
          json: () => Promise.reject({}),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
    const buttonEl = await screen.findByRole('button', {
      name: /Try again/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(
      mockFetchFunction.mock.calls.some(
        eachCall => eachCall[0] === userProfileAPIURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })
})
