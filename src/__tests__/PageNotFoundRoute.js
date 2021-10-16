import Cookies from 'js-cookie'
import {BrowserRouter} from 'react-router-dom'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const pageNotFoundPath = '/bad-path'

const homeRoutePath = '/'

const renderWithBrowserRouter = (ui, {route = pageNotFoundPath} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
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

describe('Not Found Route Tests', () => {
  it('When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML image element with alt text as "not found":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      name: /page not found/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
  })

  it('When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML main heading element with text content as "PAGE NOT FOUND":::5:::', () => {
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('heading', {
        name: /PAGE NOT FOUND/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it('When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML paragraph element with text content as "we’re sorry, the page you requested could not be found":::5:::', () => {
    renderWithBrowserRouter(<App />)
    const paragraphEl = screen.getByText(
      /we are sorry, the page you requested could not be found/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it('When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML button element with "Home Page" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />)
    const buttonEl = screen.getByRole('button', {
      name: /Home Page/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
  })

  it('When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML button element with "Home Page" as text content and when the user clicks on the button then it should navigate to Home Page:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const homePageButton = screen.getByRole('button', {
      name: /Home Page/i,
      exact: false,
    })

    userEvent.click(homePageButton)

    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))
    restoreGetCookieFns()
  })
})
