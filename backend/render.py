# C:\Users\User\Desktop\ecoprom\backend\render.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from PIL import Image, ImageDraw, ImageFont
import io
import base64
import hashlib
from pathlib import Path
import uvicorn

app = FastAPI()

# 1. CORS SOZLAMALARI (Eng ochiq holatda)
# Bu brauzerdagi "Access-Control-Allow-Origin" xatosini yo'qotadi
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache papkasi
CACHE_DIR = Path("render_cache")
CACHE_DIR.mkdir(exist_ok=True)

class CameraParams(BaseModel):
    L: float = 5
    W: float = 4
    H: float = 3
    wallThickness: int = 100
    hasFloor: bool = True
    doorType: str = "Muzlatkich eshigi"
    doorSide: str = "Old"
    doorPosition: str = "O'rta"
    hasAggregat: bool = True
    aggregatSide: str = "Old"
    aggregatBrand: str = "Bitzer"
    progressPercent: int = 100

def get_cache_key(params: CameraParams):
    """Parametrlardan xesh olish (Kesh uchun)"""
    key_str = str(params.dict())
    return hashlib.md5(key_str.encode()).hexdigest()

def render_25d_fast(params: CameraParams):
    """2.5D render - Geometrik to'g'ri ketma-ketlikda chizish"""
    
    L, W, H = params.L, params.W, params.H
    wall_mm = params.wallThickness
    eshik_joyi = params.doorSide
    agregat_joyi = params.aggregatSide
    
    # Eshik o'lchamlari
    door_w, door_h = (0.96, 2.0) if "Muzlatkich" in params.doorType else (0.9, 1.9)
    if params.doorType == "Yo'q": door_w, door_h = 0, 0
    
    # Rasm sozlamalari
    width, height = 800, 600
    img = Image.new('RGB', (width, height), color='#111827') # To'q ko'k fon
    draw = ImageDraw.Draw(img)
    
    scale = 80  
    center_x = width // 2
    center_y = height // 2 + 50
    
    def project(x, y, z):
        px = center_x + (x - z * 0.5) * scale
        py = center_y - (y * 0.8 + z * 0.4) * scale
        return (int(px), int(py))
    
    colors = {
        'floor': '#374151',
        'wall_back': '#1F2937',  
        'wall_front': '#F3F4F6', 
        'ceiling': '#E5E7EB',
        'door': '#4B5563',
        'aggregat': '#EF4444',
        'edge': '#9CA3AF'
    }

    # --- CHIZISH KETMA-KETLIGI (Z-ORDER) ---
    
    # 1. POL
    if params.hasFloor:
        pts = [project(0, 0, 0), project(L, 0, 0), project(L, 0, W), project(0, 0, W)]
        draw.polygon(pts, fill=colors['floor'], outline=colors['edge'])

    # 2. ORQA DEVORLAR (Eng uzoqdagi)
    # Orqa taraf
    pts = [project(0, 0, W), project(L, 0, W), project(L, H, W), project(0, H, W)]
    draw.polygon(pts, fill=colors['wall_back'], outline=colors['edge'])
    # Chap taraf
    pts = [project(0, 0, 0), project(0, 0, W), project(0, H, W), project(0, H, 0)]
    draw.polygon(pts, fill=colors['wall_back'], outline=colors['edge'])

    # 3. OLD DEVORLAR (Yaqindagi)
    # O'ng taraf
    pts = [project(L, 0, 0), project(L, 0, W), project(L, H, W), project(L, H, 0)]
    draw.polygon(pts, fill=colors['wall_front'], outline=colors['edge'])
    # Old taraf
    pts = [project(0, 0, 0), project(L, 0, 0), project(L, H, 0), project(0, H, 0)]
    draw.polygon(pts, fill=colors['wall_front'], outline=colors['edge'])

    # 4. ESHIK (Faqat Old devorda bo'lsa)
    if door_w > 0 and eshik_joyi == "Old":
        dx = (L - door_w) / 2
        pts = [project(dx, 0.01, -0.01), project(dx+door_w, 0.01, -0.01), 
               project(dx+door_w, door_h, -0.01), project(dx, door_h, -0.01)]
        draw.polygon(pts, fill=colors['door'], outline='#111827', width=2)

    # 5. SHIFT (Eng ustki qatlam)
    pts = [project(0, H, 0), project(L, H, 0), project(L, H, W), project(0, H, W)]
    draw.polygon(pts, fill=colors['ceiling'], outline=colors['edge'])

    # 6. AGREGAT
    if params.hasAggregat and agregat_joyi == "Old":
        ax, ay, az = L*0.7, H*0.6, -0.2
        pts = [project(ax, ay, az), project(ax+0.6, ay, az), 
               project(ax+0.6, ay+0.5, az), project(ax, ay+0.5, az)]
        draw.polygon(pts, fill=colors['aggregat'], outline='#7f1d1d')

    # Ma'lumotlarni yozish
    try: font = ImageFont.truetype("arial.ttf", 14)
    except: font = ImageFont.load_default()
    
    draw.text((20, 20), f"EcoProm: {L}x{W}x{H}m", fill='white', font=font)
    draw.text((20, 40), f"Hajm: {L*W*H:.2f} m3", fill='#10B981', font=font)

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.post("/api/render")
async def render_camera(params: CameraParams):
    try:
        cache_key = get_cache_key(params)
        cache_file = CACHE_DIR / f"{cache_key}.png"

        if cache_file.exists():
            with open(cache_file, "rb") as f:
                img_b64 = base64.b64encode(f.read()).decode()
            return {"success": True, "image": f"data:image/png;base64,{img_b64}", "cached": True}

        img_b64 = render_25d_fast(params)
        
        # Keshlash
        with open(cache_file, "wb") as f:
            f.write(base64.b64decode(img_b64))

        return {"success": True, "image": f"data:image/png;base64,{img_b64}", "cached": False}
    except Exception as e:
        return JSONResponse({"success": False, "error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)