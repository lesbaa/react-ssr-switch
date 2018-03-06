import SSRSwitch from './ssr-switch'

const ClientOnly = props => <SSRSwitch env="client" {...props} />
const ServerOnly = props => <SSRSwitch env="server" {...props} />

export default SSRSwitch
export {
  ClientOnly,
  ServerOnly,
}
