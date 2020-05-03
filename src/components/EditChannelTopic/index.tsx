import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form } from 'components';
import { sendRequest } from 'api';
import { AppState } from 'store';
import { updateChannelTopic } from 'store/channel';
import { closeEditChannelTopicModal } from 'store/editChannelTopicModal';
import { EditChannelTopicProps } from './types';
import './styles.scss';

const EditChannelTopic: React.FC<EditChannelTopicProps> = ({ value }) => {
  const dispatch: Dispatch = useDispatch();
  const { currentChannel } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
  }));
  const [topic, setTopic] = useState<string>(value || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendRequest({
      method: 'PUT',
      url: `/channels/${currentChannel.id}`,
      data: { topic },
    });

    // get the current channel from local storage and update topic
    const channelFromLocalStorage = localStorage.getItem('currentChannel');
    const parsedChannel = JSON.parse(channelFromLocalStorage!);
    parsedChannel.topic = topic;

    // save the current channel with the updated topic to local storage
    localStorage.setItem('currentChannel', JSON.stringify(parsedChannel));

    // dispatch action to update the current channel topic
    dispatch(updateChannelTopic(topic));
    // close the modal
    dispatch(closeEditChannelTopicModal());
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        className="form__textarea"
        onChange={handleChange}
        value={topic}
      />
      <Button type="submit">Set topic</Button>
    </Form>
  );
};

export default EditChannelTopic;
