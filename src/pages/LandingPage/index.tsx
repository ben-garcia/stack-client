import React from 'react';

import {
  Button,
  Footer,
  Header,
  Image,
  Navbar,
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
      <Navbar className="landing-page__nav">
        <Navbar.Item>
          <Image style={{ width: '4.5rem' }} src={logo} alt="Stack Logo" />
        </Navbar.Item>
        <Navbar.Item>
          <Button text="Log In" color="transparent" onClick={onClickHandler} />
          <Button
            style={{ padding: '0.4rem', margin: '0 0.3rem', fontWeight: 600 }}
            text="Register"
            onClick={onClickHandler}
          />
        </Navbar.Item>
      </Navbar>
      <main>
        <div className="header-hero">
          <Header
            className="header-hero__header"
            headingClassName="header-hero__heading"
            heading="Welcome to Stack"
          >
            <Paragraph>Organize your projects</Paragraph>
            <Button
              style={{
                marginTop: '0.5rem',
                padding: '0.4rem',
                fontWeight: 600,
              }}
              text="Get Started"
              onClick={onClickHandler}
            />
          </Header>
        </div>
        <section className="landing-page__description">
          <Header
            className="description-header"
            as="h2"
            heading="What is Stack"
          >
            <Paragraph>
              Stack a clone of the popular messaging platform
              <a
                className="description-header__link"
                href="https://slack.com/"
                target="_black"
              >
                Slack
              </a>
              .
            </Paragraph>
          </Header>
        </section>
      </main>
      <Footer style={{ height: '5vmax', textAlign: 'center' }}>
        <Paragraph>Ben Garcia 2019</Paragraph>
      </Footer>
    </div>
  );
};

export default LandingPage;
