from PIL import Image, ImageDraw
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "assets" / "images"
OUT.mkdir(parents=True, exist_ok=True)
ORANGE = (255, 121, 0, 255)
LIGHT = (255, 157, 56, 255)
WHITE = (255, 255, 255, 255)
DARK = (39, 40, 51, 255)


def draw_mark(size: int, background=(0, 0, 0, 0), monochrome=False):
    im = Image.new("RGBA", (size, size), background)
    d = ImageDraw.Draw(im)
    s = size / 512
    def box(v): return tuple(round(x * s) for x in v)
    fg = WHITE if monochrome else WHITE
    accent = WHITE if monochrome else ORANGE
    edge = WHITE if monochrome else LIGHT
    # Antenna and signal bead.
    d.line([box((256, 68)), box((256, 111))], fill=accent, width=max(3, round(13*s)))
    d.ellipse(box((237, 45, 275, 83)), fill=accent)
    # Compact, recognizable robot body.
    d.rounded_rectangle(box((125, 110, 387, 395)), radius=round(60*s), fill=fg, outline=edge, width=max(3, round(12*s)))
    # Visor.
    d.rounded_rectangle(box((162, 158, 350, 270)), radius=round(36*s), fill=DARK if not monochrome else (0,0,0,0), outline=edge, width=max(2, round(5*s)))
    eye = WHITE if not monochrome else WHITE
    d.ellipse(box((207, 190, 237, 220)), fill=eye)
    d.ellipse(box((275, 190, 305, 220)), fill=eye)
    # Smile.
    d.arc(box((213, 207, 299, 249)), start=10, end=170, fill=eye, width=max(3, round(8*s)))
    # Arms and hands.
    d.rounded_rectangle(box((91, 232, 127, 321)), radius=round(18*s), fill=fg, outline=edge, width=max(2, round(7*s)))
    d.rounded_rectangle(box((385, 232, 421, 321)), radius=round(18*s), fill=fg, outline=edge, width=max(2, round(7*s)))
    d.ellipse(box((82, 300, 132, 350)), fill=accent)
    d.ellipse(box((380, 300, 430, 350)), fill=accent)
    # Three soft thrusters.
    for x in (208, 256, 304):
        d.rounded_rectangle(box((x-13, 390, x+13, 451)), radius=round(14*s), fill=accent)
        if not monochrome:
            d.ellipse(box((x-10, 432, x+10, 459)), fill=LIGHT)
    # Target ring behind the bot, subtle but ownable.
    if not monochrome:
        d.ellipse(box((34, 34, 478, 478)), outline=(255,255,255,80), width=max(2,round(5*s)))
    return im

# Full-bleed square icon; no pre-rounded corners, per platform requirement.
icon = Image.new("RGBA", (1024, 1024), ORANGE)
mark = draw_mark(770)
icon.alpha_composite(mark, ((1024-770)//2, (1024-770)//2+7))
icon.convert("RGB").save(OUT / "icon.png", quality=95)

splash = Image.new("RGBA", (1024, 1024), (255,255,255,255))
splash_mark = draw_mark(760, background=(0,0,0,0))
splash.alpha_composite(splash_mark, ((1024-760)//2, (1024-760)//2))
splash.save(OUT / "splash-icon.png")

foreground = draw_mark(512, background=(0,0,0,0))
foreground.save(OUT / "android-icon-foreground.png")
Image.new("RGBA", (512,512), ORANGE).save(OUT / "android-icon-background.png")
mono = draw_mark(432, background=(0,0,0,0), monochrome=True)
mono.save(OUT / "android-icon-monochrome.png")
small = Image.new("RGBA", (48,48), ORANGE)
small_mark = draw_mark(38)
small.alpha_composite(small_mark, (5,5))
small.save(OUT / "favicon.png")
print("Generated TargetX native icon set in", OUT)
