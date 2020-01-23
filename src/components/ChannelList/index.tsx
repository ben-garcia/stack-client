import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button, CreateChannelForm, Icon, Modal, Text } from 'components';
import { AppState } from 'store';
import getCurrentChannelId from 'store/channel/actions';
import { Channel } from 'store/channels/types';
import { ChannelListProps } from './types';
import './styles.scss';

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  getCurrentChannelIdAction,
  className = '',
}) => {
  const [createChannelFormIsOpen, setCreateChannelFormIsOpen] = useState<
    boolean
  >(false);
  let classesToAdd: string = 'channel-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveChannelId = (id: number) => {
    // save current channel id to be used on page reload
    localStorage.setItem('currentChannelId', `${id}`);
    // dispatch action to change the store
    getCurrentChannelIdAction(id);
  };

  return (
    <section className={classesToAdd}>
      <div className="channel-list__inner">
        <Text tag="span" className="channel-list__heading">
          Channels
        </Text>
        <Button
          className="channel-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setCreateChannelFormIsOpen(true)}
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
      <ul className="channel-list__list">
        {channels.list.map((c: Channel) => (
          <li key={c.id} className="channel-list__item">
            <Button
              type="button"
              color="transparent"
              onClick={() => saveChannelId(c.id)}
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
          <CreateChannelForm />
        </Modal>
      )}
    </section>
  );
};

const mapStateToProps = (state: AppState): Pick<AppState, 'channels'> => ({
  channels: state.channels,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCurrentChannelIdAction: (id: number) => dispatch(getCurrentChannelId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
