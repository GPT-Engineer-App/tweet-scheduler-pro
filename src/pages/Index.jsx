import { useState } from "react";
import { Box, Button, Flex, Heading, Input, Textarea, Image, Text, useToast } from "@chakra-ui/react";
import { FaTwitter, FaSearch, FaDatabase, FaUsers } from "react-icons/fa";

const MAX_TWEET_LENGTH = 280;
const THREAD_SEPARATOR = "\n\n";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [tweetedPosts, setTweetedPosts] = useState([]);
  const toast = useToast();

  const handleTopicChange = (e) => setTopic(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const researchTopic = async () => {
    // TODO: Implement topic research and content generation
    const generatedContent = "Generated content based on the topic...";
    setContent(generatedContent);

    // TODO: Scrape relevant images
    const scrapedImages = ["https://images.unsplash.com/photo-1576158113928-4c240eaaf360?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0b3BpYyUyMHJlbGF0ZWQlMjBpbWFnZSUyMDF8ZW58MHx8fHwxNzEyNjQzMzczfDA&ixlib=rb-4.0.3&q=80&w=1080", "https://images.unsplash.com/photo-1600439614353-174ad0ee3b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0b3BpYyUyMHJlbGF0ZWQlMjBpbWFnZSUyMDJ8ZW58MHx8fHwxNzEyNjQzMzczfDA&ixlib=rb-4.0.3&q=80&w=1080"];
    setImages(scrapedImages);
  };

  const formatTweetThread = () => {
    const tweets = content.split(THREAD_SEPARATOR);
    const formattedTweets = tweets.map((tweet) => {
      if (tweet.length <= MAX_TWEET_LENGTH) return tweet;

      const words = tweet.split(" ");
      let currentTweet = "";
      const formattedThread = [];

      for (const word of words) {
        if ((currentTweet + word).length <= MAX_TWEET_LENGTH) {
          currentTweet += word + " ";
        } else {
          formattedThread.push(currentTweet.trim());
          currentTweet = word + " ";
        }
      }

      if (currentTweet) formattedThread.push(currentTweet.trim());

      return formattedThread.join(THREAD_SEPARATOR);
    });

    setContent(formattedTweets.join(THREAD_SEPARATOR));
  };

  const postTweet = async () => {
    // TODO: Authenticate with Twitter API

    // TODO: Post the tweet
    console.log("Posting tweet:", content);

    // TODO: Store tweeted post in the database
    setTweetedPosts([...tweetedPosts, content]);

    toast({
      title: "Tweet posted!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setContent("");
    setImages([]);
  };

  const buildAudience = async () => {
    // TODO: Implement audience building based on selected topics
    toast({
      title: "Building audience...",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        <FaTwitter /> Twitter Auto Post Scheduler
      </Heading>

      <Flex marginBottom={4}>
        <Input value={topic} onChange={handleTopicChange} placeholder="Enter topic" marginRight={2} />
        <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={researchTopic}>
          Research
        </Button>
      </Flex>

      <Textarea value={content} onChange={handleContentChange} placeholder="Enter tweet content" height="200px" marginBottom={4} />

      <Flex flexWrap="wrap" marginBottom={4}>
        {images.map((image, index) => (
          <Image key={index} src={image} alt={`Image ${index + 1}`} boxSize="100px" objectFit="cover" marginRight={2} marginBottom={2} />
        ))}
      </Flex>

      <Flex justifyContent="space-between" marginBottom={4}>
        <Button leftIcon={<FaDatabase />} colorScheme="green" onClick={formatTweetThread}>
          Format Thread
        </Button>
        <Button leftIcon={<FaTwitter />} colorScheme="twitter" onClick={postTweet}>
          Post Tweet
        </Button>
      </Flex>

      <Box marginBottom={8}>
        <Heading as="h2" size="lg" marginBottom={2}>
          Tweeted Posts
        </Heading>
        {tweetedPosts.map((post, index) => (
          <Text key={index} marginBottom={2}>
            {post}
          </Text>
        ))}
      </Box>

      <Button leftIcon={<FaUsers />} colorScheme="orange" onClick={buildAudience}>
        Build Audience
      </Button>
    </Box>
  );
};

export default Index;
