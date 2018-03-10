import React from 'react'

class SSRSwitch extends React.PureComponent {
  state = {
    shouldRender: this.props.env === 'server',
  }

  componentDidMount() {
    this.setState({ shouldRender: this.props.env === 'client' })
  }

  render() {
    const {
      children,
      alternateRender,
    } = this.props

    const { shouldRender } = this.state
    return shouldRender
      ? (
        <span
          className="SSRSwitch"
        >
          {children}
        </span>
      )
      : alternateRender
  }
}

SSRSwitch.defaultProps = {
  alternateRender: null,
  env: 'client',
}

export default SSRSwitch
