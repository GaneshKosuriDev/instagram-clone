import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginRoutePath = '/login'

const myProfileRoutePath = '/my-profile'

const editProfileRoute = '/edit-profile'

const myProfileURL = 'https://apis.ccbp.in/insta-profile'

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-stories'

const postsAPIURL = 'https://apis.ccbp.in/insta-posts'

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

const myProfileWithNoPosts = {
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
    posts: [],
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

const server = setupServer(
  rest.get(myProfileURL, (req, res, ctx) => res(ctx.json(myProfileResponse))),
  rest.get(userStoriesAPIURL, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIURL, (req, res, ctx) => res(ctx.json(postsResponse))),
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

const renderWithBrowserRouter = (
  ui = <App />,
  {route = myProfileRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const originalConsoleError = console.error
const originalFetch = window.fetch

describe('My Profile Route Tests', () => {
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

  it('When the HTTP GET request of my profile Route is successful, then all the list items should be rendered using a unique key as a prop for each similar list item:::5:::', async () => {
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

    const editProfileButton = await screen.findByRole('button', {
      name: /Edit Profile/i,
      exact: false,
    })
    expect(editProfileButton).toBeInTheDocument()

    console.error = originalConsoleError
    restoreGetCookieFns()
  })

  // #region authenticated user and unauthenticated user test cases

  it('When the "/my-profile" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    await waitFor(() => expect(window.location.pathname).toBe(loginRoutePath))
  })

  it('When the "/my-profile" is provided in the URL by an unauthenticated user, then the page should be navigated to myProfile Route:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await waitFor(() =>
      expect(window.location.pathname).toBe(myProfileRoutePath),
    )

    const editProfileButton = await screen.findByRole('button', {
      name: /Edit Profile/i,
      exact: false,
    })
    expect(editProfileButton).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the myProfile Route is opened, an HTTP GET request should be made to myProfileApiUrl with the user id as path parameter:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === myProfileURL) {
        return {
          ok: true,
          json: () => Promise.resolve(myProfileResponse),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
    const editProfileButton = await screen.findByRole('button', {
      name: /Edit Profile/i,
      exact: false,
    })
    expect(editProfileButton).toBeInTheDocument()
    expect(mockFetchFunction.mock.calls[0][0]).toBe(myProfileURL)
    restoreGetCookieFns()
  })

  // #region My Profile Route UI test cases

  it('When the HTTP GET request of my profile Route is in progress, then the page should consist of the HTML container element with test id attribute value as "myProfileLoader" should be displayed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('myProfileLoader'),
    )

    const editProfileButton = await screen.findByRole('button', {
      name: /Edit Profile/i,
      exact: false,
    })
    expect(editProfileButton).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML image element with alt text as "profile route profile pic" and src as the value of key "profile_pic" in profile from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {profile_pic},
    } = myProfileResponse

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

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML heading element with text content as the value of the key "user_id" in profile from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {user_id},
    } = myProfileResponse

    const headingEl = await screen.findByRole('heading', {
      name: user_id,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML button element with the text "Edit Profile":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const editProfileButton = await screen.findByRole('button', {
      name: /Edit Profile/i,
      exact: false,
    })
    expect(editProfileButton).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "posts_count" in profile from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {posts_count},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(posts_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "followers_count" in profile from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {followers_count},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(followers_count, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_name" in profile from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {user_name},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(user_name, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML paragraph element with text content as the value of the key "user_bio" in profile from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {user_bio},
    } = myProfileResponse
    const paragraphEl = await screen.findByText(user_bio, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of 2 HTML unordered list elements to display the list of items:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const unorderedLists = await screen.findAllByRole('list')

    expect(unorderedLists[0]).toBeInTheDocument()
    expect(unorderedLists[0].tagName).toBe('UL')
    expect(unorderedLists.length).toBe(2)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of at least two HTML list items:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const listItems = await screen.findAllByRole('listitem')

    expect(listItems.length).toBeGreaterThanOrEqual(2)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML image element with alt text as "profile route story pic" and src as the value of key "image" from each object in stories from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {stories},
    } = myProfileResponse
    const {image} = stories[0]

    const storyImg = await screen.findAllByAltText(/profile route story pic/i, {
      exact: false,
    })
    expect(storyImg[0]).toBeInTheDocument()
    expect(storyImg[0].src).toBe(image)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of "BsGrid3X3" icon imported from "react-icons/bs" package with test id value as "postsIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const postsIconEL = await screen.findByTestId('postsIcon')
    expect(postsIconEL).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML main heading element with text content as "Posts":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const headingEl = await screen.findByRole('heading', {
      name: /Posts/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, then the page should consist of the HTML image element with alt text as "profile route post pic" and src as the value of key "image" from each object in posts from myProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {posts},
    } = myProfileResponse
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

  it('When the HTTP GET request of my profile Route is successful, when the HTML button element with text content "Edit Profile" is clicked then the page should be navigated to editProfile Route:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const editProfileButton = await screen.findByRole('button', {
      name: /Edit Profile/i,
      exact: false,
    })
    expect(editProfileButton).toBeInTheDocument()

    userEvent.click(editProfileButton)

    expect(window.location.pathname).toBe(editProfileRoute)

    const submitButton = await screen.findByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    expect(submitButton).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, if the posts from the myProfileResponse are empty then the page should consist of the "BiCamera" icon from "react-icons/bi" with test id value as "noPostsPic":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(myProfileWithNoPosts),
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    const noPostsIcon = await screen.findByTestId('noPostsPic')
    expect(noPostsIcon).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request of my profile Route is successful, if the posts from the myProfileResponse are empty then the page should consist of the HTML heading element with text content as "No Posts":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(myProfileWithNoPosts),
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

  // #region My Profile Route Failure test cases

  it('When the HTTP GET request of my profile Route is unsuccessful, then the page should consist of the HTML image element with alt text as "failure view":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(myProfileURL, (req, res, ctx) =>
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

  it('When the HTTP GET request of my profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(myProfileURL, (req, res, ctx) =>
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

  it('When the HTTP GET request of my profile Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(myProfileURL, (req, res, ctx) =>
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

  it('When the HTTP GET request of my profile Route is unsuccessful, if the HTML button element with text content "Try again" is clicked, then an HTTP GET request should be made to MyProfileUrl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === myProfileURL) {
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
    expect(mockFetchFunction.mock.calls[1][0]).toBe(myProfileURL)
    restoreGetCookieFns()
  })
})
