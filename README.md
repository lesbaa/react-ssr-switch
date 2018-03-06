React SSRSwitch
===============

A react component for selective rendering of content on either the client or the server and avoids all those annoying checksum errors

### Install

`npm install --save-exact react-ssr-switch`

### Example usage

```js
  import React from 'react'
  import {
    ClientOnly,
    ServerOnly,
  }, SSRSwitch from 'react-ssr-switch'

  const YourComponent = (props) => (
    <div className="YourComponent">
      <div>Client only stuff:</div>
      <ClientOnly>
        <span>This code will only be rendered when the component is mounted on the client</span>
      </ClientOnly>
      <div>Server only stuff:</div>
      <ServerOnly>
        <span>This code will be rendered on the server only</span>
      </ServerOnly>
      <div>Switchy stuff:</div>
      <SSRSwitch
        env="client"
        alternateRender={() => <div>I am rendered on the server!</div>}
      >
        <div>I am rendered on the client!</div>
      </SSRSwitch>
      <div>More switchy stuff:</div>
      <SSRSwitch
        env="server"
        alternateRender={() => <div>I am rendered on the client!</div>}
      >
        <div>I am rendered on the server!</div>
      </SSRSwitch>
    </div>
  )

```