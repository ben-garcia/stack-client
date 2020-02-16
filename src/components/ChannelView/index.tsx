import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Icon, Text } from 'components';
import { AppState } from 'store';
import { ChannelViewProps } from './types';
import './styles.scss';

const ChannelView: React.FC<ChannelViewProps> = ({ className = '' }) => {
  const { channel } = useSelector((state: AppState) => ({
    channel: state.currentChannel,
  }));
  let classesToAdd: string = 'channel-view';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <main className={classesToAdd}>
      <h1 className="channel-view__inner">
        <Icon className="channel-view__hash-icon" type="hash" size="xm" />
        <Text className="channel-view__name" tag="span">
          {channel.name}
        </Text>
      </h1>
      <div className="channel-view__inner">
        <Text tag="span" size="sm">
          You created this channel on
        </Text>
        <Text className="channel-view__created-at" tag="span" size="sm">
          {channel.createdAt}
        </Text>
        <Text tag="span" size="sm">
          This is the very beginning of the
        </Text>
        <strong className="channel-view__inner-two">
          <Icon type="hash" size="sm" />
          <Text tag="span">{channel.name}</Text>
        </strong>
        {channel.description && (
          <div className="channel-view__inner-three">
            <Text tag="span" size="sm">
              Description:
            </Text>
            <Text className="channel-view__description" tag="span">
              {channel.description}
            </Text>
            <Text tag="span">
              (
              <Button
                className="channel-view__edit-button"
                type="button"
                color="transparent"
                title="Edit Channel Description"
              >
                <Text tag="span" size="sm">
                  edit
                </Text>
              </Button>
              )
            </Text>
          </div>
        )}
        <div className="channel-view__inner-four">
          <Icon type="user" size="xm" />
          <Button
            className="channel-view__user-icon"
            type="button"
            color="transparent"
          >
            <Text tag="span" size="xm">
              Add people
            </Text>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ChannelView;
