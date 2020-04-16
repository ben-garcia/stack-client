import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Icon, Text } from 'components';
import { AppState } from 'store';
import { closeChannelDetails } from 'store/channelDetails';
import { openInvitePeopleModal } from 'store/invitePeopleModal';
import './styles.scss';

const ChannelDetails = () => {
  const dispatch = useDispatch();
  const { currentChannel, members } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    members: state.members.list,
  }));

  return (
    <section className="channel-details">
      <div className="channel-details__inner">
        <div className="channel-details__container">
          <Text className="channel-details__text" tag="span" size="sm">
            Details
          </Text>
          <Text className="channel-details__channel-name" tag="span" size="xm">
            {`# ${currentChannel.name}`}
          </Text>
        </div>
        <Button
          className="channel-details__close-button"
          color="transparent"
          onClick={() => dispatch(closeChannelDetails())}
          type="button"
        >
          <Icon type="times" size="sm" />
        </Button>
      </div>
      <div className="channel-details__inner-two">
        <Button
          className="channel-details__add-people-button"
          color="transparent"
          onClick={() => dispatch(openInvitePeopleModal())}
          type="button"
          title={`Add people to #${currentChannel.name}`}
        >
          <Icon className="channel-details__user-icon" size="sm" type="user" />
          <Text size="xm" tag="span">
            Add
          </Text>
        </Button>
      </div>
      <div className="channel-details__about">
        <Text size="sm" tag="span">
          About
        </Text>
        <Icon
          className="channel-details__icon-chevron-right"
          size="xm"
          type="chevron-right"
        />
      </div>
      <div className="channel-details__members">
        <Text size="sm" tag="span">
          Members
        </Text>
        <div className="channel-details__inner-three">
          <Text className="channel-details__member-count" size="xm" tag="span">
            {members.length}
          </Text>
          <Icon
            className="channel-details__icon-chevron-right"
            size="xm"
            type="chevron-right"
          />
        </div>
      </div>
    </section>
  );
};

export default ChannelDetails;
