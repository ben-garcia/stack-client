import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, CreateChannelForm, Icon, Modal, Text } from 'components';
import useRovingTabIndex from 'hooks/useRovingTabIndex';
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
    channels: state.channels.list,
  }));

  const { buttonRefs, focusedIndex, handleKeyDown } = useRovingTabIndex(
    channels,
    currentChannel as Channel
  );
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
    // Set current member id to 0
    // so it isn't active
    dispatch(getCurrentTeammate({ id: 0, username: '' }));
    // delete current teammate from local storage too
    localStorage.removeItem('currentTeammate');
    // Get all current channel's members
    dispatch(requestChannelMembers());
    // Get all current channel's messages
    dispatch(requestChannelMessages());
    // Clear direct messages
    dispatch(clearDirectMessages());
  };

  return (
    <section aria-labelledby="channels-heading" className={classesToAdd}>
      <div className="channel-list__inner">
        <h2 id="channels-heading" className="channel-list__header">
          Channels
        </h2>

        <Button
          ariaLabel="Create a new Channel"
          className="channel-list__add-button"
          color="transparent"
          onClick={() => setCreateChannelFormIsOpen(true)}
          title="Create a new Channel"
          type="button"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>

      <div
        aria-describedby="channel-heading"
        aria-orientation="vertical"
        role="listbox"
        style={{ padding: '0.3rem' }}
      >
        {channels.map((c, i) => (
          <Button
            ariaLabel={`${c.name}, ${c.private ? 'private' : 'public'} channel`}
            ariaSelected={c.id === currentChannel.id}
            className="channel-list__button"
            color="transparent"
            key={c.id}
            onClick={() => saveChannel(c)}
            onKeyDown={e => handleKeyDown(e, i)}
            ref={(el: HTMLButtonElement | null) => {
              buttonRefs.current[i] = el;
            }}
            role="option"
            tabIndex={focusedIndex === i ? 0 : -1}
            title={`${c.name}, ${c.private ? 'private' : 'public'} channel`}
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
        ))}
      </div>

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
