import React from 'react'
import {
  mount,
  render,
} from 'enzyme'

import {
  ClientOnly,
  ServerOnly,
} from '../src/index'

const ServerDiv = (props) => (
  <div className="render-on-server">
    Server Render
  </div>
)

const ClientDiv = (props) => (
  <div className="render-on-client">
    Client Render
  </div>
)

const ClientOnlyWithChildren = () => (
  <div className="wrapper">
    <ClientOnly>
      <ClientDiv />
    </ClientOnly>
  </div>
)

const ServerOnlyWithChildren = () => (
  <div className="wrapper">
    <ServerOnly>
      <ServerDiv />
    </ServerOnly>
  </div>
)

const SSRSwitchWithClientEnv = () => (
  <div className="wrapper">  
    <SSRSwitch
      env="client"
      alternateRender={<ServerDiv />}
    >
      <ClientDiv />
    </SSRSwitch>
  </div>
)

const SSRSwitchWithServerEnv = () => (
  <div className="wrapper">
    <SSRSwitch
      env="server"
      alternateRender={<ClientDiv />}
    >
      <ServerDiv />
    </SSRSwitch>
  </div>
)

describe('ClientOnly', () => {
  const wrapper = mount(<ClientOnlyWithChildren />)
  const rendered = render(<ClientOnlyWithChildren />)
  it('renders the root component', () => {
    const expected = wrapper
      .find('.SSRSwitch')
      .exists()
    expect(expected).toBe(true)
  })

  it('renders children on the client', () => {
    const expected = wrapper
      .find('.render-on-client')
      .exists()
    expect(expected).toBe(true)
  })

  it('does not render children on the server', () => {
    const expected = rendered
      .find('.render-on-client')
    expect(expected).toBe(3)
  })
})