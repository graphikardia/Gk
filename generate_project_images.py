#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs("public/images", exist_ok=True)

projects = [
    {"name": "Graphikardia", "color": "#00d4aa", "sub": "Creative Studio"},
    {"name": "GK Portfolio", "color": "#ff6b6b", "sub": "Personal Portfolio"},
    {"name": "Dr. Darshana", "color": "#ffd93d", "sub": "Portfolio"},
    {"name": "KGI Admissions", "color": "#6c5ce7", "sub": "Educational Portal"},
    {"name": "Koshys Academia", "color": "#a29bfe", "sub": "College Website"},
]

size = (1920, 1080)

for project in projects:
    img = Image.new("RGB", size, "#0a0a0f")
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, size[0], size[1]], fill=project["color"])

    overlay = Image.new("RGBA", size, (0, 0, 0, 150))
    img.paste(overlay, (0, 0), overlay)

    try:
        title_font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 120
        )
        sub_font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 50
        )
    except:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    title_bbox = draw.textbbox((0, 0), project["name"], font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]

    sub_bbox = draw.textbbox((0, 0), project["sub"], font=sub_font)
    sub_width = sub_bbox[2] - sub_bbox[0]

    title_x = (size[0] - title_width) // 2
    title_y = (size[1] - title_height) // 2 - 50

    sub_x = (size[0] - sub_width) // 2
    sub_y = title_y + title_height + 20

    draw.text((title_x, title_y), project["name"], fill="white", font=title_font)
    draw.text((sub_x, sub_y), project["sub"], fill="#b3b3b3", font=sub_font)

    filename = f"public/images/{project['name'].lower().replace(' ', '').replace('.', '')}.webp"
    img.save(filename, "WEBP", quality=90)
    print(f"Created: {filename}")
