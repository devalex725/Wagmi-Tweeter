// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.0;

contract Twitter is Ownable {
    // constants
    uint16 public MAX_TWEET_LENGTH = 280;
    // add our code
    mapping(address => Tweet[]) public tweets;
    // define our struct
    struct Tweet {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }

    // defining event
    event TweetCreated(
        uint256 id,
        address author,
        string content,
        uint256 timestamp
    );
    event TweetLiked(
        address liker,
        address tweeterAuthor,
        uint256 tweetId,
        uint256 newLikeCount
    );
    event TweetUnLiked(
        address unliker,
        address tweeterAuthor,
        uint256 tweetId,
        uint256 newLikeCount
    );

    constructor() Ownable(msg.sender) {
        // Your constructor code here
    }

    function createTweet(string memory _content) public {
        require(
            bytes(_content).length <= MAX_TWEET_LENGTH,
            "Tweet is too long bro!"
        );

        Tweet memory newTweet = Tweet({
            id: tweets[msg.sender].length,
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0
        });
        emit TweetCreated(
            newTweet.id,
            newTweet.author,
            newTweet.content,
            newTweet.timestamp
        );

        tweets[msg.sender].push(newTweet);
    }

    function likeTweet(address author, uint256 id) external {
        require(tweets[author][id].id == id, "TWEET DOES NOT EXIST");
        tweets[author][id].likes++;
        emit TweetLiked(msg.sender, author, id, tweets[author][id].likes);
    }

    function unlikeTweet(address author, uint256 id) external {
        require(tweets[author][id].id == id, "TWEET DOES NOT EXIST");
        require(tweets[author][id].likes > 0, "TWEET HAS NOT LIKES");

        tweets[author][id].likes--;
        emit TweetUnLiked(msg.sender, author, id, tweets[author][id].likes);
    }

    function getTweet(uint256 _i) public view returns (Tweet memory) {
        return tweets[msg.sender][_i];
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return tweets[msg.sender];
    }

    function changeTweetLength(uint16 newTweetLength) public onlyOwner {
        MAX_TWEET_LENGTH = newTweetLength;
    }
}
