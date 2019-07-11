import React from 'react';
import {
  expect
} from 'chai';
import TestUtils from 'react-dom/test-utils';
import MovieBody from '../assets/javascripts/components/_movie_body.js.jsx';

describe('DOM Rendering', function () {
  it('Render dom and enter a new review', function () {
    let randomId = Math.random() * 100000;
    let props = {
      movie_id: randomId
    };
    const app = React.createElement(MovieBody, props);
    let reviewsTotal = TestUtils.scryRenderedDOMComponentsWithTag(app, 'tr').length;

    let emailField = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input[type="email"]')[0];
    let ratingField = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input[type="number"]')[0];
    let commentField = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input[type="text"]')[0];
    let submitButton = TestUtils.scryRenderedDOMComponentsWithTag(app, 'button')[0];

    emailField.value = "me@seanhofer.com";
    TestUtils.Simulate.change(emailField);
    ratingField.value = 3;
    TestUtils.Simulate.change(ratingField);
    commentField.value = "test";
    TestUtils.Simulate.change(commentField);

    TestUtils.Simulate.click(submitButton);

    let reviewsTotalAfterClick = TestUtils.scryRenderedDOMComponentsWithTag(app, 'tr').length;
    expect(reviewsTotalAfterClick).to.equal(reviewsTotal + 1);
  });
});