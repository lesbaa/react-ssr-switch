import React from 'react'
import SSRSwitch from './ssr-switch'

export const ClientOnly = props => <SSRSwitch env="client" {...props} />
export const ServerOnly = props => <SSRSwitch env="server" {...props} />

export default SSRSwitch

