import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

// #start test case preparation

const loginRoutePath = '/login'

const homeRoutePath = '/'

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-stories'

const postsAPIURL = 'https://apis.ccbp.in/insta-posts'

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

const apiUrl = 'https://apis.ccbp.in/login'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
}

const passwordIncorrect = {
  error_msg: "Username and Password didn't match",
}

const invalidUser = {
  error_msg: 'Username is not found',
}

const server = setupServer(
  rest.get(userStoriesAPIURL, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIURL, (req, res, ctx) => res(ctx.json(postsResponse))),
  rest.post(apiUrl, (req, res, ctx) => {
    const username = JSON.parse(req.body).username
    const password = JSON.parse(req.body).password

    if (username === 'rahul' && password === 'rahul@2021') {
      return res(ctx.json(loginSuccessResponse))
    } else if (username === 'rahul' && password !== 'rahul@2021') {
      return res(
        ctx.status(401, 'invalid request'),
        ctx.json(passwordIncorrect),
      )
    } else {
      return res(ctx.status(404, 'invalid request'), ctx.json(invalidUser))
    }
  }),
)

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockSetCookie = () => {
  jest.spyOn(Cookies, 'set')
  Cookies.set = jest.fn()
}

const restoreSetCookieFns = () => {
  Cookies.set.mockRestore()
}

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
  {route = loginRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const rtlRender = (ui = <App />, path = loginRoutePath) => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const originalFetch = window.fetch

// #End test case preparation

describe('Login Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('Login Route should consist of an HTML image element with the given login image and alt text as "website login":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
  })

  it('Login Route should consist of an HTML image element with alt text as "website logo":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {name: /website logo/i})
    expect(imageEl).toBeInTheDocument()
  })

  it('Login Route should consist of an HTML main heading element with "Photo Dekho" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const headingEl = screen.getByRole('heading', {
      name: /Photo Dekho/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it('Login Route should consist of an HTML form element:::5:::', () => {
    const {container} = renderWithBrowserRouter(<App />)
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it('Login Route should consist of the HTML input element with label text as "USERNAME" and type "text":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }).type,
    ).toBe('text')
  })

  it('Login Route should consist of the HTML input element with label text as "PASSWORD" and type "password":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(screen.getByLabelText(/PASSWORD/i, {exact: false}).type).toBe(
      'password',
    )
  })

  it('Login Route should consist of an HTML button element with text content "Login" and type "submit":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  it('Login Route should consist of an HTML button element with text content "Login" and type "submit" and Login button should be disabled when the username or password is empty:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
    expect(buttonEl).toBeDisabled()
  })

  it('In the Login Route, Login Button with type "submit" should be enabled when we provide a non-empty username and password:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })

    userEvent.type(usernameField, 'something')
    userEvent.type(passwordField, 'something')

    const buttonEl = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
    expect(buttonEl).not.toBeDisabled()
  })

  it('When an unauthenticated user access the "/login" URL in the Login Route, then the page should be navigated to Login Route:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it('When an authenticated user access the "/login" URL in the Login Route, then the page should be navigated to Home Route:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/user story/i, {exact: false})

    const paragraphEl = await screen.findByText(
      /Another day, another sunrise/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })

  it('When a non-empty value is provided in the HTML input element with the label text "PASSWORD", then the value provided should be displayed in the HTML input element:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const userNameEl = screen.getByRole('textbox')
    userEvent.type(userNameEl, 'rahul')
    expect(userNameEl).toHaveValue('rahul')
  })

  it('When a non-empty value in the HTML input element with the label as "PASSWORD", then the text should be displayed in the HTML input element:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const passwordEl = screen.getByLabelText(/password/i)
    userEvent.type(passwordEl, 'rahul')
    expect(passwordEl).toHaveValue('rahul')
  })

  it('When an invalid username and valid password are provided and the Login button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender(<App />)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const logInButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'unknown')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(logInButton)

    const paragraphEl = await screen.findByText(/Username is not found/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it('When a valid username and invalid password are provided and the Login button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const logInButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(window.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'wrongPassword')
    userEvent.click(logInButton)

    const paragraphEl = await screen.findByText(
      /Username and Password didn't match/i,
      {exact: false},
    )

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it('When the Login is successful, an HTTP GET request should be made to loginApiUrl:::5:::', async () => {
    mockSetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(loginSuccessResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/^PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    expect(mockFetchFunction.mock.calls[0][0]).toMatch(apiUrl)
    window.fetch = originalFetch
    restoreSetCookieFns()
  })

  it('When the Login is successful, then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument, and expiry days as the third argument:::5:::', async () => {
    mockSetCookie()

    renderWithBrowserRouter(<App />)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const logInButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(logInButton)
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith(
        'jwt_token',
        loginSuccessResponse.jwt_token,
        expect.objectContaining({expires: expect.any(Number)}),
      ),
    )
    restoreSetCookieFns()
  })

  it('When the Login is successful, then the history.replace() method should be called with the argument "/":::5:::', async () => {
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const logInButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(logInButton)
    await waitFor(() =>
      expect(history.replace).toHaveBeenCalledWith(homeRoutePath),
    )
    restoreHistoryReplace(history)
  })

  it('When the Login is successful, then the page should be navigated to Home Route:::5:::', async () => {
    renderWithBrowserRouter(<App />)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const logInButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(logInButton)

    mockGetCookie()

    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))

    await screen.findAllByAltText(/user story/i, {
      exact: false,
    })
    const paragraphEl = await screen.findByText(
      /Another day, another sunrise/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    restoreGetCookieFns()
  })
})
