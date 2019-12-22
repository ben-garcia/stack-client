import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Form from '../../Form';
import FormGroup from '../../Form/FormGroup';
import FormInput from '../../Form/FormInput';

describe('Form Integration', () => {
  it('should render FormGroup', () => {
    const wrapper: ReactWrapper = mount(
      <Form>
        <FormGroup>
          <FormInput inputId="testing" label="this is a label" type="text" />
        </FormGroup>
      </Form>
    );

    expect(wrapper.find('FormGroup').length).toBe(1);
    expect(wrapper.find('fieldset').length).toBe(1);
  });
});
