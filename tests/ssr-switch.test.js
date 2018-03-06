import React from 'react'
import {
  mount,
  render,
} from 'enzyme'
import SSRSwitch, {
  ClientOnly,
  ServerOnly,
} from '../src'

const ClientOnlyWithChildren = () => (
  <ClientOnly>
    <span className="client-only-child"></span>
  </ClientOnly>
)

const ServerOnlyWithChildren = () => (
  <ServerOnly>
    <span className="server-only-child"></span>
  </ServerOnly>
)

describe('ClientOnly', () => {
  it('renders the root component', () => {
    const expected = mount(<ClientOnlyWithChildren />)
      .find('.SSRSWitch')
      .exist()

    expect(expected).toBe(true)
  })

  it('renders children on the client', () => {
    // mount
  })

  it('does not render children on the server', () => {

  })
})