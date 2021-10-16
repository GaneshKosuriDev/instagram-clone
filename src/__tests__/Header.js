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

const myProfileRoutePath = '/my-profile'

const editProfileRoutePath = '/edit-profile'

const othersProfileRoute = '/user/Varun_Aadithya'

const searchResultUserRoutePath = '/user/Atul_Kasbekar'

const searchResultsFirstPostFirstCommentUserRoutePath = '/user/Arjun_Mark'

const searchFailure = 'https://apis.ccbp.in/insta-posts?search=sky'

const userStoriesAPIURL = 'https://apis.ccbp.in/insta-stories'

const postsAPIURL = 'https://apis.ccbp.in/insta-posts'

const userProfileAPIUrlForFirstPostFirstUsername =
  'https://apis.ccbp.in/insta-users/Varun_Aadithya'

const userProfileAPIUrlForFirstPostFirstCommentUsername =
  'https://apis.ccbp.in/insta-users/Prabuddha_Dasgupta'

const postCommentURL =
  'https://apis.ccbp.in/insta-posts/f25d77f0-602e-41d1-971e-4b8cf54709eb/comment'

const searchResultsPostCommentURL =
  'https://apis.ccbp.in/insta-posts/6fb210a9-0c4d-431f-8585-b3a4f065a171/comment'

const myProfileURL = 'https://apis.ccbp.in/insta-profile'

const userStoryURL = 'https://apis.ccbp.in/insta-stories/Varun_Aadithya'

const searchResultsUserNameAPIURL =
  'https://apis.ccbp.in/insta-users/Atul_Kasbekar'

const searchResultsCommentUserNameAPIURL =
  'https://apis.ccbp.in/insta-users/Arjun_Mark'

const likeOrUnLikeAPIURL =
  'https://apis.ccbp.in/insta-posts/f25d77f0-602e-41d1-971e-4b8cf54709eb/like'

const likeOrUnlikeSearchAPIURL =
  'https://apis.ccbp.in/insta-posts/6fb210a9-0c4d-431f-8585-b3a4f065a171/like'

const editProfileURL = 'https://apis.ccbp.in/insta-profile'

const OthersProfileAPIURL = 'https://apis.ccbp.in/insta-users/Varun_Aadithya'

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

const searchResultsResponse = {
  posts: [
    {
      post_id: '6fb210a9-0c4d-431f-8585-b3a4f065a171',
      user_id: 'Atul_Kasbekar',
      user_name: 'Atul Kasbekar',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-5-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-5-img.png',
        caption: 'The sky is the daily bread of the eyes.',
      },
      comments_count: 2,
      likes_count: 9,
      comments: [
        {
          user_name: 'Arjun Mark',
          user_id: 'Arjun_Mark',
          comment:
            'Aim for the sky, but move slowly, enjoying every step along the way.',
        },
        {
          user_name: 'Sooni Taraporevala',
          user_id: 'Sooni_Taraporevala',
          comment: 'The sky is an infinite movie to me.',
        },
      ],
      created_at: '4 Hours Ago',
    },
    {
      post_id: '72a1826b-6455-448a-9482-8edf8bb4e2d0',
      user_id: 'Sooni_Taraporevala',
      user_name: 'Sooni Taraporevala',
      profile_pic:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-8-img.png',
      post_details: {
        image_url:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-15-img.png',
        caption: 'Even the birds are chained to the sky.',
      },
      comments_count: 2,
      likes_count: 9,
      comments: [
        {
          user_name: 'Gautam Rajadhyaksha',
          user_id: 'Gautam_Rajadhyaksha',
          comment:
            'You were born with wings, why prefer to crawl through life.',
        },
        {
          user_name: 'Varun Aadithya',
          user_id: 'Varun_Aadithya',
          comment: 'I wish we had all been birds instead.',
        },
      ],
      created_at: '1 Hour Ago',
    },
  ],
  total: 2,
}

const searchResultsUserNameAPIResponse = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-qweqw123312',
    user_id: 'Atul_Kasbekar',
    user_name: 'Atul Kasbekar',
    is_following: false,
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-5-img.png',
    followers_count: 296,
    following_count: 304,
    user_bio:
      'Atul Kasbekar (born 22 April 1965) is an Indian fashion photographer and Bollywood film producer. He is recognised for his Kingfisher Calendar shoots.',
    posts_count: 3,
    posts: [
      {
        id: '6fb210a9-0c4d-431f-8585-b3a4f065a171',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-5-img.png',
      },
      {
        id: '29e3a940-d491-4595-bc52-1c98db617db3',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-7-img.png',
      },
      {
        id: 'b89f59f5-baf4-44e2-839e-cb4b55a971ed',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-11-img.png',
      },
    ],
    stories: [
      {
        id: 'hpsCUlIY1',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-13-img.png',
      },
    ],
  },
}

