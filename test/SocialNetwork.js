/* eslint-disable no-undef */
const SocialNetwork = artifacts.require("SocialNetwork.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("SocialNetwork", ([deployer, author, tipper]) => {
  let socialNetwork;

  before(async () => {
    socialNetwork = await SocialNetwork.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = socialNetwork.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await socialNetwork.name();

      assert.equal(name, "Stoners");
    });
  });

  describe("manage posts", async () => {
    it("should be able to create posts", async () => {
      const result = await socialNetwork.createPost("Hello World", {
        from: author,
      });
      const postCount = await socialNetwork.postCount();

      const event = result.logs[0].args;

      assert.equal(postCount, 1);
      assert.equal(event.content, "Hello World");

      await socialNetwork.createPost("", {
        from: author,
      }).should.be.rejected;
    });
  });
});
