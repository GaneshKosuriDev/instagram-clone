import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
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

const homeRoutePath = '/'

const firstPostFirstUserRoutePath = '/user/Varun_Aadithya'

const firstPostFirstCommentUserRoutePath = '/user/Prabuddha_Dasgupta'

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-stories'

const postsAPIURL = 'https://apis.ccbp.in/insta-posts'

const userProfileAPIUrlForFirstPostFirstUsername =
  'https://apis.ccbp.in/insta-users/Varun_Aadithya'

const userProfileAPIUrlForFirstPostFirstCommentUsername =
  'https://apis.ccbp.in/insta-users/Prabuddha_Dasgupta'

const postCommentURL =
  'https://apis.ccbp.in/insta-posts/f25d77f0-602e-41d1-971e-4b8cf54709eb/comment'

const myProfileURL = 'https://apis.ccbp.in/insta-profile'

const userStoryURL = 'https://apis.ccbp.in/insta-stories/Varun_Aadithya'

const likeOrUnLikeAPIURL =
  'https://apis.ccbp.in/insta-posts/f25d77f0-602e-41d1-971e-4b8cf54709eb/like'

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

const userProfileResponseForFirstPostFirstUsernameResponse = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-234324234',
    user_id: 'Varun_Aadithya',
    user_name: 'Varun Aadithya',
    is_following: false,
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    followers_count: 300,
    following_count: 300,
    user_bio:
      'Natgeo Nature Photographer of the year 2016 (1st prize) Automobile Enthusiast Sony Alpha Ambassador OPPO Ambassador தமிழன்.',
    posts_count: 3,
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

const userProfileResponseForFirstPostFirstCommentUsernameResponse = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-w23231',
    user_id: 'Prabuddha_Dasgupta',
    user_name: 'Prabuddha Dasgupta',
    is_following: false,
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-4-img.png',
    followers_count: 297,
    following_count: 303,
    user_bio:
      'Prabuddha Dasgupta (21 September 1956 – 12 August 2012) was an Indian fashion and fine-art photographer. ',
    posts_count: 3,
    posts: [
      {
        id: '390562f5-298f-4904-aea4-07ecc212febe',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-10-img.png',
      },
    ],
    stories: [
      {
        id: 'UnrObltRP',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-10-img.png',
      },
    ],
  },
}

const postCommentResponse = {message: 'Comment has been added'}

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

const userStoryResponse = {
  story: {
    user_id: 'Varun_Aadithya',
    user_name: 'Varun Aadithya',
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
    story_details: {
      caption: 'Cute',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-1-img.png',
    },
  },
}

const likeOrUnlikeAPIResponse = {message: 'Post has been liked'}

const server = setupServer(
  rest.get(userStoriesAPIURL, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIURL, (req, res, ctx) => res(ctx.json(postsResponse))),
  rest.get(userProfileAPIUrlForFirstPostFirstUsername, (req, res, ctx) =>
    res(ctx.json(userProfileResponseForFirstPostFirstUsernameResponse)),
  ),
  rest.get(userProfileAPIUrlForFirstPostFirstCommentUsername, (req, res, ctx) =>
    res(ctx.json(userProfileResponseForFirstPostFirstCommentUsernameResponse)),
  ),
  rest.post(postCommentURL, (req, res, ctx) =>
    res(ctx.json(postCommentResponse)),
  ),
  rest.get(myProfileURL, (req, res, ctx) => res(ctx.json(myProfileResponse))),
  rest.get(userStoryURL, (req, res, ctx) => res(ctx.json(userStoryResponse))),
  rest.post(likeOrUnLikeAPIURL, (req, res, ctx) =>
    res(ctx.json(likeOrUnlikeAPIResponse)),
  ),
)

let historyInstance

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
  {route = homeRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const rtlRender = (ui = <App />, path = homeRoutePath) => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const mockHomeRouteWithCommentAPIs = (isCommentAPIFailure = false) => {
  const mockFetchFunction = jest.fn().mockImplementation(url => {
    if (url === userStoriesAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(userStoriesResponse),
      }
    }
    if (url === postsAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(postsResponse),
      }
    }
    if (url === postCommentURL && isCommentAPIFailure) {
      return {
        ok: true,
        json: () => Promise.reject({}),
      }
    }
    if (url === postCommentURL) {
      return {
        ok: true,
        json: () => Promise.resolve(postCommentResponse),
      }
    }
  })

  return mockFetchFunction
}

