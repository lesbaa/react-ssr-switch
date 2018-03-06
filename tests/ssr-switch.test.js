import React from 'react'
import Adapter from 'enzyme-adapter-react-15'
import {
  mount,
  render,
} from 'enzyme'
import SSRSwitch, {
  ClientOnly,
  ServerOnly,
} from '../src'

Enzyme.configure({ adapter: new Adapter() })

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
  <ClientOnly>
    <ClientDiv />
  </ClientOnly>
)

const ServerOnlyWithChildren = () => (
  <ServerOnly>
    <ServerDiv />
  </ServerOnly>
)

const SSRSwitchWithClientEnv = () => (
  <SSRSwitch
    env="client"
    alternateRender={<ServerDiv />}
  >
    <ClientDiv />
  </SSRSwitch>
)

const SSRSwitchWithServerEnv = () => (
  <SSRSwitch
    env="server"
    alternateRender={<ClientDiv />}
  >
    <ServerDiv />
  </SSRSwitch>
)

describe('ClientOnly', () => {
  const wrapper = mount(<ClientOnlyWithChildren />)
  it('renders the root component', () => {
    const expected = wrapper
      .find('.SSRSwitch')
      .exists()
    expect(expected).toBe(true)
  })

  it('renders children on the client', () => {
    
  })

  it('does not render children on the server', () => {

  })
})