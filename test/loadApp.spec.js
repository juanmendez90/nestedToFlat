import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

import App from "../src/components/loadApp"

describe('Nested to flat', () => {
    it('should flat nested array', () => {
        const component = renderIntoDocument(
            <App />
        );
        const textField = findRenderedDOMComponentWithTag(component, 'input');
        const button = findRenderedDOMComponentWithTag(component, 'button');
        const entry = component.refs.entry;
        const result = component.refs.result;

        textField.value = '[[1,2,[3]],4]';
        Simulate.change(textField);
        Simulate.touchTap(button);

        expect(entry.innerHTML).to.equal('[[1,2,[3]],4]');
        expect(result.innerHTML).to.equal('[1,2,3,4]');

    });
});