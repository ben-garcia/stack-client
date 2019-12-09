import React from 'react';

import {
  Button,
  Header,
  Image,
  Navbar,
  NavbarItem,
  Paragraph,
} from '../../components';
import { LandingPageProps } from './types';
import logo from '../../logo.svg';
import './styles.scss';

const LandingPage: React.FC<LandingPageProps> = () => {
  // eslint-disable-next-line
  const onClickHandler = () => console.log('clicked');

  return (
    <div className="landing-page">
      <Navbar style={{ padding: '0 11.5rem', margin: '1rem 0 0 0' }}>
        <NavbarItem>
          <Image src={logo} alt="Stack Logo" />
        </NavbarItem>
        <NavbarItem>
          <Button text="Log In" color="transparent" onClick={onClickHandler} />
          <Button text="Register" onClick={onClickHandler} />
        </NavbarItem>
      </Navbar>
      <main>
        <Header heading="Welcome to Stack">
          <Paragraph>Organize your projects</Paragraph>
          <Button text="Get Started" onClick={onClickHandler} />
        </Header>
      </main>
      <section className="landing-page__description">
        <Header heading="What is Stack">
          <Paragraph>
            Stack a clone of the popular messaging platform
            <a href="https://slack.com/" target="_black">
              Slack.
            </a>
          </Paragraph>
        </Header>
      </section>
    </div>
  );
};

export default LandingPage;
