import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Icon, List, Text } from 'components';
import useMediaQuery from 'hooks/useMediaQuery';
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
  const isDesktop = useMediaQuery('(min-width: 998px)');
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
    let viewWrapper: HTMLElement | null;

    if (!isDesktop) {
      // On mobile, when the channel details is open, everything else
      // shouln't be interactive, to be a11y compliant.
      viewWrapper = document.querySelector('.view-wrapper');
      viewWrapper!.inert = true;
    }

    if (closeButtonRef.current) {
      // Focus the close button.
      closeButtonRef.current.focus();
    }

    return () => {
      viewWrapper!.inert = false;
      // NOTE: As it's currently implemented, the show details button is
      //       removed from the DOM when thsi components is mounted.
      //       To solve this, a setTimeout is used to wait for the button
      //       to be rendered.
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
            id="about-accordion-button"
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
            aria-labelledby="about-accordion-button"
            className="channel-details__about-info"
            // removes the content from the accessibility tree and from the tab order.
            hidden={!aboutDropdownIsOpen}
            id="about-info-panel"
            role="region"
          >
            <div className="channel-details__topic">
              <h3 className="channel-details__subtext channel-details__subtext--dark">
                Topic
              </h3>

              <div>
                {currentChannel.topic ? (
                  <Text
                    modalId="channel-topic-text"
                    className="channel-details__subtext display-inline"
                    tag="p"
                    size="sm"
                  >
                    {currentChannel.topic}
                  </Text>
                ) : (
                  <Text
                    modalId="channel-topic-text"
                    className="channel-details__subtext display-inline"
                    tag="p"
                    size="sm"
                  >
                    {`What's s up for discussion?`}
                  </Text>
                )}

                <Button
                  ariaLabel="Edit channel topic"
                  ariaDescribedBy="channel-topic-text"
                  className="channel-details__edit-button"
                  color="transparent"
                  onClick={() => dispatch(openEditChannelTopicModal())}
                  type="button"
                >
                  <Text size="sm" tag="span">
                    (edit)
                  </Text>
                </Button>
              </div>
            </div>

            <div className="channel-details__description">
              <h3 className="channel-details__subtext channel-details__subtext--dark">
                Description
              </h3>

              {currentChannel.description ? (
                <Text
                  modalId="channel-description-text"
                  className="channel-details__subtext display-inline"
                  tag="p"
                  size="sm"
                >
                  {currentChannel.description}
                </Text>
              ) : (
                <Text
                  modalId="channel-description-text"
                  className="channel-details__subtext display-inline"
                  tag="p"
                  size="sm"
                >
                  {`What's s up for discussion?`}
                </Text>
              )}
              <Button
                ariaLabel="Edit channel description"
                ariaDescribedBy="channel-description-text"
                className="channel-details__edit-button"
                color="transparent"
                onClick={() => dispatch(openEditChannelDescriptionModal())}
                type="button"
              >
                <Text size="sm" tag="span">
                  (edit)
                </Text>
              </Button>
            </div>

            <Text className="channel-details__created" size="sm" tag="p">
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
            id="members-accordion-button"
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
            aria-labelledby="members-accordion-button"
            // removes the content from the accessibility tree and from the tab order.
            hidden={!membersDropdownIsOpen}
            id="members-info-panel"
            role="region"
          >
            <List className="channel-details__members-info members-list">
              {members.map((m: Member) => (
                <List.Item
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
