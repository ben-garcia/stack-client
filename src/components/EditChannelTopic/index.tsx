import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, Form } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { updateChannelTopic } from 'store/channel/actions';
import { EditChannelTopicProps } from './types';
import './styles.scss';

const EditChannelTopic: React.FC<EditChannelTopicProps> = ({
  setOpenEditModal,
  value,
}) => {
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

    // save the channel topic to local storage
    localStorage.setItem('currentChannelTopic', topic);
    // dispatch action to update the current channel topic
    dispatch(updateChannelTopic(topic));
    // close the modal
    setOpenEditModal(false);
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
