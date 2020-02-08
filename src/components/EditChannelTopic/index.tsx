import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button, Form } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { updateChannelTopic } from 'store/channel/actions';
import { EditChannelTopicProps } from './types';
import './styles.scss';

const EditChannelTopic: React.FC<EditChannelTopicProps> = ({
  currentChannel,
  setOpenEditModal,
  updateChannelTopicAction,
  value,
}) => {
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
    updateChannelTopicAction(topic);
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

const mapStateToProps = (
  state: AppState
): Pick<AppState, 'currentChannel'> => ({
  currentChannel: state.currentChannel,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateChannelTopicAction: (topic: string) =>
    dispatch(updateChannelTopic(topic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditChannelTopic);
