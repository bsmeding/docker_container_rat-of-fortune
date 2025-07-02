# 🎯 Rat of Fortune (Graphical Spinner in Docker)

A fun, browser-based "Rat of Fortune" that spins a graphical wheel to pick a random name from a list!

## 🧩 Features

- Load names from a file (`names.txt`)
- Select which users to include (checkboxes)
- Spin a visual wheel 🎡
- Animated winner announcement 🎉

---

## Credits

Winwheel.js for the wheel logic
GSAP (TweenMax) for animation

## 🐳 Quickstart (Docker)
```bash
# Create a name list
echo -e "Alice\nBob\nCharlie\nDiana" > names.txt

docker run -p 5000:5000 -v $(pwd)/names.txt:/app/names.txt bsmeding/rat-of-fortune
```

## 🐳 Docker build from repo

```bash
# Clone this repo
git clone https://github.com/bsmeding/docker_container_rat-of-fortune.git
cd docker_container_rat-of-fortune

# Create a name list
echo -e "Alice\nBob\nCharlie\nDiana" > names.txt

# Build and run
docker build -t rat-of-fortune .
docker run -p 5000:5000 -v $(pwd)/names.txt:/app/names.txt rat-of-fortune
```


### ✅ Run under subpath `/wheel` (e.g. reverse proxy)

```bash
docker run -p 5000:5000 \
  -v $(pwd)/names.txt:/app/names.txt \
  -e APP_BASE_PATH=/wheel \
  bsmeding/rat-of-fortune

# Open http://localhost:5000/wheel/
```