const searchResultsCommentUserNameAPIResponse = {
  user_details: {
    id: 'df3234jkjn2-32432nnknn-2343242234',
    user_id: 'Arjun_Mark',
    user_name: 'Arjun Mark',
    is_following: false,
    profile_pic:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-2-img.png',
    followers_count: 299,
    following_count: 301,
    user_bio:
      'Arjun is honored to be one of the jury on the panel of the prestigious Black & White WPGA Awards 2013 Arjun’s work has been chosen to be showcased as large format prints at the 9th year of KAPA International Advertising Photography Exhibition held in Seoul.',
    posts_count: 3,
    posts: [
      {
        id: '2f1e7ff3-c413-494e-9a01-5738ed595e38',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-3-img.png',
      },
      {
        id: '660f6654-2bef-4438-bb0c-50ed6d8b99f6',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-8-img.png',
      },
      {
        id: '1f0fdd41-bbbf-4126-b62d-e3eeb236fea2',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-19-img.png',
      },
    ],
    stories: [
      {
        id: 'bHRUAMhNL',
        image:
          'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/previous-stories/instagram-mini-project-previous-story-4-img.png',
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

const OthersProfileResponse = {
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

const likeOrUnlikeAPIResponse = {message: 'Post has been liked'}

const server = setupServer(
  rest.get(userStoriesAPIURL, (req, res, ctx) =>
    res(ctx.json(userStoriesResponse)),
  ),
  rest.get(postsAPIURL, (req, res, ctx) => {
    const query = req.url.searchParams
    const search = query.get('search')

    if (search === 'sky') {
      return res(ctx.json(searchResultsResponse))
    }
    if (search === '~' || search === 'rahul') {
      return res(ctx.json({posts: [], total: 0}))
    }
    return res(ctx.json(postsResponse))
  }),
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
  rest.get(searchResultsUserNameAPIURL, (req, res, ctx) =>
    res(ctx.json(searchResultsUserNameAPIResponse)),
  ),
  rest.get(searchResultsCommentUserNameAPIURL, (req, res, ctx) =>
    res(ctx.json(searchResultsCommentUserNameAPIResponse)),
  ),
  rest.post(searchResultsPostCommentURL, (req, res, ctx) =>
    res(ctx.json(postCommentResponse)),
  ),
  rest.post(likeOrUnLikeAPIURL, (req, res, ctx) =>
    res(ctx.json(likeOrUnlikeAPIResponse)),
  ),
  rest.post(likeOrUnlikeSearchAPIURL, (req, res, ctx) =>
    res(ctx.json(likeOrUnlikeAPIResponse)),
  ),
  rest.post(editProfileURL, (req, res, ctx) =>
    res(ctx.json(editProfileResponse)),
  ),
  rest.get(OthersProfileAPIURL, (req, res, ctx) =>
    res(ctx.json(OthersProfileResponse)),
  ),
)

const mockHomeRouteWithSearchResultsFailureAPIs = () => {
  server.use(
    rest.get(postsAPIURL, (req, res, ctx) => {
      const query = req.url.searchParams
      const search = query.get('search')

      if (search === 'sky') {
        return res(
          res(
            ctx.status(400),
            ctx.json({message: 'Authorization Header is undefined'}),
          ),
        )
      }
      if (search === '~' || search === 'rahul') {
        return res(ctx.json({posts: [], total: 0}))
      }
      return res(ctx.json(postsResponse))
    }),
  )
}

const mockHomeRouteSearchWithLikeUnLikeAPIs = () => {
  const mockFetchFunction = jest.fn().mockImplementation(url => {
    if (url === searchFailure) {
      return {
        ok: true,
        json: () => Promise.resolve(searchResultsResponse),
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
    if (url === likeOrUnlikeSearchAPIURL) {
      return {
        ok: true,
        json: () => Promise.resolve(likeOrUnlikeAPIResponse),
      }
    }
  })
  return mockFetchFunction
}

const mockHomeRouteLogoutAPIs = () => {
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
  return mockFetchFunction
}

const mockHomeRouteSearchWithCommentAPIs = (isCommentAPIFailure = false) => {
  const mockFetchFunction = jest.fn().mockImplementation(url => {
    if (url === searchFailure) {
      return {
        ok: true,
        json: () => Promise.resolve(searchResultsResponse),
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
    if (url === searchResultsPostCommentURL && isCommentAPIFailure) {
      return {
        ok: true,
        json: () => Promise.reject({}),
      }
    }
    if (url === searchResultsPostCommentURL) {
      return {
        ok: true,
        json: () => Promise.resolve(postCommentResponse),
      }
    }
  })

  return mockFetchFunction
}

const searchResults = (value = 'sky') => {
  const searchInputEl = screen.getByPlaceholderText(/Search/i, {exact: false})

  expect(searchInputEl).toBeInTheDocument()
  expect(searchInputEl.type).toBe('search')

  userEvent.type(searchInputEl, value)
  expect(searchInputEl).toHaveValue(value)

  const searchIcon = screen.getByTestId('searchIcon')
  expect(searchIcon).toBeInTheDocument()

  userEvent.click(searchIcon)
}

const likeFirstPostItem = async () => {
  const searchResultsContainerEl = await screen.findByTestId(
    'searchResultsContainer',
  )
  expect(searchResultsContainerEl).toBeInTheDocument()

  const postsLikeIcons = await within(searchResultsContainerEl).findAllByTestId(
    'likeIcon',
  )

  expect(postsLikeIcons[0]).toBeInTheDocument()

  userEvent.click(postsLikeIcons[0])
}

const unLikeFirstPostItem = async () => {
  const searchResultsContainerEl = await screen.findByTestId(
    'searchResultsContainer',
  )
  const postsUnLikeIcons = await within(
    searchResultsContainerEl,
  ).findAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
  expect(postsUnLikeIcons.length).toBe(1)
  userEvent.click(postsUnLikeIcons[0])
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

const assertFirstPostLikeIcon = async () => {
  const searchResultsContainerEl = await screen.findByTestId(
    'searchResultsContainer',
  )
  const postsLikeIcons = await within(searchResultsContainerEl).findAllByTestId(
    'likeIcon',
  )
  expect(postsLikeIcons[0]).toBeInTheDocument()
}

const assertFirstPostUnLikeIcon = async () => {
  const searchResultsContainerEl = await screen.findByTestId(
    'searchResultsContainer',
  )
  const postsUnLikeIcons = await within(
    searchResultsContainerEl,
  ).findAllByTestId('unLikeIcon')
  expect(postsUnLikeIcons[0]).toBeInTheDocument()
}

const commentSearchResultsFirstPost = async (commentText = 'nice pic') => {
  const searchResultsContainerEl = await screen.findByTestId(
    'searchResultsContainer',
  )
  const postsCommentsInputElement = await within(
    searchResultsContainerEl,
  ).findAllByRole('textbox')
  userEvent.type(postsCommentsInputElement[0], commentText)

  const postsButtonElements = within(searchResultsContainerEl).getAllByRole(
    'button',
    {
      name: /Post/i,
      exact: false,
    },
  )
  expect(postsButtonElements[0]).toBeInTheDocument()
  expect(postsButtonElements[0]).not.toBeDisabled()

  userEvent.click(postsButtonElements[0])

  const postsMyCommentUsername = await within(
    searchResultsContainerEl,
  ).findAllByText(commentText)
  expect(postsMyCommentUsername[0]).toBeInTheDocument()
}

const assertEditProfileUserName = async () => {
  const {profile} = myProfileResponse
  const {user_id} = profile

  const headingEl = await screen.findByRole('heading', {
    name: user_id,
    exact: false,
  })
  expect(headingEl).toBeInTheDocument()
}

const assertFollowButtonUserProfileRoute = async () => {
  const followButton = await screen.findByRole('button', {
    name: /Follow/i,
    exact: false,
  })
  expect(followButton).toBeInTheDocument()
}

const assertLogout = async () => {
  const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
    exact: false,
  })
  expect(imgElWithAlt).toBeInTheDocument()

  userEvent.click(imgElWithAlt)
  const popoverContainer = await screen.findByTestId('popover')
  const logoutButtonEl = within(popoverContainer).getByText(/Logout/i, {
    exact: false,
  })

  expect(logoutButtonEl).toBeInTheDocument()
  userEvent.click(logoutButtonEl)
}

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
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

const originalFetch = window.fetch

//TODO: below code is to resolve third party library issue

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

  //   #region Logo test cases

  it('The Header should consist of an HTML image element with alt attribute value as "website logo":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()
    const imageEl = screen.getByAltText(/website logo/i, {
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('The Header should consist of an HTML image element with alt attribute value as "website logo" and it should be wrapped with the Link from "react-router-dom":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()
    const imgElWithAlt = screen.getByAltText(/website logo/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()
    const imgElParent = imgElWithAlt.parentElement
    expect(imgElParent.tagName).toBe('A')
    restoreGetCookieFns()
  })

  it('The Header should consist of an HTML image element with alt attribute value as "website logo" and when the user clicks on the logo it should navigate to the home:::5:::', async () => {
    mockGetCookie()

    const {history} = rtlRender(<App />, homeRoutePath)
    await assertHomeRouteUIElements()
    const imgElWithAlt = screen.getByAltText(/website logo/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    expect(history.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })

  // #region search UI test cases

  it('The Header should consist of an HTML input element with the placeholder text as "Search" and type as "text":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    const searchInputEl = screen.getByPlaceholderText(/Search/i, {exact: false})

    expect(searchInputEl).toBeInTheDocument()
    expect(searchInputEl.type).toBe('search')

    restoreGetCookieFns()
  })

  it('The Header should consist of the "FaSearch" search icon which is imported from "react-icons" package with test id value as "searchIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    const searchInputEl = screen.getByTestId('searchIcon')

    expect(searchInputEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When a non-empty value is provided in the HTML input element with the placeholder text "Search" and type as "text", then the value provided should be displayed in the HTML input element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()
    const searchInputEl = screen.getByPlaceholderText(/Search/i, {exact: false})
    userEvent.type(searchInputEl, 'rainbow')
    expect(searchInputEl).toHaveValue('rainbow')
    restoreGetCookieFns()
  })

  // #region Home Route home icon UI test cases

  it('The Home Route Header should consist of "AiFillHome" icon which is imported from "react-icons" package with test id value as "homeFilled":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const homeIcon = screen.getByTestId('homeFilled')
    expect(homeIcon).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The Home Route Header should consist of "AiFillHome" icon which is imported from "react-icons" package and it should be wrapped with the Link from "react-router-dom":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()

    const homeIcon = screen.getByTestId('homeFilled')
    expect(homeIcon).toBeInTheDocument()

    const homeIconParentEl = homeIcon.parentElement
    expect(homeIconParentEl.tagName).toBe('A')

    restoreGetCookieFns()
  })

  //   #region Home Route home icon Functionality test case

  it('The Home Route Header should consist of a home icon with test id value as "homeFilled" and when the user clicks on the icon it should navigate to the Home Route:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const homeIcon = screen.getByTestId('homeFilled')
    expect(homeIcon).toBeInTheDocument()

    userEvent.click(homeIcon)
    expect(window.location.pathname).toBe(homeRoutePath)
    await screen.findAllByAltText(/user story/i, {exact: false})
    const paragraphElTwo = await screen.findByText(
      /Another day, another sunrise/i,
      {
        exact: false,
      },
    )
    expect(paragraphElTwo).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region profile pic UI test cases

  it('The Header should consist of an HTML image element with attribute value as "header profile pic" and src value as my profile pic image URL:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()
    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    const imageURL =
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/profile/instagram-mini-project-profile-1.png'
    expect(imgElWithAlt.src).toBe(imageURL)

    restoreGetCookieFns()
  })

  // #region profile pic Functionality test cases

  it('The Header should contain an HTML image element with attribute value as "header profile pic" and when the user clicks on it then it should trigger a popover with test id value as "popover":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')

    expect(popoverContainer).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region popover menu UI Test cases

  it('The Header popover should contain an HTML button element with "IoMdClose" icon from "react-icons" with test id value as "closeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    const buttonEl = within(popoverContainer).getByTestId('closeIcon')

    expect(buttonEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The Header popover should contain an HTML button element with "IoMdClose" icon from "react-icons" and when the user clicks on the button then it should close the popover menu:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    const buttonEl = within(popoverContainer).getByTestId('closeIcon')

    expect(buttonEl).toBeInTheDocument()

    userEvent.click(buttonEl)

    await waitFor(() => expect(popoverContainer).not.toBeInTheDocument())

    restoreGetCookieFns()
  })

  it('The Home Route Header popover should contain "CgProfile" icon which is imported from "react-icons" with test id value as "popOverMenuProfileIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    const profileIcon = within(popoverContainer).getByTestId(
      /popOverMenuProfileIcon/i,
      {
        exact: false,
      },
    )

    expect(profileIcon).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The Home Route Header popover should contain an HTML button element with text content as "Profile":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    const buttonEl = within(popoverContainer).getByText(/Profile/i, {
      exact: false,
    })

    expect(buttonEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The My Profile Route Header popover should not contain an HTML button element with text content as "Profile":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})
    const editProfileButton = await screen.findByRole('button', {
      name: /Edit Profile/i,
      exact: false,
    })
    expect(editProfileButton).toBeInTheDocument()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    expect(
      within(popoverContainer).queryByRole('button', {
        name: /Profile/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The Header popover should contain "FiLogOut" icon imported from "react-icons" with test id value as "popOverMenuLogOutIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    const logoutIcon = within(popoverContainer).getByTestId(
      /popOverMenuLogOutIcon/i,
      {
        exact: false,
      },
    )

    expect(logoutIcon).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The Header popover should contain an HTML button element with text content as "Logout":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    const buttonEl = within(popoverContainer).getByText(/Logout/i, {
      exact: false,
    })

    expect(buttonEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  //   #region popover menu functionality test cases

  it('In the Header, When the user clicks on profile in the popover menu then it should navigate to My Profile Route:::5:::', async () => {
    mockGetCookie()

    const {history} = rtlRender(<App />)

    await assertHomeRouteUIElements()

    const imgElWithAlt = screen.getByAltText(/header profile pic/i, {
      exact: false,
    })
    expect(imgElWithAlt).toBeInTheDocument()

    userEvent.click(imgElWithAlt)
    const popoverContainer = await screen.findByTestId('popover')
    const profileButtonEl = within(popoverContainer).getByText(/Profile/i, {
      exact: false,
    })

    expect(profileButtonEl).toBeInTheDocument()
    userEvent.click(profileButtonEl)

    expect(history.location.pathname).toBe(myProfileRoutePath)

    const userId = 'rahul'

    const userIdEL = await screen.findByText(userId, {exact: false})
    expect(userIdEL).toBeInTheDocument()

    restoreGetCookieFns()
  })

  //   #region logout Functionality test cases

  it('When the user clicks on logout in the popover then the Cookies.remove() method should be called with the "jwt_token" string as an argument:::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteLogoutAPIs()

    window.fetch = mockFetchFunction

    rtlRender(<App />)

    await assertHomeRouteUIElements()

    await assertLogout()

    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')

    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it('When the user clicks on logout in the popover then the history.replace() method should be called with the argument "/login":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteLogoutAPIs()

    window.fetch = mockFetchFunction

    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)

    await assertHomeRouteUIElements()

    await assertLogout()

    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)

    restoreHistoryReplace(history)
    restoreGetCookieFns()
  })

  // #region Search Functionality test cases in Home Route

  it('When the search results API is successful in the Home Route, then Page should consist of the loader with test id attribute value as "searchPostsLoader":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

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

    searchResults()

    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('searchPostsLoader'),
    )

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then the Home Route should contain an HTML container element with test id value as "searchResultsContainer":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then the search results container should contain an HTML heading element with the text "Search Results":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const headingEl = within(
      searchResultsContainerEl,
    ).getByText(/Search Results/i, {exact: false})

    expect(headingEl).toBeInTheDocument()

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When Search Results are empty then the Home Route should contain an HTML image element with attribute value as "search not found":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults('~')

    const imgEl = await screen.findByAltText(/search not found/i, {
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When Search Results are empty then the Home Route should contain an HTML heading element with the text "Search Not Found" :::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults('~')

    const headingEl = await screen.findByRole('heading', {
      name: /Search Not Found/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When Search Results are empty then the Home Route should contain an HTML paragraph element with the text "Try different keyword or search again" :::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults('~')

    const paragraphElSearchNotFound = await screen.findByText(
      /Try different keyword or search again/i,
      {
        exact: false,
      },
    )
    expect(paragraphElSearchNotFound).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML image element with alt text as "post author profile pic" and src as the value of key "profile_pic" in posts from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {profile_pic} = posts[0]

    const profilePics = await within(
      searchResultsContainerEl,
    ).findAllByAltText(/post author profile pic/i, {exact: false})
    expect(profilePics[0]).toBeInTheDocument()
    expect(profilePics[0].src).toBe(profile_pic)
    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML paragraph element with text content as the value of the key "user_name" in posts from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {user_name} = posts[0]

    const postsUserNames = await within(
      searchResultsContainerEl,
    ).findAllByText(user_name, {exact: false})
    expect(postsUserNames[0]).toBeInTheDocument()
    expect(postsUserNames[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML image element with alt text as "post pic" and src as the value of key "image_url" in post_details from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {
      post_details: {image_url},
    } = posts[0]

    const postsPics = await within(
      searchResultsContainerEl,
    ).findAllByAltText(/post pic/i, {exact: false})
    expect(postsPics[0]).toBeInTheDocument()
    expect(postsPics[0].src).toBe(image_url)
    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of "BsHeart" icon from "react-icons/bs" with test id value as "likeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const likeIcons = await within(searchResultsContainerEl).findAllByTestId(
      'likeIcon',
    )
    expect(likeIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of "FaRegComment" icon from "react-icons/fa" icon with test id value as "commentIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const commentIcons = await within(searchResultsContainerEl).findAllByTestId(
      'commentIcon',
    )
    expect(commentIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of "BiShareAlt" icon from "react-icons/bi" icon with test id value as "shareIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const shareIcons = await within(searchResultsContainerEl).findAllByTestId(
      'shareIcon',
    )
    expect(shareIcons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML paragraph element with text content as the value of the key "caption" in post_details from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {
      post_details: {caption},
    } = posts[0]

    const postCaptions = await within(
      searchResultsContainerEl,
    ).findAllByText(caption, {exact: false})
    expect(postCaptions[0]).toBeInTheDocument()
    expect(postCaptions[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML paragraph element with text content as the value of the key "likes_count" in post_details from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {likes_count} = posts[0]

    const postsLikesCount = await within(
      searchResultsContainerEl,
    ).findAllByText(likes_count, {exact: false})

    expect(postsLikesCount[0]).toBeInTheDocument()
    expect(postsLikesCount[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post first comment should consist of an HTML span element then each Post should consist of an HTML span element with text content as the value of the key "user_name" in comments from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {comments} = posts[0]
    const {user_name} = comments[0]

    const postsFirstCommentUsernames = await within(
      searchResultsContainerEl,
    ).findAllByText(user_name, {exact: false})
    expect(postsFirstCommentUsernames[0]).toBeInTheDocument()
    expect(postsFirstCommentUsernames[0].tagName).toBe('SPAN')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post first comment should consist of an HTML paragraph element with text content as the value of the key "comment" in comments from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {comments} = posts[0]
    const {comment} = comments[0]

    const commentTextParagraphEl = await within(
      searchResultsContainerEl,
    ).findByText(comment, {exact: false})
    expect(commentTextParagraphEl).toBeInTheDocument()
    expect(commentTextParagraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML paragraph element with text content as the value of the key "comments_count" in posts from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {comments_count} = posts[0]

    const postsCommentsCount = await within(
      searchResultsContainerEl,
    ).findAllByText(comments_count, {exact: false})
    expect(postsCommentsCount[0]).toBeInTheDocument()
    expect(postsCommentsCount[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML paragraph element with text content as the value of the key "created_at" in posts from searchPostsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {created_at} = posts[0]

    const postsCreatedTimes = await within(
      searchResultsContainerEl,
    ).findAllByText(created_at, {exact: false})
    expect(postsCreatedTimes[0]).toBeInTheDocument()
    expect(postsCreatedTimes[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML image element with alt attribute value as "my profile pic":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const myProfilePics = await within(
      searchResultsContainerEl,
    ).findAllByAltText(/my profile pic/i, {
      exact: false,
    })

    expect(myProfilePics[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post should consist of an HTML input element with the placeholder text as "Add a comment..." and type as "text":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const postInputElements = await within(
      searchResultsContainerEl,
    ).findAllByPlaceholderText(/Add a comment.../i, {
      exact: false,
    })

    expect(postInputElements[0]).toBeInTheDocument()
    expect(postInputElements[0].type).toBe('text')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user provides a non-empty value in the HTML input element with the placeholder text as "Add a comment...", then the text should be displayed in the HTML input element in that Post item:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const postCommentTextInputElements = await within(
      searchResultsContainerEl,
    ).findAllByRole('textbox')
    userEvent.type(postCommentTextInputElements[0], 'rahul')
    expect(postCommentTextInputElements[0]).toHaveValue('rahul')
    expect(postCommentTextInputElements[1]).toHaveValue('')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post item in search results should contain the HTML button element with the text "Post":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const postItemsPostButtons = await within(
      searchResultsContainerEl,
    ).findAllByRole('button', {
      name: /Post/i,
      exact: false,
    })

    expect(postItemsPostButtons[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post item in search results should contain the HTML button element with the text "Post" and it should be disabled when the post item comment input text is empty:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const postItemsPostButtons = await within(
      searchResultsContainerEl,
    ).findAllByRole('button', {
      name: /Post/i,
      exact: false,
    })

    expect(postItemsPostButtons[0]).toBeInTheDocument()
    expect(postItemsPostButtons[0]).toBeDisabled()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, then each Post item in search results should contain an HTML button element with the text "Post" and it should be enabled when the comment input text of that post item is not empty:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const postsCommentInputElements = await within(
      searchResultsContainerEl,
    ).findAllByRole('textbox')
    userEvent.type(postsCommentInputElements[0], 'rahul')

    const postItemsPostButtons = within(searchResultsContainerEl).getAllByRole(
      'button',
      {
        name: /Post/i,
        exact: false,
      },
    )
    expect(postItemsPostButtons[0]).toBeInTheDocument()
    expect(postItemsPostButtons[0]).not.toBeDisabled()
    expect(postItemsPostButtons[1]).toBeDisabled()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we click on the post username then the page should navigate to the user profile with the path "/user/user_id":::5:::', async () => {
    mockGetCookie()

    const {history} = rtlRender(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {user_name} = posts[0]

    const postsUsernameElements = await within(
      searchResultsContainerEl,
    ).findAllByText(user_name, {exact: false})
    expect(postsUsernameElements[0]).toBeInTheDocument()

    userEvent.click(postsUsernameElements[0])

    await waitFor(() =>
      expect(history.location.pathname).toBe(searchResultUserRoutePath),
    )

    const buttonEl = await screen.findByRole('button', {
      name: /Follow/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we click on the like icon then an HTTP GET request should be made to postItemLikeAPI URL with like status true:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteSearchWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
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

    searchResults()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const bodyObject = JSON.parse(mockFetchFunction.mock.calls[3][1].body)

    expect(mockFetchFunction.mock.calls[3][0]).toBe(likeOrUnlikeSearchAPIURL)
    expect(bodyObject.like_status).toBeTruthy()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user clicks on the like icon then the like icon should be changed to that post item and the changed icon should have test id attribute value as "unLikeIcon":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user clicks on the like icon then the likes count of that post item should be incremented by one:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    const {posts} = searchResultsResponse
    const {likes_count} = posts[0]

    const postsLikesCount = await within(
      searchResultsContainerEl,
    ).findAllByText(likes_count + 1, {
      exact: false,
    })

    expect(postsLikesCount[0]).toBeInTheDocument()
    expect(postsLikesCount.length).toBe(1)

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user clicks on the unlike icon then an HTTP GET request should be made to postItemLike URL with like status false:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteSearchWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
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

    searchResults()

    await likeFirstPostItem()

    await assertFirstPostUnLikeIcon()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const bodyObject = JSON.parse(mockFetchFunction.mock.calls[4][1].body)

    expect(mockFetchFunction.mock.calls[4][0]).toBe(likeOrUnlikeSearchAPIURL)
    expect(bodyObject.like_status).toBeFalsy()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user clicks on the unlike icon then the icon should be changed to that post item and, the changed icon should have test id as "likeIcon":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteSearchWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
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

    searchResults()

    await likeFirstPostItem()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user clicks on the unlike icon then the likes count of that post item should be decreased by one:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteSearchWithLikeUnLikeAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)
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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    await likeFirstPostItem()

    await unLikeFirstPostItem()

    await assertFirstPostLikeIcon()

    const {posts} = searchResultsResponse
    const {likes_count} = posts[0]

    const postLikesCount = await within(searchResultsContainerEl).findAllByText(
      likes_count,
      {
        exact: false,
      },
    )

    expect(postLikesCount[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we click on the post comment username then the page should navigate to the user profile with the path "/user/user_id":::5:::', async () => {
    mockGetCookie()
    const {history} = rtlRender(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {comments} = posts[0]
    const {user_name} = comments[0]
    const PostsFirstCommentUsername = await within(
      searchResultsContainerEl,
    ).findAllByText(user_name)

    userEvent.click(PostsFirstCommentUsername[0])
    await waitFor(() =>
      expect(history.location.pathname).toBe(
        searchResultsFirstPostFirstCommentUserRoutePath,
      ),
    )

    const buttonEl = await screen.findByRole('button', {
      name: /Follow/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we enter a non-empty comment in the HTML input element then it should be displayed in that particular post:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const postsCommentsInputEl = await within(
      searchResultsContainerEl,
    ).findAllByRole('textbox')
    userEvent.type(postsCommentsInputEl[0], 'nice pic')
    expect(postsCommentsInputEl[0]).toHaveValue('nice pic')
    expect(postsCommentsInputEl[1]).toHaveValue('')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we enter a non-empty comment in the HTML input element and clicks on the Post button then an HTTP GET request should be made to the commentAPI with comment text:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = mockHomeRouteSearchWithCommentAPIs()

    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    await commentSearchResultsFirstPost()

    const username = 'John'

    const postsMyCommentUsername = await within(
      searchResultsContainerEl,
    ).findAllByText(username)
    expect(postsMyCommentUsername[0]).toBeInTheDocument()

    const requestBodyObject = JSON.parse(
      mockFetchFunction.mock.calls[3][1].body,
    )

    expect(mockFetchFunction.mock.calls[3][0]).toBe(searchResultsPostCommentURL)

    expect(requestBodyObject.comment_text).toBe('nice pic')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we enter a non-empty comment in the HTML input element and clicks on the Post button then the commented author user name should be displayed in the HTML span element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    await commentSearchResultsFirstPost()

    const username = 'John'

    const postsMyCommentUsername = await within(
      searchResultsContainerEl,
    ).findAllByText(username)
    expect(postsMyCommentUsername[0]).toBeInTheDocument()
    expect(postsMyCommentUsername[0].tagName).toBe('SPAN')
    expect(postsMyCommentUsername.length).toBe(1)

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we enter a non-empty comment in the HTML input element and clicks on the Post button then the commented text should be displayed in the HTML paragraph element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    await commentSearchResultsFirstPost()

    const commentText = 'nice pic'

    const postsMyCommentText = await within(
      searchResultsContainerEl,
    ).findAllByText(commentText)
    expect(postsMyCommentText[0]).toBeInTheDocument()
    expect(postsMyCommentText[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user comment more than one time for a post then the commented author user names should be displayed in the HTML span element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const username = 'John'

    await commentSearchResultsFirstPost()

    await commentSearchResultsFirstPost('hello')

    const postsMyCommentUsername = await within(
      searchResultsContainerEl,
    ).findAllByText(username)
    expect(postsMyCommentUsername[0]).toBeInTheDocument()
    expect(postsMyCommentUsername[0].tagName).toBe('SPAN')
    expect(postsMyCommentUsername.length).toBe(2)

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if the user comment more than one time for a post then the commented text should be displayed in the HTML paragraph element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const firstCommentText = 'nice pic'

    const secondCommentText = 'hello'

    await commentSearchResultsFirstPost()

    await commentSearchResultsFirstPost(secondCommentText)

    const postsMyCommentText = await within(
      searchResultsContainerEl,
    ).findAllByText(firstCommentText)
    const postsMySecondCommentText = await within(
      searchResultsContainerEl,
    ).findAllByText(secondCommentText)
    expect(postsMyCommentText[0]).toBeInTheDocument()
    expect(postsMyCommentText[0].tagName).toBe('P')

    expect(postsMySecondCommentText[0]).toBeInTheDocument()
    expect(postsMySecondCommentText[0].tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Home Route, if we click on the username in the comment which is added by you then the page should navigate to My Profile Route:::5:::', async () => {
    mockGetCookie()

    const {history} = rtlRender(<App />)

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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    await commentSearchResultsFirstPost()

    const username = 'John'

    const postsMyCommentUsername = await within(
      searchResultsContainerEl,
    ).findAllByText(username)
    expect(postsMyCommentUsername[0]).toBeInTheDocument()

    userEvent.click(postsMyCommentUsername[0])

    expect(history.location.pathname).toBe(myProfileRoutePath)

    const userId = 'rahul'
    const userIdInProfile = await screen.findByText(userId)
    expect(userIdInProfile).toBeInTheDocument()

    restoreGetCookieFns()
  })

  // #region Search Failure Test cases in Home Route

  it('When the Search Results HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "failure view":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter(<App />)
    await assertHomeRouteUIElements()

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const imgEl = await within(searchResultsContainerEl).findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the Search Results HTTP GET request made in Home Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()
    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const paragraphElTwo = await within(searchResultsContainerEl).findByText(
      /Something went wrong. Please try again/i,
      {
        exact: false,
      },
    )

    expect(paragraphElTwo).toBeInTheDocument()
    expect(paragraphElTwo.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('When the Search Results HTTP GET request made in Home Route is unsuccessful, the page should consist of the HTML button element with text content as "Try again":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter(<App />)

    await assertHomeRouteUIElements()
    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    expect(
      await within(searchResultsContainerEl).findByRole('button', {
        name: /Try again/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the Search Results HTTP GET request made in Home Route is unsuccessful and the "Try again" button is clicked, then an HTTP GET request should be made to SearchApiURl:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === searchFailure) {
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

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const buttonEl = await within(searchResultsContainerEl).findByRole(
      'button',
      {
        name: /Try again/i,
        exact: false,
      },
    )
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(mockFetchFunction.mock.calls[3][0]).toBe(searchFailure)
    restoreGetCookieFns()
  })

  //   #region My Profile Route Search Results test cases

  it('When the search results API is in progress in the My Profile Route, then Page should consists of loader with test id attribute value as "searchPostsLoader":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})

    await screen.findByRole(/button/i, {
      name: /Edit Profile/i,
      exact: false,
    })

    searchResults()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('searchPostsLoader'),
    )

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the My Profile Route, then the search results container should contain an HTML heading element with the text "Search Results":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})

    await screen.findByRole(/button/i, {
      name: /Edit Profile/i,
      exact: false,
    })

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const headingEl = within(
      searchResultsContainerEl,
    ).getByText(/Search Results/i, {exact: false})

    expect(headingEl).toBeInTheDocument()

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When Search Results are empty then the My Profile Route should contain an HTML image element with attribute value as "search not found":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})

    await screen.findByRole(/button/i, {
      name: /Edit Profile/i,
      exact: false,
    })

    searchResults('~')

    const imgEl = await screen.findByAltText(/search not found/i, {
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the My Profile Route, then each Post should consist of an HTML image element with alt text as "post author profile pic" and src value as post author profile image URL:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})

    await screen.findByRole(/button/i, {
      name: /Edit Profile/i,
      exact: false,
    })

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {profile_pic} = posts[0]

    const profilePics = await within(
      searchResultsContainerEl,
    ).findAllByAltText(/post author profile pic/i, {exact: false})
    expect(profilePics[0]).toBeInTheDocument()
    expect(profilePics[0].src).toBe(profile_pic)
    restoreGetCookieFns()
  })

  it('When the Search Results HTTP GET request made in My Profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter(<App />, {route: myProfileRoutePath})

    await screen.findByRole(/button/i, {
      name: /Edit Profile/i,
      exact: false,
    })

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const paragraphElTwo = await within(searchResultsContainerEl).findByText(
      /Something went wrong. Please try again/i,
      {
        exact: false,
      },
    )

    expect(paragraphElTwo).toBeInTheDocument()
    expect(paragraphElTwo.tagName).toBe('P')

    restoreGetCookieFns()
  })

  //   #region Edit Profile Route Search Results test cases

  it('When the search results API is in progress in the Edit Profile Route, then Page should consists of loader with test id attribute value as "searchPostsLoader":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: editProfileRoutePath})

    await assertEditProfileUserName()

    searchResults()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('searchPostsLoader'),
    )

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Edit Profile Route, then the search results container should contain an HTML heading element with the text "Search Results":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: editProfileRoutePath})

    await assertEditProfileUserName()

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const headingEl = within(
      searchResultsContainerEl,
    ).getByText(/Search Results/i, {exact: false})

    expect(headingEl).toBeInTheDocument()

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When Search Results are empty then the Edit Profile Route should contain an HTML image element with attribute value as "search not found":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: editProfileRoutePath})

    await assertEditProfileUserName()

    searchResults('~')

    const imgEl = await screen.findByAltText(/search not found/i, {
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the Edit Profile Route, then each Post should consist of an HTML image element with alt text as "post author profile pic" and src value as post author profile image URL:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: editProfileRoutePath})

    await assertEditProfileUserName()

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {profile_pic} = posts[0]

    const profilePics = await within(
      searchResultsContainerEl,
    ).findAllByAltText(/post author profile pic/i, {exact: false})
    expect(profilePics[0]).toBeInTheDocument()
    expect(profilePics[0].src).toBe(profile_pic)
    restoreGetCookieFns()
  })

  it('When the Search Results HTTP GET request made in Edit Profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter(<App />, {route: editProfileRoutePath})

    await assertEditProfileUserName()

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const paragraphElTwo = await within(searchResultsContainerEl).findByText(
      /Something went wrong. Please try again/i,
      {
        exact: false,
      },
    )

    expect(paragraphElTwo).toBeInTheDocument()
    expect(paragraphElTwo.tagName).toBe('P')

    restoreGetCookieFns()
  })

  //   #region Edit Profile Route Search Results test cases

  it('When the search results API is in progress in the User Profile Route, then Page should consists of loader with test id attribute value as "searchPostsLoader":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: othersProfileRoute})

    await assertFollowButtonUserProfileRoute()

    searchResults()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('searchPostsLoader'),
    )

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the User Profile Route, then the search results container should contain an HTML heading element with the text "Search Results":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: othersProfileRoute})

    await assertFollowButtonUserProfileRoute()

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const headingEl = within(
      searchResultsContainerEl,
    ).getByText(/Search Results/i, {exact: false})

    expect(headingEl).toBeInTheDocument()

    const paragraphElInSearchResults = await screen.findByText(
      /The sky is the daily bread of the eyes./i,
      {
        exact: false,
      },
    )

    expect(paragraphElInSearchResults).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When Search Results are empty then the User Profile Route should contain an HTML image element with attribute value as "search not found":::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: othersProfileRoute})

    await assertFollowButtonUserProfileRoute()

    searchResults('~')

    const imgEl = await screen.findByAltText(/search not found/i, {
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the search results API is successful in the User Profile Route, then each Post should consist of an HTML image element with alt text as "post author profile pic" and src value as post author profile image URL:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: othersProfileRoute})

    await assertFollowButtonUserProfileRoute()

    searchResults()

    const searchResultsContainerEl = screen.getByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const {posts} = searchResultsResponse
    const {profile_pic} = posts[0]

    const profilePics = await within(
      searchResultsContainerEl,
    ).findAllByAltText(/post author profile pic/i, {exact: false})
    expect(profilePics[0]).toBeInTheDocument()
    expect(profilePics[0].src).toBe(profile_pic)
    restoreGetCookieFns()
  })

  it('When the Search Results HTTP GET request made in User Profile Route is unsuccessful, then the page should consist of the HTML paragraph element with text content as "Something went wrong. Please try again":::5:::', async () => {
    mockGetCookie()

    mockHomeRouteWithSearchResultsFailureAPIs()

    renderWithBrowserRouter(<App />, {route: othersProfileRoute})

    await assertFollowButtonUserProfileRoute()

    searchResults()

    const searchResultsContainerEl = await screen.findByTestId(
      'searchResultsContainer',
    )

    expect(searchResultsContainerEl).toBeInTheDocument()

    const paragraphElTwo = await within(searchResultsContainerEl).findByText(
      /Something went wrong. Please try again/i,
      {
        exact: false,
      },
    )

    expect(paragraphElTwo).toBeInTheDocument()
    expect(paragraphElTwo.tagName).toBe('P')

    restoreGetCookieFns()
  })
})
