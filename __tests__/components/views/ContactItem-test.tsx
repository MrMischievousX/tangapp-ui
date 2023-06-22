/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import ContactItem from '../../../src/components/views/ContactItem';
import {
  multiNumberContact,
  noDisplayNameContact,
  singleNumberContact,
} from '../../../src/constants/helper';

const singleNumberProp = {
  contact: singleNumberContact,
  navigateFnc: jest.fn(),
};

const multiNumberProp = {
  contact: multiNumberContact,
  navigateFnc: jest.fn(),
};

const noDisplayNameProp = {
  contact: noDisplayNameContact,
  navigateFnc: jest.fn(),
};

const queryText = (root: renderer.ReactTestInstance, text: string) => {
  return root.findAll(
    node =>
      node.children.length === 1 &&
      typeof node.children[0] === 'string' &&
      node.children[0] === text,
    {deep: true},
  );
};

describe('Testing ContactItem Component with single number', () => {
  it('Should render ContactItem', () => {
    renderer.create(<ContactItem {...singleNumberProp} />);
  });

  it('Should return null when phone number not present', () => {
    const root = renderer.create(
      <ContactItem
        {...singleNumberProp}
        contact={{...singleNumberContact, phoneNumbers: []}}
      />,
    );

    expect(root.toJSON()).toBeNull();
  });

  it('Should call navigate function with correct parameters', () => {
    const root = renderer.create(<ContactItem {...singleNumberProp} />).root;
    const btn = root.findByProps({testID: 'contactItem'}).props;
    act(() => btn.onPress());
    expect(singleNumberProp.navigateFnc).toHaveBeenCalledTimes(1);
    expect(singleNumberProp.navigateFnc).toHaveBeenCalledWith(
      singleNumberProp.contact.phoneNumbers[0].number,
    );
  });

  it('Should not open more option view', () => {
    const root = renderer.create(<ContactItem {...singleNumberProp} />).root;
    const btn = root.findByProps({testID: 'contactItem'}).props;
    act(() => btn.onPress());
    const moreOptionView = root.findAllByProps({
      testID: 'contactItemOption',
    });
    expect(moreOptionView.length).toEqual(0);
  });

  it('Should not show image for empty thumbnail', () => {
    const root = renderer.create(<ContactItem {...singleNumberProp} />).root;
    const image = root.findAllByProps({testID: 'contactItemImage'});
    expect(image.length).toEqual(0);
  });

  it('Should contain only one number', () => {
    const root = renderer.create(<ContactItem {...singleNumberProp} />).root;
    const numberList = root.findByProps({testID: 'contactItemNumber'}).props;
    expect(numberList.children.length).toEqual(1);
  });

  it('Should not contain display name', () => {
    const root = renderer.create(<ContactItem {...singleNumberProp} />).root;
    expect(
      queryText(
        root,
        `${singleNumberProp.contact?.givenName} ${singleNumberProp.contact?.familyName}`,
      ),
    ).toHaveLength(1);
  });

  it('Should display initials if thumbnail not present of given name', () => {
    const root = renderer.create(<ContactItem {...singleNumberProp} />).root;
    const initial = root.findByProps({testID: 'contactItemImageChar'}).props;
    expect(initial.children).toEqual(singleNumberProp.contact?.givenName[0]);
  });
});

describe('Testing ContactItem Component with multi number', () => {
  it('Should render ContactItem', () => {
    renderer.create(<ContactItem {...multiNumberProp} />);
  });

  it('Should not call navigate function directly', () => {
    const root = renderer.create(<ContactItem {...multiNumberProp} />).root;
    const btn = root.findByProps({testID: 'contactItem'}).props;

    act(() => btn.onPress());
    expect(singleNumberProp.navigateFnc).not.toHaveBeenCalled();
  });

  it('Should open more option view', () => {
    const root = renderer.create(<ContactItem {...multiNumberProp} />).root;
    const btn = root.findByProps({testID: 'contactItem'}).props;

    act(() => btn.onPress());
    const moreOptionView = root.findByProps({
      testID: 'contactItemOption',
    });
    expect(moreOptionView).toBeTruthy();
  });

  it('Should call navigate function with correct parameters', () => {
    const root = renderer.create(<ContactItem {...multiNumberProp} />).root;
    const btn = root.findByProps({testID: 'contactItem'}).props;

    act(() => btn.onPress());
    const moreOptionView = root.findByProps({
      testID: 'contactItemOption',
    });
    expect(moreOptionView).toBeTruthy();

    const optionBtn = root.findByProps({
      testID: 'optionBtn0',
    }).props;
    act(() => optionBtn.onPress());
    expect(multiNumberProp.navigateFnc).toHaveBeenCalledTimes(1);
    expect(multiNumberProp.navigateFnc).toHaveBeenCalledWith(
      singleNumberProp.contact.phoneNumbers[0].number,
    );
  });

  it('Should contain two number', () => {
    const root = renderer.create(<ContactItem {...multiNumberProp} />).root;
    const numberList = root.findByProps({testID: 'contactItemNumber'}).props;
    expect(numberList.children.length).toEqual(
      multiNumberProp.contact.phoneNumbers.length,
    );
  });

  it('Should display initials if thumbnail not present for display name', () => {
    const root = renderer.create(<ContactItem {...noDisplayNameProp} />).root;
    const initial = root.findByProps({testID: 'contactItemImageChar'}).props;
    expect(initial.children).toEqual(noDisplayNameProp.contact?.displayName[0]);
  });
});
