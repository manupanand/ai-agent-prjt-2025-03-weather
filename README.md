# Chat Assistant Using OpenAI GPT-4

This project is a command-line chat assistant built using the OpenAI GPT-4 API. The assistant interacts with users by processing their input and generating intelligent responses, simulating a conversational AI model.

### Features

Utilizes OpenAI's GPT-4 model for high-quality natural language understanding and generation.
Maintains conversation context using a message history system.
Supports flexible prompts, allowing users to customize system instructions.
Error handling for API calls and input validation.
Simple and intuitive command-line interface (CLI) for ease of use.

## Project Structure

```
├── src/
│   ├── main.ts            # Main application file
│   ├── config/            # Configuration-related files (e.g., environment variables)
│   ├── utils/             # Utility functions (e.g., error handling, parsing)
│   └── tests/             # Test cases for the application
├── .env                   # Environment variables (e.g., OpenAI API key)
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation

```

## Technologies Used

    - Language: TypeScript
    - Libraries/Packages:
        - OpenAI Node.js SDK
        - dotenv for managing environment variables
        - readline-sync for CLI input

## Getting Started
### Prerequisites

    Node.js installed (version 18 or later recommended).
    An OpenAI API key. Sign up at OpenAI if you don't have one.

### Installation

Clone the repository:

```
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```

Install dependencies:
```
npm install
```

Create a .env file in the root directory with the following content:

 - generate key from gpt:

    ```
    https://platform.openai.com/
    ```
 - .env

    ```
    OPENAI_API_KEY=your_openai_api_key
    ```

### Run the Application



Start the chat assistant:

``` 
npm run start

```

### Usage

The application starts with a system-defined prompt.
Type your query into the CLI to interact with the assistant.
Exit the conversation by pressing Ctrl+C.

### Future Improvements

Add a GUI for enhanced user experience.
Support for streaming responses.
Expand functionality with additional OpenAI features, such as fine-tuning and embeddings.
Logging and analytics for conversations.

### Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch-name).
Make your changes and commit (git commit -m "Add some feature").
Push the branch (git push origin feature-branch-name).
Open a pull request.

### License

This project is licensed under the MIT License.



