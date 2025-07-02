const basePath = document.body.dataset.basePath || "";

async function buildAndSpin() {
    const checkboxes = document.querySelectorAll("input[name='name']:checked");
    const selectedNames = Array.from(checkboxes).map(cb => cb.value);
    if (selectedNames.length === 0) {
        alert("Select at least one name.");
        return;
    }
    const response = await fetch(`${basePath}/spin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: selectedNames })
    });
    const data = await response.json();
    const segments = data.names.map(n => ({ text: n }));
    const winnerIndex = Math.floor(Math.random() * segments.length);
    if (window.theWheel) {
        theWheel.stopAnimation(false);
        theWheel = null;
    }
    window.theWheel = new Winwheel({
        canvasId: 'canvas',
        numSegments: segments.length,
        segments: segments,
        animation: {
            type: 'spinToStop',
            duration: 5,
            spins: 8,
            callbackFinished: function (segment) {
                document.getElementById("result").innerText = `🎉 Winner: ${segment.text}`;
            }
        }
    });
    const stopAt = theWheel.getRandomForSegment(winnerIndex + 1);
    theWheel.animation.stopAngle = stopAt;
    theWheel.startAnimation();
}
