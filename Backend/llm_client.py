import httpx

from Backend.config import OLLAMA_URL, MODEL_NAME


# ---------------------------
# LLM Client (Ollama Connector)
# ---------------------------
async def ask_llm(question: str) -> str:
    """
    Sends a prompt to the local Ollama LLM and returns the response.
    """

    payload = {
        "model": MODEL_NAME,
        "prompt": question,
        "stream": False
    }

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(OLLAMA_URL, json=payload)

            # Raise error if request fails
            response.raise_for_status()

            data = response.json()

            return data.get("response", "No response received.")

    except httpx.RequestError as e:
        # Network / connection error
        return f"Connection error: {str(e)}"

    except httpx.HTTPStatusError as e:
        # Ollama returned an error response
        return f"HTTP error: {str(e)}"

    except Exception as e:
        # Unexpected error fallback
        return f"Unexpected error: {str(e)}"