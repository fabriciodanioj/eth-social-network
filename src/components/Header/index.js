import React from "react";
import Identicon from "identicon.js";

import { Container, AppTitle, Address } from "./styles";

const Header = ({ address }) => {
  const avatar = address && new Identicon(String(address), 30).toString();
  return (
    <Container>
      <AppTitle>SocialNetwork</AppTitle>
      <Address>{address}</Address>
      {address && avatar && (
        <img
          width={30}
          height={30}
          src={`data:image/png;base64,${avatar}`}
          alt="avatar"
        />
      )}
    </Container>
  );
};

export default Header;
