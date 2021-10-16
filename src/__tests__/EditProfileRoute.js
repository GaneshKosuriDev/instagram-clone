import Cookies from 'js-cookie'
import {BrowserRouter} from 'react-router-dom'

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

const editProfileRoutePath = '/edit-profile'

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-stories'

const postsAPIURL = 'https://apis.ccbp.in/insta-posts'

const myProfileURL = 'https://apis.ccbp.in/insta-profile'

const editProfileURL = 'https://apis.ccbp.in/insta-profile'

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

const editProfileResponse = {
  profile: {
    id: 'df3234jkjn2-324sdf1132nnknn-234324234',
    user_id: 'rahul',
    gender: 'MALE',
    user_name: 'John',
    user_bio:
      'It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.',
    phone_number: '9959656562',
  },
}

const server = setupServer(
  rest.get(userStoriesAPIURL, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIURL, (req, res, ctx) => res(ctx.json(postsResponse))),

  rest.get(myProfileURL, (req, res, ctx) => res(ctx.json(myProfileResponse))),
  rest.post(editProfileURL, (req, res, ctx) =>
    res(ctx.json(editProfileResponse)),
  ),
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

const assertHeadingEl = async (value = 'rahul') => {
  const headingEl = await screen.findByRole('heading', {
    name: value,
    exact: false,
  })
  expect(headingEl).toBeInTheDocument()
}

const renderWithBrowserRouter = (
  ui = <App />,
  {route = editProfileRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

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

describe('Edit Profile Route Tests', () => {
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

  // #region authenticated user and unauthenticated user test cases

  it('When the "/edit-profile" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route:::5:::', async () => {
    renderWithBrowserRouter(<App />)
    await waitFor(() => expect(window.location.pathname).toBe(loginRoutePath))
  })

  it('When the "/edit-profile" is provided in the URL by an unauthenticated user, then the page should be navigated to editProfile Route:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await waitFor(() =>
      expect(window.location.pathname).toBe(editProfileRoutePath),
    )

    await assertHeadingEl()

    restoreGetCookieFns()
  })

  it('When the editProfile Route is opened, an HTTP GET request should be made to editProfileApiUrl with the user id as path parameter:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === editProfileURL) {
        return {
          ok: true,
          json: () => Promise.resolve(editProfileResponse),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    await assertHeadingEl()

    expect(
      mockFetchFunction.mock.calls.some(
        eachCall => eachCall[0] === editProfileURL,
      ),
    ).toBeTruthy()

    restoreGetCookieFns()
  })

  // #region Edit Profile Page UI test cases

  it('When the HTTP GET request of editProfile Route is in progress, then an HTML container element with test id value as "editProfileLoader" should be displayed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('editProfileLoader'),
    )

    await assertHeadingEl()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML main heading element with the text content as "Edit Profile":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    await assertHeadingEl('Edit Profile')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML image element with alt attribute value as "edit profile route profile pic" and src as the value of key "profile_pic" of the profile from the editProfileResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const {
      profile: {profile_pic},
    } = myProfileResponse

    const imgElWithAlt = await screen.findByAltText(
      /edit profile route profile pic/i,
      {
        exact: false,
      },
    )
    expect(imgElWithAlt).toBeInTheDocument()
    expect(imgElWithAlt.src).toBe(profile_pic)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML main heading element with text content as the value of key "user_id" of the profile from the editProfileResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const {
      profile: {user_id},
    } = myProfileResponse

    await assertHeadingEl(user_id)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML form element:::5:::', async () => {
    mockGetCookie()

    const {container} = renderWithBrowserRouter(<App />)

    await assertHeadingEl()

    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML input element with the label text as "User Name" and type as "text":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/User Name/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('text')
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the default value for the HTML input element with the label text as "User Name" should be the value of the key "user_name" in profile from editProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const {
      profile: {user_name},
    } = editProfileResponse

    const labelElWithInputEl = await screen.findByLabelText(/User Name/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.value).toBe(user_name)
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML input element with the label text as "User Id" and type as "text":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/User Id/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('text')
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML disabled input element with the label text as "User Id" and type as "text":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/User Id/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('text')
    expect(labelElWithInputEl).toBeDisabled()
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the default value for the disabled input element should have the value of the key "user_id" in profile from editProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/User Id/i, {
      exact: false,
    })
    const {
      profile: {user_id},
    } = editProfileResponse
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('text')
    expect(labelElWithInputEl).toBeDisabled()
    expect(labelElWithInputEl.value).toBe(user_id)
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML textarea element with the label text as "Bio" and type as "textarea":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/Bio/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('textarea')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the default value for the HTML textarea element with the label text as "Bio" should be the value of the key "user_bio" in profile from editProfileResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const {
      profile: {user_bio},
    } = editProfileResponse
    const labelElWithInputEl = await screen.findByLabelText(/Bio/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.value).toBe(user_bio)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML input element with the label text as "Phone Number" and type as "tel":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/Phone Number/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('tel')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML select element with the label text as "Gender":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/Gender/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('select-one')

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the gender field should contain "Male" as the default selected value:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const optionMale = await screen.findByRole('option', {name: 'Male'})
    expect(optionMale).toBeInTheDocument()
    expect(optionMale.selected).toBe(true)

    const optionFemale = await screen.findByRole('option', {name: 'Female'})
    expect(optionFemale).toBeInTheDocument()
    expect(optionFemale.selected).toBe(false)

    const optionOthers = await screen.findByRole('option', {name: 'Other'})
    expect(optionOthers).toBeInTheDocument()
    expect(optionOthers.selected).toBe(false)

    restoreGetCookieFns()
  })

  it('When a non-empty value is provided in the HTML input element with the label text "User Name", then the value provided should be displayed in the HTML input element:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/User Name/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('text')

    userEvent.clear(labelElWithInputEl)
    userEvent.type(labelElWithInputEl, 'rahul')
    expect(labelElWithInputEl).toHaveValue('rahul')
    restoreGetCookieFns()
  })

  it('When a non-empty value is provided in the HTML input element with the label text "Bio", then the value provided should be displayed in the HTML textarea element:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/Bio/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('textarea')
    userEvent.clear(labelElWithInputEl)
    userEvent.type(labelElWithInputEl, 'Sprinkling kindness everywhere I go')
    expect(labelElWithInputEl).toHaveValue(
      'Sprinkling kindness everywhere I go',
    )
    restoreGetCookieFns()
  })

  it('When a non-empty value is provided in the HTML input element with the label text "Phone Number", then the value provided should be displayed in the HTML input element:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const labelElWithInputEl = await screen.findByLabelText(/Phone Number/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('tel')
    userEvent.clear(labelElWithInputEl)
    userEvent.type(labelElWithInputEl, '9898989898')
    expect(labelElWithInputEl).toHaveValue('9898989898')
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the gender field value should change to Female when we select gender value as "Female":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    userEvent.selectOptions(await screen.findByRole('combobox'), ['Female'])

    const optionMale = screen.getByRole('option', {name: 'Male'})
    expect(optionMale).toBeInTheDocument()
    expect(optionMale.selected).toBe(false)

    const optionFemale = screen.getByRole('option', {name: 'Female'})
    expect(optionFemale).toBeInTheDocument()
    expect(optionFemale.selected).toBe(true)

    const optionOthers = screen.getByRole('option', {name: 'Other'})
    expect(optionOthers).toBeInTheDocument()
    expect(optionOthers.selected).toBe(false)

    restoreGetCookieFns()
  })

  it('In Edit Profile Route, the gender field value should change to Other when we select gender value as "Other":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    userEvent.selectOptions(await screen.findByRole('combobox'), ['Other'])

    const optionMale = screen.getByRole('option', {name: 'Male'})
    expect(optionMale).toBeInTheDocument()
    expect(optionMale.selected).toBe(false)

    const optionFemale = screen.getByRole('option', {name: 'Female'})
    expect(optionFemale).toBeInTheDocument()
    expect(optionFemale.selected).toBe(false)

    const optionOthers = screen.getByRole('option', {name: 'Other'})
    expect(optionOthers).toBeInTheDocument()
    expect(optionOthers.selected).toBe(true)

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Edit Profile Route is successful, then the page should consist of the HTML button element with the text content as "Submit":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    const submitEl = await screen.findByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    expect(submitEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('In Edit Profile Route, when we click on Submit button, then an HTTP POST request should be made to editProfileUrl:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === editProfileURL) {
        return {
          ok: true,
          json: () => Promise.resolve(editProfileResponse),
        }
      }
    })
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    const submitEl = await screen.findByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    expect(submitEl).toBeInTheDocument()
    userEvent.click(submitEl)

    expect(
      mockFetchFunction.mock.calls.some(
        eachCall => eachCall[0] === editProfileURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  // #region Edit Profile Failure test cases

  it('When the HTTP GET request made in Edit Profile Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
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

  it('When the HTTP GET request made in Edit Profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
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

  it('When the HTTP GET request made in Edit Profile Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
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

  it('When the HTTP GET request made in Edit Profile Route is unsuccessful, then the page should consist of the HTML button element with text content as "Try again" and when we click on the "Try again" button, then an HTTP GET request should be made to editProfileUrl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === myProfileURL) {
        return {
          ok: true,
          json: () => Promise.resolve({}),
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
        eachCall => eachCall[0] === editProfileURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  // #region Toast Test cases

  it('In Edit Profile Route, when we click on submit button with a non-empty bio, phone number, gender, and an empty user name then the toast should be displayed with the message "enter valid user name":::5:::', async () => {
    mockGetCookie()

    server.use(
      rest.post(editProfileURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            status_code: 400,
            error_msg: 'enter valid user name',
          }),
        ),
      ),
    )

    renderWithBrowserRouter(<App />)

    const submitButton = await screen.findByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    expect(submitButton).toBeInTheDocument()
    userEvent.click(submitButton)

    const toastContainer = await screen.findByRole('alert')

    expect(toastContainer).toBeInTheDocument()

    const messageEl = within(toastContainer).getByText(
      /enter valid user name/i,
      {exact: false},
    )
    expect(messageEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('In Edit Profile Route, when we click on submit button with a non-empty username, bio, gender, and an empty phone number then the toast should be displayed with the message "invalid phone number":::5:::', async () => {
    mockGetCookie()

    server.use(
      rest.post(editProfileURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            status_code: 400,
            error_msg: 'invalid phone number',
          }),
        ),
      ),
    )

    renderWithBrowserRouter(<App />)

    const submitButton = await screen.findByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    expect(submitButton).toBeInTheDocument()
    userEvent.click(submitButton)

    const toastContainer = await screen.findByRole('alert')

    expect(toastContainer).toBeInTheDocument()

    const messageEl = within(toastContainer).getByText(
      /invalid phone number/i,
      {exact: false},
    )
    expect(messageEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('In Edit Profile Route, when we click on submit button with a non-empty username, phone number, gender, and an empty bio then the toast should be displayed with the message "enter valid bio":::5:::', async () => {
    mockGetCookie()

    server.use(
      rest.post(editProfileURL, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            status_code: 400,
            error_msg: 'enter valid bio',
          }),
        ),
      ),
    )

    renderWithBrowserRouter(<App />)

    const submitButton = await screen.findByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    expect(submitButton).toBeInTheDocument()
    userEvent.click(submitButton)

    const toastContainer = await screen.findByRole('alert')

    expect(toastContainer).toBeInTheDocument()

    const messageEl = within(toastContainer).getByText(/enter valid bio/i, {
      exact: false,
    })
    expect(messageEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('In Edit Profile Route, when we click on submit button with a non-empty username, bio, phone number, gender then the toast should be displayed with the message "Profile Updated Successfully":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const labelElWithInputEl = await screen.findByLabelText(/Phone Number/i, {
      exact: false,
    })
    expect(labelElWithInputEl).toBeInTheDocument()
    expect(labelElWithInputEl.type).toBe('tel')
    userEvent.clear(labelElWithInputEl)
    userEvent.type(labelElWithInputEl, '7032659832')
    expect(labelElWithInputEl).toHaveValue('7032659832')

    const submitButton = await screen.findByRole('button', {
      name: /Submit/i,
      exact: false,
    })
    expect(submitButton).toBeInTheDocument()
    userEvent.click(submitButton)

    const toastContainer = await screen.findByRole('alert')

    expect(toastContainer).toBeInTheDocument()

    const messageEl = within(
      toastContainer,
    ).getByText(/Profile Updated Successfully/i, {exact: false})
    expect(messageEl).toBeInTheDocument()

    restoreGetCookieFns()
  })
})
