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

      assert.equal(name, "Social Network");
    });
  });

  describe("manage posts", async () => {
    let result, postCount;

    before(async () => {
      result = await socialNetwork.createPost("Hello World", {
        from: author,
      });
      postCount = await socialNetwork.postCount();
    });

    it("should be able to create posts", async () => {
      const event = result.logs[0].args;

      assert.equal(postCount, 1);
      assert.equal(event.content, "Hello World");

      await socialNetwork.createPost("", {
        from: author,
      }).should.be.rejected;
    });

    it("should be able to get an post", async () => {
      result = await socialNetwork.posts(postCount);

      assert.equal(result.content, "Hello World");
    });

    it("should be able to tip posts", async () => {
      let oldAuthorBalance;
      oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

      result = await socialNetwork.tipPost(postCount, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      });

      const event = result.logs[0].args;

      assert.equal(event.id, 1);
      assert.equal(event.tipAmount, web3.utils.toWei("1", "Ether"));
      assert.equal(event.content, "Hello World");

      let newAuthorBalance;
      newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance);

      let tipAmount;
      tipAmount = await web3.utils.toWei("1", "Ether");
      tipAmount = new web3.utils.BN(tipAmount);

      const expectedBalance = oldAuthorBalance.add(tipAmount);

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString());

      await socialNetwork.tipPost(99, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });
  });
});
