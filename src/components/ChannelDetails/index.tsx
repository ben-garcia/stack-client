import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Icon, List, Text } from 'components';
import { AppState } from 'store';
import { openAddPeopleModal } from 'store/addPeopleModal';
import { closeChannelDetails } from 'store/channelDetails';
import { openEditChannelDescriptionModal } from 'store/editChannelDescriptionModal';
import { openEditChannelTopicModal } from 'store/editChannelTopicModal';
import { Member } from 'store/members';
import { printFormattedDate } from 'utils';
import { ChannelDetailsProps } from './types';
import './styles.scss';

const ChannelDetails: React.FC<ChannelDetailsProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { channelDetails, currentChannel, members, user } = useSelector(
    (state: AppState) => ({
      currentChannel: state.currentChannel,
      channelDetails: state.channelDetails,
      members: state.members.list,
      user: state.user,
    })
  );
  // Store reference to the close button to give focus on mount.
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  // Keep track of when the user clicks the about dropdown
  const [aboutDropdownIsOpen, setAboutDropdownIsOpen] = useState<boolean>(
    false
  );
  // keep track of when the user clicks the members dropdown
  const [membersDropdownIsOpen, setMembersDropdownIsOpen] = useState<
    boolean | undefined
  >(channelDetails.withMembers);
  let classesToAdd: string = 'channel-details';

  if (className.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  useEffect(() => {
    if (closeButtonRef.current) {
      // Focuse the close button.
      closeButtonRef.current.focus();
    }

    return () => {
      // NOTE: As it's currently implemented, the show details button is
      //       removed from the DOM when thsi components is mounted.
      //       To solve this, a setTimeout is used to wait for the button
      //       to be added.
      setTimeout(() => {
        const detailsButton = document.querySelector(
          '[aria-label="Show channel details"]'
        );
        // Return focus back to the show channel details button.
        (detailsButton as HTMLElement).focus();
      }, 0);
    };
  }, []);

  return (
    <section aria-label="Channel Details" className={classesToAdd}>
      <div className="channel-details__inner">
        <div className="channel-details__inside">
          <h2 className="channel-details__text">Details</h2>

          <Text className="channel-details__channel-name" tag="span" size="xm">
            {`# ${currentChannel.name}`}
          </Text>
        </div>

        <Button
          ariaLabel="Close channel details"
          className="channel-details__close-button"
          color="transparent"
          onClick={() => dispatch(closeChannelDetails())}
          ref={closeButtonRef}
          type="button"
        >
          <Icon
            className="channel-details__close-icon"
            type="times"
            size="sm"
          />
        </Button>
      </div>

      <div className="channel-details__container">
        <div className="channel-details__inner-two">
          <Button
            className="channel-details__add-people-button"
            color="transparent"
            onClick={() => dispatch(openAddPeopleModal())}
            type="button"
            title={`Add people to #${currentChannel.name}`}
            ariaLabel={`Add people to #${currentChannel.name}`}
          >
            <Icon
              className="channel-details__user-icon"
              size="sm"
              type="user"
            />

            <Text size="xm" tag="span">
              Add
            </Text>
          </Button>
        </div>

        <div className="channel-details__about">
          <Button
            ariaExpanded={aboutDropdownIsOpen}
            ariaControls="about-info-panel"
            className="channel-details__dropdown-button"
            color="transparent"
            onClick={() => {
              if (membersDropdownIsOpen) {
                setMembersDropdownIsOpen(false);
              }
              setAboutDropdownIsOpen(!aboutDropdownIsOpen);
            }}
            type="button"
          >
            <Text size="sm" tag="span">
              About
            </Text>

            <Icon
              className={
                aboutDropdownIsOpen
                  ? 'channel-details__icon-chevron-right channel-details__icon-chevron-right--translate-rotate '
                  : 'channel-details__icon-chevron-right'
              }
              size="xm"
              type="chevron-right"
            />
          </Button>

          <div
            className="channel-details__about-info"
            id="about-info-panel"
            style={
              aboutDropdownIsOpen ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className="channel-details__topic">
              <Text
                className="channel-details__subtext channel-details__subtext--dark"
                size="xm"
                tag="div"
              >
                Topic
              </Text>
              {currentChannel.topic ? (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  {currentChannel.topic}
                </Text>
              ) : (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  Whats up for discussion?
                </Text>
              )}

              <Button
                ariaLabel="Edit channel topic"
                className="channel-details__edit-button"
                color="transparent"
                onClick={() => dispatch(openEditChannelTopicModal())}
                type="button"
              >
                <Text size="xm" tag="span">
                  edit
                </Text>
              </Button>
            </div>

            <div className="channel-details__description">
              <Text
                className="channel-details__subtext channel-details__subtext--dark"
                tag="div"
                size="xm"
              >
                Description
              </Text>

              {currentChannel.description ? (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  {currentChannel.description}
                </Text>
              ) : (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  Whats up for discussion?
                </Text>
              )}
              <Button
                ariaLabel="Edit channel description"
                className="channel-details__edit-button"
                color="transparent"
                onClick={() => dispatch(openEditChannelDescriptionModal())}
                type="button"
              >
                <Text size="xm" tag="span">
                  edit
                </Text>
              </Button>
            </div>

            <Text className="channel-details__created" size="xm" tag="div">
              {`Created ${printFormattedDate(
                currentChannel.createdAt as string
              )}`}
            </Text>
          </div>
        </div>

        <div className="channel-details__members">
          <Button
            ariaExpanded={membersDropdownIsOpen}
            ariaControls="members-info-panel"
            className="channel-details__dropdown-button"
            color="transparent"
            onClick={() => {
              if (aboutDropdownIsOpen) {
                setAboutDropdownIsOpen(false);
              }
              setMembersDropdownIsOpen(!membersDropdownIsOpen);
            }}
            type="button"
          >
            <Text size="sm" tag="span">
              Members
            </Text>

            <div className="channel-details__inner-three">
              <Text
                ariaLabel={`${members.length}${
                  members.length === 1 ? ' member' : ' members'
                }`}
                className="channel-details__member-count"
                size="xm"
                tag="span"
              >
                {members.length}
              </Text>

              <Icon
                className={
                  membersDropdownIsOpen
                    ? 'channel-details__icon-chevron-right channel-details__icon-chevron-right--rotate'
                    : 'channel-details__icon-chevron-right'
                }
                size="xm"
                type="chevron-right"
              />
            </div>
          </Button>
          <div
            id="members-info-panel"
            style={
              membersDropdownIsOpen ? { display: 'block' } : { display: 'none' }
            }
          >
            <List className="channel-details__members-info members-list">
              {members.map((m: Member) => (
                <List.Item
                  // ariaLabel={`${m.username}${
                  //   user.username === m.username ? ' you' : ''
                  // }`}
                  className="members-list__item"
                  hover={false}
                  key={m.id}
                >
                  <Icon
                    className="members-list__icon"
                    color={m.color as any}
                    size="sm"
                    type="user"
                  />

                  {user.username === m.username ? (
                    <>
                      {m.username}
                      <span aria-hidden="true">(you)</span>
                    </>
                  ) : (
                    m.username
                  )}
                </List.Item>
              ))}
            </List>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelDetails;
