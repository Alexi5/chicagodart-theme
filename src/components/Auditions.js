import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPages } from '../reducers/pages';
// components
import Sidebar from './Sidebar';

class Auditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: false,
    };
  }

  convertHeaders(header) {
    return header.split('_')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
  }

  toggleVideoButton() {
    this.setState({ video: !this.state.video });
  }

  render() {
    return (
      <div>

        <div className="hero-img">
          <img src="http://www.arshtcenter.org/Global/PressRoom/photos/hi/Spring%20Awakening%20photo%20by%20Paul%20Kolnick.jpg" alt="A scene from Spring Awakening" height="100%" width="100%" />
        </div>

        <div className="clearfix content-sidebar-container">
          <div className="col col-8">
            <h2>Upcoming Auditions</h2>
            <div>
              {this.props.pages &&
                Object.keys(this.props.page.acf).map((header, i) => {
                  if (header[0] !== '_') {
                    return (
                      <div key={i}>
                        <h2>{this.convertHeaders(header)}</h2><a name={header} />
                        <div dangerouslySetInnerHTML={{ __html: this.state.video ? this.props.page.acf[header] : this.props.page.acf[header].slice(0, this.props.page.acf[header].indexOf('iframe') - 1) }}/>
                      </div>
                    );
                  }
                }
                )}
            </div>
          </div>

          <div className="col col-4 center fixed-sidebar">
            <div >
              <Sidebar listItems={this.props.page.acf} />
              <button id="toggle-video" onClick={this.toggleVideoButton.bind(this)}>{this.state.video ? 'Hide Video' : 'Show Video'}</button>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
const mapStateToProps = ({ pages }) => ({ pages });

const mapDispatchToProps = {
  loadPages
};

export default connect(mapStateToProps, mapDispatchToProps)(Auditions);
