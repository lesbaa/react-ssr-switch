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

const ClientOnlyWithChildren = () => (
  <div className="wrapper">
    <ClientOnly>
      <div className="render-on-client" />
    </ClientOnly>
  </div>
)

const ServerOnlyWithChildren = () => (
  <div className="wrapper">
    <ServerOnly>
      <div className="render-on-server" />
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

describe('SSRSwitch with env set to client', () => {
  const SSRSwitchOnClient = () => (
    <SSRSwitch
      env="client"
      alternateRender={<div className="alternate-render" />}
    >
      <div className="child" />
    </SSRSwitch>
  )

  const clientWrapper = mount(
    <SSRSwitchOnClient />
  )

  const serverRender = render(
    <SSRSwitchOnClient />
  )

  it('renders children on the client when env is set to client', () => {
    const expectedCLient = clientWrapper
      .find('.child')
      .exists()
    expect(expectedCLient).toBe(true)
  })

  it('does not render children on the server when env is set to client', () => {
    const expectedServer = serverRender
      .find('.child')
      .length
    expect(expectedServer).toBe(0)
  })

  it('renders the alternative render on the server when env is set to client', () => {
    const expectedServer = serverRender
      .find('.alternate-render')
      .length
    expect(expectedServer).toBe(1)
  })

  it('does not render the alternative render on the client when env is set to client', () => {
    const expectedServer = clientWrapper
      .find('.alternate-render')
      .exists()
    expect(expectedServer).toBe(false)
  })
})

describe('SSRSwitch with env set to server', () => {
  const SSRSwitchOnServer = () => (
    <SSRSwitch
      env="server"
      alternateRender={<div className="alternate-render" />}
    >
      <div className="child" />
    </SSRSwitch>
  )

  const clientWrapper = mount(
    <SSRSwitchOnServer />
  )

  const serverRender = render(
    <SSRSwitchOnServer />
  )

  it('renders children on the server when env is set to server', () => {
    const expectedServer = serverRender
      .find('.child')
      .length
    expect(expectedServer).toBe(1)
  })

  it('does not render children on the client when env is set to server', () => {
    const expectedCLient = clientWrapper
      .find('.child')
      .exists()
    expect(expectedCLient).toBe(false)
  })

  it('does not render the alternative render on the server when env is set to server', () => {
    const expectedServer = serverRender
      .find('.alternate-render')
      .length
    expect(expectedServer).toBe(0)
  })

  it('renders the alternative render on the client when env is set to server', () => {
    const expectedServer = clientWrapper
      .find('.alternate-render')
      .exists()
    expect(expectedServer).toBe(true)
  })
})
