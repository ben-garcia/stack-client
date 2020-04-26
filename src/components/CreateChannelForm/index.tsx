import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form, Text } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { getCurrentChannel } from 'store/channel';
import { addChannel } from 'store/channels';
import { clearDirectMessages } from 'store/directMessages';
import { addMember, clearMembers } from 'store/members';
import { clearMessages } from 'store/messages';
import { getCurrentTeammate } from 'store/teammate';
import { Teammate } from 'store/teammates';
import { Channel, ChannelErrors, CreateChannelFormProps } from './types';
import './styles.scss';

const CreateChannelForm: React.FC<CreateChannelFormProps> = ({
  createChannelFormIsOpen,
}) => {
  const dispatch: Dispatch = useDispatch();
  const {
    currentTeammate,
    currentWorkspace,
    directMessages,
    messages,
    teammates,
    user,
  } = useSelector((state: AppState) => ({
    currentTeammate: state.currentTeammate,
    currentWorkspace: state.currentWorkspace,
    directMessages: state.directMessages.list,
    messages: state.messages.list,
    teammates: state.teammates.list,
    user: state.user,
  }));
  const [channel, setChannel] = useState<Channel>({
    name: '',
    description: '',
    private: false,
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
    if (e.target.name === 'private') {
      setChannel({
        ...channel,
        private: e.target.checked,
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
      currentWorkspace.id !== 0
    ) {
      try {
        // data to send to the server in the request object
        const data: any = {
          channel: {
            ...channel,
            workspace: currentWorkspace.id,
          },
          userId: user.id,
        };

        // make sure that there is at least one teammate
        // and channel is set to public
        if (teammates.length > 0 && !channel.private) {
          data.channel.members = teammates.map((t: Teammate) => t.username);
        }

        const {
          data: { channel: newChannel },
        } = await sendRequest({
          method: 'POST',
          url: '/channels',
          data,
        });

        // dispatch action to remove all current members
        dispatch(clearMembers());
        // dispatch action to add newly created channel to the store.
        dispatch(addChannel(newChannel));
        // store the newly created channel in local storage
        localStorage.setItem('currentChannel', JSON.stringify(newChannel));
        // dispatch action to change the current channel in the store
        dispatch(getCurrentChannel(newChannel));
        // dispatch action to clear all channel messages(if needed)
        if (messages.length !== 0) {
          dispatch(clearMessages());
        }
        // dispatch action to clear all direct messages(if needed)
        if (directMessages.length !== 0) {
          dispatch(clearDirectMessages());
        }
        // clear current teammate
        if (currentTeammate.id) {
          localStorage.removeItem('currentTeammate');
          // clear the current teammate to
          dispatch(
            getCurrentTeammate({
              id: 0,
              username: '',
            })
          );
        }
        // dispatch action to add workspace teammates as channel's members
        if (data.channel.members && data.channel.members.length > 0) {
          data.channel.members.forEach((t: Teammate) => {
            dispatch(addMember(t));
          });
        }
        // close the create channel modal
        createChannelFormIsOpen(false);
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
            inputId="private"
            label="Make Private"
            value={`${channel.private}`}
          />
        </Form.Group>
        <Text className="create-channel__message">
          When a channel is set to private, it can only be viewed or joined by
          invitation.
        </Text>
        <Text className="create-channel__message">
          When a channel is set to public, ALL teammates will be added as
          members of the channel.
        </Text>
        <Button type="submit" disabled={disableButton}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateChannelForm;
