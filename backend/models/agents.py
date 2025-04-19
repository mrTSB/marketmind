import os
from models.llms import (
    llm_call_messages,
    llm_call_messages_async,
    text_model,
    llm_call_with_tools,
)
from models.tools import Tool
import asyncio
from pydantic import BaseModel
from models.tool_registry import tool_registry


class AgentConfig(BaseModel):
    name: str
    system_prompt: str
    description: str
    messages: list[dict[str, str]] = []
    tools: list[str] = []


class Agent:
    def __init__(
        self,
        name: str,
        system_prompt: str,
        tools: list[Tool] = [],
        model: str = text_model,
        description: str = "",
    ):
        self.name: str = name
        self.system_prompt: str = system_prompt
        self.model: str = model
        self.messages: list[dict[str, str]] = [
            {"role": "system", "content": self.system_prompt}
        ]
        self.tools: list[Tool] = tools
        self.data: list[str] = []
        self.description: str = description

    @staticmethod
    def from_config(config: AgentConfig, model: str = text_model) -> "Agent":
        agent = Agent(
            name=config.name,
            system_prompt=config.system_prompt,
            model=model,
            description=config.description,
            tools=[tool_registry.get_tool(tool_name) for tool_name in config.tools],
        )
        for message in config.messages:
            agent.pass_context(message["content"], message["role"])
        return agent

    @staticmethod
    def from_file(path: str) -> "Agent":
        with open(path, "r") as f:
            config = AgentConfig.model_validate_json(f.read())
        return Agent.from_config(config)

    def save_to_file(self, path: str = "agents") -> None:
        """Save the agent's configuration to a file.

        Args:
            path (str): Path to save the configuration file
        """
        config = AgentConfig(
            name=self.name,
            system_prompt=self.system_prompt,
            messages=self.messages[1:],  # skip system prompt
            description=self.description,
        )
        file_name = os.path.join(path, f"{self.name.lower().replace(' ', '_')}.json")
        with open(file_name, "w") as f:
            f.write(config.model_dump_json(indent=2))

    def pass_context(self, context: str, role: str = "user") -> None:
        self.messages.append({"role": role, "content": context})

    def call(self, prompt: str) -> str:
        self.messages.append({"role": "user", "content": prompt})
        response = llm_call_messages(self.messages, model=self.model)
        self.messages.append({"role": "assistant", "content": response})
        return str(response)

    def call_structured_output(self, prompt: str, schema: BaseModel) -> BaseModel:
        self.messages.append({"role": "user", "content": prompt})
        response = llm_call_messages(
            self.messages, response_format=schema, model=self.model
        )
        self.messages.append({"role": "assistant", "content": str(response)})
        return schema.model_validate(response)

    def call_with_tools(self, prompt: str) -> str:
        self.messages.append({"role": "user", "content": prompt})
        response = llm_call_with_tools(self.messages, self.tools, model=self.model)
        self.messages.append({"role": "assistant", "content": response})
        return str(response)

    async def call_async(self, prompt: str) -> str:
        self.messages.append({"role": "user", "content": prompt})
        response = await llm_call_messages_async(self.messages, model=self.model)
        self.messages.append({"role": "assistant", "content": response})
        return str(response)

    def __str__(self) -> str:
        return f"Agent: {self.name}\nSystem Prompt: {self.system_prompt}\nTools: {self.tools}\nModel: {self.model}\nMessages: {self.messages}\nData: {self.data}"


if __name__ == "__main__":
    agent = Agent(
        name="Test123",
        system_prompt="You are a helpful assistant that speaks in the style of a pirate.",
        tools=[],
        model=text_model,
    )
    print(agent.call("What is the capital of France?"))
    print(asyncio.run(agent.call_async("What was the last thing you said?")))

    config = AgentConfig(
        name="Test1234",
        system_prompt="You are a helpful assistant that speaks in haikus.",
        description="A test agent that speaks in haikus",
        messages=[
            {"content": "Generate a haiku about a cat.", "role": "user"},
            {
                "content": "The cat is a good cat.\nThe cat is a bad cat.\nThe cat is a cat.",
                "role": "assistant",
            },
            {"content": "Generate a haiku about a dog.", "role": "user"},
            {
                "content": "The dog is a good dog.\nThe dog is a bad dog.\nThe dog is a dog.",
                "role": "assistant",
            },
        ],
        tools=[],
    )

    agent2 = Agent.from_config(config)
    print(agent2.call("Tell me the last thing you said, verbatim."))
    print(asyncio.run(agent2.call_async("Tell me the first thing you said, verbatim.")))

    agent2.save_to_file("agents")

    print("Loading agent from file...")
    agent3 = Agent.from_file("agents/test1234.json")
    print(agent3.call("Tell me the last thing you said, verbatim."))

    def get_weather(city: str) -> str:
        if city == "Stanford":
            return "The weather in Stanford is sunny."
        else:
            return f"The weather in {city} is cloudy."

    class WeatherArgs(BaseModel):
        city: str

    def get_news(topic: str) -> str:
        if topic == "Stanford":
            return "Stanford is doing really great research in AI."
        else:
            return f"The news about {topic} is that it is good."

    class NewsArgs(BaseModel):
        topic: str

    tool_registry.register(
        Tool(
            name="get_weather",
            description="Get the weather in a city",
            function=get_weather,
            argument_schema=WeatherArgs,
        )
    )
    tool_registry.register(
        Tool(
            name="get_news",
            description="Get the news about a topic",
            function=get_news,
            argument_schema=NewsArgs,
        )
    )

    config.tools = ["get_weather", "get_news"]

    agent4 = Agent.from_config(config)
    print(agent4.call_with_tools("What is the weather in Stanford?"))
    print(agent4.call_with_tools("What is some cool news about New York?"))