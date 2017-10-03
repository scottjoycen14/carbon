import React from 'react'
import Checkmark from './svg/Checkmark'
import { COLORS } from '../lib/constants'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isVisible: false,
      selected: props.selected || props.list[0]
    }
    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  select(item) {
    if (this.state.selected !== item) {
      this.props.onChange(item.id)
      this.setState({ selected: item })
    }
  }

  toggle() {
    this.setState({ isVisible: !this.state.isVisible })
  }

  renderListItems() {
    return this.props.list.map((item, i) => (
      <div className="expandable-list-list-item" key={i} onClick={this.select.bind(null, item)}>
        <span style={{ fontFamily: item.id }}>{item.name}</span>
        {this.state.selected === item ? <Checkmark /> : null}
        <style jsx>{`
          .expandable-list-list-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            user-select: none;
            padding: 8px 16px;
            border-bottom: 0.5px solid ${COLORS.SECONDARY};
          }

          .expandable-list-list-item:first-of-type {
            border-top: 0.5px solid ${COLORS.SECONDARY};
          }

          .expandable-list-list-item:last-of-type {
            border-bottom: none;
          }
        `}</style>
      </div>
    ))
  }

  render() {
    return (
      <div className="expandable-list-container">
        <div className={`expandable-list-display ${this.state.isVisible ? 'is-visible' : ''}`} onClick={this.toggle}>
          <span className="label">{this.props.label}</span>
          <span style={{ fontFamily: this.state.selected.id }}>{this.state.selected.name}</span>
        </div>
        <div className="expandable-list-list">{this.renderListItems()}</div>
        <style jsx>{`
          .expandable-list-display {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            user-select: none;
            padding: 8px;
          }

          .expandable-list-list {
            display: none;
            margin-top: -1px;
            max-height: 80px;
            overflow-y: scroll;
          }

          .is-visible + .expandable-list-list {
            display: block;
          }
        `}</style>
      </div>
    )
  }
}
