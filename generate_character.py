import requests
import time
import os

MESHY_API_KEY = os.environ.get("MESHY_API_KEY")
if not MESHY_API_KEY:
    raise ValueError("Please set MESHY_API_KEY environment variable")

BASE_URL = "https://api.meshy.ai/openapi/v1"

headers = {
    "Authorization": f"Bearer {MESHY_API_KEY}",
    "Content-Type": "application/json",
}

prompt = """Male 3D character, brownish-red/terracotta skin tone, wearing glasses, semiformal business attire with dark blazer/jacket and white shirt, professional office look, full body portrait, high quality detailed 3D model, realistic human texture, PBR materials"""


def create_text_to_3d():
    response = requests.post(
        f"{BASE_URL}/text-to-3d",
        headers=headers,
        json={
            "prompt": prompt,
            "art_style": "realistic",
            "should_remesh": True,
            "enable_pbr": True,
        },
    )
    response.raise_for_status()
    return response.json()["result"]


def get_task(task_id):
    response = requests.get(f"{BASE_URL}/text-to-3d/{task_id}", headers=headers)
    response.raise_for_status()
    return response.json()


def download_model(url, filename):
    response = requests.get(url)
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"Downloaded: {filename}")


def main():
    print("Creating 3D generation task...")
    task_id = create_text_to_3d()
    print(f"Task ID: {task_id}")

    while True:
        task = get_task(task_id)
        status = task.get("status")
        print(f"Status: {status}")

        if status == "SUCCEEDED":
            print("\nGeneration complete!")
            print(f"Preview URL: {task.get('preview_url')}")

            if task.get("model_urls"):
                model_urls = task["model_urls"]
                if model_urls.get("glb"):
                    download_model(model_urls["glb"], "character.glb")
                if model_urls.get("obj"):
                    download_model(model_urls["obj"], "character.obj")
                if model_urls.get("fbx"):
                    download_model(model_urls["fbx"], "character.fbx")
            break
        elif status == "FAILED":
            print(f"Generation failed: {task.get('message')}")
            break

        time.sleep(30)


if __name__ == "__main__":
    main()
