pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post{
        uint id;
        string content;
        uint tipAmount;
        address payable author;
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        uint totalTips,
        uint tipAmount,
        address payable author
    );

    constructor() public {
        name = "Social Network";
    }

    function createPost(string memory _content) public {
        //Prevents message to be empty
        require(bytes(_content).length > 0);

        //Increment post count
        postCount++;

        //Create post 
        posts[postCount] = Post(postCount, _content, 0, msg.sender);

        //Trigger event 
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint _id) public payable {
        //Cannot tip if id is invalid
        require(_id > 0 && _id <= postCount);
        // Fetch the post
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay the author
        address(_author).transfer(msg.value);
        // Increment the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit PostTipped(_id, _post.content, _post.tipAmount, msg.value, msg.sender);

    }

    
}