import React, { Component } from 'react';

import policy from '../assets/fake-data/policy';

export default class Policy extends Component {
  render() {
    return <div className='policy-container'>
      <div className="policy row">
        {policy.map((item, index) => (
          <div className="col-lg-3 col-sm-6 col-12" key={index}>
            <div
              className='policy-item'
              key={index}
            >
              <div className="policy-item-left">
                <i className={item.icon} ></i>
              </div>
              <div className="policy-item-right">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>;
  }
}
