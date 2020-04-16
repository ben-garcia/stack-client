import React from 'react';

import { Button, Icon, Text } from 'components';

const ChannelDetails = () => {
  return (
    <section className="channel-details">
      <div className="channel-details__inner">
        <div>
          <Text className="channel-details__text" tag="span" size="sm">
            Details
          </Text>
          <Text className="channel-details__channel-name" tag="span" size="sm">
            #channelname
          </Text>
        </div>
        <Button
          className="channel-details__close-button"
          type="button"
          color="transparent"
        >
          <Icon type="times" />
        </Button>
      </div>
      <div className="channel-details__inner">
        <Button type="button" color="transparent">
          <Icon type="user" size="sm" />
        </Button>
      </div>
    </section>
  );
};

export default ChannelDetails;
