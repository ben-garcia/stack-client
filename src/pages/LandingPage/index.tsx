import React, { useState } from 'react';

import {
  Button,
  Footer,
  Header,
  Image,
  Modal,
  Navbar,
  Paragraph,
} from '../../components';
import { RegisterPage, LoginPage } from '..';
import { LandingPageProps } from './types';
import logo from '../../logo.svg';
import './styles.scss';

const LandingPage: React.FC<LandingPageProps> = () => {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState<boolean>(
    false
  );
  const [loginModalIsOpen, setLoginModalIsOpen] = useState<boolean>(false);

  return (
    <div className="landing-page">
      <Navbar className="landing-page__nav">
        <Navbar.Item>
          <Image src={logo} alt="Stack Logo" size="sm" />
        </Navbar.Item>
        <Navbar.Item>
          <Button
            type="button"
            text="Log In"
            color="transparent"
            onClick={() => setLoginModalIsOpen(true)}
          />
          <Button
            type="button"
            text="Register"
            onClick={() => setRegisterModalIsOpen(true)}
          />
        </Navbar.Item>
      </Navbar>
      <main>
        <div className="header-hero">
          <Header className="header-hero__header" heading="Welcome to Stack">
            <Paragraph>Organize your projects</Paragraph>
            <Button type="button" text="Get Started" />
          </Header>
        </div>
        <section className="landing-page__description">
          <Header
            textAlign="center"
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
      <Footer>
        <Paragraph>Ben Garcia 2019</Paragraph>
      </Footer>
      {registerModalIsOpen && (
        <Modal
          className="register-modal"
          header="Create An Account"
          onClose={() => setRegisterModalIsOpen(false)}
        >
          <RegisterPage
            setRegisterModalIsOpen={setRegisterModalIsOpen}
            setLoginModalIsOpen={setLoginModalIsOpen}
          />
        </Modal>
      )}
      {loginModalIsOpen && (
        <Modal
          className="login-modal"
          header="Log In"
          onClose={() => setLoginModalIsOpen(false)}
        >
          <LoginPage />
        </Modal>
      )}
    </div>
  );
};

export default LandingPage;
