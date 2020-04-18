import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, CreateChannelForm, Icon, List, Modal, Text } from 'components';
import { AppState } from 'store';
import { getCurrentChannel } from 'store/channel';
import { Channel } from 'store/channels';
import { clearDirectMessages } from 'store/directMessages';
import { requestChannelMembers } from 'store/members';
import { requestChannelMessages } from 'store/messages';
import { getCurrentTeammate } from 'store/teammate';
import { ChannelListProps } from './types';
import './styles.scss';

const ChannelList: React.FC<ChannelListProps> = ({ className = '' }) => {
  const dispatch: Dispatch = useDispatch();
  const { currentChannel, channels } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    channels: state.channels,
  }));
  const [createChannelFormIsOpen, setCreateChannelFormIsOpen] = useState<
    boolean
  >(false);
  let classesToAdd: string = 'channel-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveChannel = (channel: Channel) => {
    // make sure it's not calling the function with the current channel
    if (currentChannel.id === channel.id) return;
    // save current channel id to be used on page reload
    localStorage.setItem('currentChannel', JSON.stringify(channel));
    // dispatch action to change the store
    dispatch(getCurrentChannel(channel));
    // dispatch action to set current member id to 0
    // so it isn't active
    dispatch(getCurrentTeammate({ id: 0, username: '' }));
    // delete current teammate from local storage too
    localStorage.removeItem('currentTeammate');
    // dispatch action to get all current channel's members
    dispatch(requestChannelMembers());
    // dispatch action to get all current channel's messages
    dispatch(requestChannelMessages());
    // dispatch action to clear direct messages
    dispatch(clearDirectMessages());
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
      <List>
        {channels.list.map((c: Channel) => (
          <List.Item key={c.id} active={c.id === currentChannel.id}>
            <Button
              className="channel-list__button"
              color="transparent"
              onClick={() => saveChannel(c)}
              title={`${c.name}`}
              type="button"
            >
              <Icon
                className="channel-list__icon"
                color="white"
                type={c.private ? 'lock' : 'hash'}
                size="xm"
              />
              <Text className="channel-list__name" tag="span" size="sm">
                {c.name}
              </Text>
            </Button>
          </List.Item>
        ))}
      </List>
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

export default ChannelList;
