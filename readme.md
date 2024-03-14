# Table of Contents
- [Table of Contents](#table-of-contents)
- [GPT for Communities](#gpt-for-communities)
  - [Features](#features)
  - [Installation](#installation)
  - [License](#license)

# GPT for Communities

"GPT for Communities" is an innovative open-source project that harnesses the power of the Circle Community API to extract posts from online communities. It securely summarizes these posts and transforms them into vector representations, which are then stored in an Upstash Vector database. Built on Node.js, the project seamlessly integrates with a ChatGPT model to provide users with relevant information and guidance based on the content of their community.

Here are some key objectives of the project:
- To create an intelligent assistant that leverages community content to offer valuable insights and support to users.
- To attract more users to the community by providing quick and easy access to summarized knowledge and information.

If you have no prior knowledge but are interested in utilizing this project, feel free to reach out to me via my [Twitter](https://twitter.com/ogulcandev) and [mail address](mailto:hi@ogulcan.dev) for assistance.

[ChatGPT demo link](https://chatg.pt/nomadai)

## Features

- Community bilgisinden faydalanarak bir cevap verir.

## Installation

If you want to examine the source code or change some things according to your needs, you can install it by following these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/ogulcanturk/gpt-for-communities
   ```

2. Navigate to the project folder:
  ```bash
  cd gpt-for-communities
  ```

3. Install the required dependencies:
    ```bash
    yarn
    ```

4. Now you need to set up environment variables by creating a .env file in the project root directory and adding the following variables:

  - OPENAI_API_KEY
  - UPSTASH_VECTOR_REST_URL
  - UPSTASH_VECTOR_REST_TOKEN
  - UPSTASH_REDIS_REST_URL
  - UPSTASH_REDIS_REST_TOKEN
  - CIRCLE_TOKEN
  - CIRCLE_COMMUNITY_ID
  - API_KEY
  - PORT

To set these variables, you need to have an account on [Upstash](https://console.upstash.com/login),  [OpenAI](https://auth0.openai.com/u/login) and [Circle](https://login.circle.so/sign_in).

After signing in to Upstash, you need to create a Redis and Vector databases.

Then, you need to log in to your OpenAI account and create an API key.

finally, you need to log in to your Circle Community account and create API TOKEN.

5. As the last step, you can run the program on your local machine by entering this command into your console:
   ```bash
   yarn dev
   ```

## Deployment

1. Rename fly.toml.example to fly.toml and set the environment variables correctly.
   ```bash
    app = 'gpt-for-communities'

    [build]

    [http_service]
        internal_port = 3000
        force_https = true
        auto_stop_machines = true
        auto_start_machines = true
        min_machines_running = 0
        processes = ['app']

    [[vm]]
        memory = '1gb'
        cpu_kind = 'shared'
        cpus = 1
   ```

2. First create a Fly app by running fly launch. Say Yes to the question Would you like to copy its configuration to the new app?

3. Deploy your app to Fly.io by running the below command: fly deploy

4. GPT Installation

## License
