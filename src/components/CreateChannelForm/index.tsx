import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form, Text } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { addChannel } from 'store/channels/actions';
import { Channel as StoreChannel } from 'store/channels/types';
import { Channel, ChannelErrors, CreateChannelFormProps } from './types';
import './styles.scss';

const CreateChannelForm: React.FC<CreateChannelFormProps> = ({
  currentWorkspaceId,
  addChannelAction,
}) => {
  const [channel, setChannel] = useState<Channel>({
    name: '',
    description: '',
    public: true,
  });
  const [errors, setErrors] = useState<ChannelErrors>({
    name: '',
    description: '',
  });
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setErrors({
        ...errors,
        [e.target.name]: 'required',
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the event referes to the checkbox
    if (e.target.name === 'public') {
      setChannel({
        ...channel,
        public: e.target.checked,
      });
      // no need to continue
      return;
    }

    // if no errors and channel name, description are not empty then enable submit button
    if (
      errors.description === '' &&
      errors.name === '' &&
      channel.name !== '' &&
      channel.description !== ''
    ) {
      setDisableButton(false);
    }

    if (e.target.value === '') {
      setErrors({
        ...errors,
        [e.target.name]: 'required',
      });
    } else {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }

    setChannel({
      ...channel,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //  make sure there are no errors and that current workspace id is
    // set before sending the request.
    if (
      errors.name === '' &&
      errors.description === '' &&
      currentWorkspaceId !== 0
    ) {
      try {
        const {
          data: { channel: newChannel },
        } = await sendRequest({
          method: 'POST',
          url: '/channels',
          data: {
            ...channel,
            workspace: currentWorkspaceId,
          },
        });

        // dispatch action to add newly created channel to the store.
        addChannelAction(newChannel);
      } catch (err) {
        // eslint-disable-next-line
        console.log('handleSubmit error: ', err);
      }
    }
  };

  return (
    <div className="create-channel">
      <Text className="create-channel__sub-header">
        Channels are where your team communicates. They’re best when organized
        around a topic — #marketing, for example.
      </Text>
      <Form onSubmit={handleSubmit}>
        <Form.Group flexDirection="column">
          <Form.Input
            onBlur={handleBlur}
            onChange={handleChange}
            inputId="name"
            type="text"
            label="Name"
            value={channel.name}
            error={errors.name}
          />
          <Form.Input
            onBlur={handleBlur}
            onChange={handleChange}
            inputId="description"
            type="text"
            label="Description"
            value={channel.description}
            error={errors.description}
          />
          <Form.Checkbox
            onChange={handleChange}
            inputId="public"
            label="Make Private"
            value={`${channel.public}`}
          />
        </Form.Group>
        <Text className="create-channel__message">
          When a channel is set to private, it can only be viewed or joined by
          invitation.
        </Text>
        <Button type="submit" disabled={disableButton}>
          Create
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentWorkspaceId: state.currentWorkspaceId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addChannelAction: (channel: StoreChannel) => dispatch(addChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelForm);
