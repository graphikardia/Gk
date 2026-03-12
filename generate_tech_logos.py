#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs("public/images", exist_ok=True)

tools = [
    {"name": "Figma", "color": "#F24E1E"},
    {"name": "Photoshop", "color": "#31A8FF"},
    {"name": "Illustrator", "color": "#FF9A00"},
    {"name": "AfterEffects", "color": "#9999FF"},
    {"name": "WordPress", "color": "#21759B"},
    {"name": "SEO", "color": "#7CB342"},
    {"name": "GoogleAds", "color": "#4285F4"},
    {"name": "Canva", "color": "#00C4CC"},
]

size = (512, 512)

for tool in tools:
    img = Image.new("RGB", size, tool["color"])
    draw = ImageDraw.Draw(img)

    try:
        font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80
        )
    except:
        font = ImageFont.load_default()

    text = tool["name"]
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    position = ((size[0] - text_width) // 2, (size[1] - text_height) // 2)

    draw.text(position, text, fill="white", font=font)

    filename = f"public/images/{tool['name'].lower()}.webp"
    img.save(filename, "WEBP")
    print(f"Created: {filename}")
