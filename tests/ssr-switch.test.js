/* eslint-env jest */
import React from 'react'
import {
  mount,
  render,
} from 'enzyme'

import SSRSwitch, {
  ClientOnly,
  ServerOnly,
} from '../src/index'

const ServerDiv = props => (
  <div className="render-on-server">
    Server Render
  </div>
)

const ClientDiv = props => (
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

describe('ClientOnly', () => {
  const wrapper = mount(<ClientOnlyWithChildren />)
  const rendered = render(<ClientOnlyWithChildren />)
  it('renders the root component on the client but not on the server', () => {
    const expectedClient = wrapper
      .find('.SSRSwitch')
      .exists()
    expect(expectedClient).toBe(true)
    const expectedServer = rendered
      .find('.SSRSwitch')
      .length
    expect(expectedServer).toBe(0)
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
      .length
    expect(expected).toBe(0)
  })
})

describe('ServerOnly', () => {
  const wrapper = mount(<ServerOnlyWithChildren />)
  const rendered = render(<ServerOnlyWithChildren />)
  it('renders the root component on the server but not on the client', () => {
    const expectedServer = rendered
      .find('.SSRSwitch')
      .length
    expect(expectedServer).toBe(1)
    const expectedClient = wrapper
      .find('.SSRSwitch')
      .exists()
    expect(expectedClient).toBe(false)
  })

  it('renders children on the server', () => {
    const expected = rendered
      .find('.render-on-server')
      .length
    expect(expected).toBe(1)
  })

  it('does not render children on the client', () => {
    const expected = wrapper
      .find('.render-on-server')
      .exists()
    expect(expected).toBe(false)
  })
})

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

describe('SSRSwitch with env set to client', () => {
  const clientWrapper = mount(
    <SSRSwitchWithClientEnv />
  )
  const serverRender = render(
    <SSRSwitchWithClientEnv />
  )
  it('renders children on the client when env is set to client', () => {
    const expectedCLient = clientWrapper
      .find('.render-on-client')
      .exists()
    expect(expectedCLient).toBe(true)
  })

  it('does not render children on the server when env is set to client', () => {
    const expectedServer = serverRender
      .find('.render-on-client')
      .length
    expect(expectedServer).toBe(0)
  })

  it('renders the alternative render on the server when env is set to client', () => {
    const expectedServer = serverRender
      .find('.render-on-server')
      .length
    expect(expectedServer).toBe(1)
  })

  it('does not render the alternative render on the client when env is set to client', () => {
    const expectedServer = clientWrapper
      .find('.render-on-server')
      .exists()
    expect(expectedServer).toBe(false)
  })
})

describe('SSRSwitch with env set to server', () => {
  const clientWrapper = mount(
    <SSRSwitchWithServerEnv />
  )
  const serverRender = render(
    <SSRSwitchWithServerEnv />
  )
  it('renders children on the client when env is set to server', () => {
    const expectedCLient = clientWrapper
      .find('.render-on-client')
      .exists()
    expect(expectedCLient).toBe(true)
  })

  it('does not render children on the server when env is set to server', () => {
    const expectedServer = serverRender
      .find('.render-on-client')
      .length
    expect(expectedServer).toBe(0)
  })

  it('renders the alternative render on the server when env is set to server', () => {
    const expectedServer = serverRender
      .find('.render-on-server')
      .length
    expect(expectedServer).toBe(1)
  })

  it('does not render the alternative render on the client when env is set to server', () => {
    const expectedServer = clientWrapper
      .find('.render-on-server')
      .exists()
    expect(expectedServer).toBe(false)
  })
})