const mockHomeRouteWithLikeUnLikeAPIs = () => {
  const mockFetchFunction = jest.fn().mockImplementation(url => {
    if (url === userStoriesAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(userStoriesResponse),
      }
    }
    if (url === postsAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(postsResponse),
      }
    }
    if (url === likeOrUnLikeAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(likeOrUnlikeAPIResponse),
      }
    }
  })
  return mockFetchFunction
}

const assertHomeRouteUIElements = async () => {
  await screen.findAllByAltText(/user story/i, {
    exact: false,
  })
  const paragraphEl = await screen.findByText(/Another day, another sunrise/i, {
    exact: false,
  })
  expect(paragraphEl).toBeInTheDocument()
}

const likeFirstPostItem = () => {
  const postsLikeIcons = screen.getAllByTestId('likeIcon')

  expect(postsLikeIcons[0]).toBeInTheDocument()

  userEvent.click(postsLikeIcons[0])
}

const unLikeFirstPostItem = () => {
  const postsUnLikeIcons = screen.getAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
  expect(postsUnLikeIcons.length).toBe(1)
  userEvent.click(postsUnLikeIcons[0])
}

const assertFirstPostLikeIcon = async () => {
  const postsLikeIcons = await screen.findAllByTestId('likeIcon')
  expect(postsLikeIcons[0]).toBeInTheDocument()
}

const assertFirstPostUnLikeIcon = async () => {
  const postsUnLikeIcons = await screen.findAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
}

const assertUserStoryModal = async () => {
  const userStoriesList = screen.getByTestId('reactSlickContainer')

  const userStoryImgEl = within(userStoriesList).getAllByAltText(
    /user story/i,
    {
      exact: false,
    },
  )
  expect(userStoryImgEl[0]).toBeInTheDocument()

  userEvent.click(userStoryImgEl[0])

  const userStoryModal = await screen.getByTestId('userStoryModal')
  expect(userStoryModal).toBeInTheDocument()
  return userStoryModal
}

const commentFirstPost = async (commentText = 'nice pic') => {
  const postsCommentsInputElement = screen.getAllByRole('textbox')
  userEvent.type(postsCommentsInputElement[0], commentText)

  const postsButtonElements = screen.getAllByRole('button', {
    name: /Post/i,
    exact: false,
  })
  expect(postsButtonElements[0]).toBeInTheDocument()
  expect(postsButtonElements[0]).not.toBeDisabled()

  userEvent.click(postsButtonElements[0])

  const postsMyCommentCommentText = await screen.findAllByText(commentText)
  expect(postsMyCommentCommentText[0]).toBeInTheDocument()
}

