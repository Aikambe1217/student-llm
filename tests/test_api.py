import requests

BASE_URL = "http://127.0.0.1:8000"


def test_health():
    """Test the health endpoint."""
    response = requests.get(f"{BASE_URL}/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"

    print("/health passed")


def test_ask():
    """Test the ask endpoint."""
    response = requests.post(
        f"{BASE_URL}/ask",
        json={"question": "How do I register for courses?"}
    )

    print("Status Code:", response.status_code)
    print("Response:", response.text)

    assert response.status_code == 200
    assert "answer" in response.json()

    print("/ask passed")
    print("Answer:", response.json()["answer"][:100])


def test_empty_question():
    """Test empty question handling."""
    response = requests.post(
        f"{BASE_URL}/ask",
        json={"question": ""}
    )

    assert response.status_code == 400

    print("/empty_question passed")


if __name__ == "__main__":
    test_health()
    test_ask()
    test_empty_question()

    print("\n All tests passed!")