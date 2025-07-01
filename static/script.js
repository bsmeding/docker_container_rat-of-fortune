let theWheel;

function buildAndSpin() {
    const checked = document.querySelectorAll("input[name='name']:checked");
    const selectedNames = Array.from(checked).map(cb => cb.value);

    if (selectedNames.length === 0) {
        alert("Select at least one name.");
        return;
    }

    fetch("/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: selectedNames })
    })
    .then(res => res.json())
    .then(data => {
        const segments = data.names.map(n => ({ text: n }));
        const winnerIndex = Math.floor(Math.random() * segments.length);
        const winner = segments[winnerIndex].text;

        if (theWheel) theWheel.stopAnimation(false);
        theWheel = new Winwheel({
            canvasId: 'canvas',
            numSegments: segments.length,
            segments: segments,
            animation: {
                type: 'spinToStop',
                duration: 5,
                spins: 8,
                callbackFinished: function(indicatedSegment) {
                    document.getElementById("result").innerText = `🎉 Winner: ${indicatedSegment.text}`;
                }
            }
        });

        // Spin to a specific segment
        const stopAt = theWheel.getRandomForSegment(winnerIndex + 1);
        theWheel.animation.stopAngle = stopAt;
        theWheel.startAnimation();
    });
}
