import React from 'react';
import { useSelector } from 'react-redux';

import { Icon, Text } from 'components';
import { AppState } from 'store';
import { ViewWrapperProps } from './types';
import './styles.scss';

const TeammateView: React.FC<ViewWrapperProps> = ({ className = '' }) => {
  const { currentChannel, currentTeammate, user } = useSelector(
    (state: AppState) => ({
      currentChannel: state.currentChannel,
      currentTeammate: state.currentTeammate,
      user: state.user,
    })
  );
  let classesToAdd: string = '';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      {currentChannel.id || currentTeammate.id ? (
        <div className="teammate-view">
          <Icon className="teammate-view__user-icon" type="user" size="lg" />
          <Text className="teammate-view__username" tag="span">
            {currentTeammate.username}
          </Text>
        </div>
      ) : null}
      <div className="teammate-view__inner channel-view__inner">
        {user.id === currentTeammate.id && (
          <Text size="sm">
            <Text className="teammate-view__message" tag="span" size="sm">
              This is your space.
            </Text>
            Draft messages, list your to-dos, or keep links and files handy. You
            can also talk to yourself here, but please bear in mind you’ll have
            to supply both sides of the conversation.
          </Text>
        )}
        {currentTeammate.id ? (
          <Text size="sm">
            This is the very beginning of your direct message history with
            <Text
              className="teammate-view__message teammate-view__message--margin-left"
              tag="span"
              size="sm"
            >
              {currentTeammate.username}
            </Text>
          </Text>
        ) : null}
      </div>
    </div>
  );
};

export default TeammateView;