const assertFollowButtonUserProfileRoute = async () => {
  const followButton = await screen.findByRole('button', {
    name: /Follow/i,
    exact: false,
  })
  expect(followButton).toBeInTheDocument()
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

describe('Home Route Tests', () => {
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

  it('When the HTTP GET request of Home Route is successful, then all the list items should be rendered using a unique key as a prop for each similar list item:::5:::', async () => {
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

    await assertHomeRouteUIElements()

    console.error = originalConsoleError
    restoreGetCookieFns()
  })

  // #region authenticated user and unauthenticated user test cases

  it('When the "/" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    await waitFor(() => expect(window.location.pathname).toBe(loginRoutePath))
  })

  it('When the "/" is provided in the URL by an unauthenticated user, then the page should be navigated to Home Route:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))

    await assertHomeRouteUIElements()

    restoreGetCookieFns()
  })

  it('When the Home Route is opened, an HTTP GET request should be made to userStoriesApiUrl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === userStoriesAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(userStoriesResponse),
        }
      }
      if (url === postsAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(postsResponse),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    expect(
      mockFetchFunction.mock.calls.some(
        eachCall => eachCall[0] === userStoriesAPIURL,
      ),
    ).toBeTruthy()

    restoreGetCookieFns()
  })

  it('When the Home Route is opened, an HTTP GET request should be made to postsApiUrl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === userStoriesAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(userStoriesResponse),
        }
      }
      if (url === postsAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(postsResponse),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    expect(
      mockFetchFunction.mock.calls.some(
        eachCall => eachCall[0] === postsAPIURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  // #region User Stories List UI test cases

  it('When the HTTP GET request of userStoriesAPI is in progress in the Home Route, then the page should consist of the HTML container element with test id value as "userStoriesLoader" should be displayed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('userStoriesLoader'),
    )

    await assertHomeRouteUIElements()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then the page should consist of a "react-slick" third party library wrapped with an HTML container element with test id value as "reactSlickContainer":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const reactSlickContainer = screen.getByTestId('reactSlickContainer')
    expect(reactSlickContainer.firstChild).toHaveClass(
      'slick-slider slick-initialized',
    )
    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then the page should consist of at least 1 HTML unordered list element to display the list of items:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const unorderedLists = await screen.findAllByRole('list')

    expect(unorderedLists[0]).toBeInTheDocument()
    expect(unorderedLists[0].tagName).toBe('UL')
    expect(unorderedLists.length).toBeGreaterThanOrEqual(1)

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then the page should consist of at least two HTML list items:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const listItems = screen.getAllByRole('listitem')

    expect(listItems.length).toBeGreaterThanOrEqual(2)

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then the User Stories List should contain at least 3 HTML image elements with alt text as "user story":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoriesList = screen.getByTestId('reactSlickContainer')

    const userStoryImgEl = within(userStoriesList).getAllByAltText(
      /user story/i,
      {
        exact: false,
      },
    )

    expect(userStoryImgEl.length).toBe(userStoriesResponse.users_stories.length)

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then the User story List should contain The HTML image with attribute value as "user story" and src as the value of key "profile_pic" in user_details from userStoriesResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoriesList = screen.getByTestId('reactSlickContainer')

    const {users_stories} = userStoriesResponse

    const userStoryImgEl = within(userStoriesList).getAllByAltText(
      /user story/i,
      {
        exact: false,
      },
    )

    expect(userStoryImgEl[0]).toBeInTheDocument()
    expect(userStoryImgEl[0].src).toBe(users_stories[0].profile_pic)

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then the User Stories List should contain the HTML paragraph element with text content as the value of the key "user_name" in user_details from userStoriesResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const userStories = await screen.findAllByAltText(/user story/i, {
      exact: false,
    })
    expect(userStories.length).toBeGreaterThan(3)
    const paragraphEl = await screen.findByText(
      /Another day, another sunrise/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    const userStoriesList = screen.getByTestId('reactSlickContainer')
    const {users_stories} = userStoriesResponse
    const {user_name} = users_stories[0]
    expect(
      within(userStoriesList).getByText(user_name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    const userNameParagraphEl = within(userStoriesList).getByText(user_name, {
      exact: false,
    })

    expect(userNameParagraphEl.tagName).toBe('SPAN')

    restoreGetCookieFns()
  })

  // #region Posts List UI test cases

  it('When the HTTP GET request of "Posts" in the Home Route is in progress, then the page should consist of the loader with test id attribute value as "postListLoader":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('postListLoader'),
    )

    await assertHomeRouteUIElements()

    const paragraphEl = await screen.findByText(
      /Another day, another sunrise/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then the Home Route should contain all the Post list items with test id value as "post":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postItems = screen.getAllByTestId('post')
    expect(postItems.length).toBe(postsResponse.posts.length)

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML image element with alt text as "post author profile pic" and src as the value of key "profile_pic" in posts from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {profile_pic} = posts[0]

    const profilePics = await within(
      firstPostListItem,
    ).findAllByAltText(/post author profile pic/i, {exact: false})
    expect(profilePics[0]).toBeInTheDocument()
    expect(profilePics[0].src).toBe(profile_pic)
    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "user_name" in posts from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {user_name} = posts[0]

    const postsUserNames = await within(
      firstPostListItem,
    ).findAllByText(user_name, {exact: false})
    expect(postsUserNames[0]).toBeInTheDocument()
    expect(postsUserNames[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML image element with alt text as "post pic" and src as the value of key "image_url" in post_details from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {
      post_details: {image_url},
    } = posts[0]

    const postsPics = await within(
      firstPostListItem,
    ).findAllByAltText(/post pic/i, {exact: false})
    expect(postsPics[0]).toBeInTheDocument()
    expect(postsPics[0].src).toBe(image_url)
    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of "BsHeart" icon from "react-icons/bs" with test id value as "likeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const likeIcons = screen.getAllByTestId('likeIcon')
    expect(likeIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of "FaRegComment" icon from "react-icons/fa" icon with test id value as "commentIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const commentIcons = screen.getAllByTestId('commentIcon')
    expect(commentIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of "BiShareAlt" icon from "react-icons/bi" icon with test id value as "shareIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const shareIcons = screen.getAllByTestId('shareIcon')
    expect(shareIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "caption" in post_details from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {
      post_details: {caption},
    } = posts[0]

    const postCaptions = await within(firstPostListItem).findAllByText(
      caption,
      {exact: false},
    )
    expect(postCaptions[0]).toBeInTheDocument()
    expect(postCaptions[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "likes_count" in post_details from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {likes_count} = posts[0]

    const postsLikesCount = await within(
      firstPostListItem,
    ).findAllByText(likes_count, {exact: false})

    expect(postsLikesCount[0]).toBeInTheDocument()
    expect(postsLikesCount[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post first comment should consist of an HTML span element with text content as the value of the key "user_name" in comments from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {comments} = posts[0]
    const {user_name} = comments[0]

    const postsFirstCommentUsernames = await within(
      firstPostListItem,
    ).findAllByText(user_name, {exact: false})
    expect(postsFirstCommentUsernames[0]).toBeInTheDocument()
    expect(postsFirstCommentUsernames[0].tagName).toBe('SPAN')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post first comment should consist of an HTML paragraph element with text content as the value of the key "comment" in comments from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {comments} = posts[0]
    const {comment} = comments[0]

    const commentTextParagraphEl = await within(
      firstPostListItem,
    ).findByText(comment, {exact: false})
    expect(commentTextParagraphEl).toBeInTheDocument()
    expect(commentTextParagraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "comments_count" in posts from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {comments_count} = posts[0]

    const postsCommentsCount = await within(
      firstPostListItem,
    ).findAllByText(comments_count, {exact: false})
    expect(postsCommentsCount[0]).toBeInTheDocument()
    expect(postsCommentsCount[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML paragraph element with text content as the value of the key "created_at" in posts from postsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {created_at} = posts[0]

    const postsCreatedTimes = await within(
      firstPostListItem,
    ).findAllByText(created_at, {exact: false})
    expect(postsCreatedTimes[0]).toBeInTheDocument()
    expect(postsCreatedTimes[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML image element with alt attribute value as "my profile pic":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const myProfilePics = screen.getAllByAltText(/my profile pic/i, {
      exact: false,
    })

    expect(myProfilePics[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should consist of an HTML input element with the placeholder text as "Add a comment..." and type as "text":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postInputElements = screen.getAllByPlaceholderText(
      /Add a comment.../i,
      {
        exact: false,
      },
    )

    expect(postInputElements[0]).toBeInTheDocument()
    expect(postInputElements[0].type).toBe('text')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user provides a non-empty value in the HTML input element with the placeholder text as "Add a comment...", then the text should be displayed in the HTML input element in that Post item:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postCommentTextInputElements = screen.getAllByRole('textbox')
    userEvent.type(postCommentTextInputElements[0], 'rahul')
    expect(postCommentTextInputElements[0]).toHaveValue('rahul')
    expect(postCommentTextInputElements[1]).toHaveValue('')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should contain the HTML button element with the text "Post":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postItemsPostButtons = screen.getAllByRole('button', {
      name: /Post/i,
      exact: false,
    })

    expect(postItemsPostButtons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should contain the HTML button element with the text "Post" and it should be disabled when the post item comment input text is empty:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postItemsPostButtons = screen.getAllByRole('button', {
      name: /Post/i,
      exact: false,
    })

    expect(postItemsPostButtons[0]).toBeInTheDocument()
    expect(postItemsPostButtons[0]).toBeDisabled()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then each Post should contain an HTML button element with the text "Post" and it should be enabled when the comment input text of that post item is not empty:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postsCommentInputElements = screen.getAllByRole('textbox')
    userEvent.type(postsCommentInputElements[0], 'rahul')

    const postItemsPostButtons = screen.getAllByRole('button', {
      name: /Post/i,
      exact: false,
    })
    expect(postItemsPostButtons[0]).toBeInTheDocument()
    expect(postItemsPostButtons[0]).not.toBeDisabled()
    expect(postItemsPostButtons[1]).toBeDisabled()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if we click on the post username then the page should navigate to the user profile with the path "/user/user_id":::5:::', async () => {
    mockGetCookie()

    const {history} = rtlRender(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {user_name, user_id} = posts[0]
    const firstPostUsername = within(firstPostListItem).getByText(user_name, {
      exact: false,
    })

    userEvent.click(firstPostUsername)

    await waitFor(() =>
      expect(history.location.pathname).toBe(firstPostFirstUserRoutePath),
    )

    await assertFollowButtonUserProfileRoute()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if we click on the like icon then an HTTP GET request should be made to postItemLikeAPI URL with like status true:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const apiCall = mockFetchFunction.mock.calls.find(eachCall =>
      eachCall[0].match(likeOrUnLikeAPIURL),
    )

    const bodyObject = JSON.parse(apiCall[1].body)
    expect(bodyObject.like_status).toBeTruthy()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user clicks on the like icon then the like icon should be changed to that post item and the changed icon should have a test id value as "unLikeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user clicks on the like icon then the likes count of that post item should be incremented by one:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {likes_count} = posts[0]

    const firstPostLikesCount = within(firstPostListItem).getByText(
      likes_count + 1,
      {
        exact: false,
      },
    )

    expect(firstPostLikesCount).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user clicks on the unlike icon then an HTTP GET request should be made to postItemLike URL with like status false:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const bodyObject = JSON.parse(mockFetchFunction.mock.calls[3][1].body)

    expect(mockFetchFunction.mock.calls[3][0]).toBe(likeOrUnLikeAPIURL)
    expect(bodyObject.like_status).toBeFalsy()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user clicks on the unlike icon then the icon should be changed to that post item and, the changed icon should have test id as "likeIcon":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user clicks on the unlike icon then the likes count of that post item should be decreased by one:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const {posts} = postsResponse
    const {likes_count} = posts[0]

    const postLikesCount = within(firstPostListItem).getByText(likes_count, {
      exact: false,
    })

    expect(postLikesCount).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if we click on the post comment username then the page should navigate to the user profile with the path "/user/user_id":::5:::', async () => {
    mockGetCookie()

    const {history} = rtlRender(<App />)

    await assertHomeRouteUIElements()

    const postListItems = screen.getAllByTestId('post')
    const firstPostListItem = postListItems[0]

    const {posts} = postsResponse
    const {comments} = posts[0]
    const {user_name} = comments[0]

    const firstPostUsername = within(firstPostListItem).getByText(user_name, {
      exact: false,
    })

    userEvent.click(firstPostUsername)

    await waitFor(() =>
      expect(history.location.pathname).toBe(
        firstPostFirstCommentUserRoutePath,
      ),
    )

    await assertFollowButtonUserProfileRoute()

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if we enter a non-empty comment in the HTML input element then it should be displayed in that particular post:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const postsCommentsInputEl = screen.getAllByRole('textbox')
    userEvent.type(postsCommentsInputEl[0], 'nice pic')
    expect(postsCommentsInputEl[0]).toHaveValue('nice pic')
    expect(postsCommentsInputEl[1]).toHaveValue('')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if we enter a non-empty comment in the HTML input element and clicks on the Post button then an HTTP GET request should be made to the commentAPI with comment text:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteWithCommentAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await commentFirstPost()

    const username = 'John'

    const postsMyCommentUsername = await screen.findAllByText(username)
    expect(postsMyCommentUsername[0]).toBeInTheDocument()

    const requestBodyObject = JSON.parse(
      mockFetchFunction.mock.calls[2][1].body,
    )

    expect(mockFetchFunction.mock.calls[2][0]).toBe(postCommentURL)

    expect(requestBodyObject.comment_text).toBe('nice pic')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if we enter a non-empty comment in the HTML input element and clicks on the Post button then the commented author user name should be displayed in the HTML span element:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await commentFirstPost()

    const username = 'John'
    const postsMyCommentUsername = await screen.findAllByText(username)
    expect(postsMyCommentUsername[0]).toBeInTheDocument()
    expect(postsMyCommentUsername[0].tagName).toBe('SPAN')
    expect(postsMyCommentUsername.length).toBe(1)

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if we enter a non-empty comment in the HTML input element and clicks on the Post button then the commented text should be displayed in the HTML paragraph element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await commentFirstPost()

    const commentText = 'nice pic'

    const postsMyCommentText = await screen.findAllByText(commentText)
    expect(postsMyCommentText[0]).toBeInTheDocument()
    expect(postsMyCommentText[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user comment more than one time for a post then the commented author user names should be displayed in the HTML span element:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    await commentFirstPost()

    await commentFirstPost('hello')

    const username = 'John'
    const postsMyCommentUsername = await screen.findAllByText(username)
    expect(postsMyCommentUsername[0]).toBeInTheDocument()
    expect(postsMyCommentUsername[0].tagName).toBe('SPAN')
    expect(postsMyCommentUsername.length).toBe(2)

    restoreGetCookieFns()
  })

  it('When the HTTP GET requests of Home Route are successful, then if the user comment more than one time for a post then the commented text should be displayed in the HTML paragraph element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const commentText = 'nice pic'
    const secondCommentText = 'hello'

    await commentFirstPost()

    await commentFirstPost(secondCommentText)

    const postsMyCommentText = await screen.findAllByText(commentText)
    expect(postsMyCommentText[0]).toBeInTheDocument()
    expect(postsMyCommentText[0].tagName).toBe('P')

    const postsMySecondCommentText = await screen.findAllByText(
      secondCommentText,
    )
    expect(postsMySecondCommentText[0]).toBeInTheDocument()
    expect(postsMySecondCommentText[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  // User Stories functionality test cases - others story

  it('When the user clicks on a user story in User Stories List then the Home Route should contain a "react-modal" third party library with the first child as an HTML container element with test id value as "userStoryModal":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    const captionText = await within(userStoryModal).findByText(/Cute/i, {
      exact: false,
    })
    expect(captionText).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the User Story is opened, an HTML container element with test id attribute value as "userStoryLoader" should be displayed while the API call is in progress:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('userStoryLoader'),
    )

    const captionText = await within(userStoryModal).findByText(/Cute/i, {
      exact: false,
    })
    expect(captionText).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The User story modal should contain an HTML button element with the "IoMdClose" icon from "react-icons/io" with test id value as "closeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    const closeModalIcon = await within(userStoryModal).findByTestId(
      'closeIcon',
    )

    expect(closeModalIcon).toBeInTheDocument()

    const captionText = await within(userStoryModal).findByText(/Cute/i, {
      exact: false,
    })
    expect(captionText).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The User Story modal should contain an HTML image element with alt attribute value as "user story profile pic" and src as the value of key "profile_pic" in the story from storyResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    const {story} = userStoryResponse
    const {profile_pic} = story

    const imgEl = await within(
      userStoryModal,
    ).findByAltText(/user story profile pic/i, {exact: false})
    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(profile_pic)

    restoreGetCookieFns()
  })

  it('The User Story modal should contain an HTML span element with text content as the value of the key "user_name" in the story from storyResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    const {story} = userStoryResponse
    const {user_name} = story

    const spanEl = await within(userStoryModal).findByText(user_name, {
      exact: false,
    })
    expect(spanEl).toBeInTheDocument()
    expect(spanEl.tagName).toBe('SPAN')

    restoreGetCookieFns()
  })

  it('The User Story modal should contain an HTML image element with alt attribute value as "user story pic" and src as the value of key "image_url" in story_details from storyResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    const {story} = userStoryResponse
    const {
      story_details: {image_url},
    } = story

    const storyImgEl = await within(userStoryModal).findByAltText(
      /user story pic/i,
      {
        exact: false,
      },
    )
    expect(storyImgEl).toBeInTheDocument()
    expect(storyImgEl.src).toBe(image_url)

    restoreGetCookieFns()
  })

  it('The User Story modal should contain an HTML span element with text content as the value of the key "caption" in story_details from storyResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    const {story} = userStoryResponse
    const {
      story_details: {caption},
    } = story

    const spanEl = await within(userStoryModal).findByText(caption, {
      exact: false,
    })
    expect(spanEl).toBeInTheDocument()
    expect(spanEl.tagName).toBe('SPAN')

    restoreGetCookieFns()
  })

  it('The User Story modal should be closed when the user clicks on the "IoMdClose" icon from "react-icons/io":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoryModal = await assertUserStoryModal()

    const buttonEl = await within(userStoryModal).findByTestId('closeIcon')

    expect(buttonEl).toBeInTheDocument()

    const captionText = await within(userStoryModal).findByText(/Cute/i, {
      exact: false,
    })
    expect(captionText).toBeInTheDocument()

    userEvent.click(buttonEl)

    expect(userStoryModal).not.toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region User Stories List Failure test cases

  it('When the User Stories List HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userStoriesAPIURL, (req, res, ctx) =>
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

  it('When the User Stories List HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userStoriesAPIURL, (req, res, ctx) =>
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

  it('When the User Stories List HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userStoriesAPIURL, (req, res, ctx) =>
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

  it('When the User Stories List HTTP GET request made in Home Route is unsuccessful and the "Try again" button is clicked, then an HTTP GET request should be made to userStoriesListAPIUrl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === userStoriesAPIURL) {
        return {
          ok: true,
          json: () => Promise.reject({}),
        }
      }
      if (url === postsAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(postsResponse),
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
        eachCall => eachCall[0] === userStoriesAPIURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  // #region Posts List Failure test cases

  it('When the Posts List HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(postsAPIURL, (req, res, ctx) =>
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

  it('When the Posts List HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(postsAPIURL, (req, res, ctx) =>
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

  it('When the Posts List HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(postsAPIURL, (req, res, ctx) =>
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

  it('When the Posts List HTTP GET request made in Home Route is unsuccessful and the "Try again" button is clicked, then an HTTP GET request should be made to postsListAPIUrl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === postsAPIURL) {
        return {
          ok: true,
          json: () => Promise.reject({}),
        }
      }
      if (url === userStoriesAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(userStoriesResponse),
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
        eachCall => eachCall[0] === postsAPIURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  // #region Specific User story Failure test cases

  it('When the User Story HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userStoryURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoriesList = screen.getByTestId('reactSlickContainer')

    const userStoryImgEl = within(userStoriesList).getAllByAltText(
      /user story/i,
      {
        exact: false,
      },
    )

    userEvent.click(userStoryImgEl[0])

    const userStoryModal = await screen.getByTestId('userStoryModal')
    expect(userStoryModal).toBeInTheDocument()
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the User Story HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userStoryURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoriesList = screen.getByTestId('reactSlickContainer')

    const userStoryImgEl = within(userStoriesList).getAllByAltText(
      /user story/i,
      {
        exact: false,
      },
    )
    expect(userStoryImgEl[0]).toBeInTheDocument()

    userEvent.click(userStoryImgEl[0])

    const userStoryModal = await screen.getByTestId('userStoryModal')
    expect(userStoryModal).toBeInTheDocument()

    expect(
      await screen.findByText(/Something went wrong. Please try again/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the User Story HTTP GET request made in Home Route is unsuccessful, the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(userStoryURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoriesList = screen.getByTestId('reactSlickContainer')

    const userStoryImgEl = within(userStoriesList).getAllByAltText(
      /user story/i,
      {
        exact: false,
      },
    )
    expect(userStoryImgEl[0]).toBeInTheDocument()

    userEvent.click(userStoryImgEl[0])

    const userStoryModal = await screen.getByTestId('userStoryModal')
    expect(userStoryModal).toBeInTheDocument()

    expect(
      await screen.findByRole('button', {name: /Try again/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the User Story HTTP GET request made in Home Route is unsuccessful and the "Try again" button is clicked, then an HTTP GET request should be made to userStoryURL:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === userStoryURL) {
        return {
          ok: true,
          json: () => Promise.resolve({}),
        }
      }
      if (url === userStoriesAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(userStoriesResponse),
        }
      }
      if (url === postsAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(postsResponse),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const userStoriesList = screen.getByTestId('reactSlickContainer')

    const userStoryImgEl = within(userStoriesList).getAllByAltText(
      /user story/i,
      {
        exact: false,
      },
    )
    expect(userStoryImgEl[0]).toBeInTheDocument()

    userEvent.click(userStoryImgEl[0])

    const userStoryModal = await screen.getByTestId('userStoryModal')
    expect(userStoryModal).toBeInTheDocument()

    const buttonEl = await within(userStoryModal).findByRole('button', {
      name: /Try again/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(mockFetchFunction.mock.calls[2][0]).toBe(userStoryURL)
    restoreGetCookieFns()
  })
})
