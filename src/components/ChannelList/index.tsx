import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button, CreateChannelForm, Icon, Modal, Text } from 'components';
import { AppState } from 'store';
import { getCurrentChannelId, updateChannelTopic } from 'store/channel/actions';
import { Channel } from 'store/channels/types';
import getCurrentTeammateId from 'store/teammate/actions';
import { ChannelListProps } from './types';
import './styles.scss';

const ChannelList: React.FC<ChannelListProps> = ({
  currentChannel,
  channels,
  className = '',
  getCurrentChannelIdAction,
  getCurrentTeammateIdAction,
  updateChannelTopicAction,
}) => {
  const [createChannelFormIsOpen, setCreateChannelFormIsOpen] = useState<
    boolean
  >(false);
  let classesToAdd: string = 'channel-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveChannelId = (id: number, topic: string) => {
    // save current channel id to be used on page reload
    localStorage.setItem('currentChannelId', `${id}`);
    // dispatch action to change the store
    getCurrentChannelIdAction(id);
    // dispatch action to set current member id to 0
    // so it isn't active
    getCurrentTeammateIdAction(0);
    // save current channel topic to be used on page reload
    localStorage.setItem('currentChannelTopic', topic);
    // dispatch action to set the current channel topic
    updateChannelTopicAction(topic);
    // delete current teammate id from local storage too
    localStorage.removeItem('currentTeammateId');
  };

  return (
    <section className={classesToAdd}>
      <div className="channel-list__inner">
        <Text tag="span" size="sm">
          Channels
        </Text>
        <Button
          className="channel-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setCreateChannelFormIsOpen(true)}
          title="Create a new Channel"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
      <ul className="channel-list__list">
        {channels.list.map((c: Channel) => (
          <li
            key={c.id}
            className={`channel-list__item ${
              c.id === currentChannel.id ? `channel-list__item--active` : ``
            }`}
          >
            <Button
              type="button"
              color="transparent"
              onClick={() => saveChannelId(c.id, c.topic)}
            >
              <Icon
                type={c.private ? 'lock' : 'hash'}
                size="xm"
                color="white"
                className="channel-list__icon"
              />
              {c.name}
            </Button>
          </li>
        ))}
      </ul>
      {createChannelFormIsOpen && (
        <Modal
          header="Create a Channel"
          size="sm"
          onClose={() => setCreateChannelFormIsOpen(false)}
        >
          <CreateChannelForm
            createChannelFormIsOpen={setCreateChannelFormIsOpen}
          />
        </Modal>
      )}
    </section>
  );
};

const mapStateToProps = (
  state: AppState
): Pick<AppState, 'currentChannel' | 'channels'> => ({
  currentChannel: state.currentChannel,
  channels: state.channels,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCurrentChannelIdAction: (id: number) => dispatch(getCurrentChannelId(id)),
  getCurrentTeammateIdAction: (id: number) =>
    dispatch(getCurrentTeammateId(id)),
  updateChannelTopicAction: (topic: string) =>
    dispatch(updateChannelTopic(topic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
