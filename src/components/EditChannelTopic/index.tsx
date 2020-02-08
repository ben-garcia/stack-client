import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, Form } from 'components';
import sendRequest from 'api';
import { AppState } from 'store';
import { EditChannelTopicProps } from './types';
import './styles.scss';

const EditChannelTopic: React.FC<EditChannelTopicProps> = ({
  currentChannelId,
  setOpenEditModal,
  value,
}) => {
  const [topic, setTopic] = useState<string>(value || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await sendRequest({
      method: 'PUT',
      url: `/channels/${currentChannelId}`,
      data: { topic },
    });

    setOpenEditModal(false);

    // eslint-disable-next-line
    console.log(response);
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
): Pick<AppState, 'currentChannelId'> => ({
  currentChannelId: state.currentChannelId,
});

export default connect(mapStateToProps)(EditChannelTopic);
