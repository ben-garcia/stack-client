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
    <>
      <main className="landing-page">
        <Navbar padding="0 11.5rem" margin="1rem 0 0 0">
          <NavbarItem>
            <Image src={logo} alt="Stack Logo" />
          </NavbarItem>
          <NavbarItem>
            <Button
              text="Sign In"
              color="transparent"
              onClick={onClickHandler}
            />
            <Button text="Register" onClick={onClickHandler} />
          </NavbarItem>
        </Navbar>
        <Header heading="Welcome to Stack">
          <Paragraph>Organize your projects</Paragraph>
          <Button text="Get Started" onClick={onClickHandler} />
        </Header>
      </main>
    </>
  );
};

export default LandingPage;
