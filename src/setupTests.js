/* eslint-disable */

import '@testing-library/jest-dom'
import {configure} from '@testing-library/react'

configure({testIdAttribute: 'testid'})

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }
