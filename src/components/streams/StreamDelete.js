import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';


class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    const id = this.props.match.params.id;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">Cancel</Link>
      </Fragment>
    )
  }

  renderContent() {
    let content = 'Are you sure you want to delete this stream? ' 
    if(this.props.stream) {
      content += this.props.stream.title
    }
    return content
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={
          this.renderContent()
        }
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);