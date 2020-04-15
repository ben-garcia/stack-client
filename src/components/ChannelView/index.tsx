import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  AddPeople,
  Button,
  CreateMessage,
  EditChannelDescription,
  Icon,
  MessageList,
  Modal,
  Text,
} from 'components';
import { AppState } from 'store';
import { Teammate } from 'store/teammates/types';
import { printFormattedDate } from 'utils';
import { ChannelViewProps } from './types';
import './styles.scss';

const ChannelView: React.FC<ChannelViewProps> = ({ className = '' }) => {
  const { currentChannel, currentTeammate, teammates, user } = useSelector(
    (state: AppState) => ({
      currentChannel: state.currentChannel,
      currentTeammate: state.currentTeammate,
      teammates: state.teammates,
      user: state.user,
    })
  );
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddPeopleModal, setOpenAddPeopleModal] = useState<boolean>(false);
  let classesToAdd: string = 'channel-view';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  // get the current teammate
  const teammate = teammates.list.find(
    (t: Teammate) => t.id === currentTeammate.id
  );

  return (
    <main className={classesToAdd}>
      <div className="channel-view__container">
        {currentChannel.id !== 0 && !teammate && (
          <div>
            <h1 className="channel-view__inner">
              <Icon className="channel-view__hash-icon" type="hash" size="xm" />
              <Text className="channel-view__name" tag="span">
                {currentChannel.name}
              </Text>
            </h1>
            <div className="channel-view__inner">
              <Text tag="span" size="sm">
                You created this channel on
              </Text>
              <Text className="channel-view__created-at" tag="span" size="sm">
                {printFormattedDate(currentChannel.createdAt!)}
              </Text>
              <Text tag="span" size="sm">
                This is the very beginning of the
              </Text>
              <strong className="channel-view__inner-two">
                <Icon type="hash" size="sm" />
                <Text tag="span">{currentChannel.name}</Text>
              </strong>
              {currentChannel.description && (
                <div className="channel-view__inner-three">
                  <Text tag="span" size="sm">
                    Description:
                  </Text>
                  <Text className="channel-view__description" tag="span">
                    {currentChannel.description}
                  </Text>
                  <Text tag="span">
                    (
                    <Button
                      className="channel-view__edit-button"
                      type="button"
                      color="transparent"
                      title="Edit Channel Description"
                      onClick={() => setOpenEditModal(true)}
                    >
                      <Text tag="span" size="sm">
                        edit
                      </Text>
                    </Button>
                    )
                  </Text>
                  {openEditModal && (
                    <Modal
                      header="Edit channel description"
                      size="md"
                      onClose={() => setOpenEditModal(false)}
                    >
                      <EditChannelDescription
                        setOpenEditModal={setOpenEditModal}
                        value={currentChannel?.description}
                      />
                    </Modal>
                  )}
                </div>
              )}
              <div className="channel-view__inner-four">
                <Icon type="user" size="xm" />
                <Button
                  className="channel-view__user-icon"
                  type="button"
                  color="transparent"
                  onClick={() => setOpenAddPeopleModal(true)}
                >
                  <Text tag="span" size="xm">
                    Add people
                  </Text>
                </Button>
                {openAddPeopleModal && (
                  <Modal
                    header="Add People"
                    size="md"
                    onClose={() => setOpenAddPeopleModal(false)}
                  >
                    <AddPeople setOpenAddPeopleModal={setOpenAddPeopleModal} />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        )}
        {currentTeammate && currentChannel.id === 0 && (
          <div className="channel-view__inner">
            {currentChannel.id || currentTeammate.id ? (
              <div className="c-teammate">
                <Icon className="c-teammate__user-icon" type="user" size="lg" />
                <Text className="c-teammate__username" tag="span">
                  {currentTeammate.username}
                </Text>
              </div>
            ) : null}
            <div className="c-teammate__inner channel-view__inner">
              {user.id === currentTeammate.id && (
                <Text size="sm">
                  <Text className="c-teammate__message" tag="span" size="sm">
                    This is your space.
                  </Text>
                  Draft messages, list your to-dos, or keep links and files
                  handy. You can also talk to yourself here, but please bear in
                  mind you’ll have to supply both sides of the conversation.
                </Text>
              )}
              {currentTeammate.id ? (
                <Text size="sm">
                  This is the very beginning of your direct message history with
                  <Text
                    className="c-teammate__message c-teammate__message--margin-left"
                    tag="span"
                    size="sm"
                  >
                    {currentTeammate.username}
                  </Text>
                </Text>
              ) : null}
            </div>
          </div>
        )}
        <MessageList />
      </div>
      {(currentChannel.id && !currentTeammate.id) ||
      (currentTeammate.id && !currentChannel.id) ? (
        <div className="channel-view__message">
          <CreateMessage />
        </div>
      ) : null}
    </main>
  );
};

export default ChannelView;
