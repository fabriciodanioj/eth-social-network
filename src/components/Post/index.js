import React from "react";

import { Container, Author, TipAmount, Content, Button } from "./styles";

function Post({ author, content, tipAmount, id }) {
  return (
    <Container>
      <div>
        <Author>{author}</Author>
      </div>
      <Content>{content}</Content>
      <div>
        <TipAmount>{tipAmount.toNumber()}ETH received.</TipAmount>
        <Button>TIP 0.1ETH</Button>
      </div>
    </Container>
  );
}

export default Post;
