import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form } from 'components';
import { sendRequest } from 'api';
import { AppState } from 'store';
import { updateChannelDescription } from 'store/channel';
import { closeEditChannelDescriptionModal } from 'store/editChannelDescriptionModal';
import { EditChannelDescriptionProps } from './types';
import './styles.scss';

const EditChannelDescription: React.FC<EditChannelDescriptionProps> = ({
  value,
}) => {
  const dispatch: Dispatch = useDispatch();
  const { currentChannel, user } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    user: state.user,
  }));
  const [description, setDescription] = useState<string>(value || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // check for testing accounts
      if (user.username === 'stackguest' || user.username === 'stacktestuser') {
        // dispatch action to update the current channel topic
        dispatch(updateChannelDescription(description));
        // close the modal
        dispatch(closeEditChannelDescriptionModal());
      } else {
        await sendRequest({
          method: 'PUT',
          url: `/channels/${currentChannel.id}`,
          data: { description },
        });

        // get the current channel from local storage and update topic
        const channelFromLocalStorage = localStorage.getItem('currentChannel');
        const parsedChannel = JSON.parse(channelFromLocalStorage!);
        parsedChannel.description = description;

        // save the current channel with the updated topic to local storage
        localStorage.setItem('currentChannel', JSON.stringify(parsedChannel));

        // dispatch action to update the current channel topic
        dispatch(updateChannelDescription(description));
        // close the modal
        dispatch(closeEditChannelDescriptionModal());
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log('EditChannelDescription error: ', { err });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        className="form__textarea"
        onChange={handleChange}
        value={description}
      />
      <Button type="submit">Update description</Button>
    </Form>
  );
};

export default EditChannelDescription;
