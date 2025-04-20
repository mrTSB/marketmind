import os
from typing import Dict, Optional, Any

from models.tools import Tool
from exa_py import Exa
from dotenv import load_dotenv
from pydantic import BaseModel
load_dotenv()

class ToolRegistry:
    def __init__(self) -> None:
        self._tools: Dict[str, Tool] = {}

    def register(self, tool: Tool) -> None:
        """Register a tool in the registry.

        Args:
            tool (Tool): The tool to register
        """
        self._tools[tool.name] = tool

    def get_tool(self, name: str) -> Optional[Tool]:
        """Get a tool by name.

        Args:
            name (str): The name of the tool to get

        Returns:
            Optional[Tool]: The tool if found, None otherwise
        """
        return self._tools.get(name)

    def get_all_tools(self) -> list[Tool]:
        """Get all registered tools.

        Returns:
            list[Tool]: List of all registered tools
        """
        return list(self._tools.values())


# Global registry instance
tool_registry = ToolRegistry()

exa = Exa(api_key=os.getenv("EXA_API_KEY"))

def exa_search(query: str) -> str:
    search_results = exa.search_and_contents(query=query, type='auto', highlights=True)
    return str(search_results)

class SearchArgumentSchema(BaseModel):
    query: str

exa_tool = Tool(
    name="web_search",
    description="Perform a search query on the web, and retrieve the most relevant URLs/web data.",
    function=exa_search,
    argument_schema=SearchArgumentSchema
)

tool_registry.register(exa_tool)