import React from 'react'
import {
  mount,
  render,
} from 'enzyme'

import {
  ClientOnly,
  ServerOnly,
} from '../src/index'

// const ServerDiv = (props) => (
//   <div className="render-on-server">
//     Server Render
//   </div>
// )

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

// const ServerOnlyWithChildren = () => (
//   <ServerOnly>
//     <ServerDiv />
//   </ServerOnly>
// )

// const SSRSwitchWithClientEnv = () => (
//   <SSRSwitch
//     env="client"
//     alternateRender={<ServerDiv />}
//   >
//     <ClientDiv />
//   </SSRSwitch>
// )

// const SSRSwitchWithServerEnv = () => (
//   <SSRSwitch
//     env="server"
//     alternateRender={<ClientDiv />}
//   >
//     <ServerDiv />
//   </SSRSwitch>
// )

const Test = props => <div className="bo"/>

describe('ClientOnly', () => {
  const wrapper = mount(<Test />)
  it('renders the root component', () => {
    const expected = wrapper
      .find('.bo')
      .exists()
    expect(expected).toBe(true)
  })

  it('renders children on the client', () => {
    
  })

  it('does not render children on the server', () => {

  })
})